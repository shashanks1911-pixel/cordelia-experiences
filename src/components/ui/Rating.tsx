import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  className?: string;
}

export default function Rating({ value, count, className = '' }: RatingProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      <Star className="size-4 fill-gold-deep text-gold-deep" aria-hidden="true" />
      <span className="font-semibold tabular-nums">{value.toFixed(1)}</span>
      {count !== undefined && <span className="opacity-55 tabular-nums">({count})</span>}
    </span>
  );
}
