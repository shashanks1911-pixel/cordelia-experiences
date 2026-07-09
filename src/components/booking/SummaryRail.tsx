import type { Experience } from '../../lib/types';
import type { BookingQuote, BookingSelection } from '../../lib/booking';
import { findCabin } from '../../lib/booking';
import { formatINR, nightsLabel, pluralize } from '../../lib/format';
import { Barcode } from '../detail/BookingPass';

interface SummaryRailProps {
  experience: Experience;
  selection: BookingSelection;
  quote: BookingQuote;
}

export default function SummaryRail({ experience, selection, quote }: SummaryRailProps) {
  const cabin = findCabin(experience, selection.cabinId);

  return (
    <aside
      aria-label="Booking summary"
      className="overflow-hidden rounded-[1.75rem] bg-white shadow-pass ring-1 ring-ink/5"
    >
      <div className="bg-ink px-6 pt-5 pb-4 text-white">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-gold">Your weekend</p>
          <p className="font-mono text-[0.65rem] tracking-[0.25em] text-white/50 uppercase">
            {nightsLabel(experience.nights)}
          </p>
        </div>
        <p className="font-display mt-2 text-xl leading-snug font-medium tracking-tight">
          {experience.title}
        </p>
        <p className="mt-1 font-mono text-xs text-white/55">
          {experience.route.code} · {experience.dates}
        </p>
      </div>

      <div className="px-6 py-5">
        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-ink/55">Cabin</dt>
            <dd className="text-right font-medium text-ink">
              {cabin ? cabin.name : 'Not selected yet'}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink/55">Guests</dt>
            <dd className="font-medium text-ink">{pluralize(selection.guests, 'guest')}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-ink/55">Add-ons</dt>
            <dd className="font-medium text-ink">
              {selection.addonIds.length > 0 ? selection.addonIds.length : 'None'}
            </dd>
          </div>
        </dl>

        <span className="perforation relative mt-5 block" aria-hidden="true">
          <span className="absolute top-1/2 -left-[1.85rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
          <span className="absolute top-1/2 -right-[1.85rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
        </span>

        <dl className="mt-5 space-y-2 text-sm">
          {quote.lines.map((line) => (
            <div key={line.label} className="flex justify-between gap-3">
              <dt className="text-ink/55">
                {line.label}
                {line.detail && <span className="ml-1.5 text-xs text-ink/35">{line.detail}</span>}
              </dt>
              <dd className="font-medium text-ink tabular-nums">{formatINR(line.amount)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-3 text-ink/55">
            <dt>GST (18%)</dt>
            <dd className="tabular-nums">{formatINR(quote.taxes)}</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-end justify-between border-t border-ink/8 pt-4">
          <div>
            <p className="text-xs text-ink/45">Total</p>
            <p className="text-2xl font-semibold tracking-tight text-ink tabular-nums">
              {formatINR(quote.total)}
            </p>
          </div>
          <Barcode className="w-20 text-ink/60" />
        </div>
      </div>
    </aside>
  );
}
