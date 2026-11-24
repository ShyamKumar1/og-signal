/**
 * Site RSS — newest 30 published stories across all channels.
 * Each item carries its channel in customData so readers can filter.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CHANNELS, SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const stories = (await getCollection('stories'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 30);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: stories.map((story) => ({
      title: story.data.title,
      description: story.data.dek,
      pubDate: story.data.publishedAt,
      link: `/story/${story.id}/`,
      customData: `<channel>${CHANNELS[story.data.channel].short}</channel>`,
    })),
    customData: `<language>en-in</language>`,
  });
}
