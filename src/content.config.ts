import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  published: z.string().optional(),
});

const timelineSchema = z.object({
  at: z.string(),
  note: z.string(),
});

const paperSchema = z.object({
  title: z.string(),
  venue: z.string().optional(),
  url: z.string().url().optional(),
  id: z.string().optional(),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string().min(12).max(110),
    dek: z.string().min(30).max(260),
    channel: z.enum(['ai', 'llm', 'ml', 'technology']),
    research: z.boolean().default(false),
    paper: paperSchema.optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readingTime: z.number().min(1).max(30),
    tags: z.array(z.string()).default([]),
    sources: z.array(sourceSchema).min(1),
    timeline: z.array(timelineSchema).default([]),
    claimsChecked: z.number().int().min(0).default(0),
    verifiedAt: z.coerce.date().optional(),
    lead: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { stories };
