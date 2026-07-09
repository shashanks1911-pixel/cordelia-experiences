import { ArrowRight, Users } from 'lucide-react';
import type { Experience } from '../../lib/types';
import { formatINR, nightsLabel, percent } from '../../lib/format';
import Button from '../ui/Button';
import Rating from '../ui/Rating';

interface BookingPassProps {
  experience: Experience;
}

/** Vertical barcode built from stripes — no image needed. */
export function Barcode({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-10 ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px, currentColor 11px 14px, transparent 14px 17px)',
      }}
    />
  );
}

export default function BookingPass({ experience }: BookingPassProps) {
  const booked = experience.capacity - experience.spotsLeft;
  const fill = percent(booked, experience.capacity);

  return (
    <aside
      aria-label="Booking"
      className="overflow-hidden rounded-[1.75rem] bg-white shadow-pass ring-1 ring-ink/5"
    >
      {/* Stub header — the route */}
      <div className="bg-ink px-6 pt-5 pb-4 text-white">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-gold">Boarding pass</p>
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-white/50 uppercase">
            {experience.ship}
          </p>
        </div>
        <div className="mt-3 flex items-baseline justify-between font-mono">
          <span className="text-2xl font-semibold tracking-wide">
            {experience.route.code.split(' ')[0]}
          </span>
          <span className="flex-1 overflow-hidden px-3 text-center text-white/40">
            ⚓ ····· {nightsLabel(experience.nights)} ····· ⚓
          </span>
          <span className="text-2xl font-semibold tracking-wide">
            {experience.route.code.split(' ').at(-1)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-white/55">
          <span>{experience.route.from}</span>
          <span>{experience.route.to}</span>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-ink/45 uppercase">Sailing</p>
            <p className="mt-0.5 font-mono text-sm font-medium text-ink">{experience.dates}</p>
          </div>
          <Rating value={experience.rating} count={experience.reviewCount} className="text-ink" />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Users className="size-4 text-ocean" aria-hidden="true" />
              {experience.spotsLeft} spots left
            </span>
            <span className="text-ink/45 tabular-nums">{fill}% booked</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-valuenow={fill}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Capacity booked"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${fill}%`,
                background:
                  'linear-gradient(90deg, var(--color-ocean), var(--color-sunset) 70%, var(--color-gold))',
              }}
            />
          </div>
        </div>

        <span className="perforation relative mt-6 block" aria-hidden="true">
          <span className="absolute top-1/2 -left-[1.85rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
          <span className="absolute top-1/2 -right-[1.85rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
        </span>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-ink/45">from</p>
            <p className="text-3xl font-semibold tracking-tight text-ink">
              {formatINR(experience.priceFrom)}
            </p>
            <p className="mt-0.5 text-xs text-ink/45">per guest · taxes at checkout</p>
          </div>
          <Barcode className="w-24 text-ink/70" />
        </div>

        <Button to={`/book/${experience.slug}`} variant="sunrise" size="lg" className="mt-6 w-full">
          Book now
          <ArrowRight className="size-4.5" aria-hidden="true" />
        </Button>
        <p className="mt-3 text-center text-xs text-ink/40">
          Free cancellation until 30 days before sailing
        </p>
      </div>
    </aside>
  );
}
