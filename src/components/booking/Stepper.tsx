import { Check } from 'lucide-react';

export const BOOKING_STEPS = ['Cabin', 'Guests', 'Add-ons', 'Payment'] as const;

interface StepperProps {
  current: number; // 0-based; BOOKING_STEPS.length means confirmed
  onJump: (step: number) => void;
}

export default function Stepper({ current, onJump }: StepperProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Booking steps">
      {BOOKING_STEPS.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none">
            <button
              type="button"
              disabled={!done}
              onClick={() => onJump(index)}
              aria-current={active ? 'step' : undefined}
              className={`group flex items-center gap-2.5 rounded-full transition-opacity ${
                done ? 'cursor-pointer hover:opacity-80' : ''
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold transition-all duration-300 ${
                  done
                    ? 'bg-ocean text-white'
                    : active
                      ? 'sunrise-bg text-white shadow-[0_6px_16px_-4px_oklch(58%_0.19_35/0.6)]'
                      : 'bg-mist text-ink/40'
                }`}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : `0${index + 1}`}
              </span>
              <span
                className={`hidden text-sm font-medium tracking-tight sm:block ${
                  active ? 'text-ink' : done ? 'text-ink/60' : 'text-ink/35'
                }`}
              >
                {label}
              </span>
            </button>
            {index < BOOKING_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-0.5 min-w-4 flex-1 rounded-full transition-colors duration-500 ${
                  done ? 'horizon-rule' : 'bg-mist'
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
