import { describe, expect, test } from 'vitest';
import {
  GST_RATE,
  PORT_CHARGES_PER_GUEST,
  clampGuests,
  emptySelection,
  quoteBooking,
  toggleAddon,
} from './booking';
import { makeExperience } from './testing/fixtures';

const experience = makeExperience();

describe('quoteBooking', () => {
  test('prices cabin fare per guest plus port charges and GST', () => {
    const quote = quoteBooking(experience, { cabinId: 'interior', guests: 2, addonIds: [] });
    const subtotal = 20000 * 2 + PORT_CHARGES_PER_GUEST * 2;
    expect(quote.subtotal).toBe(subtotal);
    expect(quote.taxes).toBe(Math.round(subtotal * GST_RATE));
    expect(quote.total).toBe(subtotal + quote.taxes);
  });

  test('per-person add-ons scale with guests, per-booking add-ons do not', () => {
    const quote = quoteBooking(experience, {
      cabinId: 'interior',
      guests: 2,
      addonIds: ['spa', 'photos'],
    });
    const spa = quote.lines.find((line) => line.label === 'Spa Pass');
    const photos = quote.lines.find((line) => line.label === 'Photo Package');
    expect(spa?.amount).toBe(6000);
    expect(photos?.amount).toBe(5000);
  });

  test('without a cabin only port charges apply', () => {
    const quote = quoteBooking(experience, emptySelection);
    expect(quote.lines).toHaveLength(1);
    expect(quote.lines[0].label).toBe('Port charges');
  });

  test('guests are clamped to cabin occupancy when quoting', () => {
    const quote = quoteBooking(experience, { cabinId: 'interior', guests: 5, addonIds: [] });
    const fare = quote.lines[0];
    expect(fare.amount).toBe(20000 * 2);
  });
});

describe('toggleAddon', () => {
  test('adds then removes without mutating the original', () => {
    const selection = { ...emptySelection };
    const withSpa = toggleAddon(selection, 'spa');
    expect(withSpa.addonIds).toEqual(['spa']);
    expect(selection.addonIds).toEqual([]);
    expect(toggleAddon(withSpa, 'spa').addonIds).toEqual([]);
  });
});

describe('clampGuests', () => {
  test('respects cabin occupancy bounds', () => {
    const suite = experience.cabins[1];
    expect(clampGuests(9, suite)).toBe(4);
    expect(clampGuests(0, suite)).toBe(1);
    expect(clampGuests(3, suite)).toBe(3);
  });
});
