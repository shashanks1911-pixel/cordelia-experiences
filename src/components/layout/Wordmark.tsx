import { Link } from 'react-router';

interface WordmarkProps {
  tone?: 'auto' | 'light' | 'dark';
}

/**
 * The lockup: Fraunces italic "Cordelia" over a mono "EXPERIENCES" ticker.
 * tone=dark renders for dark surfaces; auto follows the parent's text color.
 */
export default function Wordmark({ tone = 'auto' }: WordmarkProps) {
  const color =
    tone === 'dark' ? 'text-white' : tone === 'light' ? 'text-ink' : 'text-current';
  return (
    <Link to="/" className={`group inline-flex flex-col leading-none ${color}`}>
      <span className="font-display text-[1.45rem] font-medium italic tracking-tight">
        Cordelia
      </span>
      <span className="eyebrow mt-0.5 text-[0.5rem] tracking-[0.42em] opacity-60 transition-opacity group-hover:opacity-100">
        Experiences
      </span>
    </Link>
  );
}
