import type { CategoryId, Experience } from './types';

export type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export interface ExploreFilters {
  query: string;
  category: CategoryId | 'all';
  destination: string;
  maxPrice: number | null;
  nights: number | null;
  month: string;
  sort: SortKey;
}

export const defaultFilters: ExploreFilters = {
  query: '',
  category: 'all',
  destination: 'all',
  maxPrice: null,
  nights: null,
  month: 'all',
  sort: 'popular',
};

export function countActiveFilters(filters: ExploreFilters): number {
  let count = 0;
  if (filters.query.trim()) count += 1;
  if (filters.category !== 'all') count += 1;
  if (filters.destination !== 'all') count += 1;
  if (filters.maxPrice !== null) count += 1;
  if (filters.nights !== null) count += 1;
  if (filters.month !== 'all') count += 1;
  return count;
}

function matchesQuery(experience: Experience, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    experience.title,
    experience.tagline,
    experience.host.name,
    experience.route.to,
    experience.category,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

function matchesNights(experience: Experience, nights: number | null): boolean {
  if (nights === null) return true;
  // Bucket 4 means "4 nights and longer" — the explore UI's last duration chip.
  if (nights >= 4) return experience.nights >= 4;
  return experience.nights === nights;
}

export function filterExperiences(
  experiences: Experience[],
  filters: ExploreFilters,
): Experience[] {
  const filtered = experiences.filter(
    (experience) =>
      matchesQuery(experience, filters.query) &&
      (filters.category === 'all' || experience.category === filters.category) &&
      (filters.destination === 'all' || experience.route.to === filters.destination) &&
      (filters.maxPrice === null || experience.priceFrom <= filters.maxPrice) &&
      (filters.month === 'all' || experience.month === filters.month) &&
      matchesNights(experience, filters.nights),
  );
  return sortExperiences(filtered, filters.sort);
}

export function sortExperiences(experiences: Experience[], sort: SortKey): Experience[] {
  const sorted = [...experiences];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    case 'price-desc':
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popular':
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}
