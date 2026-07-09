import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { experiences, featuredExperiences } from '../../lib/data';
import ExperienceCard from '../explore/ExperienceCard';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function FeaturedBento() {
  const [headliner, ...rest] = featuredExperiences;
  const moreCount = experiences.length - featuredExperiences.length;

  return (
    <section aria-labelledby="featured-heading" className="bg-sea-tint/60 py-section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Boarding soon"
            title={<span id="featured-heading">This season’s headliners</span>}
            sub="Four sailings everyone is talking about — each one a complete world for a weekend."
          />
          <Link
            to="/explore"
            className="group mb-2 hidden items-center gap-1.5 text-sm font-medium text-ocean transition-colors hover:text-sunset-deep md:inline-flex"
          >
            View all experiences
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="md:col-span-2">
            <ExperienceCard experience={headliner} hero />
          </Reveal>
          {rest.map((experience, index) => (
            <Reveal key={experience.slug} delay={0.06 + index * 0.06} className="h-full">
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
          <Reveal delay={0.24} className="h-full">
            <Link
              to="/explore"
              className="card-lift sunrise-bg group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-3xl p-6 text-white md:p-7"
            >
              <span
                className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-125"
                aria-hidden="true"
              />
              <p className="eyebrow text-white/70">And beyond</p>
              <div>
                <p className="font-display text-3xl leading-snug font-medium tracking-tight text-balance md:text-4xl">
                  {moreCount}+ more sailings this season
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/85">
                  Explore the full calendar
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
