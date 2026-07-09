const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** ₹24,999 with Indian digit grouping. */
export function formatINR(amount: number): string {
  return inr.format(amount);
}

const LAKH = 100_000;
const CRORE = 10_000_000;

/** Compact Indian notation for dashboards: ₹4.2L, ₹1.08Cr. */
export function formatINRCompact(amount: number): string {
  if (Math.abs(amount) >= CRORE) {
    return `₹${trimZero((amount / CRORE).toFixed(2))}Cr`;
  }
  if (Math.abs(amount) >= LAKH) {
    return `₹${trimZero((amount / LAKH).toFixed(1))}L`;
  }
  return formatINR(amount);
}

function trimZero(value: string): string {
  return value.replace(/\.0+$/, '');
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

/** "3N / 4D" — the itinerary shorthand Indian travellers read fluently. */
export function nightsLabel(nights: number): string {
  return `${nights}N / ${nights + 1}D`;
}

export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}
