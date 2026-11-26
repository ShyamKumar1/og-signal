#!/usr/bin/env bash
# edition.sh — one full newsroom run.
#
#   ./scripts/edition.sh <factpack.json> <morning|afternoon|night> [--no-deploy]
#
# The second argument is the check slot, used only for logging and the commit
# message. It is not a section of the site: stories carry a publish time, not an
# edition. Nothing here groups content by slot.
#
# Steps: opencode writes the articles -> verify.mjs gates them -> Astro builds
#        -> commit + push -> Netlify production deploy -> WhatsApp alert.
# Any failure before the build leaves the repo untouched.
set -euo pipefail

FACT="${1:?usage: edition.sh <factpack.json> <morning|afternoon|night> [--no-deploy]}"
SLOT="${2:?check slot required}"
DEPLOY=1
[[ "${3:-}" == "--no-deploy" ]] && DEPLOY=0

REPO="$(cd "$(dirname "$0")/.." && pwd)"
# The work dir must live OUTSIDE the repo. If it is inside, opencode can see the
# existing corpus in src/content/stories and will rewrite stories that are not in
# this fact pack.
WORK="$(mktemp -d "${TMPDIR:-/tmp}/og-edition-XXXXXXXX")"
mkdir -p "$WORK/stories"
cp "$REPO/scripts/BRIEF-ARTICLES.md" "$WORK/BRIEF-ARTICLES.md"
cp "$FACT" "$WORK/factpack.json"

echo "→ writing with opencode (deepseek-v4.1-flash)"
( cd "$WORK" && ~/.opencode/bin/opencode run --auto --archived \
    -m opencode-go/deepseek-v4.1-flash \
    "Read BRIEF-ARTICLES.md and factpack.json in this folder completely. Then write one markdown file per story in the factpack, exactly as the brief specifies, in ./stories/ named <slug>.md, with frontmatter matching the brief's shape and sourced only from factpack.json. Do not write any other files. Do not invent facts." \
    > opencode.log 2>&1 ) || echo "⚠ opencode exited non-zero — judging by artifacts, not by exit code"

# Do not trust opencode's exit code. Long runs can die at the provider stream
# ("OpenAI Chat stream ended without finish_reason") AFTER writing every file —
# observed twice. The articles on disk are what matter, so check those.
if ! ls "$WORK"/stories/*.md >/dev/null 2>&1; then
  echo "✗ opencode wrote no stories — see $WORK/opencode.log"
  exit 1
fi

echo "→ verifying"
if ! node "$REPO/scripts/verify.mjs" "$WORK/stories" "$WORK/factpack.json"; then
  echo "✗ verification failed — nothing published. Work dir: $WORK (report: $WORK/stories/verify-report.json)"
  exit 1
fi

echo "→ installing $SLOT stories into content"
cp "$WORK"/stories/*.md "$REPO/src/content/stories/"
rm -f "$REPO/src/content/stories/_smoke.md"

cd "$REPO"
echo "→ building"
npm run build

if [[ $DEPLOY -eq 1 ]]; then
  echo "→ committing"
  git add -A
  git commit -m "wire: $(date +%F) $SLOT — $(ls "$WORK"/stories | wc -l | tr -d ' ') stories" || echo "nothing to commit"
  git push origin HEAD || echo "push skipped"
  echo "→ deploying"
  netlify deploy --prod --dir=dist --message "wire $(date +%F) $SLOT"

  echo "→ notifying the owner"
  # A failed alert must never fail a published run, so this is allowed to warn.
  node "$REPO/scripts/notify.mjs" --files "$WORK"/stories/*.md || echo "⚠ alert failed — stories are live anyway"
fi

echo "✓ run complete: $WORK"
