import type {
  AddOn,
  CabinType,
  Category,
  DayPlan,
  Experience,
  Faq,
  Review,
  Testimonial,
} from './types';

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ── Shared photography ─────────────────────────────────────────── */
const SHOTS = {
  ship: img('1548574505-5e239809ee19', 1600),
  pool: img('1561501900-3701fa6a0864'),
  horizon: img('1507525428034-b723cf961d3e', 1600),
  dinner: img('1414235077428-338989a2e8c0'),
  cocktail: img('1551024709-8f23befc6f87'),
  sunset: img('1495954484750-af469f2f9be5', 1600),
  goa: img('1512343879784-a960bf40e7f2'),
  lagoon: img('1505228395891-9a51e7e86bf6'),
  talk: img('1475721027785-f74eccf877e2'),
  crowd: img('1470229722913-7c0e2dbbafd3', 1600),
  lights: img('1533174072545-7a4b6ad7a6c3', 1600),
  zen: img('1545389336-cf090694435e'),
  dance: img('1516450360452-9312f5e86fc7'),
};

const CABIN_SHOTS = {
  interior: img('1611892440504-42a792e24d32', 800),
  oceanView: img('1582719478250-c89cae4dc85b', 800),
  balcony: img('1590490360182-c33d57733427', 800),
  suite: img('1578683010236-d716f9a3f461', 800),
};

/* ── Categories ─────────────────────────────────────────────────── */
export const categories: Category[] = [
  { id: 'music', label: 'Music', emoji: '🎵', tagline: 'Festivals on open water', image: SHOTS.crowd },
  { id: 'corporate', label: 'Corporate', emoji: '💼', tagline: 'Offsites & summits', image: img('1556761175-b413da4baf72') },
  { id: 'comedy', label: 'Comedy', emoji: '😂', tagline: 'Headliners at sea', image: img('1516280440614-37939bbacd81') },
  { id: 'singles', label: 'Singles', emoji: '❤️', tagline: 'Meet-cutes, not swipes', image: img('1529156069898-49953e39b3ac') },
  { id: 'wellness', label: 'Wellness', emoji: '🧘', tagline: 'Retreats with a horizon', image: img('1506126613408-eca07ce68773') },
  { id: 'luxury', label: 'Luxury', emoji: '🍷', tagline: 'Food, wine & white glove', image: SHOTS.dinner },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧', tagline: 'Weekends they’ll retell', image: img('1511895426328-dc8714191300') },
  { id: 'adventure', label: 'Adventure', emoji: '📸', tagline: 'Expeditions & open decks', image: img('1452587925148-ce544e77e70d') },
];

/* ── Factories ──────────────────────────────────────────────────── */
const to999 = (value: number) => Math.max(500, Math.round(value / 500) * 500) - 1;

function makeCabins(base: number, soldOutTier: number | null = null): CabinType[] {
  const tiers = [
    {
      id: 'interior',
      name: 'Interior',
      blurb: 'Quiet, cocooned, and two decks from everything.',
      sqft: 150,
      occupancy: 2,
      perks: ['Queen or twin beds', '24×7 room service', 'Smart TV'],
      multiplier: 1,
      left: 26,
      image: CABIN_SHOTS.interior,
    },
    {
      id: 'ocean-view',
      name: 'Ocean View',
      blurb: 'A porthole full of the Arabian Sea.',
      sqft: 180,
      occupancy: 3,
      perks: ['Picture window', 'Seating nook', 'Priority dining slot'],
      multiplier: 1.3,
      left: 14,
      image: CABIN_SHOTS.oceanView,
    },
    {
      id: 'balcony',
      name: 'Balcony',
      blurb: 'Sunrise coffee over open water, every morning.',
      sqft: 220,
      occupancy: 3,
      perks: ['Private balcony', 'Lounge access', 'Late checkout'],
      multiplier: 1.68,
      left: 8,
      image: CABIN_SHOTS.balcony,
    },
    {
      id: 'suite',
      name: 'Chairman Suite',
      blurb: 'A living room, a butler, and the whole horizon.',
      sqft: 440,
      occupancy: 4,
      perks: ['Separate living room', 'Butler service', 'Backstage & greenroom access'],
      multiplier: 2.6,
      left: 3,
      image: CABIN_SHOTS.suite,
    },
  ];
  return tiers.map((tier, index) => ({
    id: tier.id,
    name: tier.name,
    blurb: tier.blurb,
    sqft: tier.sqft,
    occupancy: tier.occupancy,
    perks: tier.perks,
    price: to999(base * tier.multiplier),
    left: soldOutTier === index ? 0 : tier.left,
    image: tier.image,
  }));
}

const addon = (id: string, name: string, blurb: string, price: number, perPerson: boolean): AddOn => ({
  id,
  name,
  blurb,
  price,
  perPerson,
});

const COMMON_ADDONS: AddOn[] = [
  addon('beverage', 'Premium beverage package', 'Unlimited cocktails, wine and craft mixers across all decks.', 4499, true),
  addon('spa', 'Sea-spa ritual', 'A 60-minute deep-rest massage with an ocean-facing room.', 3299, true),
  addon('transfer', 'Port transfers', 'Chauffeured pickup and drop within city limits, both ways.', 2499, false),
  addon('photos', 'Weekend photo story', 'A shot-and-edited 40-photo album of your weekend, delivered in 72 hours.', 5999, false),
];

