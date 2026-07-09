import { trafficSources } from '../../lib/dashboard-data';

const SERIES = '#255E92';

export default function TrafficList() {
  const max = Math.max(...trafficSources.map((source) => source.views));
  return (
    <ul className="space-y-4">
      {trafficSources.map((source) => (
        <li key={source.source}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium text-ink">{source.source}</span>
            <span className="font-mono text-xs text-ink/50 tabular-nums">
              {(source.views / 1000).toFixed(1)}k views · {source.conversion.toFixed(1)}% conv.
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-mist">
            <div
              className="h-full rounded-full"
              style={{ width: `${(source.views / max) * 100}%`, background: SERIES }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
