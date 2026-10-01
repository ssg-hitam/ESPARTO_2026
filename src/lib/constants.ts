import { FestInformation } from "@/types";

export const UNSTOP_ESPARTO_PASS_URL = 
  "https://unstop.com/p/esparto-2026-2-day-technical-fest-pass-esparto-2026-hyderabad-institute-of-technology-and-management-hitm-hyderabad-1763831";

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
    totalEvents: "15+",
    expectedParticipants: "1000+",
    participatingColleges: "50+",
    totalPrizePool: "₹90,000+",
  },
  officialLinks: {
    unstopPortal: UNSTOP_ESPARTO_PASS_URL,
    devfolioPortal: undefined, // CONTENT_REQUIRED
    instagram: "https://www.instagram.com/esparto_hitam",
    ssgInstagram: "https://www.instagram.com/ssg_hitam",
    linkedin: "https://www.linkedin.com/school/hitamhyderabad",
    youtube: "https://www.youtube.com/@hitamautonomous",
    github: "https://github.com/ssg-hitam/ESPARTO_2026",
    twitter: undefined, // CONTENT_REQUIRED
  },
};

// Official countdown target: 9:30 AM IST on October 9, 2026 (verified fest start time)
export const COUNTDOWN_TARGET = "2026-10-09T09:30:00+05:30";

