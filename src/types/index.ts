/**
 * ESPARTO 2026 - Master TypeScript Domain Contracts
 * Official Technical Fest of HITAM (Hyderabad Institute of Technology and Management)
 * October 09-10, 2026
 */

export type EventCategory =
  | "technical"
  | "hackathon"
  | "coding"
  | "robotics"
  | "ai-ml"
  | "design"
  | "gaming"
  | "workshop"
  | "quiz"
  | "management"
  | "general";

export type EventStatus =
  | "upcoming"
  | "registration-open"
  | "registration-closed"
  | "in-progress"
  | "completed";

export interface CoordinatorContact {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface EventRound {
  roundNumber: number;
  title: string;
  description: string;
  duration?: string;
  mode: "offline" | "online" | "hybrid";
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  category: EventCategory;
  shortDescription: string;
  fullDescription: string;
  date: "2026-10-09" | "2026-10-10" | "both";
  startTime?: string;
  endTime?: string;
  venue: string;
  registrationUrl: string;
  registrationDeadline?: string;
  eligibility: string;
  teamSize: {
    min: number;
    max: number;
    type: "individual" | "team" | "individual-or-team";
  };
  entryFee?: {
    amount: number;
    currency: "INR";
    isFree: boolean;
  };
  prizePool?: {
    total?: string;
    firstPrize?: string;
    secondPrize?: string;
    thirdPrize?: string;
    perks?: string[];
  };
  rules: string[];
  rounds?: EventRound[];
  coordinators: CoordinatorContact[];
  featuredImage?: string;
  bannerImage?: string;
  status: EventStatus;
  isFeatured?: boolean;
}

export interface ScheduleItem {
  id: string;
  day: "day-1" | "day-2";
  date: "2026-10-09" | "2026-10-10";
  startTime: string; // e.g. "09:30 AM"
  endTime: string;   // e.g. "11:00 AM"
  title: string;
  description?: string;
  category: EventCategory | "ceremony" | "break" | "keynote";
  venue: string;
  relatedEventSlug?: string;
  speakers?: string[];
  isHighlight?: boolean;
}

export interface Guest {
  id: string;
  name: string;
  designation: string;
  organization: string;
  bio: string;
  topic?: string;
  sessionTime?: string;
  image?: string;
  type: "chief-guest" | "keynote-speaker" | "industry-expert" | "workshop-mentor" | "judge";
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Organizer {
  id: string;
  name: string;
  role: string;
  teamDomain:
    | "convenor"
    | "faculty-coordinator"
    | "lead-organizer"
    | "student-leadership"
    | "technical"
    | "design"
    | "operations"
    | "marketing"
    | "sponsorship"
    | "chapter-committee";
  department?: string;
  image?: string;
  contact?: string;
  highlight?: boolean;
  handling?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
    phone?: string;
  };
}

export interface SponsorTier {
  id: string;
  tierName:
    | "title"
    | "powered-by"
    | "associate"
    | "platinum"
    | "gold"
    | "silver"
    | "community"
    | "media";
  title: string;
  sponsors: Sponsor[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  websiteUrl: string;
  tier: SponsorTier["tierName"];
  description?: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  code: string;
  building: string;
  floor?: string;
  capacity?: number;
  directions: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "registration" | "events" | "accommodation" | "transportation";
}

export interface GalleryItem {
  id: string;
  title: string;
  year: "2026" | "previous-editions";
  category: "hackathon" | "workshops" | "competitions" | "cultural" | "crowd";
  mediaUrl: string;
  thumbnailUrl: string;
  caption?: string;
}

export interface ContactChannel {
  department: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface FestInformation {
  name: string;
  edition: string;
  tagline: string;
  institution: {
    name: string;
    shortName: string;
    city: string;
    state: string;
    address: string;
    website: string;
  };
  dates: {
    startDate: string;
    endDate: string;
    isoStart: string;
    isoEnd: string;
    timezone: string;
    /** Official daily start time in HH:MM (24h) e.g. "09:30" */
    dailyStart?: string;
    /** Official daily end time in HH:MM (24h) e.g. "16:30" */
    dailyEnd?: string;
  };
  metrics: {
    totalEvents: string;
    expectedParticipants: string;
    participatingColleges: string;
    totalPrizePool: string;
  };
  officialLinks: {
    unstopPortal?: string;
    devfolioPortal?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    discord?: string;
  };
}
