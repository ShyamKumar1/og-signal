# Build brief — OG Signal (Astro 7, static)

Read `design/DESIGN.md` first. It is the locked design system. Also open the three
`design/zenml-*.png` reference images and match their feel. Use the Hallmark skill rules
(no AI-slop tells: no eyebrow label on every section, no coloured word in a headline,
no gradient fills, no identical card grid, no fake testimonials, no invented numbers).

Stack is already installed: `astro` (7.4.13), `@astrojs/sitemap`, `@astrojs/rss`, `pagefind`.
Do not add dependencies. Do not create a tailwind config; write plain CSS with custom properties.

## Data contract (do not change)

`src/content.config.ts` defines the `stories` collection. Every story is a markdown file in
`src/content/stories/<slug>.md` with frontmatter exactly matching that schema:
title, dek, channel (ai|llm|ml|technology), edition (morning|afternoon|night), publishedAt,
updatedAt?, readingTime, tags[], sources[{title,url,publisher,published?}], timeline[{at,note}],
claimsChecked, verifiedAt?, lead, draft.

`src/lib/site.ts` exports SITE, CHANNELS, CHANNEL_LIST, EDITIONS, EDITION_ORDER, types ChannelSlug / EditionSlug.
`src/lib/format.ts` exports fmtDate, fmtTime, fmtStamp, isoDay, relTime, hostOf, pad. Use these, do not re-implement dates.

Query content with `import { getCollection, render } from 'astro:content'`.
Filter drafts: `.filter(s => !s.data.draft)`.

## Section 1 (build this run)