const BASE_FAQS: Faq[] = [
  {
    q: 'Do I need a passport?',
    a: 'No — these are domestic sailings. Any government photo ID (Aadhaar, driving licence, passport) works for all Indian citizens.',
  },
  {
    q: 'What happens if the weather turns?',
    a: 'The Empress sails routes cleared by the DG Shipping. If a port call is skipped for safety, the programme moves on board and port charges for that stop are refunded automatically.',
  },
  {
    q: 'Is the ticket refundable?',
    a: 'Full refund until 30 days before sailing, 50% until 14 days. Inside 14 days you can transfer your ticket to anyone with two clicks.',
  },
  {
    q: 'What’s the dress code?',
    a: 'Daytime is resortwear. Evenings depend on the event — every experience publishes a night-by-night style note a week before sailing.',
  },
];

const review = (name: string, date: string, rating: number, text: string, hue: number): Review => ({
  name,
  date,
  rating,
  text,
  hue,
});

const day = (dayNumber: number, title: string, items: DayPlan['items']): DayPlan => ({
  day: dayNumber,
  title,
  items,
});

/* ── Experiences ────────────────────────────────────────────────── */
export const experiences: Experience[] = [
  {
    slug: 'startup-founders-cruise',
    title: 'Startup Founders Cruise',
    tagline: '400 founders. Zero cold emails. Three nights of signal.',
    category: 'corporate',
    hero: img('1540575467063-178a50c2df87', 1800),
    gallery: [SHOTS.talk, SHOTS.cocktail, SHOTS.ship, SHOTS.sunset, img('1515187029135-18ee286d815b')],
    dates: 'Aug 14 – 17, 2026',
    month: 'Aug',
    nights: 3,
    route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
    ship: 'Cordelia Empress',
    priceFrom: 24999,
    rating: 4.9,
    reviewCount: 312,
    capacity: 800,
    spotsLeft: 43,
    popularity: 99,
    featured: true,
    host: {
      name: 'The Founder Circle',
      initials: 'FC',
      tagline: 'India’s invite-first founder community',
      eventsHosted: 27,
      rating: 4.9,
      verified: true,
    },
    description: [
      'The best conversations at every conference happen in the hallway. This is three days of hallway — unhurried, curated, and 40 nautical miles from anyone’s calendar.',
      'Four hundred founders, fifty operators and a dozen funds sail from Mumbai on Friday evening. By Sunday you’ve had the conversations that normally take a quarter of follow-ups: over breakfast, at the pool, in a suite session that ran two hours past midnight.',
    ],
    highlights: [
      'Curated 1:1s matched before you board',
      'Fireside talks by founders who’ve exited',
      'Fund office hours on the sun deck',
      'Demo night with a live term-sheet panel',
    ],
    included: [
      'All meals across 6 restaurants',
      'Every session, fireside and mixer',
      'Matched 1:1 introductions',
      'Founder directory access',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Cast off & first introductions', [
        { time: '4:00 PM', title: 'Boarding at Mumbai International Cruise Terminal', detail: 'Check-in, cabin keys, and your printed intro card.' },
        { time: '6:30 PM', title: 'Sail-away mixer on the sun deck', detail: 'The skyline drops away. The nametags stay on.' },
        { time: '9:00 PM', title: 'Opening fireside: “The boring parts of a ₹500Cr business”' },
      ]),
      day(2, 'Deep work, deep water', [
        { time: '8:00 AM', title: 'Founder breakfast tables by sector' },
        { time: '11:00 AM', title: 'Fund office hours', detail: '15-minute slots. No decks allowed, whiteboards provided.' },
        { time: '4:00 PM', title: 'Goa shore leave', detail: 'Optional beach afternoon at Miramar with the cohort.' },
        { time: '9:30 PM', title: 'Suite sessions', detail: 'Twelve rooms, twelve topics, no recordings.' },
      ]),
      day(3, 'Demo night', [
        { time: '10:00 AM', title: 'Operator masterclasses', detail: 'Pricing, hiring, and the second product.' },
        { time: '6:00 PM', title: 'Demo night', detail: 'Eight companies, six minutes each, one live panel.' },
        { time: '11:00 PM', title: 'Closing party on the aft deck' },
      ]),
    ],
    cabins: makeCabins(24999),
    addons: [
      addon('workshop', 'Pitch clinic seat', 'A 90-minute working session on your deck with two partners.', 7999, true),
      ...COMMON_ADDONS,
    ],
    faqs: [
      {
        q: 'How are the 1:1s matched?',
        a: 'A short intake form plus The Founder Circle’s member graph. You get six matches before boarding; you can request three more on the ship’s app.',
      },
      {
        q: 'Can my co-founder join?',
        a: 'Yes — cabins sleep two to four. Every registered guest gets the full programme, including matched 1:1s.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Ananya Krishnan', 'May 2026', 5, 'Closed our seed round with a fund I met at office hours. The setting does something to people — everyone’s guard drops the moment the shore does.', 340),
      review('Rohan Mehta', 'March 2026', 5, 'I’ve done every major startup conference in India. This is the only one where I never once looked at my phone.', 20),
      review('Sneha Patil', 'March 2026', 4.5, 'Suite sessions were gold. Wi-Fi at sea is decent but bring your patience — which is honestly the point.', 150),
    ],
  },
  {
    slug: 'comedy-at-sea',
    title: 'Comedy at Sea',
    tagline: 'Eight headliners, two nights, and nowhere to walk out to.',
    category: 'comedy',
    hero: img('1516280440614-37939bbacd81', 1800),
    gallery: [SHOTS.lights, SHOTS.cocktail, SHOTS.pool, SHOTS.sunset, SHOTS.dance],
    dates: 'Aug 21 – 23, 2026',
    month: 'Aug',
    nights: 2,
    route: { from: 'Mumbai', to: 'High Seas', code: 'BOM ⚓ SEA' },
    ship: 'Cordelia Empress',
    priceFrom: 18499,
    rating: 4.8,
    reviewCount: 486,
    capacity: 1400,
    spotsLeft: 128,
    popularity: 96,
    featured: true,
    host: {
      name: 'Laugh Lines Live',
      initials: 'LL',
      tagline: 'The people behind India’s biggest comedy tours',
      eventsHosted: 61,
      rating: 4.8,
      verified: true,
    },
    description: [
      'A weekend sailing with the sharpest lineup in Indian comedy — main-stage specials, midnight crowd-work sets, and a roast battle that has no business being on water.',
      'No openers you didn’t come for, no 11 PM curfew, no last metro. The theatre seats 900; the aft deck hosts the after-hours sets under open sky.',
    ],
    highlights: [
      'Two main-stage specials each night',
      'Unfiltered midnight crowd-work sets',
      'Roast battle: comics vs. the audience',
      'Writers’ room brunch — how a special gets made',
    ],
    included: [
      'All shows and after-hours sets',
      'All meals across 6 restaurants',
      'Sail-away deck party',
      'Comedy record store pop-up',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'First sailing, first set', [
        { time: '3:00 PM', title: 'Boarding & sail-away party' },
        { time: '8:00 PM', title: 'Main stage: opening double bill' },
        { time: '12:00 AM', title: 'Midnight crowd-work set', detail: 'Front rows sign a waiver. Genuinely.' },
      ]),
      day(2, 'The deep-water special', [
        { time: '11:30 AM', title: 'Writers’ room brunch' },
        { time: '5:00 PM', title: 'Roast battle on the pool deck' },
        { time: '9:00 PM', title: 'Main stage: the headliner’s new hour' },
      ]),
      day(3, 'Encore & dock', [
        { time: '9:30 AM', title: 'Hungover storytelling hour', detail: 'True stories, terrible decisions, one microphone.' },
        { time: '1:00 PM', title: 'Dock at Mumbai' },
      ]),
    ],
    cabins: makeCabins(18499, 3),
    addons: [
      addon('front-row', 'Front-row seats, both nights', 'Reserved row A–B for every main-stage show.', 3999, true),
      addon('meet', 'Greenroom meet & greet', 'Thirty minutes with the lineup after Saturday’s special.', 4999, true),
      ...COMMON_ADDONS,
    ],
    faqs: [
      {
        q: 'Are the shows 18+?',
        a: 'Main-stage specials are 16+. Everything after 11 PM is strictly 18+ — the ship checks wristbands, not vibes.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Kabir Shah', 'June 2026', 5, 'Watched a comic handle a heckler for twenty minutes while dolphins were visible behind him. Nothing on land comes close.', 210),
      review('Divya Nair', 'April 2026', 5, 'The midnight sets are the real ticket. Loose, dangerous, unrecorded — the way stand-up is supposed to be.', 45),
      review('Arjun Bhalla', 'April 2026', 4.5, 'Roast battle was carnage. Book the front-row add-on only if you have absolutely nothing to hide.', 280),
    ],
  },
  {
    slug: 'sundowner-festival',
    title: 'Sundowner: DJ Festival at Sea',
    tagline: 'Three stages, eighteen DJs, and a sunset that never gets old.',
    category: 'music',
    hero: img('1533174072545-7a4b6ad7a6c3', 1800),
    gallery: [SHOTS.crowd, SHOTS.dance, SHOTS.pool, SHOTS.sunset, SHOTS.cocktail],
    dates: 'Sep 4 – 7, 2026',
    month: 'Sep',
    nights: 3,
    route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
    ship: 'Cordelia Empress',
    priceFrom: 27999,
    rating: 4.9,
    reviewCount: 573,
    capacity: 1800,
    spotsLeft: 216,
    popularity: 98,
    featured: true,
    host: {
      name: 'Sundowner Collective',
      initials: 'SC',
      tagline: 'Festival producers, Goa-born',
      eventsHosted: 34,
      rating: 4.9,
      verified: true,
    },
    description: [
      'India’s first full-scale floating festival. Three stages — pool deck, theatre, and a sunrise stage on the bow — programmed from golden hour to actual sunrise.',
      'House and techno on open water, a Goa day-stop with a private beach stage, and the kind of festival logistics you’ve never had: your bed is a two-minute walk from the front rail.',
    ],
    highlights: [
      'Sunset main-stage sets on the pool deck',
      'Sunrise stage on the bow — 5 AM, headphones off',
      'Private beach party at the Goa port call',
      'B2B sets announced only on board',
    ],
    included: [
      'All stages, all three nights',
      'All meals across 6 restaurants',
      'Goa beach-stage shuttle & entry',
      'Festival kit: wristband, poster, earplugs you’ll ignore',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Golden hour, cast off', [
        { time: '3:00 PM', title: 'Boarding & wristbands' },
        { time: '6:00 PM', title: 'Sail-away set: pool deck main stage', detail: 'The skyline is the opening visual.' },
        { time: '11:00 PM', title: 'Theatre stage: techno till 3' },
      ]),
      day(2, 'The Goa day', [
        { time: '10:00 AM', title: 'Dock at Mormugao', detail: 'Shuttles to the private beach stage.' },
        { time: '1:00 PM', title: 'Beach stage: day programme' },
        { time: '10:00 PM', title: 'Back-on-board B2B marathon' },
      ]),
      day(3, 'Sea day, no sleep', [
        { time: '5:00 AM', title: 'Sunrise stage on the bow', detail: 'One DJ, one sunrise, no phones policy.' },
        { time: '4:00 PM', title: 'Pool deck: closing headliner' },
        { time: '12:00 AM', title: 'Secret set', detail: 'Location dropped on the ship app at midnight.' },
      ]),
    ],
    cabins: makeCabins(27999),
    addons: [
      addon('backstage', 'Backstage pass', 'Side-of-stage access and the artist bar, all weekend.', 8999, true),
      ...COMMON_ADDONS,
    ],
    faqs: [
      {
        q: 'How loud does it get near cabins?',
        a: 'Stages are on decks 12 and 3; cabins sit between decks 5–9 with insulated corridors. Light sleepers should pick a forward interior cabin — genuinely quiet.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Meher Contractor', 'June 2026', 5, 'The sunrise set ruined every land festival for me. 400 people, headphones off, sun coming up over open water. I teared up, no shame.', 25),
      review('Aditya Rao', 'May 2026', 5, 'Walked from the front rail to my bed in 90 seconds. Festival logistics will never be the same.', 200),
      review('Tanvi Desai', 'May 2026', 4.5, 'Beach day was perfectly run — shuttles every 10 minutes. Bring double the sunscreen you think you need.', 320),
    ],
  },
  {
    slug: 'womens-wellness-retreat',
    title: 'Women’s Wellness Retreat',
    tagline: 'Four nights of open water, deep rest, and zero obligations.',
    category: 'wellness',
    hero: img('1544161515-4ab6ce6db874', 1800),
    gallery: [SHOTS.zen, img('1506126613408-eca07ce68773'), SHOTS.lagoon, SHOTS.horizon, SHOTS.pool],
    dates: 'Sep 18 – 22, 2026',
    month: 'Sep',
    nights: 4,
    route: { from: 'Mumbai', to: 'Lakshadweep', code: 'BOM ⚓ LKS' },
    ship: 'Cordelia Empress',
    priceFrom: 32999,
    rating: 5.0,
    reviewCount: 204,
    capacity: 600,
    spotsLeft: 22,
    popularity: 94,
    featured: true,
    host: {
      name: 'Shakti Collective',
      initials: 'SK',
      tagline: 'Women-led retreats since 2019',
      eventsHosted: 45,
      rating: 5.0,
      verified: true,
    },
    description: [
      'Six hundred women, a ship with no agenda, and the clearest water in India. Sunrise yoga on the bow, breathwork with an actual horizon, and afternoons that belong entirely to you.',
      'Everything is optional. That’s the design. Come for the Lakshadweep lagoon day, stay for the 9 PM silence on the top deck when the ship goes dark and the stars come out.',
    ],
    highlights: [
      'Sunrise yoga & breathwork on the bow',
      'Lakshadweep lagoon day — snorkel or float',
      'Therapist-led circles, capped at twelve',
      'Dark-deck stargazing with a naturalist',
    ],
    included: [
      'All classes, circles and workshops',
      'Plant-forward menu across 4 restaurants',
      'Lagoon day with gear & guides',
      'One 30-minute spa treatment',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Leave the mainland behind', [
        { time: '4:00 PM', title: 'Boarding & welcome tea' },
        { time: '7:00 PM', title: 'Opening circle on the bow', detail: 'Phones into pouches — you keep the key.' },
      ]),
      day(2, 'Sea day: down-shift', [
        { time: '6:00 AM', title: 'Sunrise vinyasa' },
        { time: '11:00 AM', title: 'Breathwork studios', detail: 'Three intensities, pick your depth.' },
        { time: '9:00 PM', title: 'Dark-deck stargazing' },
      ]),
      day(3, 'Lakshadweep lagoon', [
        { time: '9:00 AM', title: 'Tender boats to the lagoon' },
        { time: '10:00 AM', title: 'Snorkel, kayak, or do nothing', detail: 'All three are correct.' },
        { time: '8:00 PM', title: 'Barefoot dinner on deck' },
      ]),
      day(4, 'The quiet day', [
        { time: '7:00 AM', title: 'Silent morning', detail: 'Optional. Breakfast is wordless until 10.' },
        { time: '4:00 PM', title: 'Closing circles' },
        { time: '9:00 PM', title: 'Full-moon sound bath' },
      ]),
    ],
    cabins: makeCabins(32999),
    addons: [
      addon('spa-journey', 'Extended spa journey', 'Three treatments across the sailing, scheduled around your classes.', 8499, true),
      ...COMMON_ADDONS.filter((item) => item.id !== 'spa'),
    ],
    faqs: [
      {
        q: 'Is this beginner-friendly?',
        a: 'Completely. Every class runs in two tracks, and “sit this one out with a book” is treated as a first-class choice.',
      },
      {
        q: 'Is the ship women-only for this sailing?',
        a: 'Yes — the full charter is women-only, including the programme team. Ship’s crew remains mixed.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Priya Raghavan', 'June 2026', 5, 'I have not exhaled like that in four years. The silent morning sounds gimmicky until you’re in it.', 150),
      review('Farah Sheikh', 'April 2026', 5, 'The lagoon is unreal — the photos are not edited. Circles were held with real care, never forced.', 45),
      review('Lakshmi Iyer', 'April 2026', 5, 'Came alone, as most do. Left with three women I now talk to every week.', 260),
    ],
  },
  {
    slug: 'mba-networking-cruise',
    title: 'MBA Networking Cruise',
    tagline: 'Every campus, one deck. The alumni weekend that outranks them all.',
    category: 'corporate',
    hero: img('1511578314322-379afb476865', 1800),
    gallery: [SHOTS.cocktail, SHOTS.talk, SHOTS.ship, SHOTS.sunset, SHOTS.dinner],
    dates: 'Oct 9 – 11, 2026',
    month: 'Oct',
    nights: 2,
    route: { from: 'Mumbai', to: 'High Seas', code: 'BOM ⚓ SEA' },
    ship: 'Cordelia Empress',
    priceFrom: 21499,
    rating: 4.7,
    reviewCount: 189,
    capacity: 900,
    spotsLeft: 74,
    popularity: 88,
    featured: false,
    host: {
      name: 'Alum Connect',
      initials: 'AC',
      tagline: 'Cross-campus alumni network, 40k members',
      eventsHosted: 19,
      rating: 4.7,
      verified: true,
    },
    description: [
      'Nine hundred MBAs from twenty campuses, sailing together for a weekend of case nights, career roundtables, and the kind of networking that actually survives Monday.',
      'The format is simple: small tables, real problems, senior operators moderating. The open sea handles the rest.',
    ],
    highlights: [
      'Cross-campus case night with live judging',
      'CXO roundtables, twelve seats each',
      'Sector mixers: consulting, product, finance, founders',
      'The Regatta: inter-campus deck games',
    ],
    included: [
      'All sessions and mixers',
      'All meals across 6 restaurants',
      'Alumni directory access',
      'Regatta team kit',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Board & break the ice', [
        { time: '4:00 PM', title: 'Boarding by campus houses' },
        { time: '7:00 PM', title: 'Sail-away sector mixers' },
        { time: '10:00 PM', title: 'Case night: round one' },
      ]),
      day(2, 'Roundtables & regatta', [
        { time: '9:00 AM', title: 'CXO roundtables' },
        { time: '3:00 PM', title: 'The Regatta on the sports deck' },
        { time: '9:00 PM', title: 'Black-tie alumni ball' },
      ]),
      day(3, 'Finals & dock', [
        { time: '10:00 AM', title: 'Case night finals' },
        { time: '1:00 PM', title: 'Dock at Mumbai' },
      ]),
    ],
    cabins: makeCabins(21499),
    addons: [
      addon('roundtable', 'Reserved roundtable seat', 'Guaranteed seat at two CXO roundtables of your choice.', 4499, true),
      ...COMMON_ADDONS,
    ],
    faqs: BASE_FAQS,
    reviews: [
      review('Varun Khanna', 'May 2026', 5, 'Met my next CFO at a twelve-seat roundtable. Try doing that at a 3,000-person conference in a hotel basement.', 220),
      review('Ishita Bose', 'May 2026', 4.5, 'The black-tie ball on open water is worth the fare alone. Case night got surprisingly competitive.', 30),
    ],
  },
  {
    slug: 'first-mate-singles-weekend',
    title: 'First Mate: Singles Weekend',
    tagline: 'Three hundred verified singles. No apps. Full horizon.',
    category: 'singles',
    hero: img('1492684223066-81342ee5ff30', 1800),
    gallery: [SHOTS.cocktail, SHOTS.dance, SHOTS.pool, SHOTS.sunset, SHOTS.dinner],
    dates: 'Oct 23 – 26, 2026',
    month: 'Oct',
    nights: 3,
    route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
    ship: 'Cordelia Empress',
    priceFrom: 23499,
    rating: 4.6,
    reviewCount: 142,
    capacity: 300,
    spotsLeft: 18,
    popularity: 90,
    featured: false,
    host: {
      name: 'Plot Twist Socials',
      initials: 'PT',
      tagline: 'IRL-first dating events, zero swiping',
      eventsHosted: 52,
      rating: 4.6,
      verified: true,
    },
    description: [
      'Three hundred singles, identity-verified and interview-screened, on a ship designed for meeting people the old way: slowly, over a weekend, with your actual face.',
      'Formats that don’t feel like formats — supper clubs seated by curiosity, a sunset deck social, and enough unprogrammed time for whatever starts to continue.',
    ],
    highlights: [
      'Supper clubs seated by shared curiosities',
      'Sunset deck social, first evening',
      'The Second Look: a Sunday re-meet format',
      'Goa beach morning with the cohort',
    ],
    included: [
      'All socials and supper clubs',
      'All meals across 6 restaurants',
      'Two welcome cocktails',
      'Post-cruise introductions, if you both opt in',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'First impressions', [
        { time: '4:00 PM', title: 'Boarding & verification wristbands' },
        { time: '6:30 PM', title: 'Sunset deck social' },
        { time: '9:00 PM', title: 'Supper club, seating one' },
      ]),
      day(2, 'The Goa day', [
        { time: '10:00 AM', title: 'Beach morning at Miramar' },
        { time: '8:00 PM', title: 'White night dinner on deck' },
        { time: '11:00 PM', title: 'Silent disco, three channels' },
      ]),
      day(3, 'The Second Look', [
        { time: '11:00 AM', title: 'The Second Look brunch', detail: 'You both said maybe. Here’s round two.' },
        { time: '9:00 PM', title: 'Closing party' },
      ]),
    ],
    cabins: makeCabins(23499),
    addons: COMMON_ADDONS,
    faqs: [
      {
        q: 'How is “verified” verified?',
        a: 'Government ID match, a short video call with the host team, and a strict no-plus-ones policy. The ratio is curated and the guest list is final.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Nikhil Menon', 'June 2026', 4.5, 'Supper club seating is clever — I never once asked “so what do you do”. Met someone. We’re getting dinner on land next week.', 200),
      review('Ritika Sharma', 'May 2026', 4.5, 'Felt safe and genuinely fun, which is a rare combination for singles events. The Second Look format should be patented.', 340),
    ],
  },
  {
    slug: 'food-and-wine-festival',
    title: 'Food & Wine Festival at Sea',
    tagline: 'Twelve chefs, ninety wines, and a tasting menu with a wake.',
    category: 'luxury',
    hero: img('1510812431401-41d2bd2722f3', 1800),
    gallery: [SHOTS.dinner, SHOTS.cocktail, img('1414235077428-338989a2e8c0'), SHOTS.sunset, SHOTS.ship],
    dates: 'Nov 6 – 9, 2026',
    month: 'Nov',
    nights: 3,
    route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
    ship: 'Cordelia Empress',
    priceFrom: 29999,
    rating: 4.8,
    reviewCount: 167,
    capacity: 700,
    spotsLeft: 56,
    popularity: 86,
    featured: false,
    host: {
      name: 'The Long Table',
      initials: 'LT',
      tagline: 'Chef-led dining events across India',
      eventsHosted: 23,
      rating: 4.8,
      verified: true,
    },
    description: [
      'Twelve of India’s most-booked chefs take over the ship’s six kitchens for a weekend: coastal tasting menus, a 90-label wine library, and masterclasses where you sit inside the kitchen, not outside it.',
      'The finale is a single 120-seat long table on the open deck — eight courses, paired, timed to sunset.',
    ],
    highlights: [
      'Six restaurant takeovers, twelve chefs',
      'A 90-label wine library with sommeliers',
      'Inside-the-kitchen masterclasses',
      'The Long Table: 120 seats, 8 courses, 1 sunset',
    ],
    included: [
      'All takeover dinners and tastings',
      'Daily sommelier flights',
      'Two masterclasses of your choice',
      'The Long Table finale seat',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Mise en place', [
        { time: '4:00 PM', title: 'Boarding & cellar tour' },
        { time: '8:00 PM', title: 'Takeover dinners, seating one' },
      ]),
      day(2, 'The Goa market day', [
        { time: '9:00 AM', title: 'Chef-led market walk in Panjim' },
        { time: '4:00 PM', title: 'Masterclasses, round one' },
        { time: '9:00 PM', title: 'Natural wine night on the aft deck' },
      ]),
      day(3, 'The Long Table', [
        { time: '11:00 AM', title: 'Masterclasses, round two' },
        { time: '5:30 PM', title: 'The Long Table', detail: 'Eight courses. Pacing is the sommelier’s problem, not yours.' },
      ]),
    ],
    cabins: makeCabins(29999),
    addons: [
      addon('cellar', 'Rare-cellar pairing', 'The Long Table paired from the rare cellar instead of the festival list.', 6999, true),
      ...COMMON_ADDONS.filter((item) => item.id !== 'beverage'),
    ],
    faqs: [
      {
        q: 'Can dietary restrictions be handled?',
        a: 'Yes — every menu ships in vegetarian and Jain versions designed as first-class menus, not substitutions. Flag anything else at booking and the chefs plan for you by name.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Aditi Kulkarni', 'May 2026', 5, 'The Long Table at sunset is the single best meal of my life, and I review restaurants for a living.', 25),
      review('Jordan D’Souza', 'April 2026', 4.5, 'Masterclasses put you at the pass, tasting as the chef plates. Worth it for course three alone.', 160),
    ],
  },
  {
    slug: 'island-light-photography',
    title: 'Island Light: Photography Expedition',
    tagline: 'Five days chasing light from Kochi to the Lakshadweep lagoons.',
    category: 'adventure',
    hero: img('1452587925148-ce544e77e70d', 1800),
    gallery: [SHOTS.lagoon, SHOTS.horizon, SHOTS.sunset, SHOTS.ship, SHOTS.zen],
    dates: 'Nov 18 – 23, 2026',
    month: 'Nov',
    nights: 5,
    route: { from: 'Kochi', to: 'Lakshadweep', code: 'COK ⚓ LKS' },
    ship: 'Cordelia Empress',
    priceFrom: 41999,
    rating: 4.9,
    reviewCount: 88,
    capacity: 240,
    spotsLeft: 31,
    popularity: 82,
    featured: false,
    host: {
      name: 'Aperture Collective',
      initials: 'AP',
      tagline: 'Expedition photography, taught on location',
      eventsHosted: 16,
      rating: 4.9,
      verified: true,
    },
    description: [
      'Five days at sea with eight working photographers and two hundred students of light. Golden-hour shoots on deck, drone sessions over the lagoons, and nightly edit labs where your best frame gets taken apart, kindly.',
      'Lakshadweep gives you water you won’t believe through a lens. The dark ocean gives you a Milky Way session most Indians have never seen.',
    ],
    highlights: [
      'Two lagoon landings with shoot permits arranged',
      'Astro night: ship lights out, tripods out',
      'Nightly edit labs with working pros',
      'Loan lockers: try pro glass at sea',
    ],
    included: [
      'All workshops, labs and landings',
      'All meals across 6 restaurants',
      'Shoot permits and tender boats',
      'Loan-locker access (lenses & tripods)',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Kochi cast-off', [
        { time: '4:00 PM', title: 'Boarding & kit check' },
        { time: '6:00 PM', title: 'Golden hour: harbour exit shoot' },
      ]),
      day(2, 'Sea day: fundamentals', [
        { time: '6:00 AM', title: 'Sunrise on the bow, long lenses' },
        { time: '3:00 PM', title: 'Composition intensives' },
        { time: '10:00 PM', title: 'Astro night one', detail: 'Deck lights cut by the captain at 10 sharp.' },
      ]),
      day(3, 'Lagoon landing one', [
        { time: '8:00 AM', title: 'Tenders to Kavaratti waters' },
        { time: '9:00 AM', title: 'Over-under water sessions' },
        { time: '9:00 PM', title: 'Edit lab' },
      ]),
      day(4, 'Lagoon landing two', [
        { time: '6:00 AM', title: 'Blue-hour lagoon shoot' },
        { time: '4:00 PM', title: 'Drone school over open water' },
        { time: '9:00 PM', title: 'Edit lab two' },
      ]),
      day(5, 'The portfolio day', [
        { time: '10:00 AM', title: 'Final edits & sequencing' },
        { time: '7:00 PM', title: 'Deck exhibition', detail: 'Forty frames, printed on board, shown at sunset.' },
      ]),
    ],
    cabins: makeCabins(41999),
    addons: [
      addon('print', 'Exhibition print package', 'Your three best frames printed archival A2, tubed for the journey home.', 4999, false),
      ...COMMON_ADDONS,
    ],
    faqs: [
      {
        q: 'What gear do I need?',
        a: 'Any camera you can control manually — phone included, there’s a dedicated phone track. Pro glass is available from loan lockers, free, first-come.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('Sameer Joshi', 'June 2026', 5, 'The astro night alone justified five days. The captain actually turns the ship dark. I got the Milky Way over open ocean on my first try.', 240),
      review('Elena Fernandes', 'May 2026', 5, 'Edit labs are where it clicked for me. Brutal, warm, and precise — like the best film school crit, on a boat.', 30),
    ],
  },
  {
    slug: 'family-adventure-weekend',
    title: 'Family Adventure Weekend',
    tagline: 'The weekend your kids will retell for a decade.',
    category: 'family',
    hero: img('1511895426328-dc8714191300', 1800),
    gallery: [SHOTS.pool, img('1502086223501-7ea6ecd79368'), SHOTS.goa, SHOTS.sunset, SHOTS.ship],
    dates: 'Dec 4 – 7, 2026',
    month: 'Dec',
    nights: 3,
    route: { from: 'Mumbai', to: 'Goa', code: 'BOM ⚓ GOI' },
    ship: 'Cordelia Empress',
    priceFrom: 16999,
    rating: 4.7,
    reviewCount: 391,
    capacity: 1600,
    spotsLeft: 240,
    popularity: 84,
    featured: false,
    host: {
      name: 'Little Explorers Co.',
      initials: 'LE',
      tagline: 'Adventure programmes for families',
      eventsHosted: 38,
      rating: 4.7,
      verified: true,
    },
    description: [
      'A ship-wide treasure hunt, a junior sailing school, movie nights under the stars, and a kids’ club good enough that you’ll actually get that spa slot.',
      'Built for ages 4 to 14 — and engineered so the grown-ups have as good a weekend as the kids do.',
    ],
    highlights: [
      'The Great Ship Treasure Hunt, all weekend',
      'Junior sailing school with real knots',
      'Open-air movie nights on the pool deck',
      'Parents’ night off: supervised kids’ takeover',
    ],
    included: [
      'All family programmes and clubs',
      'All meals across 6 restaurants',
      'Kids’ club (ages 4–14), all day',
      'Goa beach morning with lifeguards',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'All aboard', [
        { time: '3:00 PM', title: 'Family boarding & cabin scavenger list' },
        { time: '6:00 PM', title: 'Sail-away deck party, all ages' },
        { time: '8:30 PM', title: 'Movie night under the stars' },
      ]),
      day(2, 'The Goa day', [
        { time: '9:00 AM', title: 'Beach morning with lifeguards' },
        { time: '4:00 PM', title: 'Junior sailing school' },
        { time: '8:00 PM', title: 'Parents’ night off', detail: 'Kids’ takeover of deck 11. Chaperoned. Legendary.' },
      ]),
      day(3, 'Treasure day', [
        { time: '10:00 AM', title: 'Treasure hunt finale' },
        { time: '7:00 PM', title: 'Captain’s family dinner' },
      ]),
    ],
    cabins: makeCabins(16999),
    addons: [
      addon('kids-photo', 'Family photo story', 'A 40-photo edited album of your family’s weekend.', 4999, false),
      ...COMMON_ADDONS.filter((item) => item.id !== 'photos' && item.id !== 'beverage'),
    ],
    faqs: [
      {
        q: 'What ages does the kids’ club cover?',
        a: 'Four to fourteen, split into three bands with separate spaces and staff ratios of 1:6 or better. Under-fours are welcome everywhere with parents.',
      },
      ...BASE_FAQS,
    ],
    reviews: [
      review('The Guptas', 'June 2026', 5, 'Our 8-year-old still signs off video calls with the sailing-school salute. Parents’ night off was two whole hours of silence. Ten stars.', 210),
      review('Neha & Vikram', 'May 2026', 4.5, 'Treasure hunt had the kids sprinting across decks all weekend. Book the balcony — the sail-in to Goa at breakfast is special.', 100),
    ],
  },
  {
    slug: 'bollywood-nights-festival',
    title: 'Bollywood Nights: Retro Festival',
    tagline: 'Live orchestras, midnight antakshari, and 500 people singing Kishore.',
    category: 'music',
    hero: img('1501281668745-f7f57925c3b4', 1800),
    gallery: [SHOTS.lights, SHOTS.dance, SHOTS.dinner, SHOTS.sunset, SHOTS.cocktail],
    dates: 'Dec 18 – 20, 2026',
    month: 'Dec',
    nights: 2,
    route: { from: 'Mumbai', to: 'High Seas', code: 'BOM ⚓ SEA' },
    ship: 'Cordelia Empress',
    priceFrom: 17499,
    rating: 4.8,
    reviewCount: 256,
    capacity: 1200,
    spotsLeft: 97,
    popularity: 89,
    featured: false,
    host: {
      name: 'Saregama Social',
      initials: 'SS',
      tagline: 'Retro music events with live orchestras',
      eventsHosted: 29,
      rating: 4.8,
      verified: true,
    },
    description: [
      'A 40-piece orchestra playing the golden era — Kishore, Lata, RD Burman — on open water, with the audience as the choir. Retro dress nights, vinyl listening rooms, and an antakshari that runs till the crew begs.',
      'This is the sailing grandparents, parents and kids book together. Three generations, one songbook.',
    ],
    highlights: [
      'A 40-piece orchestra, two full nights',
      'Midnight antakshari championship',
      'Vinyl listening room with original pressings',
      'Retro dress night: 60s–90s, prizes',
    ],
    included: [
      'All concerts and listening rooms',
      'All meals across 6 restaurants',
      'Antakshari entry (teams of four)',
      'Retro night photo studio',
      'Port charges assistance',
    ],
    schedule: [
      day(1, 'Overture', [
        { time: '3:00 PM', title: 'Boarding, sail-away with the brass section' },
        { time: '8:00 PM', title: 'Orchestra night one: the RD Burman book' },
        { time: '12:00 AM', title: 'Midnight antakshari, round one' },
      ]),
      day(2, 'The golden era', [
        { time: '11:00 AM', title: 'Vinyl listening room sessions' },
        { time: '8:00 PM', title: 'Retro dress night & orchestra night two' },
        { time: '12:00 AM', title: 'Antakshari finals' },
      ]),
      day(3, 'Encore & dock', [
        { time: '10:00 AM', title: 'Unplugged farewell on the bow' },
        { time: '1:00 PM', title: 'Dock at Mumbai' },
      ]),
    ],
    cabins: makeCabins(17499),
    addons: COMMON_ADDONS,
    faqs: BASE_FAQS,
    reviews: [
      review('Colonel R. Nair (Retd.)', 'June 2026', 5, 'Took my mother, my wife and my daughter. Four of us, one railing, five hundred voices doing “Pal Pal Dil Ke Paas”. I will not recover.', 220),
      review('Shruti Kalra', 'May 2026', 4.5, 'The vinyl room is a gem — original pressings and a host who knows every recording story. Antakshari is a bloodsport, be warned.', 45),
    ],
  },
];

