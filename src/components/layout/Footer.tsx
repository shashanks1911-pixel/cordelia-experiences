import { Link } from 'react-router';
import { Anchor } from 'lucide-react';
import Wordmark from './Wordmark';

const COLUMNS = [
  {
    title: 'Experiences',
    links: [
      { label: 'Explore all', to: '/explore' },
      { label: 'Music at sea', to: '/explore?category=music' },
      { label: 'Wellness retreats', to: '/explore?category=wellness' },
      { label: 'Founder cruises', to: '/explore?category=corporate' },
    ],
  },
  {
    title: 'Hosts',
    links: [
      { label: 'Host your event', to: '/corporate' },
      { label: 'Host dashboard', to: '/host' },
      { label: 'Corporate offsites', to: '/corporate' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Cordelia', to: '/' },
      { label: 'The Empress', to: '/' },
      { label: 'Safety at sea', to: '/' },
      { label: 'Careers', to: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell py-16 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Wordmark tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              The cruise is the venue. Festivals, retreats and gatherings on
              open water — sailing from Mumbai, Kochi and Chennai.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="eyebrow text-gold">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <span className="horizon-rule mt-14 block opacity-60" aria-hidden="true" />

        <div className="mt-7 flex flex-col items-start justify-between gap-4 text-xs text-white/40 sm:flex-row sm:items-center">
          <p className="inline-flex items-center gap-2">
            <Anchor className="size-3.5" aria-hidden="true" />
            © 2026 Cordelia Cruises · Waterways Leisure Tourism Pvt. Ltd.
          </p>
          <p className="font-mono tracking-widest uppercase">
            MUM · GOA · KOC · LKS · CHE
          </p>
        </div>
      </div>
    </footer>
  );
}
