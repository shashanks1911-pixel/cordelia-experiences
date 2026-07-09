interface AvatarProps {
  initials: string;
  hue?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'size-9 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
};

/** Initials avatar tinted by a stable hue — no fake profile photos. */
export default function Avatar({ initials, hue = 245, size = 'md', className = '' }: AvatarProps) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-mono font-semibold tracking-wide ${SIZES[size]} ${className}`}
      style={{
        background: `oklch(93% 0.045 ${hue})`,
        color: `oklch(38% 0.09 ${hue})`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
