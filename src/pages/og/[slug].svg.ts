/**
 * Open Graph card — one 1200×630 SVG per published story.
 * Built from the title, channel and date; XML-sanitised; no external assets.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { CHANNELS } from '../../lib/site';
import { fmtDate } from '../../lib/format';

export async function getStaticPaths() {
  const stories = (await getCollection('stories')).filter((entry) => !entry.data.draft);
  return stories.map((story) => ({ params: { slug: story.id }, props: { story } }));
}

type Story = CollectionEntry<'stories'>;

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

const escapeXml = (value: string): string =>
  value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/[&<>"']/g, (char) => ENTITIES[char] ?? char);

const wrap = (text: string, maxChars: number): string[] => {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line.length === 0) line = word;
    else if (line.length + 1 + word.length <= maxChars) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line.length > 0) lines.push(line);
  return lines;
};

export function GET(context: APIContext) {
  const { story } = context.props as { story: Story };

  const title = story.data.title;
  const sizes = [70, 64, 58, 52, 46, 42] as const;
  const maxChars = (size: number) => Math.floor(1040 / (size * 0.54));

  let fontSize: number = sizes[0];
  let lines = wrap(title, maxChars(fontSize));
  for (const size of sizes) {
    fontSize = size;
    lines = wrap(title, maxChars(size));
    if (lines.length <= 3) break;
  }
  lines = lines.slice(0, 4);

  const lineHeight = Math.round(fontSize * 1.12);
  const firstBaseline = 208 + Math.round(fontSize * 0.82);
  const meta = `${CHANNELS[story.data.channel].label} · ${fmtDate(story.data.publishedAt)}`;

  const titleLines = lines
    .map(
      (line, index) =>
        `<tspan x="80" y="${firstBaseline + index * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img">
  <title>${escapeXml(title)}</title>
  <rect width="1200" height="630" fill="#f7f8f1"/>
  <rect x="80" y="64" width="18" height="18" rx="3" fill="none" stroke="#14170f" stroke-width="2"/>
  <rect x="90" y="74" width="18" height="18" rx="3" fill="#f7f8f1" stroke="#14170f" stroke-width="2"/>
  <text x="124" y="82" font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" font-size="21" font-weight="500" letter-spacing="3" fill="#14170f">OG SIGNAL</text>
  <rect x="80" y="112" width="64" height="4" fill="#b65913"/>
  <text font-family="'Schibsted Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="600" letter-spacing="-1.5" fill="#14170f">${titleLines}</text>
  <rect x="80" y="512" width="1040" height="1" fill="#e2e2d5"/>
  <text x="80" y="558" font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" font-size="21" font-weight="500" letter-spacing="2" fill="#6c7360">${escapeXml(meta.toUpperCase())}</text>
</svg>`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
