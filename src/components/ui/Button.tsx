import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

type Variant = 'primary' | 'sunrise' | 'ghost' | 'glass' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink text-white hover:bg-ink-soft shadow-[0_8px_24px_-8px_oklch(24%_0.055_250/0.5)]',
  sunrise:
    'sunrise-bg text-white shadow-[0_10px_28px_-8px_oklch(58%_0.19_35/0.65)] hover:shadow-[0_14px_34px_-8px_oklch(58%_0.19_35/0.8)] hover:brightness-[1.06]',
  ghost: 'text-ink hover:bg-ink/5',
  glass: 'glass text-ink hover:bg-white/90',
  outline: 'border border-ink/15 text-ink hover:border-ink/40 hover:bg-white',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-[0.95rem] gap-2',
  lg: 'h-13 px-8 text-base gap-2.5',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center rounded-full font-medium tracking-tight',
    'transition-all duration-300 active:scale-[0.97] select-none whitespace-nowrap',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
