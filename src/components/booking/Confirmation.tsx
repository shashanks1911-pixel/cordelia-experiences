import { motion } from 'motion/react';
import { CalendarPlus, Check, Download } from 'lucide-react';
import type { Experience } from '../../lib/types';
import type { BookingQuote, BookingSelection } from '../../lib/booking';
import { findCabin } from '../../lib/booking';
import { formatINR, nightsLabel, pluralize } from '../../lib/format';
import { Barcode } from '../detail/BookingPass';
import Button from '../ui/Button';

interface ConfirmationProps {
  experience: Experience;
  selection: BookingSelection;
  quote: BookingQuote;
  guestName: string;
  bookingId: string;
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Confirmation({
  experience,
  selection,
  quote,
  guestName,
  bookingId,
}: ConfirmationProps) {
  const cabin = findCabin(experience, selection.cabinId);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      className="mx-auto max-w-lg pb-16 text-center"
    >
      <motion.span
        variants={{
          hidden: { scale: 0.4, opacity: 0 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { type: 'spring', stiffness: 260, damping: 18 },
          },
        }}
        className="sunrise-bg mx-auto grid size-16 place-items-center rounded-full text-white shadow-lift"
      >
        <Check className="size-8" strokeWidth={3} aria-hidden="true" />
      </motion.span>

      <motion.h1
        variants={rise}
        className="font-display mt-6 text-3xl font-medium tracking-tight text-ink md:text-4xl"
      >
        You’re on board{guestName ? `, ${guestName.split(' ')[0]}` : ''}.
      </motion.h1>
      <motion.p variants={rise} className="mt-3 text-ink/55">
        Your boarding pass is below and on its way to your inbox. See you at
        the terminal — gates open two hours before sailing.
      </motion.p>

      {/* The boarding pass */}
      <motion.div
        variants={rise}
        className="mt-10 overflow-hidden rounded-[1.75rem] text-left shadow-pass ring-1 ring-ink/5"
      >
        <div className="sunrise-bg animate-drift px-7 pt-6 pb-5 text-white">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-white/80">Cordelia boarding pass</p>
            <p className="font-mono text-xs tracking-[0.2em]">{bookingId}</p>
          </div>
          <p className="font-display mt-3 text-2xl leading-snug font-medium tracking-tight">
            {experience.title}
          </p>
          <div className="mt-4 flex items-baseline justify-between font-mono">
            <span className="text-3xl font-semibold tracking-wide">
              {experience.route.code.split(' ')[0]}
            </span>
            <span className="flex-1 px-4 text-center text-sm text-white/70">
              ⚓ ····· {nightsLabel(experience.nights)} ····· ⚓
            </span>
            <span className="text-3xl font-semibold tracking-wide">
              {experience.route.code.split(' ').at(-1)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-white/75">
            <span>{experience.route.from}</span>
            <span>{experience.route.to}</span>
          </div>
        </div>

        <div className="bg-white px-7 py-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-xs tracking-wide text-ink/45 uppercase">Guest</dt>
              <dd className="mt-0.5 font-medium text-ink">{guestName || 'Lead guest'}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-ink/45 uppercase">Sailing</dt>
              <dd className="mt-0.5 font-medium text-ink">{experience.dates}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-ink/45 uppercase">Cabin</dt>
              <dd className="mt-0.5 font-medium text-ink">
                {cabin?.name} · {pluralize(selection.guests, 'guest')}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-ink/45 uppercase">Paid</dt>
              <dd className="mt-0.5 font-semibold text-ink tabular-nums">
                {formatINR(quote.total)}
              </dd>
            </div>
          </dl>

          <span className="perforation relative mt-6 block" aria-hidden="true">
            <span className="absolute top-1/2 -left-[2.1rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
            <span className="absolute top-1/2 -right-[2.1rem] size-5 -translate-y-1/2 rounded-full bg-surface shadow-inner" />
          </span>

          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="font-mono text-[0.65rem] leading-relaxed tracking-[0.2em] text-ink/40 uppercase">
              {experience.ship}
              <br />
              Gate M4 · Deck 5
            </p>
            <Barcode className="w-36 text-ink" />
          </div>
        </div>
      </motion.div>

      <motion.div variants={rise} className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" size="sm">
          <Download className="size-4" aria-hidden="true" />
          Save pass
        </Button>
        <Button variant="outline" size="sm">
          <CalendarPlus className="size-4" aria-hidden="true" />
          Add to calendar
        </Button>
        <Button to="/explore" variant="primary" size="sm">
          Explore more weekends
        </Button>
      </motion.div>
    </motion.div>
  );
}
