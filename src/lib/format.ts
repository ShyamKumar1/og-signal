const IST = 'Asia/Kolkata';

export function fmtDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: IST,
  }).format(date);
}

export function fmtTime(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: IST,
  }).format(date);
}

export function fmtStamp(d: Date | string): string {
  return `${fmtTime(d)} IST · ${fmtDate(d)}`;
}

export function isoDay(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: IST,
  }).format(date);
  return parts;
}

export function relTime(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  const mins = Math.round((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return days === 1 ? 'yesterday' : `${days} days ago`;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
