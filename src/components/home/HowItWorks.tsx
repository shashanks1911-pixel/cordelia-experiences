import { Anchor, Sparkles, Ticket } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const STEPS = [
  {
    icon: Ticket,
    title: 'Choose an experience',
    body: 'Pick the weekend, not the cabin. Festivals, retreats, summits — every sailing is a complete programme with its own crowd.',
  },
  {
    icon: Anchor,
    title: 'Board the cruise',
    body: 'One terminal, one wristband, zero logistics. Your cabin, your shows and your dinners are all two decks apart.',
  },
  {
    icon: Sparkles,
    title: 'Live the weekend',
    body: 'No last metro, no parking, no going home early. The venue sails with you until Monday.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          align="center"
          title={<span id="how-heading">Three steps to open water</span>}
        />

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Nautical route line connecting the steps */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-ocean/25 md:block"
          />
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.12}>
              <li className="relative flex flex-col items-center text-center">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-ink text-white shadow-lift">
                  <step.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="eyebrow mt-5 text-sunset-deep">Leg {`0${index + 1}`}</span>
                <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink/55">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
