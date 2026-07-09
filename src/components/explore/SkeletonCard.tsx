export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card" aria-hidden="true">
      <div className="aspect-4/3 animate-pulse bg-mist" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-mist" />
        <div className="h-3.5 w-full animate-pulse rounded-full bg-mist/70" />
        <div className="flex items-end justify-between pt-3">
          <div className="h-3.5 w-24 animate-pulse rounded-full bg-mist/70" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-mist" />
        </div>
      </div>
    </div>
  );
}
