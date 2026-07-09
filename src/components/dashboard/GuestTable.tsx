import { CheckCircle2, Clock3, CircleDashed } from 'lucide-react';
import { recentGuests, type Guest } from '../../lib/dashboard-data';
import { formatINR } from '../../lib/format';
import Avatar from '../ui/Avatar';

const STATUS: Record<Guest['status'], { label: string; className: string; icon: typeof Clock3 }> = {
  confirmed: { label: 'Confirmed', className: 'bg-[#E8F4EC] text-[#157347]', icon: CheckCircle2 },
  pending: { label: 'Pending', className: 'bg-[#FBF3E0] text-[#92600A]', icon: Clock3 },
  waitlist: { label: 'Waitlist', className: 'bg-mist text-ink/55', icon: CircleDashed },
};

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export default function GuestTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead>
          <tr className="border-b border-ink/8 text-xs tracking-wide text-ink/45 uppercase">
            <th className="py-3 pr-4 font-medium">Guest</th>
            <th className="py-3 pr-4 font-medium">Cabin</th>
            <th className="py-3 pr-4 font-medium">Party</th>
            <th className="py-3 pr-4 font-medium">Amount</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 font-medium">Booked</th>
          </tr>
        </thead>
        <tbody>
          {recentGuests.map((guest, index) => {
            const status = STATUS[guest.status];
            return (
              <tr
                key={guest.name}
                className="border-b border-ink/5 transition-colors last:border-0 hover:bg-sea-tint/50"
              >
                <td className="py-3 pr-4">
                  <span className="flex items-center gap-3">
                    <Avatar initials={initialsOf(guest.name)} hue={(index * 47 + 20) % 360} size="sm" />
                    <span className="font-medium text-ink">{guest.name}</span>
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-ink/60">{guest.cabin}</td>
                <td className="py-3 pr-4 text-ink/60 tabular-nums">{guest.guests}</td>
                <td className="py-3 pr-4 font-medium text-ink tabular-nums">
                  {formatINR(guest.amount)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
                  >
                    <status.icon className="size-3.5" aria-hidden="true" />
                    {status.label}
                  </span>
                </td>
                <td className="py-3 font-mono text-xs text-ink/45">{guest.bookedOn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
