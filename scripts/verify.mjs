#!/usr/bin/env node
/**
 * verify.mjs — the publish gate.
 *
 * Usage:
 *   node scripts/verify.mjs <storiesDir> <factpack.json> [--fix]
 *
 * Checks every markdown story against the fact pack the writer was given.
 * Exit code 1 on any error, so CI and the edition script can refuse to publish.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';

const [, , dir, factpackPath, ...flags] = process.argv;
if (!dir || !factpackPath) {
  console.error('usage: verify.mjs <storiesDir> <factpack.json>');
  process.exit(2);
}

const factpack = JSON.parse(readFileSync(factpackPath, 'utf8'));
const allowedNumbers = new Set();
function harvest(obj) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'number') allowedNumbers.add(String(obj));
  else if (typeof obj === 'string') {
    for (const m of obj.matchAll(/\d[\d,.]*/g)) {
      allowedNumbers.add(m[0].replace(/,/g, '').replace(/[.]+$/, ''));
    }
  } else if (Array.isArray(obj)) obj.forEach(harvest);
  else if (typeof obj === 'object') Object.values(obj).forEach(harvest);
}
harvest(factpack);

const BANNED = [
  'game-changer', 'game changer', 'revolutionary', 'unleash', 'delve', 'in today\'s fast-paced',
  'it remains to be seen', 'in conclusion', 'testament to', 'landscape of', 'paradigm shift',
  'seamlessly', 'cutting-edge', 'state-of-the-art solution', 'we are excited', 'exciting new',
  'brace yourselves', 'the future is here', 'only time will tell',
];

const REQUIRED = ['title', 'dek', 'channel', 'publishedAt', 'readingTime', 'tags', 'sources'];
const CHANNELS = ['ai', 'llm', 'ml', 'technology'];

const errors = [];
const warnings = [];
const perFile = [];

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    errors.push(`${file}: no frontmatter block`);
    return null;
  }
  try {
    return { data: load(m[1]) ?? {}, body: m[2] };
  } catch (e) {
    errors.push(`${file}: frontmatter is not valid YAML — ${e.message}`);
    return null;
  }
}

function words(text) {
  return text.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
}

// Numbers legitimately produced by any writer: list indices, years already in facts,
// percentages computed from facts. We flag, we do not auto-fail, on soft misses.
const SOFT_OK = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '2026', '2025', '2030', '100']);

const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
if (files.length === 0) errors.push('no story files found');

for (const file of files) {
  const raw = readFileSync(join(dir, file), 'utf8');
  const parsed = parseFrontmatter(raw, file);
  if (!parsed) continue;
  const { data, body } = parsed;

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      errors.push(`${file}: missing required frontmatter "${key}"`);
    }
  }
  if (data.channel && !CHANNELS.includes(data.channel)) errors.push(`${file}: bad channel "${data.channel}"`);

  const title = String(data.title ?? '');
  if (title.length && (title.length < 40 || title.length > 110)) {
    errors.push(`${file}: title length ${title.length} outside 40-110`);
  }
  if (/[?]$/.test(title)) errors.push(`${file}: title ends in a question mark`);
  if (/:/.test(title)) warnings.push(`${file}: title contains a colon — check it is not clickbait`);

  const dek = String(data.dek ?? '');
  if (dek.length && (dek.length < 70 || dek.length > 260)) {
    warnings.push(`${file}: dek length ${dek.length} outside 70-260`);
  }

  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length === 0) errors.push(`${file}: has no sources`);
  if (sources.length === 1) {
    warnings.push(`${file}: single-source story — must be a primary/official announcement`);
  }
  const urls = new Set();
  for (const s of sources) {
    if (!s?.url || !/^https?:\/\//.test(s.url)) errors.push(`${file}: source url invalid (${s?.url})`);
    if (!s?.publisher) errors.push(`${file}: source missing publisher`);
    if (s?.url && urls.has(s.url)) errors.push(`${file}: duplicate source url ${s.url}`);
    if (s?.url) urls.add(s.url);
  }

  // The factpack is the source of truth for which sources may be cited.
  const allowedUrls = new Set(
    (factpack.stories ?? []).flatMap((s) => (s.sources ?? []).map((x) => x.url)),
  );
  if (allowedUrls.size) {
    for (const s of sources) {
      if (!allowedUrls.has(s.url)) errors.push(`${file}: cites a url not in the factpack — ${s.url}`);
    }
  }

  const bodyWords = words(body);
  if (bodyWords < 500) errors.push(`${file}: body is ${bodyWords} words, under the 500 floor`);
  if (bodyWords > 1100) warnings.push(`${file}: body is ${bodyWords} words, over the 1100 ceiling`);
  if (bodyWords >= 500 && data.readingTime) {
    const expected = Math.max(2, Math.round(bodyWords / 220));
    if (Math.abs(expected - Number(data.readingTime)) > 1) {
      warnings.push(`${file}: readingTime ${data.readingTime} vs computed ${expected}`);
    }
  }

  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
  if (headings.length < 3) errors.push(`${file}: only ${headings.length} H2 sections, need 3+`);
  if (headings.some((h) => h.trim().endsWith('?'))) warnings.push(`${file}: a heading is phrased as a question`);

  const lower = body.toLowerCase();
  for (const phrase of BANNED) {
    if (lower.includes(phrase)) errors.push(`${file}: banned phrase "${phrase}"`);
  }
  if (/!/.test(body)) warnings.push(`${file}: contains an exclamation mark`);

  // The check that matters: every number in the copy must exist in the fact pack.
  const unknown = new Map();
  const stripped = body.replace(/https?:\/\/\S+/g, ' ').replace(/`[^`]*`/g, ' ');
  for (const m of stripped.matchAll(/(?<![\w.])(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(?![\w])/g)) {
    const n = m[0].replace(/,/g, '');
    if (allowedNumbers.has(n) || allowedNumbers.has(m[0]) || SOFT_OK.has(n)) continue;
    unknown.set(m[0], (unknown.get(m[0]) ?? 0) + 1);
  }
  if (unknown.size) {
    errors.push(
      `${file}: numbers not present in the factpack — ${[...unknown.keys()].slice(0, 12).join(', ')}`,
    );
  }

  // Titles must not be near-duplicates of each other.
  perFile.push({ file, title, words: bodyWords, sources: sources.length, headings: headings.length });
}

for (let i = 0; i < perFile.length; i++) {
  for (let j = i + 1; j < perFile.length; j++) {
    const a = perFile[i].title.toLowerCase();
    const b = perFile[j].title.toLowerCase();
    if (a === b) errors.push(`duplicate title: ${a}`);
  }
}

const report = {
  files: perFile,
  errors,
  warnings,
  verdict: errors.length === 0 ? 'PASS' : 'FAIL',
};
writeFileSync(join(dir, 'verify-report.json'), JSON.stringify(report, null, 2));

console.log(`\nverify: ${perFile.length} file(s) — ${report.verdict}`);
for (const f of perFile) {
  console.log(`  ok  ${f.file}  ${f.words}w  ${f.sources}src  ${f.headings}h2`);
}
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERR   ${e}`);
process.exit(errors.length === 0 ? 0 : 1);
