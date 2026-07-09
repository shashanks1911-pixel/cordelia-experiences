import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

const HERO_IMG =
  'https://images.unsplash.com/photo-1559599746-8823b38544c6?auto=format&fit=crop&w=2000&q=80';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

const STATS = [
  { value: '48', label: 'sailings a year' },
  { value: '60k+', label: 'guests hosted' },
  { value: '4.9', label: 'average rating' },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative min-h-svh overflow-hidden bg-ink">
      {/* Photography + sunrise atmosphere */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="img-slot absolute inset-0 scale-105 animate-[heroDrift_26s_ease-in-out_infinite_alternate] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/45" />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              'radial-gradient(90% 60% at 50% 100%, oklch(58% 0.17 40 / 0.38) 0%, oklch(45% 0.12 300 / 0.14) 45%, transparent 75%)',
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="shell relative flex min-h-svh flex-col justify-end pt-28 pb-14 md:pb-20"
      >
        <motion.p variants={rise} className="eyebrow text-gold">
          India’s largest cruise line, reimagined
        </motion.p>

        <h1 id="hero-heading" className="mt-6 max-w-5xl">
          <motion.span
            variants={rise}
            className="font-display block text-[clamp(1.6rem,1rem+2.6vw,2.9rem)] leading-tight font-light text-white/80 italic"
          >
            Don’t book a cruise.
          </motion.span>
          <motion.span
            variants={rise}
            className="font-display mt-2 block text-hero font-medium tracking-tight text-white"
          >
            Book an <em className="sunrise-text not-italic">experience</em>
            <span className="text-gold">.</span>
          </motion.span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Thousands gather every weekend on floating festivals, wellness retreats,
          networking events and unforgettable adventures. The ship is just the venue.
        </motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <Button to="/explore" variant="sunrise" size="lg">
            Explore experiences
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </Button>
          <Button to="/corporate" variant="glass" size="lg">
            Host your event
          </Button>
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-14 flex items-center justify-between gap-6 border-t border-white/12 pt-6"
        >
          <dl className="flex flex-wrap gap-x-10 gap-y-3 text-white">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-medium md:text-3xl">{stat.value}</dd>
                <dd className="mt-0.5 text-xs tracking-wide text-white/55 uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href="#categories"
            aria-label="Scroll to experience categories"
            className="hidden size-11 shrink-0 animate-bob place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 sm:grid"
          >
            <ChevronDown className="size-5" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      <span className="horizon-rule absolute inset-x-0 bottom-0 opacity-90" aria-hidden="true" />
    </section>
  );
}
