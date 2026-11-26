export const SITE = {
  title: 'OG Signal',
  tagline: 'A daily wire on the models, the money and the machines.',
  description:
    'A running wire on AI, large language models, machine learning and the technology underneath them. Every claim traced to a primary source before it publishes.',
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

/**
 * The wire is checked three times a day. These are update times, not editions:
 * a slot with nothing worth filing produces no story at all.
 */
export const UPDATE_TIMES = ['06:00', '14:00', '22:00'] as const;

export const UPDATE_COPY = `Checked at ${UPDATE_TIMES.slice(0, -1).join(', ')} and ${
  UPDATE_TIMES[UPDATE_TIMES.length - 1]
} IST.`;
