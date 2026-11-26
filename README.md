# OG Signal

Daily news about artificial intelligence, large language models, machine learning and the
technology underneath them. Every story links the original sources behind it.

**Live site:** https://og-signal.netlify.app

This is a static Astro site, but it is also a working newsroom: the stories are researched from
primary sources, drafted from a fixed list of checked facts, verified by a script that refuses to
publish anything it cannot trace, and deployed to Netlify automatically. The site is updated three
times a day and nothing goes up that has not passed the check.

---

## What is on the site

| Page | What it does |
| --- | --- |
| `/` | The newest story, a panel of everything added today, today's stories with a topic filter, one section per topic, then earlier stories. |
| `/latest` | Every story, grouped by the day it was published, newest first. |
| `/channel/ai`, `/llm`, `/ml`, `/technology` | One topic's full history, with its own RSS feed. |
| `/research` | Papers, preprints and technical reports. Cross-cutting: a paper on language models is filed under Language Models and also appears here. Own feed at `/research/rss.xml`. |
| `/story/<slug>` | A single story: reading progress, a table of contents, its sources, and a verification note. |
| `/search` | Full-text search over every story, built with Pagefind at build time. |
| `/about`, `/editorial`, `/corrections` | How the site is made, the rules it follows, and a public corrections log. |
| `/rss.xml`, `/channel/<slug>/rss.xml`, `/research/rss.xml` | Feeds. |
| `/api/stories.json` | Every published story as JSON. |
| `/llms.txt` | A plain-text map of the site for language models. |
| `/editions`, `/editions/<date>` | Retired routes. They exist only to send old links to `/latest`. |

There are no editions. A story has a publish time, not a slot; the front page groups stories by
topic and by day, which is what a reader actually uses.

## How a story is made

1. **Research.** Candidates are found across the four topics, then each one is opened at its
   original source: the company's own announcement, a filing, an official research post or a
   pressroom release. A headline on its own is not enough.
2. **A list of checked facts.** Everything allowed into the article is written down first as a
   factpack: statements with a source URL beside each one, plus any arithmetic that was verified.
   If a number is not in the factpack it cannot appear in the article.
3. **Writing.** The article is drafted by a language model from that factpack alone, with no other
   context and no ability to browse.
4. **Verification.** `scripts/verify.mjs` reads every draft against the factpack: each number in the
   copy must exist in the pack, every cited URL must be one of the pack's, the body must be at least
   500 words, there must be at least three `##` sections, and a banned-phrase list must be clean.
   A single failing check means nothing is published.

The promise in one line: the prose is machine-drafted, the facts are sourced and dated, and the
checking step has no override.

## Research coverage

Stories whose primary source is a paper, preprint or technical report are marked `research: true`.
They appear at `/research`, in its RSS feed, on the homepage under "From the papers", and still sit
under their own topic. When the factpack carries paper details, a `paper:` block adds the title,
venue and arXiv id or DOI, which renders as a paper card on the story page and as a "Read the paper"
link in the research list. Nothing about a venue or an identifier is ever inferred — if the factpack
does not have it, the field is left out.

## Repository layout

```
src/
  content/stories/        one markdown file per published story
  content/corrections.md  the public corrections log
  content.config.ts       the story schema — the source of truth for frontmatter
  layouts/Base.astro      document shell, metadata, theme handling
  components/             header, footer, rows, chips, section heads
  pages/                  routes, feeds, JSON API, llms.txt, OG images
  lib/site.ts             site identity, topics, update times
  lib/format.ts           IST date and time formatting
  styles/                 design tokens and global styles
scripts/
  edition.sh              one full run: write, verify, build, commit, push, deploy, alert
  verify.mjs              the publish gate
  notify.mjs              the publish alert
  BRIEF-ARTICLES.md       the instruction sheet handed to the writer
  factpack-*.json         the checked facts for one run
design/                   the locked design system and the brief it came from
```

## Running it locally

Node 24 is required; Astro 7 refuses to build on older 22.x releases.

```bash
npm install
npm run dev            # local dev server
npm run build          # astro build + pagefind index
npm run preview        # serve the built site
npm run check          # astro check (types and templates)
```

If `node -v` is below 22.23.4:

```bash
export PATH="$HOME/.nvm/versions/node/v24.18.0/bin:$PATH"
```

## Publishing a story

