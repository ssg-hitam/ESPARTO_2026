import { FestInformation } from "@/types";

/**
 * Verified Core ESPARTO 2026 Festival Constants
 * All unverified/pending information is explicitly typed as "CONTENT_REQUIRED".
 */
export const FEST_INFO: FestInformation = {
  name: "ESPARTO",
  edition: "2026",
  tagline: "Ideas → Innovation → Impact",
  institution: {
    name: "Hyderabad Institute of Technology and Management",
    shortName: "HITAM",
    city: "Hyderabad",
    state: "Telangana",
    address: "HITAM Campus, Medchal, Hyderabad, Telangana, India",
    website: "https://hitam.org",
  },
  dates: {
    startDate: "2026-10-09",
    endDate: "2026-10-10",
    // Official event start: 9:30 AM IST on Day 1 (Oct 9, 2026)
    isoStart: "2026-10-09T09:30:00+05:30",
    isoEnd: "2026-10-10T16:30:00+05:30",
    timezone: "Asia/Kolkata",
    // Official daily timings: 9:30 AM – 4:30 PM (both days)
    dailyStart: "09:30",
    dailyEnd: "16:30",
  },
  metrics: {
    totalEvents: "CONTENT_REQUIRED",
    expectedParticipants: "CONTENT_REQUIRED",
    participatingColleges: "CONTENT_REQUIRED",
    totalPrizePool: "CONTENT_REQUIRED",
  },
  officialLinks: {
    unstopPortal: undefined, // CONTENT_REQUIRED
    devfolioPortal: undefined, // CONTENT_REQUIRED
    instagram: undefined, // CONTENT_REQUIRED
    linkedin: undefined, // CONTENT_REQUIRED
    youtube: undefined, // CONTENT_REQUIRED
    twitter: undefined, // CONTENT_REQUIRED
  },
};

// Official countdown target: 9:30 AM IST on October 9, 2026 (verified fest start time)
export const COUNTDOWN_TARGET = "2026-10-09T09:30:00+05:30";

