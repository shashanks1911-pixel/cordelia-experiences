import {
  Award,
  Handshake,
  Megaphone,
  Presentation,
  Rocket,
  Users,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import InquiryForm from '../components/corporate/InquiryForm';

const OFFERINGS = [
  {
    icon: Rocket,
    title: 'Leadership retreats',
    body: 'Forty leaders, zero interruptions. Strategy runs deeper when the room has a horizon.',
  },
  {
    icon: Megaphone,
    title: 'Sales kickoffs',
    body: 'Launch the year with a stage, a spotlight and a team that can’t drift back to their desks.',
  },
  {
    icon: Award,
    title: 'Reward trips',
    body: 'The President’s Club they’ll actually brag about — suites, sunsets and white-glove everything.',
  },
  {
    icon: Presentation,
    title: 'Conferences',
    body: 'A 900-seat theatre, breakout decks and six restaurants — your agenda, pre-rigged.',
  },
  {
    icon: Handshake,
    title: 'Networking summits',
    body: 'Curated introductions that outlast the weekend, engineered by proximity.',
  },
  {
    icon: Users,
    title: 'Team building',
    body: 'Regattas, treasure hunts and deck olympiads. Forced fun, minus the forced.',
  },
];

const STATS = [
  { value: '2,000', label: 'guests, full charter' },
  { value: '11', label: 'event decks & venues' },
  { value: '6', label: 'restaurants on board' },
  { value: '0', label: 'guests leaving early' },
];

const CLIENTS = ['NIMBUS', 'KITE CAPITAL', 'AROHA LABS', 'VELOCITY', 'MERIDIAN', 'PALKHI'];

export default function Corporate() {
  return (
    <div className="bg-ink text-white">
      {/* ── Hero ── */}
      <section aria-labelledby="corporate-heading" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(70% 55% at 78% 88%, oklch(58% 0.17 40 / 0.34) 0%, oklch(45% 0.12 300 / 0.16) 45%, transparent 78%)',
          }}
        />
        <div className="shell relative flex min-h-[88svh] flex-col justify-center pt-32 pb-20">
          <Reveal>
            <p className="eyebrow text-gold">Cordelia for business</p>
            <h1
              id="corporate-heading"
              className="font-display mt-5 max-w-4xl text-hero font-medium tracking-tight text-balance"
            >
              Your next offsite deserves <em className="sunrise-text">an ocean.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
              Charter a deck — or the whole ship. A venue with cabins for 2,000,
              a theatre, restaurants and open water, run by a crew that has done
              this hundreds of times.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="sunrise" size="lg" onClick={() => scrollToForm()}>
                Plan your charter
              </Button>
              <Button to="/host" variant="glass" size="lg" className="text-white!">
                See the host dashboard
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/12 pt-8 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1.5 text-sm text-white/50">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <span className="horizon-rule absolute inset-x-0 bottom-0 opacity-70" aria-hidden="true" />
      </section>

      {/* ── Offerings ── */}
      <section aria-labelledby="offerings-heading" className="py-section">
        <div className="shell">
          <SectionHeading
            tone="dark"
            eyebrow="What teams sail for"
            title={<span id="offerings-heading">One ship, every kind of offsite</span>}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((offering, index) => (
              <Reveal key={offering.title} delay={index * 0.06} className="h-full">
                <article className="glass-dark card-lift flex h-full flex-col gap-4 rounded-3xl p-6 md:p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-white/8 text-gold">
                    <offering.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{offering.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{offering.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="eyebrow mt-20 text-center text-white/35">
              Trusted by teams at
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {CLIENTS.map((client) => (
                <li
                  key={client}
                  className="font-mono text-sm tracking-[0.3em] text-white/35 transition-colors hover:text-gold"
                >
                  {client}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── How it works + form ── */}
      <section aria-labelledby="charter-heading" className="relative pb-section">
        <div className="shell grid items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow text-gold">The charter path</p>
            <h2
              id="charter-heading"
              className="font-display mt-4 text-display font-medium tracking-tight"
            >
              From brief to boarding in three moves
            </h2>
            <ol className="mt-10 space-y-8">
              {[
                {
                  title: 'Tell us the brief',
                  body: 'Headcount, dates, ambition. One call is usually enough.',
                },
                {
                  title: 'We design the sailing',
                  body: 'Decks, staging, menus, cabins and the run-of-show — priced as one line item.',
                },
                {
                  title: 'You board with your team',
                  body: 'Our crew runs the venue. Your only job is the content — and the sunset toast.',
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="font-mono text-sm font-semibold text-gold">0{index + 1}</span>
                  <div className="border-l border-white/10 pl-5">
                    <h3 className="font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/55">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="charter-form" className="scroll-mt-28">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function scrollToForm() {
  document.getElementById('charter-form')?.scrollIntoView({ behavior: 'smooth' });
}
