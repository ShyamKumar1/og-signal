export const SITE = {
  title: 'OG Signal',
  tagline: 'An AI, LLM and machine-learning desk for people who ship.',
  description:
    'Three editions a day on AI, large language models, machine learning and the technology underneath them. Every claim traced to a primary source.',
  url: 'https://og-signal.netlify.app',
  owner: 'OG News',
  locale: 'en_IN',
  timezone: 'Asia/Kolkata',
} as const;

export type ChannelSlug = 'ai' | 'llm' | 'ml' | 'technology';

export const CHANNELS: Record<
  ChannelSlug,
  { slug: ChannelSlug; label: string; short: string; blurb: string }
> = {
  ai: {
    slug: 'ai',
    label: 'Artificial Intelligence',
    short: 'AI',
    blurb: 'Agents, policy, compute and the companies fighting over them.',
  },
  llm: {
    slug: 'llm',
    label: 'Language Models',
    short: 'LLM',
    blurb: 'New releases, benchmarks, context windows, inference and cost.',
  },
  ml: {
    slug: 'ml',
    label: 'Machine Learning',
    short: 'ML',
    blurb: 'Research that survives review, training techniques and open weights.',
  },
  technology: {
    slug: 'technology',
    label: 'Technology',
    short: 'Tech',
    blurb: 'Chips, data centres, platforms and the industry around the models.',
  },
};

export const CHANNEL_LIST = Object.values(CHANNELS);

export const EDITIONS = {
  morning: { label: 'Morning Edition', cut: '06:00', window: 'overnight to 06:00 IST' },
  afternoon: { label: 'Afternoon Edition', cut: '14:00', window: '06:00 to 14:00 IST' },
  night: { label: 'Night Edition', cut: '22:00', window: '14:00 to 22:00 IST' },
} as const;

export type EditionSlug = keyof typeof EDITIONS;

export const EDITION_ORDER: EditionSlug[] = ['morning', 'afternoon', 'night'];
