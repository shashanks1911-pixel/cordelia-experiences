import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Home,
  Megaphone,
  Settings,
  Ship,
  Users,
  Wallet,
} from 'lucide-react';
import { dashboardSummary, revenueByWeek } from '../lib/dashboard-data';
import { formatINRCompact } from '../lib/format';
import Wordmark from '../components/layout/Wordmark';
import Avatar from '../components/ui/Avatar';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import CabinSalesBars from '../components/dashboard/CabinSalesBars';
import OccupancyMeters from '../components/dashboard/OccupancyMeters';
import GuestTable from '../components/dashboard/GuestTable';
import AssetGrid from '../components/dashboard/AssetGrid';
import TrafficList from '../components/dashboard/TrafficList';

const NAV = [
  { icon: Home, label: 'Overview', active: true },
  { icon: Ship, label: 'Events', active: false },
  { icon: Users, label: 'Guests', active: false },
  { icon: Wallet, label: 'Payouts', active: false },
  { icon: Megaphone, label: 'Marketing', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const RANGES = [
  { id: '4w', label: '4 weeks', weeks: 4 },
  { id: '8w', label: '8 weeks', weeks: 8 },
  { id: 'season', label: 'Full season', weeks: revenueByWeek.length },
] as const;

function Panel({
  title,
  hint,
  children,
  className = '',
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl bg-white p-5 ring-1 ring-ink/6 md:p-6 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-semibold tracking-tight text-ink">{title}</h2>
        {hint && <p className="text-xs text-ink/40">{hint}</p>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function HostDashboard() {
  const [range, setRange] = useState<(typeof RANGES)[number]['id']>('season');
  const weeks = RANGES.find((option) => option.id === range)!.weeks;
  const revenueSlice = revenueByWeek.slice(-weeks);

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[15.5rem_1fr]">
      {/* ── Sidebar ── */}
      <aside className="hidden border-r border-ink/6 bg-white lg:flex lg:flex-col">
        <div className="px-6 pt-6 pb-5">
          <Wordmark tone="light" />
          <p className="eyebrow mt-1.5 text-[0.55rem] text-ink/35">Host studio</p>
        </div>
        <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-ink text-white shadow-md'
                  : 'text-ink/55 hover:bg-sea-tint hover:text-ink'
              }`}
            >
              <item.icon className="size-4.5" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-ink/6 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-sea-tint/70 p-3">
            <Avatar initials="SC" hue={285} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">Sundowner Collective</p>
              <p className="text-xs text-ink/45">Verified host</p>
            </div>
          </div>
          <Link
            to="/"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium text-ink/45 transition-colors hover:bg-sea-tint hover:text-ink"
          >
            Back to Cordelia.com
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="min-w-0">
        {/* Top bar */}
        <header className="glass sticky top-0 z-40 border-b border-ink/6">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 md:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Wordmark tone="light" />
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <label className="sr-only" htmlFor="event-select">
                Event
              </label>
              <select
                id="event-select"
                className="h-10 max-w-72 appearance-none truncate rounded-full border border-ink/10 bg-white px-4 pr-8 text-sm font-medium text-ink hover:border-ink/30 focus:outline-none"
                defaultValue={dashboardSummary.event}
              >
                <option>{dashboardSummary.event}</option>
                <option>Sundowner NYE · Dec 30 – Jan 2</option>
                <option>Sundowner Classics · Feb 2027</option>
              </select>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F4EC] px-3 py-1.5 text-xs font-semibold text-[#157347]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#157347]" aria-hidden="true" />
                On sale
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-2 font-mono text-xs text-ink/60 sm:inline-flex">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {dashboardSummary.dates}
              </span>
              <span className="sunrise-bg inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-md">
                <Ship className="size-3.5" aria-hidden="true" />
                {dashboardSummary.daysToSail} days to sail
              </span>
            </div>
          </div>
        </header>

        <main className="space-y-5 p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-sunset-deep">Overview</p>
              <h1 className="font-display mt-1 text-3xl font-medium tracking-tight text-ink">
                {dashboardSummary.event}
              </h1>
            </div>
            {/* Range filter — one row above the charts */}
            <div className="flex rounded-full border border-ink/10 bg-white p-1" role="tablist" aria-label="Date range">
              {RANGES.map((option) => (
                <button
                  key={option.id}
                  role="tab"
                  aria-selected={range === option.id}
                  onClick={() => setRange(option.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    range === option.id ? 'bg-ink text-white shadow' : 'text-ink/50 hover:text-ink'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatCard
              label="Gross revenue"
              value={formatINRCompact(dashboardSummary.revenue)}
              delta={dashboardSummary.revenueDeltaPct}
            />
            <StatCard
              label="Bookings"
              value={dashboardSummary.bookings.toLocaleString('en-IN')}
              delta={dashboardSummary.bookingsDeltaPct}
            />
            <StatCard
              label="Ship occupancy"
              value={`${dashboardSummary.occupancyPct}%`}
              hint={`${dashboardSummary.bookings} of ${dashboardSummary.capacity} berths`}
            />
            <StatCard
              label="Page conversion"
              value={`${dashboardSummary.conversionPct}%`}
              hint={`${(dashboardSummary.pageViews / 1000).toFixed(0)}k page views`}
            />
          </div>

          {/* Charts */}
          <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <Panel title="Booking revenue" hint={`weekly · last ${weeks} weeks`}>
              <RevenueChart data={revenueSlice} />
            </Panel>
            <Panel title="Occupancy by deck" hint="Empress side elevation">
              <OccupancyMeters />
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-sea-tint/70 px-4 py-3 text-xs text-ink/60">
                <BarChart3 className="size-4 shrink-0 text-ocean" aria-hidden="true" />
                Suites are {`${Math.round((57 / 64) * 100)}%`} sold — consider releasing the two holdback suites.
              </p>
            </Panel>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <Panel title="Ticket sales by cabin" hint="berths sold vs. inventory">
              <CabinSalesBars />
            </Panel>
            <Panel title="Where guests come from" hint="last 30 days">
              <TrafficList />
            </Panel>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <Panel title="Latest bookings" hint="live guest list">
              <GuestTable />
            </Panel>
            <Panel title="Marketing assets" hint="on-brand, ready to post">
              <AssetGrid />
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
}
