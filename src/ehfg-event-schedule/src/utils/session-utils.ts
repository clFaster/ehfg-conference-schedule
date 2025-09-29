import { Session } from '../types/session';

// Date helpers - explicitly parse as Central European time (MESZ/CEST)
export const parseStart = (s: Session) =>
  new Date(`${s.date}T${s.start}:00+02:00`);
export const parseEnd = (s: Session) => new Date(`${s.date}T${s.end}:00+02:00`);

// HTML entity decoder
export const decodeHtmlEntities = (text: string): string => {
  const entityMap: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
  };

  return text.replace(/&[#\w]+;/g, (entity) => entityMap[entity] || entity);
};

export const getSessionProgress = (session: Session, now: Date) => {
  const start = parseStart(session).getTime();
  const end = parseEnd(session).getTime();
  const n = now.getTime();
  if (n <= start) return 0;
  if (n >= end) return 100;
  return ((n - start) / (end - start)) * 100;
};

export const getCountdown = (session: Session, now: Date) => {
  const diffMs = parseStart(session).getTime() - now.getTime();
  if (diffMs <= 0) return null;
  const totalMinutes = Math.floor(diffMs / 60000);
  if (totalMinutes < 60)
    return { label: `${totalMinutes}m`, minutes: totalMinutes };
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return { label: `${h}h ${m}m`, minutes: totalMinutes };
};

export const formatDateLong = (d: string) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Vienna',
  });
};

export const formatClock = (d: Date) =>
  d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Vienna',
  });

export const DISPLAY_CATEGORIES = new Set([
  'Session',
  'Plenary',
  'Networking Break',
]);
