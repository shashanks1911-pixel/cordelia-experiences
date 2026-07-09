import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="shell grid min-h-[80vh] place-items-center pt-24 pb-16 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-sea-tint">
          <Compass className="size-7 text-ocean" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-8 text-sunset-deep">404 · Uncharted waters</p>
        <h1 className="font-display mt-3 text-display font-medium tracking-tight text-ink">
          This page drifted off the map
        </h1>
        <p className="mt-4 text-ink/55">
          The link may be old, or the tide moved it. Every sailing currently
          boarding is on the season calendar.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/explore" variant="primary">
            Explore experiences
          </Button>
          <Button to="/" variant="outline">
            Back home
          </Button>
        </div>
      </div>
    </div>
  );
}
