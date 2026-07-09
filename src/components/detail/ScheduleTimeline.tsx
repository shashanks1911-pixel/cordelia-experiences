import { useState } from 'react';
import type { DayPlan } from '../../lib/types';

interface ScheduleTimelineProps {
  schedule: DayPlan[];
}

export default function ScheduleTimeline({ schedule }: ScheduleTimelineProps) {
  const [activeDay, setActiveDay] = useState(0);
  const current = schedule[activeDay];

  return (
    <div>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="tablist">
        {schedule.map((plan, index) => (
          <button
            key={plan.day}
            role="tab"
            aria-selected={index === activeDay}
            onClick={() => setActiveDay(index)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              index === activeDay
                ? 'bg-ink text-white shadow-md'
                : 'border border-ink/10 bg-white text-ink/60 hover:border-ink/30'
            }`}
          >
            Day {plan.day}
            <span className="ml-2 hidden font-normal opacity-60 sm:inline">{plan.title}</span>
          </button>
        ))}
      </div>

      <ol className="mt-7 space-y-0">
        {current.items.map((item, index) => (
          <li key={item.title} className="relative flex gap-5 pb-7 last:pb-0">
            {index < current.items.length - 1 && (
              <span
                className="absolute top-3 left-[3.65rem] h-full border-l-2 border-dashed border-ocean/20"
                aria-hidden="true"
              />
            )}
            <span className="w-16 shrink-0 pt-0.5 text-right font-mono text-xs leading-5 font-medium tracking-wide text-sunset-deep">
              {item.time}
            </span>
            <span
              className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-ocean ring-4 ring-surface"
              aria-hidden="true"
            />
            <div className="min-w-0 -mt-0.5">
              <p className="font-medium tracking-tight text-ink">{item.title}</p>
              {item.detail && (
                <p className="mt-1 text-sm leading-relaxed text-ink/55">{item.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
