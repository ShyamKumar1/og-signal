#!/usr/bin/env node
/**
 * notify.mjs — tell the owner what just went live.
 *
 * Usage:
 *   node scripts/notify.mjs --files a.md b.md [--dry-run]
 *   node scripts/notify.mjs --since HEAD~1 [--dry-run]
 *
 * Reads story frontmatter, builds one short WhatsApp message and sends it.
 * Providers are chosen with WHATSAPP_PROVIDER:
 *
 *   callmebot  (default if WHATSAPP_CALLMEBOT_KEY and WHATSAPP_TO are set)
 *              Free personal alerts. The recipient sends "I allow callmebot to
 *              send me messages" to +34 644 51 95 23 on WhatsApp, gets an API
 *              key back, and that key goes in the env. No business account,
 *              no template approval, works for a single number.
 *   cloud      Meta WhatsApp Cloud API. Needs WHATSAPP_TOKEN,
 *              WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_TO. Free-form text only
 *              works inside a 24-hour customer-service window; outside it a
 *              template is mandatory, so set WHATSAPP_TEMPLATE and
 *              WHATSAPP_TEMPLATE_LANG if you want it to fire cold.
 *   twilio     Twilio WhatsApp. TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *              TWILIO_WHATSAPP_FROM, WHATSAPP_TO.
 *   log        Print the message and exit 0. Used by --dry-run.
 *
 * Exit codes: 0 sent (or logged), 1 send failed, 2 bad usage.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { load } from 'js-yaml';

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..');

// ---------------------------------------------------------------- env loading

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const hit = trimmed.match(/^(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!hit) continue;
    const [, key, rawValue] = hit;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, '');
  }
}

loadEnvFile(join(ROOT, '.env'));
loadEnvFile(join(homedir(), '.hermes', '.env'));

// ---------------------------------------------------------------- arguments

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || process.env.WHATSAPP_PROVIDER === 'log';
let files = [];
let since = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--files') {
    while (args[i + 1] && !args[i + 1].startsWith('--')) files.push(args[++i]);
  } else if (arg === '--since') {
    since = args[++i];
  }
}

if (since) {
  try {
    const out = execFileSync('git', ['diff', '--name-only', since, 'HEAD', '--', 'src/content/stories'], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    files.push(...out.split('\n').filter(Boolean));
  } catch (error) {
    console.error(`notify: could not diff against ${since} — ${error.message}`);
  }
}

files = [...new Set(files.map((file) => (file.startsWith('/') ? file : join(ROOT, file))))].filter((file) =>
  file.endsWith('.md') && existsSync(file),
);

if (files.length === 0) {
  console.log('notify: no new stories, nothing sent');
  process.exit(0);
}

// ---------------------------------------------------------------- message

const IST = 'Asia/Kolkata';
const fmtTime = (date) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: IST }).format(date);
const fmtDay = (date) =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: IST }).format(date);

const CHANNEL_SHORT = { ai: 'AI', llm: 'LLM', ml: 'ML', technology: 'Tech' };

const stories = files
  .map((file) => {
    const raw = readFileSync(file, 'utf8');
    const hit = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!hit) return null;
    const data = load(hit[1]) ?? {};
    const slug = file.split('/').pop().replace(/\.md$/, '');
    return {
      title: String(data.title ?? slug),
      channel: String(data.channel ?? ''),
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      url: `https://og-signal.netlify.app/story/${slug}`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.publishedAt - b.publishedAt);

if (stories.length === 0) {
  console.log('notify: files had no usable frontmatter, nothing sent');
  process.exit(0);
}

const newest = stories[stories.length - 1].publishedAt;
const header = `OG Signal · ${stories.length} new ${stories.length === 1 ? 'story' : 'stories'} · ${fmtDay(newest)}, ${fmtTime(newest)} IST`;
const body = stories
  .map((story, index) => {
    const tag = CHANNEL_SHORT[story.channel] ? ` (${CHANNEL_SHORT[story.channel]})` : '';
    return `${index + 1}. ${story.title}${tag}\n${story.url}`;
  })
  .join('\n\n');

// WhatsApp text messages are capped; keep the whole thing inside one bubble.
const MAX = 3500;
let message = `${header}\n\n${body}`;
if (message.length > MAX) {
  const kept = [];
  let total = header.length;
  for (const line of body.split('\n\n')) {
    if (total + line.length + 2 > MAX) break;
    kept.push(line);
    total += line.length + 2;
  }
  message = `${header}\n\n${kept.join('\n\n')}\n\n+${stories.length - kept.length} more on the site`;
}

const provider =
  process.env.WHATSAPP_PROVIDER ||
  (process.env.WHATSAPP_CALLMEBOT_KEY ? 'callmebot' : process.env.TWILIO_ACCOUNT_SID ? 'twilio' : 'log');

const to = (process.env.WHATSAPP_TO || '').replace(/[^\d+]/g, '');

// ---------------------------------------------------------------- providers

async function sendCallmebot() {
  const key = process.env.WHATSAPP_CALLMEBOT_KEY;
  if (!key || !to) throw new Error('callmebot needs WHATSAPP_CALLMEBOT_KEY and WHATSAPP_TO');
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(to)}&text=${encodeURIComponent(
    message,
  )}&apikey=${encodeURIComponent(key)}`;
  const response = await fetch(url);
  const text = await response.text();
  if (!response.ok) throw new Error(`callmebot ${response.status}: ${text.slice(0, 200)}`);
  return text.slice(0, 200);
}

async function sendCloud() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId || !to) throw new Error('cloud needs WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_TO');

  const template = process.env.WHATSAPP_TEMPLATE;
  const payload = template
    ? {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'en' },
          components: [{ type: 'body', parameters: [{ type: 'text', text: message.slice(0, 1024) }] }],
        },
      }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { preview_url: false, body: message } };

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`cloud ${response.status}: ${JSON.stringify(json).slice(0, 200)}`);
  return json?.messages?.[0]?.id ?? 'sent';
}

async function sendTwilio() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !from || !to) {
    throw new Error('twilio needs TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM and WHATSAPP_TO');
  }
  const form = new URLSearchParams({ From: from, To: `whatsapp:${to}`, Body: message });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`twilio ${response.status}: ${JSON.stringify(json).slice(0, 200)}`);
  return json.sid ?? 'sent';
}

const senders = { callmebot: sendCallmebot, cloud: sendCloud, twilio: sendTwilio };

if (dryRun || provider === 'log') {
  console.log(`notify: dry run (provider would be "${provider}")\n\n${message}`);
  process.exit(0);
}

const sender = senders[provider];
if (!sender) {
  console.error(`notify: unknown WHATSAPP_PROVIDER "${provider}" (use callmebot, cloud, twilio or log)`);
  process.exit(2);
}

try {
  const result = await sender();
  console.log(`notify: sent ${stories.length} story story-summary via ${provider} — ${result}`);
} catch (error) {
  console.error(`notify: send failed — ${error.message}`);
  process.exit(1);
}