1. `src/styles/tokens.css` — every token from DESIGN.md as CSS custom properties on `:root`,
   including a `[data-theme="dark"]` override block (warm dark: paper #14170f, card #1b1f16,
   ink #f3f4ec, line #2c3327). Keep dark mode tasteful, not inverted-neon.
2. `src/styles/global.css` — reset, base type, container/grid utilities, grain overlay on
   `body::before`, link styles, focus ring, button/pill/card/chip/table/list-row primitives,
   reveal animation classes, utility classes for the mono labels. Import the Google Fonts.
3. `src/layouts/Base.astro` — html head (title, description, canonical, OG, Twitter, JSON-LD
   slot, RSS link, theme-color), `<ClientRouter />`, grain, skip-link, `<Header>`, `<slot />`,
   `<Footer>`, and a small inline script that sets the theme from localStorage before paint
   (no flash of wrong theme). Props: `title`, `description`, `ogTitle?`, `canonical?`, `schema?`.
4. `src/components/Header.astro` — floating transparent nav per DESIGN.md: wordmark "OG SIGNAL"
   with a small monogram mark in CSS (two offset squares, no image), mono uppercase links
   (Today, Editions, Channels, About), a theme toggle, and a pill link "Subscribe →" pointing at /rss.xml.
   Sticky, 76px shrinking to 64px on scroll, paper backdrop blur after 40px. Mobile: a real
   drawer that opens and closes, with focus trapped and Escape to close. Channels dropdown listing
   the four channels from CHANNELS.
5. `src/components/Footer.astro` — night band: display headline "Three editions. Every claim
   sourced.", pill CTA, then 4 columns of mono links (Channels, Editions, Desk, Feeds).
6. `src/pages/index.astro` — the home page, this is the money shot:
   - Hero, asymmetric 52/48. Left: kicker pill ("LIVE" + count of today's stories + "today"),
     display headline (site tagline, 2 lines max), dek paragraph, meta row in mono
     (last updated stamp, "verified against primary sources"), and two actions: primary pill
     to the lead story, secondary mono link to /editions.
     Right: a white rounded card that is a live "edition console" — an inner mono header row
     ("TODAY · MORNING EDITION"), a bordered table of the desk's last three editions with
     story counts and cut-off times, a footer line with source count, and a small
     "systems normal" chip. This is the news translation of zenml's experiment table. All values
     computed from the collection, never hard-coded.
   - Stat strip: 4 cells divided by hairlines (stories today, sources cited, channels covered,
     editions filed) in display numerals + mono labels.
   - Lead story block: big display headline, dek, mono meta, and the first paragraph rendered,
     with a vertical hairline and a "read the story" link.
   - "Latest" list: hairline-divided index rows (01, 02, 03...) with channel chip, title,
     dek, and right-aligned mono timestamp. Up to 8.
   - Channels band on `--paper-band`: the four channels as index rows with blurb + count, not cards.
   - Night band CTA at the end.
7. `src/components/StoryRow.astro`, `src/components/Kicker.astro`, `src/components/Chip.astro`,
   `src/components/StatStrip.astro`, `src/components/EditionConsole.astro`,
   `src/components/SectionHead.astro` — small, typed, reusable. Props documented in a comment at the top of each file.
8. `src/pages/story/[...slug].astro` — article page:
   - mono kicker (channel · edition · reading time), display headline, dek,
     byline row "Desk · verified <stamp>" plus a "sources verified" chip.
   - reading progress hairline pinned under the header.
   - body render, drop-cap on the first paragraph, `h2`/`h3`/`blockquote`/`ul`/`table` styles
     that fit the system, pull-quote styling for blockquotes, and a TOC generated from h2s
     (sticky in the 220px margin column on ≥1180px).
   - "What changed" timeline block if `timeline.length` (dashed rail, mono timestamps).
   - Sources block: bordered card, numbered rows, publisher + hostname + external link arrow,
     plus a footer line "N claims checked · verified <stamp>".
   - Related stories (same channel, 3 max) as index rows.
   - JSON-LD NewsArticle.
9. `src/pages/404.astro`.
10. `src/content/stories/` — leave the existing smoke file alone.

Constraints: no `any` in TS, no external JS libraries, no images required, no emoji.
Every page must render with zero stories and with many (guard empty arrays).
Run `npx astro build` at the end and fix errors until it passes. Do not touch
`src/content.config.ts`, `src/lib/*`, `astro.config.mjs`, `package.json`.

## Section 2 (later run, do not build now)

editions index + [date], channel/[slug], search (Pagefind UI, styled to the system),
about, editorial standards, corrections, rss.xml.ts, per-channel rss, llms.txt.ts,
api/stories.json.ts, og/[slug].svg.ts, sitemap tuning, command palette (Cmd+K).

### Section 2 — exact spec

All pages use `<Base>` and the primitives already built. Import `SITE`, `CHANNELS`,
`CHANNEL_LIST`, `EDITIONS`, `EDITION_ORDER` from `@/lib/site` and the formatters from `@/lib/format`.
Every page needs `data-pagefind-ignore` on header, footer and anything that is not article copy.

1. `src/pages/editions/index.astro` — archive. Group stories by `isoDay(publishedAt)`, newest first.
   Each day is a hairline-divided row: mono date, edition chips, story count, and the lead headline.
   Include a "filed at" mono column. Cap nothing; this page will grow.
2. `src/pages/editions/[date].astro` — one day. `getStaticPaths` over distinct `isoDay` values.
   Shows the day's lead, then every story grouped by edition in `EDITION_ORDER` with the cut-off
   time from `EDITIONS[e].cut` and the window string. Include prev/next day links when they exist.
3. `src/pages/channel/[slug].astro` — `getStaticPaths` over `CHANNEL_LIST`. Header with the channel
   label and blurb, story count, then index rows. Link to the channel RSS.
4. `src/pages/channel/[slug]/rss.xml.ts` — per-channel feed via `@astrojs/rss`.
5. `src/pages/search.astro` — Pagefind. Load `/pagefind/pagefind-ui.js` and
   `/pagefind/pagefind-ui.css` from the built site, mount `PagefindUI` into a container, and
   override the CSS variables so it matches the system (paper background, `--line` borders,
   radius 20px, mono labels). Support `?q=` prefill. Include a note when the index is empty
   (dev builds do not have pagefind).
6. `src/pages/about.astro` — what this is, how it is produced (three editions, fact pack then
   writer then verification gate), and an honest statement that an AI model drafts the copy from
   a fact pack and every number is checked against sources before publish. Link to /editorial.
7. `src/pages/editorial.astro` — the standards: sourcing rules, single-source labelling, how
   corrections work, what the site will not do (no republished text, no unlicensed images,
   no invented quotes). Use a definition list, not cards.
8. `src/pages/corrections.astro` — read `src/content/corrections.md` if present (a plain list of
   `- date — what changed — story link`), otherwise render an empty state: "No corrections filed."
9. `src/pages/rss.xml.ts` — site feed, newest 30, with `customData` for the channel.
10. `src/pages/llms.txt.ts` — plain text: site name, what it is, cadence, the four channels, and
    the most recent 40 stories as `- [title](url) — channel, date`. Also emit a `Link` header-free
    plain body; content type `text/plain`.
11. `src/pages/api/stories.json.ts` — static JSON array of all published stories (title, slug, url,
    dek, channel, edition, publishedAt ISO, readingTime, tags, sources count). Sorted newest first.
12. `src/pages/og/[slug].svg.ts` — returns an SVG (1200×630) built from the story title, channel
    label and date, using the display font stack with a fallback, on `#f7f8f1` with `#14170f` ink,
    a `#b65913` accent rule, and the wordmark. Sanitise the title for XML. Set `content-type: image/svg+xml`.
13. Wire `og:image` in Base.astro to `/og/<slug>.svg` when a `slug` prop is passed.
14. Add `data-pagefind-body` to the prose container on the story page and
    `data-pagefind-meta="title"` / `"channel"` / `"date"` where useful.

Do not add dependencies. Do not change the design language. Run `npx astro build` and fix until clean.

