import { ChevronDown } from 'lucide-react';
import type { Faq } from '../../lib/types';

interface FaqListProps {
  faqs: Faq[];
}

export default function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="divide-y divide-ink/6 rounded-3xl bg-white ring-1 ring-ink/6">
      {faqs.map((faq) => (
        <details key={faq.q} className="group px-6 py-5 open:bg-sea-tint/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium tracking-tight text-ink [&::-webkit-details-marker]:hidden">
            {faq.q}
            <ChevronDown
              className="size-4.5 shrink-0 text-ink/40 transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
