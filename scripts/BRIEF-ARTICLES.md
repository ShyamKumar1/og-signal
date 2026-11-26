# Article writing brief

You are writing the copy for six news articles. The facts are already gathered for you in
`factpack.json` in this folder. Your job is the writing, not the research.

## Hard rules

1. Use ONLY the facts in `factpack.json`. Do not add outside knowledge, do not infer numbers,
   do not invent quotes, dates, products or people. If a fact is not in the file, it does not exist.
2. Every number you print must appear verbatim in the factpack, except arithmetic you can do
   exactly (a percentage of two given figures). Prefer the given figure.
3. Attribute company claims as claims: "XPENG says", "PrismML reports", "according to its prospectus".
   Benchmarks reported by the vendor are vendor numbers; say so at least once per story.
4. No hype vocabulary: no "game-changer", "revolutionary", "unleash", "delve", "landscape",
   "in today's fast-paced world", "it remains to be seen". No sentences that could be swapped
   into any other story.
5. No emoji. No exclamation marks. No rhetorical questions. No "In conclusion".
6. Open with the specific thing that happened, not with context. First sentence carries a fact.
   No "In a move that..." or "As the AI industry continues to...".
7. Vary sentence length deliberately. Some sentences should be short. Most paragraphs 2-4 sentences.
8. British-leaning spelling is fine but be consistent (organisation, not organization).
9. Hedging is allowed and encouraged where the factpack is thin. Silence is better than a guess.

## Structure per article

- 620-800 words of body.
- 5-7 `##` section headings, each a short declarative phrase (not a question, not a label).
- One `> ` blockquote only if you are quoting a named person from the factpack. Do not invent.
  If the factpack has a partial quote, quote only the words that are actually there.
- End with a plain sentence of consequence or the next thing to watch. No summary paragraph.

## Frontmatter — exact shape, no extra fields

    ---
    title: "Sentence case, 60-95 chars, no colon-clickbait, no question mark"
    dek: "One sentence, 90-200 chars, adds information the title does not repeat"
    channel: "ai" | "llm" | "ml" | "technology"
    publishedAt: "2026-11-25T04:30:00+05:30"
    readingTime: 4
    tags: ["lowercase", "2-5", "tags"]
    sources:
      - title: "exact source title from factpack"
        url: "exact url from factpack"
        publisher: "exact publisher from factpack"
        published: "2026-11-24"
    timeline: []
    claimsChecked: 0
    lead: false
    draft: false
    ---

`readingTime` = round(wordcount / 220), minimum 2.
`lead: true` only on the story whose slug is `open-weight-models-554b-and-5-9gb-same-day`.
Copy `sources` exactly from the factpack for that story, in the same order. Do not invent sources.
`claimsChecked` stays 0 — a verifier fills it in later.

## Output

Write one file per story in `factpack.json`, at `stories/<slug>.md` using the exact slug from the
factpack. No more files than there are stories, and none for stories that are not in the factpack.
No index file, no README.

## Titles that would fail

- "The AI Revolution Continues: What You Need to Know"
- "Open-Weight Models Are Changing Everything"
- "XPENG's WorldGPT: A Game-Changer for Robotics"

## Titles that pass

- "Two labs shipped open weights on Tuesday, five hundred billion parameters apart"
- "XPENG says one world model can drive a car and a boat"
- "Anthropic's first week public came with a $9.9 billion compute bill"
