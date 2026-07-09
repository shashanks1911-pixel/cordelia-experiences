import { describe, expect, test } from 'vitest';
import { formatINR, formatINRCompact, nightsLabel, percent, pluralize } from './format';

describe('formatINR', () => {
  test('groups digits in Indian style', () => {
    expect(formatINR(24999)).toBe('₹24,999');
    expect(formatINR(1249990)).toBe('₹12,49,990');
  });

  test('drops paise', () => {
    expect(formatINR(999.6)).toBe('₹1,000');
  });
});

describe('formatINRCompact', () => {
  test('formats lakhs', () => {
    expect(formatINRCompact(420_000)).toBe('₹4.2L');
  });

  test('formats crores', () => {
    expect(formatINRCompact(10_800_000)).toBe('₹1.08Cr');
  });

  test('trims trailing zeros', () => {
    expect(formatINRCompact(100_000)).toBe('₹1L');
    expect(formatINRCompact(20_000_000)).toBe('₹2Cr');
  });

  test('falls back to full INR below a lakh', () => {
    expect(formatINRCompact(85_000)).toBe('₹85,000');
  });
});

describe('pluralize', () => {
  test('singular when count is one', () => {
    expect(pluralize(1, 'guest')).toBe('1 guest');
  });

  test('plural otherwise', () => {
    expect(pluralize(4, 'night')).toBe('4 nights');
  });

  test('supports irregular plurals', () => {
    expect(pluralize(2, 'berth', 'berths')).toBe('2 berths');
  });
});

describe('nightsLabel', () => {
  test('renders the N/D shorthand', () => {
    expect(nightsLabel(3)).toBe('3N / 4D');
  });
});

describe('percent', () => {
  test('rounds to whole percent', () => {
    expect(percent(1, 3)).toBe(33);
  });

  test('returns zero when whole is zero', () => {
    expect(percent(5, 0)).toBe(0);
  });
});
