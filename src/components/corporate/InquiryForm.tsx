import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../ui/Button';

interface Inquiry {
  name: string;
  email: string;
  company: string;
  size: string;
  month: string;
  brief: string;
}

const EMPTY: Inquiry = { name: '', email: '', company: '', size: '', month: '', brief: '' };
const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const fieldClasses =
  'h-12 w-full rounded-2xl border border-ink/10 bg-white px-4 text-[0.95rem] text-ink placeholder:text-ink/30 focus:border-gold-deep focus:outline-none transition-colors';
const labelClasses = 'mb-1.5 block text-xs font-medium tracking-wide text-ink/55 uppercase';

export default function InquiryForm() {
  const [form, setForm] = useState<Inquiry>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (patch: Partial<Inquiry>) => setForm((current) => ({ ...current, ...patch }));

  const errors = {
    name: form.name.trim().length < 2 ? 'Add your name' : null,
    email: EMAIL_PATTERN.test(form.email) ? null : 'Use a work email',
    company: form.company.trim().length < 2 ? 'Add your company' : null,
    size: form.size ? null : 'Pick a team size',
  };
  const valid = Object.values(errors).every((error) => error === null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (valid) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-[1.75rem] bg-white p-10 text-center shadow-pass">
        <span className="sunrise-bg mx-auto grid size-14 place-items-center rounded-full text-white">
          <Check className="size-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="font-display mt-6 text-2xl font-medium tracking-tight text-ink">
          Brief received, {form.name.split(' ')[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/55">
          A charter director will reach out to {form.email} within one business
          day with dates, decks and a first budget for {form.company}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.75rem] bg-white p-6 shadow-pass md:p-8">
      <p className="eyebrow text-sunset-deep">Charter inquiry</p>
      <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-ink">
        Tell us what you’re planning
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className={labelClasses}>Your name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => set({ name: event.target.value })}
            placeholder="Full name"
            autoComplete="name"
            className={fieldClasses}
          />
          {touched && errors.name && <span className="mt-1 block text-xs text-sunset-deep">{errors.name}</span>}
        </label>
        <label>
          <span className={labelClasses}>Work email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => set({ email: event.target.value })}
            placeholder="you@company.com"
            autoComplete="email"
            className={fieldClasses}
          />
          {touched && errors.email && <span className="mt-1 block text-xs text-sunset-deep">{errors.email}</span>}
        </label>
        <label>
          <span className={labelClasses}>Company</span>
          <input
            type="text"
            value={form.company}
            onChange={(event) => set({ company: event.target.value })}
            placeholder="Company or community"
            autoComplete="organization"
            className={fieldClasses}
          />
          {touched && errors.company && (
            <span className="mt-1 block text-xs text-sunset-deep">{errors.company}</span>
          )}
        </label>
        <label>
          <span className={labelClasses}>Team size</span>
          <select
            value={form.size}
            onChange={(event) => set({ size: event.target.value })}
            className={`${fieldClasses} appearance-none`}
          >
            <option value="">Select…</option>
            <option>25 – 100</option>
            <option>100 – 400</option>
            <option>400 – 1,000</option>
            <option>Full charter · 2,000</option>
          </select>
          {touched && errors.size && <span className="mt-1 block text-xs text-sunset-deep">{errors.size}</span>}
        </label>
        <label className="sm:col-span-2">
          <span className={labelClasses}>Rough timing</span>
          <select
            value={form.month}
            onChange={(event) => set({ month: event.target.value })}
            className={`${fieldClasses} appearance-none`}
          >
            <option value="">Flexible</option>
            <option>Q3 2026 (Aug – Sep)</option>
            <option>Q4 2026 (Oct – Dec)</option>
            <option>Q1 2027 (Jan – Mar)</option>
          </select>
        </label>
        <label className="sm:col-span-2">
          <span className={labelClasses}>The brief</span>
          <textarea
            value={form.brief}
            onChange={(event) => set({ brief: event.target.value })}
            placeholder="Offsite? Kickoff? 300 people, three nights, one unforgettable all-hands…"
            rows={3}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/30 transition-colors focus:border-gold-deep focus:outline-none"
          />
        </label>
      </div>

      <Button variant="sunrise" size="lg" className="mt-6 w-full">
        Request a charter proposal
        <ArrowRight className="size-4.5" aria-hidden="true" />
      </Button>
      <p className="mt-3 text-center text-xs text-ink/40">
        No commitment — you’ll get dates, decks and a budget range first.
      </p>
    </form>
  );
}
