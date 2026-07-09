/** Mock analytics for the host dashboard — Sundowner Collective's view. */

export interface WeekPoint {
  week: string;
  revenue: number;
  bookings: number;
}

/** Twelve weeks of booking revenue, ₹. Shape: launch spike → steady → date-announcement surge. */
export const revenueByWeek: WeekPoint[] = [
  { week: 'Apr 13', revenue: 1_240_000, bookings: 38 },
  { week: 'Apr 20', revenue: 2_860_000, bookings: 92 },
  { week: 'Apr 27', revenue: 2_140_000, bookings: 71 },
  { week: 'May 4', revenue: 1_680_000, bookings: 54 },
  { week: 'May 11', revenue: 1_920_000, bookings: 63 },
  { week: 'May 18', revenue: 2_380_000, bookings: 79 },
  { week: 'May 25', revenue: 2_050_000, bookings: 66 },
  { week: 'Jun 1', revenue: 2_710_000, bookings: 88 },
  { week: 'Jun 8', revenue: 3_340_000, bookings: 109 },
  { week: 'Jun 15', revenue: 2_980_000, bookings: 97 },
  { week: 'Jun 22', revenue: 3_890_000, bookings: 128 },
  { week: 'Jun 29', revenue: 4_420_000, bookings: 143 },
];

export interface CabinSales {
  cabin: string;
  sold: number;
  total: number;
  revenue: number;
}

/** Berth inventory released for this charter: totals match occupancyByDeck (1,476). */
export const salesByCabin: CabinSales[] = [
  { cabin: 'Interior', sold: 512, total: 572, revenue: 14_780_000 },
  { cabin: 'Ocean View', sold: 374, total: 460, revenue: 14_020_000 },
  { cabin: 'Balcony', sold: 341, total: 380, revenue: 16_540_000 },
  { cabin: 'Suite', sold: 57, total: 64, revenue: 4_280_000 },
];

export interface DeckOccupancy {
  deck: string;
  label: string;
  occupied: number;
  total: number;
}

export const occupancyByDeck: DeckOccupancy[] = [
  { deck: 'D9', label: 'Deck 9 · Suites', occupied: 57, total: 64 },
  { deck: 'D8', label: 'Deck 8 · Balcony', occupied: 178, total: 190 },
  { deck: 'D7', label: 'Deck 7 · Balcony', occupied: 163, total: 190 },
  { deck: 'D6', label: 'Deck 6 · Ocean View', occupied: 201, total: 230 },
  { deck: 'D5', label: 'Deck 5 · Ocean View & Interior', occupied: 286, total: 350 },
  { deck: 'D4', label: 'Deck 4 · Interior', occupied: 399, total: 520 },
];

export interface Guest {
  name: string;
  cabin: string;
  guests: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'waitlist';
  bookedOn: string;
}

export const recentGuests: Guest[] = [
  { name: 'Meher Contractor', cabin: 'Balcony · B-812', guests: 2, amount: 96_558, status: 'confirmed', bookedOn: 'Jul 8' },
  { name: 'Aditya Rao', cabin: 'Suite · S-901', guests: 4, amount: 3_54_412, status: 'confirmed', bookedOn: 'Jul 8' },
  { name: 'Tanvi Desai', cabin: 'Interior · I-407', guests: 2, amount: 68_312, status: 'pending', bookedOn: 'Jul 7' },
  { name: 'Karan Malhotra', cabin: 'Ocean View · O-633', guests: 3, amount: 1_32_540, status: 'confirmed', bookedOn: 'Jul 7' },
  { name: 'Ira Bakshi', cabin: 'Balcony · B-704', guests: 2, amount: 98_244, status: 'confirmed', bookedOn: 'Jul 6' },
  { name: 'Dev Chandra', cabin: 'Interior · I-512', guests: 1, amount: 34_156, status: 'waitlist', bookedOn: 'Jul 6' },
];

export interface MarketingAsset {
  name: string;
  kind: 'Poster' | 'Reel' | 'Email' | 'Story';
  size: string;
  downloads: number;
}

export const marketingAssets: MarketingAsset[] = [
  { name: 'Lineup announcement — 4:5', kind: 'Poster', size: '2.4 MB', downloads: 1_240 },
  { name: 'Sunset teaser — 15s', kind: 'Reel', size: '18 MB', downloads: 862 },
  { name: 'Early-bird closing — email', kind: 'Email', size: '640 KB', downloads: 431 },
  { name: 'Sunrise stage — 9:16', kind: 'Story', size: '3.1 MB', downloads: 1_876 },
];

export interface TrafficSource {
  source: string;
  views: number;
  conversion: number;
}

export const trafficSources: TrafficSource[] = [
  { source: 'Instagram', views: 148_200, conversion: 2.4 },
  { source: 'Direct & WhatsApp', views: 63_400, conversion: 4.1 },
  { source: 'Cordelia Explore', views: 51_800, conversion: 3.2 },
  { source: 'YouTube', views: 22_100, conversion: 1.1 },
];

export const dashboardSummary = {
  event: 'Sundowner: DJ Festival at Sea',
  dates: 'Sep 4 – 7, 2026',
  revenue: 49_620_000,
  revenueDeltaPct: 18.4,
  bookings: 1_284,
  bookingsDeltaPct: 12.1,
  capacity: 1_800,
  releasedBerths: 1_476,
  occupancyPct: 87,
  pageViews: 285_500,
  conversionPct: 2.9,
  daysToSail: 57,
};
