import { Check, CreditCard, Minus, Plus, Smartphone } from 'lucide-react';
import type { Experience } from '../../lib/types';
import type { BookingSelection } from '../../lib/booking';
import { clampGuests, findCabin, toggleAddon } from '../../lib/booking';
import { formatINR } from '../../lib/format';
import Photo from '../ui/Photo';

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
}

export type PayMethod = 'upi' | 'card';

const fieldClasses =
  'h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-[0.95rem] text-ink placeholder:text-ink/30 focus:border-sunset focus:outline-none transition-colors';

/* ── Step 1 · Cabin ─────────────────────────────────────────────── */
export function StepCabin({
  experience,
  selection,
  onChange,
}: {
  experience: Experience;
  selection: BookingSelection;
  onChange: (selection: BookingSelection) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Choose a cabin</legend>
      {experience.cabins.map((cabin) => {
        const soldOut = cabin.left === 0;
        const active = selection.cabinId === cabin.id;
        return (
          <label
            key={cabin.id}
            className={`flex cursor-pointer gap-4 rounded-3xl bg-white p-4 transition-all duration-300 sm:gap-5 sm:p-5 ${
              active
                ? 'shadow-lift ring-2 ring-sunset'
                : 'ring-1 ring-ink/8 hover:ring-ink/25'
            } ${soldOut ? 'cursor-not-allowed opacity-55 saturate-50' : ''}`}
          >
            <input
              type="radio"
              name="cabin"
              value={cabin.id}
              checked={active}
              disabled={soldOut}
              onChange={() =>
                onChange({
                  ...selection,
                  cabinId: cabin.id,
                  guests: clampGuests(selection.guests, cabin),
                })
              }
              className="sr-only"
            />
            <Photo
              src={cabin.image}
              alt=""
              loading="lazy"
              width={320}
              height={240}
              className="hidden aspect-4/3 w-28 shrink-0 rounded-2xl sm:block sm:w-36"
            />
            <span className="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <span>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-medium tracking-tight text-ink">
                    {cabin.name}
                  </span>
                  <span className="shrink-0 text-sm text-ink/45">
                    <span className="text-base font-semibold text-ink">
                      {formatINR(cabin.price)}
                    </span>{' '}
                    / guest
                  </span>
                </span>
                <span className="mt-1 block text-sm text-ink/55">{cabin.blurb}</span>
              </span>
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-ink/45">
                  {cabin.sqft} sq ft · sleeps {cabin.occupancy}
                  {soldOut ? ' · sold out' : cabin.left <= 8 ? ` · only ${cabin.left} left` : ''}
                </span>
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-all ${
                    active ? 'border-sunset bg-sunset text-white' : 'border-ink/20 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="size-3.5" />
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

/* ── Step 2 · Guests ────────────────────────────────────────────── */
export function StepGuests({
  experience,
  selection,
  guest,
  onSelection,
  onGuest,
}: {
  experience: Experience;
  selection: BookingSelection;
  guest: GuestInfo;
  onSelection: (selection: BookingSelection) => void;
  onGuest: (guest: GuestInfo) => void;
}) {
  const cabin = findCabin(experience, selection.cabinId);
  const max = cabin?.occupancy ?? 4;

  const setGuests = (delta: number) =>
    onSelection({ ...selection, guests: clampGuests(selection.guests + delta, cabin) });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-3xl bg-white p-5 ring-1 ring-ink/8 sm:p-6">
        <div>
          <p className="font-medium tracking-tight text-ink">Guests in this cabin</p>
          <p className="mt-0.5 text-sm text-ink/50">
            {cabin ? `${cabin.name} sleeps up to ${max}` : 'Pick a cabin first'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setGuests(-1)}
            disabled={selection.guests <= 1}
            aria-label="Fewer guests"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-ink/40 disabled:opacity-30"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="w-6 text-center text-xl font-semibold text-ink tabular-nums">
            {selection.guests}
          </span>
          <button
            type="button"
            onClick={() => setGuests(1)}
            disabled={selection.guests >= max}
            aria-label="More guests"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-ink/40 disabled:opacity-30"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 ring-1 ring-ink/8 sm:p-6">
        <p className="font-medium tracking-tight text-ink">Lead guest</p>
        <p className="mt-0.5 text-sm text-ink/50">
          The boarding pass and updates go to this person.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              Full name
            </span>
            <input
              type="text"
              value={guest.name}
              onChange={(event) => onGuest({ ...guest, name: event.target.value })}
              placeholder="As on your government ID"
              autoComplete="name"
              className={fieldClasses}
            />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              Email
            </span>
            <input
              type="email"
              value={guest.email}
              onChange={(event) => onGuest({ ...guest, email: event.target.value })}
              placeholder="you@example.com"
              autoComplete="email"
              className={fieldClasses}
            />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              Phone
            </span>
            <input
              type="tel"
              value={guest.phone}
              onChange={(event) => onGuest({ ...guest, phone: event.target.value })}
              placeholder="+91"
              autoComplete="tel"
              className={fieldClasses}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 · Add-ons ───────────────────────────────────────────── */
export function StepAddons({
  experience,
  selection,
  onChange,
}: {
  experience: Experience;
  selection: BookingSelection;
  onChange: (selection: BookingSelection) => void;
}) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="sr-only">Optional add-ons</legend>
      {experience.addons.map((addon) => {
        const active = selection.addonIds.includes(addon.id);
        return (
          <label
            key={addon.id}
            className={`flex h-full cursor-pointer flex-col justify-between gap-4 rounded-3xl bg-white p-5 transition-all duration-300 ${
              active ? 'shadow-lift ring-2 ring-sunset' : 'ring-1 ring-ink/8 hover:ring-ink/25'
            }`}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={() => onChange(toggleAddon(selection, addon.id))}
              className="sr-only"
            />
            <span>
              <span className="flex items-start justify-between gap-3">
                <span className="font-medium tracking-tight text-ink">{addon.name}</span>
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-all ${
                    active ? 'border-sunset bg-sunset text-white' : 'border-ink/20 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="size-3.5" />
                </span>
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-ink/55">
                {addon.blurb}
              </span>
            </span>
            <span className="text-sm font-semibold text-ink">
              {formatINR(addon.price)}
              <span className="ml-1 font-normal text-ink/45">
                {addon.perPerson ? '/ guest' : '/ booking'}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

/* ── Step 4 · Payment ───────────────────────────────────────────── */
export function StepPayment({
  method,
  onMethod,
  upiId,
  onUpiId,
}: {
  method: PayMethod;
  onMethod: (method: PayMethod) => void;
  upiId: string;
  onUpiId: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-ink/8 sm:p-6">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-mist/60 p-1.5" role="tablist">
        {(
          [
            { id: 'upi', label: 'UPI', icon: Smartphone },
            { id: 'card', label: 'Card', icon: CreditCard },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={method === option.id}
            onClick={() => onMethod(option.id)}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all ${
              method === option.id ? 'bg-white text-ink shadow' : 'text-ink/50 hover:text-ink'
            }`}
          >
            <option.icon className="size-4" aria-hidden="true" />
            {option.label}
          </button>
        ))}
      </div>

      {method === 'upi' ? (
        <div className="mt-6">
          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              UPI ID
            </span>
            <input
              type="text"
              value={upiId}
              onChange={(event) => onUpiId(event.target.value)}
              placeholder="yourname@okbank"
              className={fieldClasses}
            />
          </label>
          <p className="mt-3 text-xs leading-relaxed text-ink/45">
            A collect request will arrive in your UPI app. This is a design
            prototype — no payment actually happens.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              Card number
            </span>
            <input type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" className={fieldClasses} />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              Expiry
            </span>
            <input type="text" inputMode="numeric" placeholder="09 / 28" className={fieldClasses} />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase">
              CVV
            </span>
            <input type="password" inputMode="numeric" placeholder="•••" className={fieldClasses} />
          </label>
          <p className="text-xs leading-relaxed text-ink/45 sm:col-span-2">
            This is a design prototype — card fields are decorative and nothing is charged.
          </p>
        </div>
      )}
    </div>
  );
}
