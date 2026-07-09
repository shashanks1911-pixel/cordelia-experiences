import { useState } from 'react';
import { salesByCabin } from '../../lib/dashboard-data';
import { formatINRCompact, percent } from '../../lib/format';

const SERIES = '#255E92';

/** Horizontal magnitude bars — one measure, one hue, direct labels. */
export default function CabinSalesBars() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <ul className="space-y-5">
      {salesByCabin.map((row) => {
        const fill = percent(row.sold, row.total);
        const active = hover === row.cabin;
        return (
          <li
            key={row.cabin}
            onPointerEnter={() => setHover(row.cabin)}
            onPointerLeave={() => setHover(null)}
          >
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-ink">{row.cabin}</span>
              <span className="text-xs text-ink/50 tabular-nums">
                {active
                  ? `${row.sold} of ${row.total} berths · ${fill}%`
                  : `${row.sold} sold · ${formatINRCompact(row.revenue)}`}
              </span>
            </div>
            <div
              className="mt-2 h-3 rounded-full bg-mist"
              role="meter"
              aria-valuenow={row.sold}
              aria-valuemin={0}
              aria-valuemax={row.total}
              aria-label={`${row.cabin}: ${row.sold} of ${row.total} sold`}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${fill}%`,
                  background: SERIES,
                  opacity: hover === null || active ? 1 : 0.45,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
