import { Link } from 'react-router';
import { CalendarDays, Flame } from 'lucide-react';
import type { Experience } from '../../lib/types';
import { formatINR, nightsLabel } from '../../lib/format';
import { categoryOf } from '../../lib/data';
import Photo from '../ui/Photo';
import Rating from '../ui/Rating';

interface ExperienceCardProps {
  experience: Experience;
  hero?: boolean;
}

const FEW_SPOTS = 50;

export default function ExperienceCard({ experience, hero = false }: ExperienceCardProps) {
  const category = categoryOf(experience.category);
  const scarce = experience.spotsLeft <= FEW_SPOTS;

  return (
    <Link
      to={`/experience/${experience.slug}`}
      className="card-lift group block overflow-hidden rounded-3xl bg-white shadow-card"
    >
      <div className={`relative overflow-hidden ${hero ? 'aspect-16/10' : 'aspect-4/3'}`}>
        <Photo
          src={experience.hero}
          alt={experience.title}
          loading="lazy"
          width={hero ? 1200 : 640}
          height={hero ? 750 : 480}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="glass-dark rounded-full px-3 py-1.5 text-xs font-medium text-white">
            {category?.emoji} {category?.label}
          </span>
          {scarce && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sunset px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <Flame className="size-3.5" aria-hidden="true" />
              {experience.spotsLeft} spots left
            </span>
          )}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <CalendarDays className="size-4" aria-hidden="true" />
            {experience.dates}
          </span>
          <span className="glass-dark rounded-full px-3 py-1 font-mono text-xs tracking-wider">
            {nightsLabel(experience.nights)}
          </span>
        </div>
      </div>

      <div className={hero ? 'p-6 md:p-7' : 'p-5'}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-display font-medium tracking-tight text-ink ${
              hero ? 'text-2xl md:text-[1.7rem]' : 'text-xl'
            }`}
          >
            {experience.title}
          </h3>
          <Rating value={experience.rating} className="mt-1 shrink-0 text-ink" />
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/55">
          {experience.tagline}
        </p>
        <div className="mt-4 flex items-end justify-between border-t border-ink/6 pt-4">
          <div className="text-sm text-ink/55">
            <span className="font-mono text-xs tracking-wider uppercase">
              {experience.route.code}
            </span>
            <p className="mt-0.5">by {experience.host.name}</p>
          </div>
          <p className="text-right">
            <span className="block text-xs text-ink/45">from</span>
            <span className="text-lg font-semibold tracking-tight text-ink">
              {formatINR(experience.priceFrom)}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
