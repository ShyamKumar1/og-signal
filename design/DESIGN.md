# Design DNA — extracted from zenml.io (live measurements)

Source: computed styles + screenshots captured from https://www.zenml.io/ at 1440x900.
Reference images in this folder: `zenml-0.png` (hero), `zenml-1.png` (how-it-works band), `zenml-2.png` (mid page).
This file is the LOCKED design system for the project. It overrides any theme or style choice a skill or agent would otherwise make.

## What the style is, in one line

A quiet technical editorial: warm sage paper with film grain, near-black grotesk, oversized headlines, everything else in tiny uppercase monospace, white rounded cards that hold data instead of decoration.

## Colour (measured)

    --paper:        #f7f8f1   page background (warm sage-white)
    --paper-band:   #eef1e2   alternating section band
    --paper-deep:   #e5ebd4   deeper band, pull-quotes, ticker
    --card:         #fffefc   card surface (off-white, never pure #fff)
    --ink:          #14170f   primary text
    --ink-soft:     #3f4436   secondary text
    --ink-mute:     #6c7360   tertiary / meta
    --line:         #e2e2d5   hairlines and card borders
    --line-soft:    #eee8dc   inner dividers
    --accent:       #b65916   burnt orange, used sparingly (links, active states)
    --sage-deep:    #3c4c38   deep sage, secondary emphasis
    --sage:         #7a9268   muted green, "verified" states
    --blue:         #157a8e   informational only
    --cream:        #d5b595   warm neutral, micro-chips
    --night:        #151e19   dark band and footer CTA

Measured zenml values for fidelity: card `#fffefc`, border `#e9e4dc`, muted `#eee8dc`,
section band `rgb(246,249,241)`, sage band `rgb(235,240,216)`, dark band `rgb(21,30,25)`,
orange `#b65916`, sage-800 `#3c4c38`.

Rules: no gradients as fills, no coloured glows, no more than one accent colour per view.
Texture is the only "effect": a fixed SVG `feTurbulence` grain overlay at 3-5% opacity plus one
soft radial wash behind the hero.

## Type

    --font-display: "Schibsted Grotesk", ui-sans-serif, sans-serif   (600/700)
    --font-body:    "Rethink Sans", ui-sans-serif, sans-serif        (400/500)
    --font-mono:    "JetBrains Mono", ui-monospace, monospace        (400/500)

Load from Google Fonts (free). Rethink Sans and JetBrains Mono are the exact families zenml uses.

    display / h1:   clamp(40px, 27.95px + 3.21vw, 80px), weight 600, line-height 1.02, letter-spacing -0.03em
    h2:             clamp(28px, 1.6vw + 18px, 46px), weight 600, line-height 1.06, letter-spacing -0.02em
    h3:             20-24px, weight 600, line-height 1.25, letter-spacing -0.01em
    body:           17-18px / 1.65, weight 400
    ui / caption:   14px / 1.5
    label (mono):   11-12px, UPPERCASE, letter-spacing 0.08em, weight 500

Hierarchy is built by scale contrast (80px headline next to an 11px label), never by colour.

## Layout

Container max-width 1360px, gutter 40px, 12-column grid.
Vertical rhythm: sections at 96px / 128px padding. Bands alternate paper → band → paper.
Hero is asymmetric: 52% text / 48% card.
Article measure: max 68ch, centred, with a 220px margin column for meta on ≥1180px.

## Components, measured

Nav: 76px tall, transparent, floats on the paper (no bar, no border). Wordmark left,
mono uppercase links centred, pill CTA right. On scroll past 40px: paper background at 92%
with a 1px `--line` bottom border and 12px backdrop blur. Height shrinks to 64px.

Kicker pill: black pill, 11px mono uppercase label inside ("LIVE", "NEW"), then plain text,
then an arrow. Height 28px, radius 999px.

Buttons: radius 999px, 12px 22px padding, mono uppercase 12px, letter-spacing 0.06em.
Primary = `--ink` fill, `--card` text. Secondary = transparent, 1px `--line`, `--ink` text.
Hover: translateY(-1px), no shadow, border darkens to `--ink-soft`.

Cards: radius 20px, 1px `--line` border, `--card` background, NO box-shadow.
Inner sub-cards: radius 14px, 1px `--line-soft`. Micro chips: radius 999px, 10px mono, cream or sage tint.

Lists: never a grid of identical cards for the main feed. Use hairline-divided rows
(1px `--line`), with a mono index numeral (01, 02, 03), title in display type, and meta right-aligned in mono.
This "index rows" pattern is the news-site translation of zenml's benchmark table.

Data blocks: small bordered tables with mono headers, right-aligned numerals, a footer line in `--ink-mute`.
Use for stats strips ("142 stories · 611 sources · 3 editions today").

Dividers: 1px `--line` full-bleed, plus a mono section label preceded by a 24px rule.

Footer: the `--night` band, generous 160px padding, display headline, pill CTA, then a
4-column mono link list.

## Motion

200-400ms, ease-out. Reveal-on-scroll: 12px translateY and opacity 0→1, staggered 40ms.
Use Astro `<ClientRouter />` for view transitions. Respect `prefers-reduced-motion`.
No parallax, no scroll-jacking, no bouncing.

## Hard floor (never ship)

Contrast ≥ 4.5:1 body text. Visible focus ring (2px `--accent`, 2px offset).
Every interactive element ≥ 44px touch target. Layout intact at 360px, 768px, 1024px, 1440px, 1920px.
No invented facts, numbers, logos or quotes anywhere in the UI copy.
No emoji. No em-dash-heavy headline style. No "eyebrow label above every section" repetition —
the mono label appears once per section, at most.
