import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../lib/data';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function CategoryRow() {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="py-section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Eight scenes, one ship"
            title={
              <span id="categories-heading">
                What kind of weekend <em className="sunrise-text-deep">are you?</em>
              </span>
            }
          />
          <Link
            to="/explore"
            className="group mb-2 hidden items-center gap-1.5 text-sm font-medium text-ocean transition-colors hover:text-sunset-deep md:inline-flex"
          >
            Browse everything
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <Link
                to={`/explore?category=${category.id}`}
                className="card-lift group flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink/6 bg-white p-5 md:p-6"
              >
                <span className="flex items-start justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl bg-sea-tint text-2xl transition-transform duration-500 group-hover:scale-110 md:size-14 md:text-[1.7rem]"
                    aria-hidden="true"
                  >
                    {category.emoji}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-ink/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sunset-deep"
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-ink">
                    {category.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink/50">{category.tagline}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
