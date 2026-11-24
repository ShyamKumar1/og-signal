/**
 * stories.json — all published stories, newest first.
 * Static at build time; one flat array, no wrapper object.
 */
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';

export async function GET() {
  const stories = (await getCollection('stories'))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  const payload = stories.map((story) => ({
    title: story.data.title,
    slug: story.id,
    url: new URL(`/story/${story.id}/`, SITE.url).href,
    dek: story.data.dek,
    channel: story.data.channel,
    edition: story.data.edition,
    publishedAt: story.data.publishedAt.toISOString(),
    readingTime: story.data.readingTime,
    tags: story.data.tags,
    sources: story.data.sources.length,
  }));

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
