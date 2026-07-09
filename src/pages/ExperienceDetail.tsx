import { useParams } from 'react-router';
import { ArrowRight, BadgeCheck, CalendarDays, Check, MapPin, Ship } from 'lucide-react';
import { categoryOf, getExperience } from '../lib/data';
import { formatINR, nightsLabel } from '../lib/format';
import Photo from '../components/ui/Photo';
import Rating from '../components/ui/Rating';
import Avatar from '../components/ui/Avatar';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import BookingPass from '../components/detail/BookingPass';
import ScheduleTimeline from '../components/detail/ScheduleTimeline';
import CabinCard from '../components/detail/CabinCard';
import FaqList from '../components/detail/FaqList';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.65rem] font-medium tracking-tight text-ink">{children}</h2>
  );
}

export default function ExperienceDetail() {
  const { slug } = useParams();
  const experience = getExperience(slug);

  if (!experience) {
    return (
      <div className="shell grid min-h-[70vh] place-items-center pt-24 text-center">
        <div>
          <p className="eyebrow text-sunset-deep">Off the charts</p>
          <h1 className="font-display mt-3 text-display font-medium text-ink">
            This sailing doesn’t exist
          </h1>
          <p className="mt-4 text-ink/55">It may have docked for good. The season calendar has everything currently boarding.</p>
          <Button to="/explore" variant="primary" className="mt-8">
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const category = categoryOf(experience.category);
  const bookHref = `/book/${experience.slug}`;

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Immersive hero ── */}
      <section className="relative flex min-h-[68svh] items-end overflow-hidden bg-ink">
        <Photo
          src={experience.hero}
          alt={experience.title}
          width={1800}
          height={1000}
          fetchPriority="high"
          className="absolute inset-0"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/40"
          aria-hidden="true"
        />
        <div className="shell relative pt-32 pb-10 text-white md:pb-14">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
            {category?.emoji} {category?.label} · hosted by {experience.host.name}
          </span>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.2rem,1.2rem+4.5vw,4.5rem)] leading-[1.04] font-medium tracking-tight text-balance">
            {experience.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75 md:text-xl">{experience.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
            <Rating value={experience.rating} count={experience.reviewCount} />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              {experience.dates} · {nightsLabel(experience.nights)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden="true" />
              {experience.route.from} → {experience.route.to}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ship className="size-4" aria-hidden="true" />
              {experience.ship}
            </span>
          </div>
        </div>
        <span className="horizon-rule absolute inset-x-0 bottom-0" aria-hidden="true" />
      </section>

      {/* ── Gallery strip ── */}
      <div className="shell mt-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {experience.gallery.slice(0, 4).map((shot, index) => (
            <Photo
              key={index}
              src={shot}
              alt=""
              loading="lazy"
              width={640}
              height={480}
              className="aspect-4/3 rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="shell mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_384px] lg:gap-16">
        <div className="min-w-0 space-y-16">
          {/* About */}
          <Reveal>
            <section aria-label="About this experience">
              <p className="eyebrow text-sunset-deep">The experience</p>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/75">
                {experience.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl bg-sea-tint/70 px-4 py-3.5 text-sm font-medium text-ink"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ocean/10">
                      <Check className="size-3 text-ocean" aria-hidden="true" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Host */}
          <Reveal>
            <section
              aria-label="Your host"
              className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-white p-6 ring-1 ring-ink/6 md:p-7"
            >
              <div className="flex items-center gap-5">
                <Avatar initials={experience.host.initials} hue={30} size="lg" />
                <div>
                  <p className="flex items-center gap-1.5 font-semibold tracking-tight text-ink">
                    {experience.host.name}
                    {experience.host.verified && (
                      <BadgeCheck className="size-4.5 text-ocean" aria-hidden="true" />
                    )}
                    <span className="sr-only">verified host</span>
                  </p>
                  <p className="text-sm text-ink/55">{experience.host.tagline}</p>
                  <p className="mt-1 font-mono text-xs tracking-wide text-ink/45">
                    {experience.host.eventsHosted} events hosted · ★ {experience.host.rating.toFixed(1)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" to="/corporate">
                Host with Cordelia
              </Button>
            </section>
          </Reveal>

          {/* Schedule */}
          <Reveal>
            <section aria-label="Schedule">
              <SectionTitle>The weekend, hour by hour</SectionTitle>
              <div className="mt-6">
                <ScheduleTimeline schedule={experience.schedule} />
              </div>
            </section>
          </Reveal>

          {/* Included */}
          <Reveal>
            <section aria-label="What's included">
              <SectionTitle>What’s included</SectionTitle>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {experience.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink/75">
                    <Check className="mt-1 size-4 shrink-0 text-ocean" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Cabins */}
          <Reveal>
            <section aria-label="Cabin types">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <SectionTitle>Choose how you sail</SectionTitle>
                <p className="text-sm text-ink/50">All fares are per guest, twin sharing</p>
              </div>
              <div className="mt-6 space-y-4">
                {experience.cabins.map((cabin) => (
                  <CabinCard
                    key={cabin.id}
                    cabin={cabin}
                    bookHref={`${bookHref}?cabin=${cabin.id}`}
                  />
                ))}
              </div>
            </section>
          </Reveal>

          {/* Reviews */}
          <Reveal>
            <section aria-label="Reviews">
              <div className="flex items-end justify-between gap-4">
                <SectionTitle>
                  ★ {experience.rating.toFixed(1)} · {experience.reviewCount} reviews
                </SectionTitle>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {experience.reviews.map((review) => (
                  <figure
                    key={review.name}
                    className="flex h-full flex-col justify-between gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/6"
                  >
                    <blockquote className="text-[0.95rem] leading-relaxed text-ink/75">
                      “{review.text}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <Avatar
                        initials={review.name
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')}
                        hue={review.hue}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">{review.name}</p>
                        <p className="text-xs text-ink/45">
                          {review.date} · ★ {review.rating.toFixed(1)}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>

          {/* FAQs */}
          <Reveal>
            <section aria-label="Frequently asked questions">
              <SectionTitle>Good to know</SectionTitle>
              <div className="mt-6">
                <FaqList faqs={experience.faqs} />
              </div>
            </section>
          </Reveal>
        </div>

        {/* ── Floating boarding pass ── */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <BookingPass experience={experience} />
          </div>
        </div>
      </div>

      {/* ── Mobile floating book bar ── */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 px-5 py-3.5 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-ink/50">
              from{' '}
              <span className="text-lg font-semibold tracking-tight text-ink">
                {formatINR(experience.priceFrom)}
              </span>
            </p>
            <p className="text-[0.7rem] text-ink/45">
              {experience.dates} · {experience.spotsLeft} spots left
            </p>
          </div>
          <Button to={bookHref} variant="sunrise">
            Book now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
