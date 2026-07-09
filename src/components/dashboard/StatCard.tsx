import { TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}

export default function StatCard({ label, value, delta, hint }: StatCardProps) {
  const positive = delta !== undefined && delta >= 0;
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-ink/6 md:p-6">
      <p className="text-xs font-medium tracking-wide text-ink/50 uppercase">{label}</p>
      <p className="font-display mt-2 text-[1.9rem] leading-none font-medium tracking-tight text-ink md:text-4xl">
        {value}
      </p>
      <p className="mt-3 flex items-center gap-1.5 text-xs">
        {delta !== undefined && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
              positive ? 'bg-[#E8F4EC] text-[#157347]' : 'bg-[#FBEAE4] text-[#B3401B]'
            }`}
          >
            {positive ? (
              <TrendingUp className="size-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="size-3" aria-hidden="true" />
            )}
            {positive ? '+' : ''}
            {delta.toFixed(1)}%
          </span>
        )}
        <span className="text-ink/40">{hint ?? 'vs last 30 days'}</span>
      </p>
    </div>
  );
}
