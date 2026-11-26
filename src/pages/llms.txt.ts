/**
 * llms.txt — a plain-text map of the desk for language models.
 * Site identity, cadence, channels, then the most recent 40 stories.
 */
import { getCollection } from 'astro:content';
import { CHANNEL_LIST, CHANNELS, SITE, UPDATE_COPY } from '../lib/site';
import { fmtDate } from '../lib/format';

export async function GET() {
  const stories = (await getCollection('stories'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 40);

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.title} is a news site in IST (Asia/Kolkata). ${UPDATE_COPY} Each story links the original sources behind its claims.`,
    '',
    '## Topics',
    '',
    ...CHANNEL_LIST.map(
      (channel) =>
        `- [${channel.label}](${new URL(`/channel/${channel.slug}/`, SITE.url).href}) — ${channel.blurb}`,
    ),
    '',
    `- [Latest](${new URL('/latest/', SITE.url).href}) — every story, newest first`,
    `- [Research](${new URL('/research/', SITE.url).href}) — papers, preprints and technical reports`,
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
