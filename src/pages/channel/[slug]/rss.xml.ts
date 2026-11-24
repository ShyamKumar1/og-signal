/**
 * Per-channel RSS — newest 30 published stories in one channel.
 * Mirrors /rss.xml, scoped by channel.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CHANNEL_LIST, SITE, type ChannelSlug } from '../../../lib/site';

export function getStaticPaths() {
  return CHANNEL_LIST.map((channel) => ({
    params: { slug: channel.slug },
    props: { channel },
  }));
}

export async function GET(context: APIContext) {
  const { channel } = context.props as { channel: { slug: ChannelSlug; label: string; blurb: string } };

  const stories = (await getCollection('stories'))
    .filter((entry) => !entry.data.draft && entry.data.channel === channel.slug)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .slice(0, 30);

  return rss({
    title: `${SITE.title} · ${channel.label}`,
    description: channel.blurb,
    site: context.site ?? SITE.url,
    items: stories.map((story) => ({
      title: story.data.title,
      description: story.data.dek,
      pubDate: story.data.publishedAt,
      link: `/story/${story.id}/`,
    })),
    customData: `<language>en-in</language>`,
  });
}
