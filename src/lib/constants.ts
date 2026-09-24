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
    // Temporary countdown target: start of event day.
    // Replace with the official event start timestamp when provided by organizers.
    isoStart: "2026-10-09T00:00:00+05:30",
    isoEnd: "2026-10-10T23:59:59+05:30",
    timezone: "Asia/Kolkata",
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

// Temporary countdown target: start of event day.
// Replace with the official event start timestamp when provided by organizers.
export const COUNTDOWN_TARGET = "2026-10-09T00:00:00+05:30";