1. Write the factpack to `scripts/factpack-<YYYY-MM-DD>-<slot>.json`:

```json
{
  "edition": "morning",
  "date": "2026-11-26",
  "timezone": "Asia/Kolkata",
  "note": "Anything the writer needs to know about this run.",
  "derived": ["104 / 2800 = about 3.7 per cent of total parameters"],
  "stories": [
    {
      "slug": "moonshot-kimi-k3-1-pro-open-weights",
      "channel": "llm",
      "lead": true,
      "angle": "One line on what makes this worth reading.",
      "facts": ["Statements that can be pointed at a source."],
      "sources": [
        {
          "title": "moonshotai/Kimi-K3.1-Pro model card",
          "url": "https://huggingface.co/moonshotai/Kimi-K3.1-Pro",
          "publisher": "Moonshot AI on Hugging Face",
          "published": "2026-11-25"
        }
      ]
    }
  ]
}
```

`edition` at the top level is bookkeeping for the run and never appears on the site. Individual
stories carry no `edition` field.

2. Run one update. The second argument is the check slot, used only in the commit message:

```bash
./scripts/edition.sh scripts/factpack-2026-11-26-morning.json morning
```

The script writes the articles with opencode, gates them through `verify.mjs`, builds, commits,
pushes, deploys to Netlify and sends the alert. Add `--no-deploy` to stop before deploy, which also
skips the alert.

3. If verification fails, read the report at `<workdir>/stories/verify-report.json`, fix the factpack
   or the draft, and run again. Nothing is published while the gate is failing, and the gate is never
   edited to pass.

### Story frontmatter

```yaml
---
title: "Sentence case, 40-110 chars, no question mark"
dek: "One sentence, 70-260 chars, adds information the title does not repeat"
channel: "ai" | "llm" | "ml" | "technology"
research: false           # true when the primary source is a paper, preprint or technical report
paper:                    # optional; both fields only when the factpack has them
  title: "Exact paper title"
  venue: "Conference, journal or lab"
  id: "arXiv:2511.00000 or DOI"
  url: "https://arxiv.org/abs/2511.00000"
publishedAt: "2026-11-26T06:00:00+05:30"
readingTime: 3
tags: ["lowercase", "two-to-five"]
sources:
  - title: "Exact source title"
    url: "https://example.com/post"
    publisher: "Publisher"
    published: "2026-11-25"
timeline: []
claimsChecked: 0
lead: false
draft: false
---
```

## Publish alerts

`scripts/notify.mjs` reads the new story files, builds one short message and sends it after a
successful deploy. A failed send warns and never un-publishes anything.

Telegram is the live channel; the bot token and chat id are read from `~/.hermes/.env`. Other
providers are selected with `WHATSAPP_PROVIDER` in the repo's `.env` (gitignored — copy
`.env.example`): `callmebot`, `cloud` (Meta WhatsApp Cloud API), `twilio`, or `log`.

```bash
node scripts/notify.mjs --files src/content/stories/<slug>.md --dry-run   # print, send nothing
node scripts/notify.mjs --since HEAD~1                                    # alert for the last commit
```

## Editorial rules the code enforces

- Every number in the copy must appear in the factpack or in its `derived` list.
- Every cited URL must be one of the factpack's sources.
- At least 500 words of body and at least three `##` sections.
- No hype vocabulary: the banned list includes "game-changer", "revolutionary", "delve",
  "testament to", "paradigm shift" and similar.
- No exclamation marks, no question-mark headlines, no rhetorical headings.
- No emoji. British-leaning spelling, used consistently.
- Vendor benchmarks are attributed as vendor claims at least once per story.
- Source text is never republished; quotes are short and attributed. No hotlinked images.

## Deployment

Netlify project `og-signal` (site id `63b23805-af87-4572-966e-429c3a4c9c4d`), custom headers and the
`/feed` redirect in `netlify.toml`, `NODE_VERSION=24` pinned for the build.

```bash
npm run build
netlify deploy --prod --dir=dist
```

## Stack

Astro 7 (static), Pagefind for search, `@astrojs/rss`, `@astrojs/sitemap`, Netlify for hosting,
opencode with deepseek-v4.1-flash as the drafting model.

## Corrections

Errors are corrected on the page and logged in `src/content/corrections.md`, which renders at
`/corrections`. The editorial rules are at `/editorial`. If something on the site is wrong, open an
issue on this repository with the story URL and the detail.