/* ── Derived collections ────────────────────────────────────────── */
export const featuredExperiences = experiences.filter((experience) => experience.featured);

export const destinations = [...new Set(experiences.map((experience) => experience.route.to))];

export const months = [...new Set(experiences.map((experience) => experience.month))];

export function getExperience(slug: string | undefined): Experience | undefined {
  return experiences.find((experience) => experience.slug === slug);
}

export function categoryOf(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

/* ── Testimonials ───────────────────────────────────────────────── */
export const testimonials: Testimonial[] = [
  {
    quote:
      'We stopped selling cabins and started selling reasons to be on board. Cordelia filled a ship with founders in eleven days — a decade of conference organising never came close.',
    name: 'Aarav Bhatt',
    role: 'Curator, The Founder Circle',
    experience: 'Startup Founders Cruise',
    hue: 25,
  },
  {
    quote:
      'A festival where the venue moves and the sunset is part of the lineup. Our community now asks for the ship before they ask for the artists.',
    name: 'Zoya Fernandes',
    role: 'Founder, Sundowner Collective',
    experience: 'Sundowner: DJ Festival at Sea',
    hue: 285,
  },
  {
    quote:
      'I came alone, phone in a pouch, fully sceptical. Left with a slower heartbeat and three women I speak to every week. Book the window before the willpower fades.',
    name: 'Priya Raghavan',
    role: 'Guest, September sailing',
    experience: 'Women’s Wellness Retreat',
    hue: 165,
  },
];
