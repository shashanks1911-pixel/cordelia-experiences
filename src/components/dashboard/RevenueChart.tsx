import { useMemo, useRef, useState } from 'react';
import type { WeekPoint } from '../../lib/dashboard-data';
import { formatINR, formatINRCompact } from '../../lib/format';

const W = 720;
const H = 250;
const PAD = { top: 14, right: 14, bottom: 30, left: 52 };
const SERIES = '#255E92';

interface RevenueChartProps {
  data: WeekPoint[];
}

/** Single-series revenue area chart with crosshair + tooltip. */
export default function RevenueChart({ data }: RevenueChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { points, ticks, yMax } = useMemo(() => {
    const rawMax = Math.max(...data.map((point) => point.revenue));
    const step = 1_000_000;
    const max = Math.ceil((rawMax * 1.08) / step) * step;
    const x = (index: number) =>
      PAD.left + (index / (data.length - 1)) * (W - PAD.left - PAD.right);
    const y = (value: number) => PAD.top + (1 - value / max) * (H - PAD.top - PAD.bottom);
    return {
      yMax: max,
      points: data.map((point, index) => ({ ...point, x: x(index), y: y(point.revenue) })),
      ticks: [0.25, 0.5, 0.75, 1].map((fraction) => ({
        value: max * fraction,
        y: y(max * fraction),
      })),
    };
  }, [data]);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${points.at(-1)!.x},${H - PAD.bottom} L${points[0].x},${H - PAD.bottom} Z`;

  const onMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((point, index) => {
      const distance = Math.abs(point.x - px);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setHover(nearest);
  };

  const active = hover === null ? null : points[hover];

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Weekly booking revenue, ${data.length} weeks, peaking at ${formatINRCompact(yMax)}`}
        className="w-full"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES} stopOpacity="0.22" />
            <stop offset="100%" stopColor={SERIES} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Recessive grid + y labels */}
        {ticks.map((tick) => (
          <g key={tick.value}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={tick.y}
              y2={tick.y}
              stroke="oklch(24% 0.055 250 / 0.07)"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8}
              y={tick.y + 3.5}
              textAnchor="end"
              className="fill-ink/40 font-mono text-[10px]"
            >
              {formatINRCompact(tick.value)}
            </text>
          </g>
        ))}

        {/* x labels — every other week */}
        {points.map(
          (point, index) =>
            index % 2 === 0 && (
              <text
                key={point.week}
                x={point.x}
                y={H - 8}
                textAnchor="middle"
                className="fill-ink/40 font-mono text-[10px]"
              >
                {point.week}
              </text>
            ),
        )}

        <path d={areaPath} fill="url(#revFill)" />
        <path d={linePath} fill="none" stroke={SERIES} strokeWidth="2" strokeLinejoin="round" />

        {active && (
          <g>
            <line
              x1={active.x}
              x2={active.x}
              y1={PAD.top}
              y2={H - PAD.bottom}
              stroke="oklch(24% 0.055 250 / 0.18)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={active.x} cy={active.y} r="4.5" fill={SERIES} stroke="white" strokeWidth="2" />
          </g>
        )}

        {/* Wide hit area */}
        <rect x="0" y="0" width={W} height={H} fill="transparent" />
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl bg-ink px-3.5 py-2.5 text-white shadow-lift"
          style={{
            left: `${(active.x / W) * 100}%`,
            top: `${(active.y / H) * 100 - 4}%`,
            transform: 'translate(-50%, -100%)',
          }}
          role="status"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.18em] text-white/55 uppercase">
            Week of {active.week}
          </p>
          <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatINR(active.revenue)}</p>
          <p className="text-xs text-white/60 tabular-nums">{active.bookings} bookings</p>
        </div>
      )}

      <details className="mt-3">
        <summary className="cursor-pointer font-mono text-[0.65rem] tracking-[0.18em] text-ink/40 uppercase transition-colors hover:text-ink/70">
          View as table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-96 text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs text-ink/45 uppercase">
                <th className="py-2 pr-4 font-medium">Week</th>
                <th className="py-2 pr-4 font-medium">Revenue</th>
                <th className="py-2 font-medium">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point) => (
                <tr key={point.week} className="border-b border-ink/5">
                  <td className="py-1.5 pr-4 font-mono text-xs">{point.week}</td>
                  <td className="py-1.5 pr-4 tabular-nums">{formatINR(point.revenue)}</td>
                  <td className="py-1.5 tabular-nums">{point.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
