import { describe, expect, test } from 'vitest';
import { countActiveFilters, defaultFilters, filterExperiences, sortExperiences } from './filter';
import { makeExperience } from './testing/fixtures';

const goaFest = makeExperience({
  slug: 'goa-fest',
  title: 'Sundowner Festival',
  category: 'music',
  priceFrom: 27999,
  nights: 3,
  month: 'Aug',
  rating: 4.9,
  popularity: 98,
  route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
});
const wellness = makeExperience({
  slug: 'wellness',
  title: 'Wellness Retreat',
  category: 'wellness',
  priceFrom: 32999,
  nights: 4,
  month: 'Sep',
  rating: 5.0,
  popularity: 80,
  route: { from: 'Mumbai', to: 'Lakshadweep', code: 'BOM ⚓ LKS' },
});
const comedy = makeExperience({
  slug: 'comedy',
  title: 'Comedy at Sea',
  category: 'comedy',
  priceFrom: 18499,
  nights: 2,
  month: 'Aug',
  rating: 4.7,
  popularity: 91,
  route: { from: 'Mumbai', to: 'High Seas', code: 'BOM ⚓ SEA' },
});
const all = [goaFest, wellness, comedy];

describe('filterExperiences', () => {
  test('returns everything on default filters, sorted by popularity', () => {
    const result = filterExperiences(all, defaultFilters);
    expect(result.map((e) => e.slug)).toEqual(['goa-fest', 'comedy', 'wellness']);
  });

  test('matches query against title, host and destination', () => {
    expect(filterExperiences(all, { ...defaultFilters, query: 'sundowner' })).toHaveLength(1);
    expect(filterExperiences(all, { ...defaultFilters, query: 'lakshadweep' })).toHaveLength(1);
    expect(filterExperiences(all, { ...defaultFilters, query: 'zzz' })).toHaveLength(0);
  });

  test('filters by category, destination, price and month', () => {
    expect(filterExperiences(all, { ...defaultFilters, category: 'comedy' })[0].slug).toBe(
      'comedy',
    );
    expect(filterExperiences(all, { ...defaultFilters, destination: 'Goa' })).toHaveLength(1);
    expect(filterExperiences(all, { ...defaultFilters, maxPrice: 20000 })).toHaveLength(1);
    expect(filterExperiences(all, { ...defaultFilters, month: 'Sep' })[0].slug).toBe('wellness');
  });

  test('nights bucket 4 means four nights or longer', () => {
    expect(filterExperiences(all, { ...defaultFilters, nights: 4 })[0].slug).toBe('wellness');
    expect(filterExperiences(all, { ...defaultFilters, nights: 2 })[0].slug).toBe('comedy');
  });
});

describe('sortExperiences', () => {
  test('sorts by price both directions and by rating', () => {
    expect(sortExperiences(all, 'price-asc')[0].slug).toBe('comedy');
    expect(sortExperiences(all, 'price-desc')[0].slug).toBe('wellness');
    expect(sortExperiences(all, 'rating')[0].slug).toBe('wellness');
  });

  test('does not mutate the input array', () => {
    const input = [...all];
    sortExperiences(input, 'price-asc');
    expect(input.map((e) => e.slug)).toEqual(['goa-fest', 'wellness', 'comedy']);
  });
});

describe('countActiveFilters', () => {
  test('counts only non-default fields', () => {
    expect(countActiveFilters(defaultFilters)).toBe(0);
    expect(
      countActiveFilters({ ...defaultFilters, query: 'goa', maxPrice: 25000, nights: 3 }),
    ).toBe(3);
  });
});
