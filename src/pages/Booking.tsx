import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Loader2, Lock, X } from 'lucide-react';
import { getExperience } from '../lib/data';
import {
  emptySelection,
  quoteBooking,
  type BookingSelection,
} from '../lib/booking';
import { formatINR } from '../lib/format';
import Wordmark from '../components/layout/Wordmark';
import Stepper, { BOOKING_STEPS } from '../components/booking/Stepper';
import SummaryRail from '../components/booking/SummaryRail';
import Confirmation from '../components/booking/Confirmation';
import {
  StepAddons,
  StepCabin,
  StepGuests,
  StepPayment,
  type GuestInfo,
  type PayMethod,
} from '../components/booking/steps';
import Button from '../components/ui/Button';

const PAY_DELAY_MS = 1_400;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const STEP_TITLES = [
  'Choose how you sail',
  'Who’s coming aboard',
  'Make it yours',
  'Confirm & pay',
];

const CONTINUE_LABELS = ['Continue to guests', 'Continue to add-ons', 'Continue to payment'];

export default function Booking() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const experience = getExperience(slug);

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<BookingSelection>(() => ({
    ...emptySelection,
    cabinId:
      experience?.cabins.find((cabin) => cabin.id === searchParams.get('cabin') && cabin.left > 0)
        ?.id ?? null,
  }));
  const [guest, setGuest] = useState<GuestInfo>({ name: '', email: '', phone: '' });
  const [payMethod, setPayMethod] = useState<PayMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const bookingId = useMemo(
    () => `CDL-${String(Math.floor(1000 + Math.random() * 9000))}-${String(Math.floor(10 + Math.random() * 90))}`,
    [],
  );

  if (!experience) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-6 text-center">
        <div>
          <h1 className="font-display text-3xl font-medium text-ink">Sailing not found</h1>
          <Button to="/explore" variant="primary" className="mt-6">
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const quote = quoteBooking(experience, selection);
  const confirmed = step === BOOKING_STEPS.length;

  const canProceed = [
    selection.cabinId !== null,
    guest.name.trim().length > 1 && EMAIL_PATTERN.test(guest.email),
    true,
    payMethod === 'card' || upiId.includes('@'),
  ][step];

  const goNext = () => {
    if (step < BOOKING_STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(BOOKING_STEPS.length);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, PAY_DELAY_MS);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Checkout chrome */}
      <header className="glass sticky top-0 z-50 border-b border-ink/6">
        <div className="shell flex h-16 items-center justify-between text-ink">
          <Wordmark />
          <p className="hidden items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.2em] text-ink/45 uppercase sm:inline-flex">
            <Lock className="size-3.5" aria-hidden="true" />
            Secure checkout
          </p>
          <Link
            to={`/experience/${experience.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Exit</span>
          </Link>
        </div>
      </header>

      <main className="shell pt-8 pb-24 md:pt-12">
        {confirmed ? (
          <Confirmation
            experience={experience}
            selection={selection}
            quote={quote}
            guestName={guest.name}
            bookingId={bookingId}
          />
        ) : (
          <>
            <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
              <Stepper current={step} onJump={setStep} />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_384px] lg:gap-14">
              <div className="mx-auto w-full max-w-3xl lg:mx-0">
                <p className="eyebrow text-sunset-deep">
                  Step 0{step + 1} · {BOOKING_STEPS[step]}
                </p>
                <h1 className="font-display mt-2 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                  {STEP_TITLES[step]}
                </h1>
                <p className="mt-2 text-ink/55">
                  {experience.title} · {experience.dates}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-8"
                  >
                    {step === 0 && (
                      <StepCabin
                        experience={experience}
                        selection={selection}
                        onChange={setSelection}
                      />
                    )}
                    {step === 1 && (
                      <StepGuests
                        experience={experience}
                        selection={selection}
                        guest={guest}
                        onSelection={setSelection}
                        onGuest={setGuest}
                      />
                    )}
                    {step === 2 && (
                      <StepAddons
                        experience={experience}
                        selection={selection}
                        onChange={setSelection}
                      />
                    )}
                    {step === 3 && (
                      <StepPayment
                        method={payMethod}
                        onMethod={setPayMethod}
                        upiId={upiId}
                        onUpiId={setUpiId}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Mobile running total */}
                <p className="mt-6 flex items-center justify-between rounded-2xl bg-sea-tint/70 px-5 py-3.5 text-sm lg:hidden">
                  <span className="text-ink/55">Total so far</span>
                  <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">
                    {formatINR(quote.total)}
                  </span>
                </p>

                <div className="mt-8 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <Button variant="ghost" onClick={() => setStep(step - 1)}>
                      <ArrowLeft className="size-4" aria-hidden="true" />
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button
                    variant="sunrise"
                    size="lg"
                    disabled={!canProceed || processing}
                    onClick={goNext}
                    className={!canProceed || processing ? 'cursor-not-allowed opacity-50' : ''}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="size-4.5 animate-spin" aria-hidden="true" />
                        Confirming with the ship…
                      </>
                    ) : step === BOOKING_STEPS.length - 1 ? (
                      <>Pay {formatINR(quote.total)}</>
                    ) : (
                      <>
                        {CONTINUE_LABELS[step]}
                        <ArrowRight className="size-4.5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <SummaryRail experience={experience} selection={selection} quote={quote} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
