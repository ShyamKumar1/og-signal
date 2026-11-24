/**
 * llms.txt — a plain-text map of the desk for language models.
 * Site identity, cadence, channels, then the most recent 40 stories.
 */
import { getCollection } from 'astro:content';
import { CHANNEL_LIST, CHANNELS, EDITION_ORDER, EDITIONS, SITE } from '../lib/site';
import { fmtDate } from '../lib/format';

export async function GET() {
  const stories = (await getCollection('stories'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 40);

  const cadence = EDITION_ORDER.map(
    (edition) => `${EDITIONS[edition].label} (cut-off ${EDITIONS[edition].cut} IST)`,
  ).join(', ');

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.title} files ${EDITIONS.morning.label}, ${EDITIONS.afternoon.label} and ${EDITIONS.night.label} every day in IST (Asia/Kolkata). ${cadence}. Every story links the primary sources behind its claims.`,
    '',
    '## Channels',
    '',
    ...CHANNEL_LIST.map(
      (channel) =>
        `- [${channel.label}](${new URL(`/channel/${channel.slug}/`, SITE.url).href}) — ${channel.blurb}`,
    ),
    '',
    '## Recent stories',
    '',
    ...stories.map((story) => {
      const url = new URL(`/story/${story.id}/`, SITE.url).href;
      return `- [${story.data.title}](${url}) — ${CHANNELS[story.data.channel].label}, ${fmtDate(story.data.publishedAt)}`;
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
