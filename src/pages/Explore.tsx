import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { experiences } from '../lib/data';
import {
  defaultFilters,
  filterExperiences,
  type ExploreFilters,
  type SortKey,
} from '../lib/filter';
import { pluralize } from '../lib/format';
import FilterBar from '../components/explore/FilterBar';
import ExperienceCard from '../components/explore/ExperienceCard';
import SkeletonCard from '../components/explore/SkeletonCard';
import Button from '../components/ui/Button';

const SKELETON_MS = 380;

function filtersFromParams(params: URLSearchParams): ExploreFilters {
  return {
    query: params.get('q') ?? defaultFilters.query,
    category: (params.get('category') as ExploreFilters['category']) ?? 'all',
    destination: params.get('dest') ?? 'all',
    maxPrice: params.get('max') ? Number(params.get('max')) : null,
    nights: params.get('nights') ? Number(params.get('nights')) : null,
    month: params.get('month') ?? 'all',
    sort: (params.get('sort') as SortKey) ?? 'popular',
  };
}

function paramsFromFilters(filters: ExploreFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.destination !== 'all') params.set('dest', filters.destination);
  if (filters.maxPrice !== null) params.set('max', String(filters.maxPrice));
  if (filters.nights !== null) params.set('nights', String(filters.nights));
  if (filters.month !== 'all') params.set('month', filters.month);
  if (filters.sort !== 'popular') params.set('sort', filters.sort);
  return params;
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);
  const results = useMemo(() => filterExperiences(experiences, filters), [filters]);

  // Brief skeleton shimmer between filter states, like a live marketplace.
  const [settling, setSettling] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSettling(true);
    const timer = setTimeout(() => setSettling(false), SKELETON_MS);
    return () => clearTimeout(timer);
  }, [filters]);

  const update = (patch: Partial<ExploreFilters>) =>
    setSearchParams(paramsFromFilters({ ...filters, ...patch }), { replace: true });

  return (
    <div className="pt-16 md:pt-[4.5rem]">
      <header className="shell pt-12 pb-8 md:pt-16">
        <p className="eyebrow text-sunset-deep">The season calendar</p>
        <h1 className="font-display mt-3 text-display font-medium tracking-tight text-ink">
          Explore experiences
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink/55">
          Every sailing is a complete world — pick yours by scene, port or weekend.
        </p>
      </header>

      <FilterBar
        filters={filters}
        onChange={update}
        onReset={() => setSearchParams(new URLSearchParams(), { replace: true })}
      />

      <section aria-label="Experiences" className="shell py-10 md:py-14">
        <p className="text-sm text-ink/50" role="status">
          {settling ? 'Charting the season…' : `${pluralize(results.length, 'sailing')} · winter 2026`}
        </p>

        {settling ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <motion.div
            key={searchParams.toString()}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.055 } } }}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((experience) => (
              <motion.div
                key={experience.slug}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mx-auto max-w-md py-24 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-sea-tint">
              <Compass className="size-7 text-ocean" aria-hidden="true" />
            </span>
            <h2 className="font-display mt-6 text-2xl font-medium text-ink">
              No sailings match that combination
            </h2>
            <p className="mt-2.5 text-ink/55">
              The season is still growing. Loosen a filter or two — the right
              weekend is probably one port over.
            </p>
            <Button
              variant="outline"
              className="mt-7"
              onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
