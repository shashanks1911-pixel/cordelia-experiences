export type CategoryId =
  | 'music'
  | 'corporate'
  | 'comedy'
  | 'singles'
  | 'wellness'
  | 'luxury'
  | 'family'
  | 'adventure';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  tagline: string;
  image: string;
}

export interface Host {
  name: string;
  initials: string;
  tagline: string;
  eventsHosted: number;
  rating: number;
  verified: boolean;
}

export interface CabinType {
  id: string;
  name: string;
  blurb: string;
  sqft: number;
  occupancy: number;
  perks: string[];
  price: number;
  left: number;
  image: string;
}

export interface AddOn {
  id: string;
  name: string;
  blurb: string;
  price: number;
  perPerson: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  detail?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  items: ScheduleItem[];
}

export interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  hue: number;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Route {
  from: string;
  to: string;
  code: string;
}

export interface Experience {
  slug: string;
  title: string;
  tagline: string;
  category: CategoryId;
  hero: string;
  gallery: string[];
  dates: string;
  month: string;
  nights: number;
  route: Route;
  ship: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  capacity: number;
  spotsLeft: number;
  popularity: number;
  featured: boolean;
  host: Host;
  description: string[];
  highlights: string[];
  included: string[];
  schedule: DayPlan[];
  cabins: CabinType[];
  addons: AddOn[];
  faqs: Faq[];
  reviews: Review[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  experience: string;
  hue: number;
}
