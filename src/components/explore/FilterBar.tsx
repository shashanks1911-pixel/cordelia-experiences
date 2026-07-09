import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { ExploreFilters, SortKey } from '../../lib/filter';
import { countActiveFilters } from '../../lib/filter';
import { categories, destinations, months } from '../../lib/data';
import { formatINR } from '../../lib/format';

interface FilterBarProps {
  filters: ExploreFilters;
  onChange: (patch: Partial<ExploreFilters>) => void;
  onReset: () => void;
}

const PRICE_STOPS = [20000, 25000, 30000, 45000];
const NIGHT_STOPS = [2, 3, 4];

const selectClasses =
  'h-10 rounded-full border border-ink/10 bg-white pl-4 pr-8 text-sm font-medium text-ink transition-colors hover:border-ink/30 focus:border-sunset focus:outline-none appearance-none bg-no-repeat bg-[right_0.9rem_center] bg-[length:0.6rem] bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 10 6%27%3E%3Cpath d=%27M1 1l4 4 4-4%27 stroke=%27%23334%27 fill=%27none%27 stroke-width=%271.5%27 stroke-linecap=%27round%27/%3E%3C/svg%3E")]';

export default function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  const active = countActiveFilters(filters);

  return (
    <div className="glass sticky top-16 z-40 border-b border-ink/6 py-4 md:top-[4.5rem]">
      <div className="shell flex flex-col gap-3.5">
        {/* Row 1 — search + selects */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-0 flex-1 basis-64">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/35"
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              placeholder="Search experiences, hosts, ports…"
              aria-label="Search experiences"
              className="h-11 w-full rounded-full border border-ink/10 bg-white pr-4 pl-11 text-sm text-ink placeholder:text-ink/35 focus:border-sunset focus:outline-none"
            />
          </label>

          <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1">
            <select
              value={filters.destination}
              onChange={(event) => onChange({ destination: event.target.value })}
              aria-label="Destination"
              className={selectClasses}
            >
              <option value="all">Any destination</option>
              {destinations.map((destination) => (
                <option key={destination}>{destination}</option>
              ))}
            </select>

            <select
              value={filters.month}
              onChange={(event) => onChange({ month: event.target.value })}
              aria-label="Month"
              className={selectClasses}
            >
              <option value="all">Any dates</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month} 2026
                </option>
              ))}
            </select>

            <select
              value={filters.maxPrice ?? ''}
              onChange={(event) =>
                onChange({ maxPrice: event.target.value ? Number(event.target.value) : null })
              }
              aria-label="Budget"
              className={selectClasses}
            >
              <option value="">Any budget</option>
              {PRICE_STOPS.map((price) => (
                <option key={price} value={price}>
                  Under {formatINR(price)}
                </option>
              ))}
            </select>

            <select
              value={filters.sort}
              onChange={(event) => onChange({ sort: event.target.value as SortKey })}
              aria-label="Sort by"
              className={selectClasses}
            >
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        {/* Row 2 — category + duration chips */}
        <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1">
          <button
            type="button"
            onClick={() => onChange({ category: 'all' })}
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-all ${
              filters.category === 'all'
                ? 'bg-ink text-white shadow-md'
                : 'border border-ink/10 bg-white text-ink/70 hover:border-ink/30'
            }`}
          >
            All scenes
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onChange({ category: filters.category === category.id ? 'all' : category.id })
              }
              aria-pressed={filters.category === category.id}
              className={`h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-all ${
                filters.category === category.id
                  ? 'bg-ink text-white shadow-md'
                  : 'border border-ink/10 bg-white text-ink/70 hover:border-ink/30'
              }`}
            >
              {category.emoji} {category.label}
            </button>
          ))}

          <span className="mx-1 h-6 w-px shrink-0 bg-ink/10" aria-hidden="true" />

          {NIGHT_STOPS.map((nights) => (
            <button
              key={nights}
              type="button"
              onClick={() => onChange({ nights: filters.nights === nights ? null : nights })}
              aria-pressed={filters.nights === nights}
              className={`h-9 shrink-0 rounded-full px-4 font-mono text-xs tracking-wider transition-all ${
                filters.nights === nights
                  ? 'bg-ocean text-white shadow-md'
                  : 'border border-ink/10 bg-white text-ink/60 hover:border-ink/30'
              }`}
            >
              {nights === 4 ? '4N+' : `${nights}N`}
            </button>
          ))}

          {active > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="ml-auto inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-sunset-deep transition-colors hover:bg-sunset/10"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear {active}
            </button>
          )}
          {active === 0 && (
            <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-xs text-ink/35 lg:inline-flex">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Refine your weekend
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
