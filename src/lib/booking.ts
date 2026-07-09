import type { AddOn, CabinType, Experience } from './types';

export const PORT_CHARGES_PER_GUEST = 1_500;
export const GST_RATE = 0.18;

export interface BookingSelection {
  cabinId: string | null;
  guests: number;
  addonIds: string[];
}

export interface BookingLineItem {
  label: string;
  detail?: string;
  amount: number;
}

export interface BookingQuote {
  lines: BookingLineItem[];
  subtotal: number;
  taxes: number;
  total: number;
}

export const emptySelection: BookingSelection = {
  cabinId: null,
  guests: 2,
  addonIds: [],
};

export function findCabin(experience: Experience, cabinId: string | null): CabinType | null {
  return experience.cabins.find((cabin) => cabin.id === cabinId) ?? null;
}

export function toggleAddon(selection: BookingSelection, addonId: string): BookingSelection {
  const active = selection.addonIds.includes(addonId);
  return {
    ...selection,
    addonIds: active
      ? selection.addonIds.filter((id) => id !== addonId)
      : [...selection.addonIds, addonId],
  };
}

export function clampGuests(guests: number, cabin: CabinType | null): number {
  const max = cabin?.occupancy ?? 4;
  return Math.min(Math.max(guests, 1), max);
}

function addonAmount(addon: AddOn, guests: number): number {
  return addon.perPerson ? addon.price * guests : addon.price;
}

/** Full price breakdown for the boarding pass. Pure — safe to call every render. */
export function quoteBooking(experience: Experience, selection: BookingSelection): BookingQuote {
  const cabin = findCabin(experience, selection.cabinId);
  const guests = clampGuests(selection.guests, cabin);
  const lines: BookingLineItem[] = [];

  if (cabin) {
    lines.push({
      label: cabin.name,
      detail: `${guests} × fare`,
      amount: cabin.price * guests,
    });
  }

  for (const addonId of selection.addonIds) {
    const addon = experience.addons.find((item) => item.id === addonId);
    if (!addon) continue;
    lines.push({
      label: addon.name,
      detail: addon.perPerson ? `${guests} × add-on` : 'per booking',
      amount: addonAmount(addon, guests),
    });
  }

  lines.push({
    label: 'Port charges',
    detail: `${guests} × ports`,
    amount: PORT_CHARGES_PER_GUEST * guests,
  });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const taxes = Math.round(subtotal * GST_RATE);
  return { lines, subtotal, taxes, total: subtotal + taxes };
}
