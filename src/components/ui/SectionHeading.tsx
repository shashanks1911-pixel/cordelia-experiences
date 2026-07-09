import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`eyebrow ${dark ? 'text-gold' : 'text-sunset-deep'}`}>{eyebrow}</p>
      <h2
        className={`font-display mt-4 text-display font-medium tracking-tight text-balance ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-ink/60'}`}>
          {sub}
        </p>
      )}
      <span
        className={`horizon-rule mt-7 block w-24 ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
    </Reveal>
  );
}
