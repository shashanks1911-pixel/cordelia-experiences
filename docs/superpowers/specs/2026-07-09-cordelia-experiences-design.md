# Cordelia Experiences — Design Spec

**Date:** 2026-07-09
**Status:** Approved brief (user-supplied); remaining decisions documented here.

## 1. Product thesis

Cordelia is India's largest cruise line. Cruises are sold like hotel rooms; Cordelia
Experiences reframes the cruise as a **venue** and sells **experiences** — floating
festivals, founder retreats, comedy weekends. Airbnb Experiences × Eventbrite × Cruise.
The experience is the hero; the cabin is a detail.

**Audience:** affluent urban Indians 24–45, design-literate, aspirational.
**Job of the site:** make a weekend at sea feel like an event you attend, not a room
you book — and get you to browse and book one.

## 2. Deliverables (from brief)

High-fidelity clickable React + Tailwind prototype, investor-ready:

1. Homepage (hero, categories, featured, how-it-works, host CTA, testimonials, footer)
2. Explore page (filterable Airbnb-style grid)
3. Experience detail (gallery, itinerary, cabins, FAQs, reviews, floating book card)
4. Corporate page ("Your Next Offsite Deserves an Ocean." + inquiry form)
5. Host dashboard (revenue, bookings, occupancy, guests, analytics)
6. Booking flow (cabin → guests → add-ons → payment → confirmation)
7. Mobile-first responsive throughout

## 3. Visual identity

### Palette (brief-pinned: deep ocean blue + white, sunset orange / coral / gold)

| Token        | Value                  | Role                                  |
| ------------ | ---------------------- | ------------------------------------- |
| `ink`        | `oklch(24% 0.055 250)` | Deep ocean blue — headings, dark surfaces |
| `ocean`      | `oklch(38% 0.075 245)` | Secondary blue, links, chart primary  |
| `surface`    | `oklch(98.5% 0.004 240)`| Page background (cool off-white)     |
| `card`       | `white`                | Elevated surfaces                     |
| `sunset`     | `oklch(68% 0.19 40)`   | Primary accent — CTAs, highlights     |
| `coral`      | `oklch(74% 0.155 32)`  | Soft accent, tints, hovers            |
| `gold`       | `oklch(80% 0.125 85)`  | Ratings, premium badges, corporate    |

**Sunrise gradient** (hero, CTAs, horizon lines): deep ocean → dusk indigo → coral → gold,
`135deg`. Used sparingly — hero scrim, primary CTA, horizon dividers, text highlight.

### Typography

- **Display:** Fraunces (variable, high optical size) — editorial, warm, travel-masthead.
  Headlines and pull quotes only.
- **Body/UI:** Instrument Sans — humanist grotesk, crisp at UI sizes.
- **Utility:** Spline Sans Mono — boarding-pass vernacular: eyebrows, ticket metadata,
  dashboard figures, step labels. Small doses.

Scale via `clamp()` tokens; hero ≈ `clamp(2.75rem → 5.5rem)`.

### Signature element

**The boarding pass.** Booking sidebar, booking-flow summary rail, and confirmation
render as an elegant boarding pass: mono type, dashed perforation, route line
(MUM ⚓ GOA), barcode. Supported by a quiet system-wide device: the **horizon line** —
a 2px sunrise-gradient rule used as section divider and active-state underline.

### Anti-template commitments

- Hero headline left-set, two-voice: line one quiet grotesk, line two huge Fraunces
  with gradient emphasis on "Experience."
- Featured section is editorial bento (one headliner card + supporting cards), not a
  uniform grid.
- How-it-works steps connected by a dotted nautical route line; numbered because the
  content is genuinely sequential.
- Corporate page shifts to dark-luxury (deep ocean surfaces, gold accents) — same
  system, different register.
- Category cards use the brief's emoji in tinted glass squares (Apple vernacular).

## 4. Architecture

Vite + React 18 + TypeScript + Tailwind v4 (`@theme` tokens) + React Router 7
(library mode) + Motion (scroll reveals, honors reduced motion) + lucide-react.

```
src/
├── components/
│   ├── layout/     Navbar (glass, sticky), Footer, PageShell
│   ├── ui/         Button, Chip, Badge, Rating, Avatar, SectionHeading, Reveal,
│   │               HorizonRule, GlassPanel, Skeleton, Stat
│   ├── home/       Hero, CategoryRow, FeaturedBento, HowItWorks, HostCta, Testimonials
│   ├── explore/    FilterBar, ExperienceCard, ExploreGrid
│   ├── detail/     Gallery, ItineraryDay, CabinCard, FaqItem, ReviewCard, BookingPass
│   ├── booking/    Stepper, StepCabin, StepGuests, StepAddons, StepPayment,
│   │               Confirmation, SummaryRail
│   ├── corporate/  CorporateHero, Offerings, InquiryForm
│   └── dashboard/  Sidebar, StatCard, RevenueChart, SalesBars, OccupancyMeter,
│                   GuestTable, AssetCard
├── pages/          Home, Explore, ExperienceDetail, Corporate, HostDashboard,
│                   Booking, NotFound
├── hooks/          useScrolled, useReveal (reduced-motion aware)
├── lib/            data.ts (all mock content), format.ts (INR, dates), booking.ts
│                   (price math), filter.ts (explore filtering)
└── styles/         index.css (@theme tokens, base, utilities)
```

Routes: `/`, `/explore`, `/experience/:slug`, `/corporate`, `/host`, `/book/:slug`.
Booking state lives in the Booking page (single stateful flow); explore filter state
mirrors to URL search params.

### Data

Nine experiences covering the brief's list (Startup Founders Cruise, Comedy at Sea,
Sundowner DJ Festival, Women's Wellness Retreat, MBA Networking, Singles Mixer,
Food & Wine Festival, Photography Expedition, Family Adventure Weekend), each with
host, schedule, cabins (4 types), add-ons, FAQs, reviews. Indian context throughout:
₹ prices, Mumbai–Goa–Lakshadweep routes, Indian names. Photography: Unsplash CDN with
explicit dimensions and gradient fallbacks.

## 5. Error handling & edge states

Prototype scope: unknown slug → designed 404; empty filter results → designed empty
state with reset action; images carry gradient fallback backgrounds; forms validate
required fields client-side with inline messages.

## 6. Testing & verification

- **Unit (Vitest):** `lib/format`, `lib/booking`, `lib/filter` — the pure logic.
- **Visual:** Playwright screenshot script at 320 / 768 / 1024 / 1440 across all six
  pages; self-critique pass, then polish.
- **Build:** `npm run build` green; type-check clean.

Coverage note: visual regression carries the signal for view components (per web
testing rules); pure logic in `lib/` is unit-tested.

## 7. Out of scope

Real payments, auth, backend, CMS, i18n. Copy is final-quality placeholder; imagery
is placeholder photography.
