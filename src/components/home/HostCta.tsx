import { ArrowRight, BarChart3, Ship, Users } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

const AUDIENCES = ['Festivals', 'Retreats', 'Conferences', 'Corporate offsites', 'Creator meetups'];

const PROPS = [
  {
    icon: Ship,
    title: 'A venue that needs nothing',
    body: 'Stages, theatres, six restaurants and 900 cabins — pre-built. Charter a deck or the whole ship.',
  },
  {
    icon: Users,
    title: 'Your community, undivided',
    body: 'No competing city, no early exits. Everyone you invited, together for the whole weekend.',
  },
  {
    icon: BarChart3,
    title: 'One dashboard for it all',
    body: 'Tickets, cabin allocation, guest lists and revenue — live, in one place, from launch to sail.',
  },
];

export default function HostCta() {
  return (
    <section aria-labelledby="host-heading" className="relative overflow-hidden bg-ink py-section">
      {/* Dawn glow rising behind the panel */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-96 opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, oklch(58% 0.17 40 / 0.5) 0%, oklch(45% 0.12 300 / 0.2) 50%, transparent 80%)',
        }}
      />
      <div className="shell relative">
        <div className="grid items-end gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow text-gold">For organizers</p>
            <h2
              id="host-heading"
              className="font-display mt-4 text-display font-medium tracking-tight text-white"
            >
              Bring your community <em className="sunrise-text">to the sea.</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Cordelia charters put a 2,000-guest venue under your brand. You
              curate the experience — we run the ship, the crew and the weekend.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Event types">
              {AUDIENCES.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/75"
                >
                  {audience}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/corporate" variant="sunrise" size="lg">
                Host your event
                <ArrowRight className="size-4.5" aria-hidden="true" />
              </Button>
              <Button to="/host" variant="glassDark" size="lg">
                See the host dashboard
              </Button>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {PROPS.map((prop, index) => (
              <Reveal key={prop.title} delay={0.1 + index * 0.1}>
                <div className="glass-dark flex gap-5 rounded-3xl p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                    <prop.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-white">{prop.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{prop.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
