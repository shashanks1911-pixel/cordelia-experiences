import { testimonials } from '../../lib/data';
import Avatar from '../ui/Avatar';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="From the deck"
          align="center"
          title={<span id="testimonials-heading">People don’t review the cabin</span>}
          sub="They review the weekend. Hosts and guests on what changes when the venue leaves the shore."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1} className="h-full">
              <figure className="card-lift flex h-full flex-col justify-between gap-8 rounded-3xl border border-ink/6 bg-white p-7 md:p-8">
                <blockquote>
                  <span
                    className="font-display block text-5xl leading-none text-coral"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p className="font-display mt-2 text-[1.35rem] leading-snug font-light tracking-tight text-ink">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-4 border-t border-ink/6 pt-5">
                  <Avatar initials={initialsOf(testimonial.name)} hue={testimonial.hue} />
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight text-ink">{testimonial.name}</p>
                    <p className="truncate text-sm text-ink/50">{testimonial.role}</p>
                    <p className="eyebrow mt-1 text-[0.58rem] text-sunset-deep">
                      {testimonial.experience}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
