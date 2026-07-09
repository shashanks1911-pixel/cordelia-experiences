import { occupancyByDeck } from '../../lib/dashboard-data';
import { percent } from '../../lib/format';

const SERIES = '#255E92';
const NEAR_FULL = '#9C7420';
const FULL_THRESHOLD = 90;

/** Ship decks stacked top-down, like a side elevation of the Empress. */
export default function OccupancyMeters() {
  return (
    <ul className="space-y-4">
      {occupancyByDeck.map((deck) => {
        const fill = percent(deck.occupied, deck.total);
        const nearlyFull = fill >= FULL_THRESHOLD;
        return (
          <li key={deck.deck} className="flex items-center gap-3">
            <span className="w-8 shrink-0 font-mono text-xs font-semibold text-ink/45">
              {deck.deck}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <span className="truncate text-ink/60">{deck.label}</span>
                <span className="font-mono text-ink/45 tabular-nums">
                  {fill}%{nearlyFull ? ' · nearly full' : ''}
                </span>
              </div>
              <div
                className="mt-1.5 h-2.5 rounded-full bg-mist"
                role="meter"
                aria-valuenow={fill}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${deck.label}: ${fill}% occupied`}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${fill}%`, background: nearlyFull ? NEAR_FULL : SERIES }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
