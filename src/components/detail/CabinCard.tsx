import { Link } from 'react-router';
import { Check, Maximize2, Users } from 'lucide-react';
import type { CabinType } from '../../lib/types';
import { formatINR } from '../../lib/format';
import Photo from '../ui/Photo';

interface CabinCardProps {
  cabin: CabinType;
  bookHref: string;
}

export default function CabinCard({ cabin, bookHref }: CabinCardProps) {
  const soldOut = cabin.left === 0;

  return (
    <article
      className={`card-lift flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/6 sm:flex-row ${
        soldOut ? 'opacity-70 saturate-50' : ''
      }`}
    >
      <div className="relative sm:w-56 lg:w-64">
        <Photo
          src={cabin.image}
          alt={cabin.name}
          loading="lazy"
          width={512}
          height={384}
          className="aspect-16/9 h-full sm:aspect-auto"
        />
        {cabin.left > 0 && cabin.left <= 8 && (
          <span className="absolute top-3 left-3 rounded-full bg-sunset px-2.5 py-1 text-xs font-semibold text-white shadow">
            Only {cabin.left} left
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5 md:p-6">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-medium tracking-tight text-ink">
              {cabin.name}
            </h3>
            <p className="text-sm text-ink/45">
              <span className="text-lg font-semibold tracking-tight text-ink">
                {formatINR(cabin.price)}
              </span>{' '}
              / guest
            </p>
          </div>
          <p className="mt-1 text-sm text-ink/55">{cabin.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="size-3.5" aria-hidden="true" />
              {cabin.sqft} sq ft
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" aria-hidden="true" />
              sleeps {cabin.occupancy}
            </span>
          </div>
          <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
            {cabin.perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                <Check className="size-3.5 text-ocean" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {soldOut ? (
          <p className="font-mono text-xs tracking-[0.2em] text-ink/40 uppercase">Sold out</p>
        ) : (
          <Link
            to={bookHref}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-ocean transition-colors hover:text-sunset-deep"
          >
            Select this cabin →
          </Link>
        )}
      </div>
    </article>
  );
}
