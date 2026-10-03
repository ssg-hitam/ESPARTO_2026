/**
 * ESPARTO 2026 - Official Festival Events & Competitions Dataset
 * Verified from the official technical events checklist & schedule.
 */

export type EventCategoryType =
  | "All"
  | "Hackathon"
  | "Workshop"
  | "Challenge"
  | "Ideathon"
  | "Gaming & Coding";

export interface FestEventItem {
  id: string;
  slug: string;
  title: string;
  club: string;
  clubId: string;
  clubLogo: string;
  category: "Hackathon" | "Workshop" | "Challenge" | "Ideathon" | "Gaming & Coding";
  tagline: string;
  description: string;
  date: "Day 1 (Oct 9)" | "Day 2 (Oct 10)" | "Both Days (Oct 9–10)";
  dayNumber: 1 | 2 | 0; // 0 for both days
  timings: string;
  venue: string;
  prizePool: string;
  prizeBreakup?: {
    first?: string;
    second?: string;
    third?: string;
  };
  teamSize: string;
  registrationFee: {
    hitam: string;
    nonHitam: string;
    perTeam?: boolean;
    note?: string;
  };
  highlights: string[];
  bannerImage?: string;
  featured?: boolean;
  unstopUrl?: string;
  coordinators?: {
    students: { name: string; phone?: string; email?: string }[];
    faculty: { name: string; phone?: string; email?: string };
    clubEmail?: string;
  };
}

export const GOOGLE_APPS_SCRIPT_REGISTRATION_URL =
  "https://script.google.com/macros/s/AKfycbyWW19qSK95FeVO35V-aX5Lr2ySIE-ZMLLqem_y6bIFRXLcVEzVtU4qooHetePr09dbHQ/exec";

export function getEventRegisterUrl(event: FestEventItem): string {
  // Direct redirect for IEEE National Ideathon official form
  if (event.slug === "ieee-ideathon" || event.id === "ieee-ideathon") {
    return "https://script.google.com/a/macros/hitam.org/s/AKfycbwoVAJO1VLPibThDX3h5Sewj3HVaZkgGAenKgqiOb8SlhyhJgT6GRzjp4cx2aWlOXK41A/exec";
  }

  // Pre-select the specific event in Google Apps Script registration engine
  return `${GOOGLE_APPS_SCRIPT_REGISTRATION_URL}?event=${encodeURIComponent(event.slug || event.id)}`;
}

export const FEST_EVENTS: FestEventItem[] = [
  {
    id: "ieee-ideathon",
    slug: "ieee-ideathon",
    title: "INNOVISION",
    club: "IEEE Student Branch HITAM",
    clubId: "ieee",
    clubLogo: "/images/chapters/ieee-hitam.png",
    category: "Ideathon",
    tagline: "Where ideas meet unexpected experiences.",
    description: "The flagship IEEE National Ideathon at ESPARTO 2026. Pitch transformative engineering concepts across clean energy, computing systems, healthcare, and robotics before an esteemed jury of industry practitioners and researchers.",
    bannerImage: "/images/events/innovision-banner.png",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
    timings: "9:30 AM – 4:30 PM",
    venue: "HITAM, Gowdavelly",
    prizePool: "₹30,000",
    teamSize: "3–4 Members",
    registrationFee: {
      hitam: "₹199 / participant (IEEE member)",
      nonHitam: "₹249 / participant (Non-IEEE / Other Colleges)",
      perTeam: false,
      note: "Includes official IEEE certificate & delegate kit",
    },
    highlights: ["₹30,000 Mega Cash Pool", "1st, 2nd & 3rd Stage Awards", "Teams of 3–4 Members", "National Jury Evaluation", "Incubation Fast-Track Opportunity"],
    featured: true,
    coordinators: {
      students: [{ name: "Sai Sampada", phone: "8879341306", email: "ieeesb@hitam.org" }],
      faculty: { name: "Dr. Bindu Madhavi", phone: "9160308130", email: "bindumadhavi.t@ieee.org" },
    },
  },
  {
    id: "reverse-hackathon",
    slug: "reverse-hackathon",
    title: "Reverse Hackathon",
    club: "HHC × IUCEE-EWB",
    clubId: "hhc",
    clubLogo: "/images/chapters/hhc-iucee.png",
    category: "Hackathon",
    tagline: "Deconstruct, debug, and rebuild systems in reverse",
    description: "A high-intensity reverse engineering battle. Teams deconstruct complex production software/hardware stacks, identify critical performance bottlenecks, and architect superior re-engineered solutions.",
    bannerImage: "/images/events/reverse-hackathon-banner.png",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "9:30 AM – 4:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹10,000",
    prizeBreakup: {
      first: "₹5,000",
      second: "₹3,000",
      third: "₹2,000",
    },
    teamSize: "2–3 Members",
    registrationFee: {
      hitam: "₹550 / team",
      nonHitam: "₹600 / team",
      perTeam: true,
      note: "Hitamites: ₹550 / team | Non-Hitamites: ₹600 / team",
    },
    highlights: ["₹10,000 Cash Prize Pool", "1st: ₹5,000 | 2nd: ₹3,000 | 3rd: ₹2,000", "Teams of 2–3 Members", "System Architecture Deconstruction", "Live Prototype Showdown"],
    featured: true,
    coordinators: {
      students: [
        { name: "Ameena", phone: "9966864664", email: "24e51a6612@gmail.com" },
        { name: "Kanishka", phone: "9494753922", email: "24e51a05b4@gmail.com" },
        { name: "Alankrusha", phone: "9063412373", email: "24e51a6628@gmail.com" }
      ],
      faculty: { name: "Mr. Santosh Naik", phone: "9980299366", email: "santoshn.mech@hitam.org" },
    },
  },
  {
    id: "agentic-ai-workshop-hackathon",
    slug: "agentic-ai-workshop-hackathon",
    title: "Agentic AI Workshop & Hackathon",
    club: "Google Developer Groups on Campus – HITAM",
    clubId: "gdg",
    clubLogo: "/images/chapters/gdg-hitam.png",
    category: "Hackathon",
    tagline: "From learning to building — explore the power of Agentic AI.",
    description: "Organized by GDGoC HITAM as a 2-day technical flagship. Day 1 (Oct 9) features an interactive masterclass on Agentic AI fundamentals, reasoning loops, and autonomous tool use. Day 2 (Oct 10) is the high-stakes Agentic AI Hackathon where teams architect and submit real-world agent solutions. A single ₹150 registration covers both the workshop and the hackathon!",
    bannerImage: "/images/events/agentic-ai-workshop-banner.png",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
    timings: "Oct 9: 9:30 AM – 3:00 PM (Workshop) & 3:00 PM Hackathon Start • Oct 10: Final Demos & Results (till 3:30 PM)",
    venue: "Activity Block – 2nd/3rd Floor Classroom",
    prizePool: "₹10,000",
    prizeBreakup: {
      first: "₹5,000",
      second: "₹3,000",
      third: "₹2,000",
    },
    teamSize: "2–4 Members (or Solo)",
    registrationFee: {
      hitam: "₹150 / participant",
      nonHitam: "₹150 / participant",
      perTeam: false,
      note: "Single ₹150 registration gives complete access to BOTH Day 1 Workshop & Day 2 Hackathon",
    },
    highlights: [
      "Single ₹150 Pass Covers Both Workshop & Hackathon",
      "₹10,000 Total Prize Pool",
      "1st: ₹5,000 | 2nd: ₹3,000 | 3rd: ₹2,000",
      "Day 1: Hands-on Agentic AI Masterclass",
      "Day 2: Autonomous Multi-Agent AI Hackathon",
      "Guest Speaker & Industry Mentor Jury",
      "GDGoC HITAM Official Certificates"
    ],
    featured: true,
    coordinators: {
      students: [
        { name: "Manik Manohar", phone: "9100834381", email: "manikmanohar0@gmail.com" },
        { name: "Dhanudeep", phone: "7569956911", email: "kdhanudeep@gmail.com" },
        { name: "Y Shamsmitha", phone: "7396933363", email: "yshamsmitha@gmail.com" }
      ],
      faculty: { name: "Mr. D. Harikrishna", phone: "9490425130", email: "associatedean.mdp@hitam.org" },
      clubEmail: "gdgoncampus@hitam.org",
    },
  },
  {
    id: "programmers-got-talent",
    slug: "programmers-got-talent",
    title: "Programmers Got Talent",
    club: "HHC × IUCEE-EWB",
    clubId: "hhc",
    clubLogo: "/images/chapters/hhc-iucee.png",
    category: "Gaming & Coding",
    tagline: "Speed coding, blind syntax rounds & algorithmic showdowns",
    description: "An electrifying high-speed coding battle: blind syntax rounds, obscure runtime bug hunts, algorithmic sprint races, and rapid-fire problem solving under tournament pressure.",
    bannerImage: "/images/events/programmers-got-talent-banner.png",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:00 AM – 1:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹3,000",
      second: "₹2,000",
    },
    teamSize: "Solo (Individual)",
    registrationFee: {
      hitam: "₹150 / participant",
      nonHitam: "₹150 / participant",
      perTeam: false,
      note: "Solo Participation | Registration: ₹150/participant",
    },
    highlights: ["₹5,000 Cash Prize Pool", "1st: ₹3,000 | 2nd: ₹2,000", "Solo Speed Duel", "Blind Coding Arenas", "Live Leaderboard Tracking"],
    coordinators: {
      students: [
        { name: "Ameena", phone: "9966864664", email: "24e51a6612@gmail.com" },
        { name: "Kanishka", phone: "9494753922", email: "24e51a05b4@gmail.com" },
        { name: "Alankrusha", phone: "9063412373", email: "24e51a6628@gmail.com" }
      ],
      faculty: { name: "Mr. Santosh Naik", phone: "9980299366", email: "santoshn.mech@hitam.org" },
    },
  },
  {
    id: "smart-manufacturing-challenge",
    slug: "smart-manufacturing-challenge",
    title: "Smart Manufacturing: Industry Insights & Innovation Challenge",
    club: "IEOM HITAM Chapter",
    clubId: "ieom",
    clubLogo: "/images/chapters/ieom-hitam.png",
    category: "Challenge",
    tagline: "Learn • Analyse • Innovate • Pitch — Tech Talk Session with Expert & Compete, Sustain, Win!",
    description: "Attend an exclusive Tech Talk Session with industry experts and solve authentic industrial bottlenecks. Learn, analyse, innovate, and pitch smart factory operations, digital twins, and lean automation to compete, sustain, and win.",
    bannerImage: "/images/events/smart-manufacturing-banner.png",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,700 (Total: ₹11,400)",
    prizeBreakup: {
      first: "₹2,500",
      second: "₹2,000",
      third: "₹1,200",
    },
    teamSize: "Team of 4 Members",
    registrationFee: {
      hitam: "₹99 / team",
      nonHitam: "₹149 / team",
      perTeam: true,
      note: "Team of 4 | HITAM: ₹99/team | Outside: ₹149/team",
    },
    highlights: [
      "₹5,700 Day 1 Prize Pool",
      "1st: ₹2,500 | 2nd: ₹2,000 | 3rd: ₹1,200",
      "Tech Talk Session with Expert",
      "Work on Real Industry Problems",
      "Compete, Sustain & Win",
      "Teams of 4 Members",
    ],
    coordinators: {
      students: [{ name: "Rishitha", phone: "9121014558", email: "24e51a66e1@hitam.org" }],
      faculty: { name: "Mr. P. Praveen", phone: "8919046164", email: "praveenp.mech@hitam.org" },
    },
  },
  {
    id: "ieom-startup-pitch",
    slug: "ieom-startup-pitch",
    title: "IEOM Startup Pitch Challenge",
    club: "IEOM HITAM Chapter",
    clubId: "ieom",
    clubLogo: "/images/chapters/ieom-hitam.png",
    category: "Ideathon",
    tagline: "Pitch • Innovate • Solve — Pitch your vision, solve real-world problems & win recognition",
    description: "Pitch your innovative idea and viable hardware, software, or manufacturing startups before investor judges. Solve real-world problems, showcase unit economics and operational prototypes, and win recognition with commercial viability roadmaps.",
    bannerImage: "/images/events/ieom-startup-pitch-banner.png",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:00 AM – 3:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,700 (Total: ₹11,400)",
    prizeBreakup: {
      first: "₹2,500",
      second: "₹2,000",
      third: "₹1,200",
    },
    teamSize: "Team (4 Members) or Solo",
    registrationFee: {
      hitam: "₹149 team / ₹79 solo",
      nonHitam: "₹199 team / ₹99 solo",
      perTeam: true,
      note: "Team (4): ₹149 (HITAM) / ₹199 (Outside) | Solo: ₹79 (HITAM) / ₹99 (Outside)",
    },
    highlights: [
      "₹5,700 Day 2 Prize Pool",
      "1st: ₹2,500 | 2nd: ₹2,000 | 3rd: ₹1,200",
      "Pitch Your Innovative Idea",
      "Solve Real-World Problems",
      "Showcase Vision & Win Recognition",
      "Team (4 Members) or Solo Format",
    ],
    coordinators: {
      students: [{ name: "Rishitha", phone: "9121014558", email: "24e51a66e1@hitam.org" }],
      faculty: { name: "Mr. P. Praveen", phone: "8919046164", email: "praveenp.mech@hitam.org" },
    },
  },
  {
    id: "dataquest-kaggle",
    slug: "dataquest-kaggle",
    title: "DataQuest – Kaggle Data Science Challenge",
    club: "HITAM AI Club",
    clubId: "hitam-ai",
    clubLogo: "/images/chapters/hitam-ai.png",
    category: "Challenge",
    tagline: "Live machine learning competition on private Kaggle arena",
    description: "Compete in an intense Kaggle hackathon. Perform exploratory data analysis, engineer discriminative features, train neural networks, and climb the live private leaderboard.",
    bannerImage: "/images/events/dataquest-kaggle-banner.png",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹2,500",
      second: "₹1,500",
      third: "₹1,000",
    },
    teamSize: "Team of 2 Members",
    registrationFee: {
      hitam: "₹300 / team",
      nonHitam: "₹300 / team",
      perTeam: true,
      note: "Team of 2 | ₹300 per team",
    },
    highlights: ["₹5,000 Cash Prize Pool", "1st: ₹2,500 | 2nd: ₹1,500 | 3rd: ₹1,000", "Teams of 2 Members", "Live Private Kaggle Leaderboard", "Feature Engineering Duel"],
    coordinators: {
      students: [{ name: "MD Arif", phone: "9390219103", email: "23e51a6671@hitam.org" }],
      faculty: { name: "Dr. M. Rajeshwar", phone: "9248711181", email: "rajeshwarm.cse@hitam.org" },
      clubEmail: "aiclub@hitam.org",
    },
  },
  {
    id: "n8n-automation-challenge",
    slug: "n8n-automation-challenge",
    title: "n8n Automation Challenge",
    club: "HITAM AI Club",
    clubId: "hitam-ai",
    clubLogo: "/images/chapters/hitam-ai.png",
    category: "Challenge",
    tagline: "Event-driven workflow & AI agent integration hack",
    description: "Harness n8n to connect multi-source APIs, automate mission-critical organizational workflows, and orchestrate intelligent autonomous triggers without boilerplate code.",
    bannerImage: "/images/events/n8n-automation-challenge-banner.png",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹2,500",
      second: "₹1,500",
      third: "₹1,000",
    },
    teamSize: "Team of 2 Members",
    registrationFee: {
      hitam: "₹300 / team",
      nonHitam: "₹300 / team",
      perTeam: true,
      note: "Team of 2 | ₹300 per team",
    },
    highlights: ["₹5,000 Cash Prize Pool", "1st: ₹2,500 | 2nd: ₹1,500 | 3rd: ₹1,000", "Teams of 2 Members", "Event-Driven Pipelines", "No-Code / Low-Code AI Demos"],
    coordinators: {
      students: [{ name: "MD Arif", phone: "9390219103", email: "23e51a6671@hitam.org" }],
      faculty: { name: "Dr. M. Rajeshwar", phone: "9248711181", email: "rajeshwarm.cse@hitam.org" },
      clubEmail: "aiclub@hitam.org",
    },
  },
  {
    id: "data-heist-datathon",
    slug: "data-heist-datathon",
    title: "DATA HEIST – Datathon",
    club: "MINDS Club",
    clubId: "minds",
    clubLogo: "/images/chapters/minds-hitam.png",
    category: "Challenge",
    tagline: "The Data Auction – Bid. Investigate. Connect. Expose.",
    description: "An investigative data science thriller. Teams analyze fragmented database dumps, decrypt corrupted communication logs, and assemble chronological forensics to crack the case.",
    bannerImage: "/images/events/data-heist-banner.png",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "9:30 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹3,000",
    prizeBreakup: {
      first: "₹1,500",
      second: "₹1,000",
      third: "₹500",
    },
    teamSize: "2–4 Members",
    registrationFee: {
      hitam: "₹200 / team",
      nonHitam: "₹300 / team",
      perTeam: true,
      note: "2–4 Members | HITAM: ₹200/team | Other Colleges: ₹300/team",
    },
    highlights: ["₹3,000 Prize Pool", "1st: ₹1,500 | 2nd: ₹1,000 | 3rd: ₹500", "Teams of 2–4 Members", "Forensic Data Investigation", "Cipher & Pattern Cracking"],
    coordinators: {
      students: [{ name: "Arutla Sai Prasanna", phone: "8106110146", email: "23e51a6711@hitam.org" }],
      faculty: { name: "Ms. Richa Tiwari", phone: "9131539794", email: "richatiwari.cse@hitam.org" },
    },
  },
  {
    id: "data-dossier",
    slug: "data-dossier",
    title: "DATA DOSSIER",
    club: "MINDS Club",
    clubId: "minds",
    clubLogo: "/images/chapters/minds-hitam.png",
    category: "Challenge",
    tagline: "Cryptic technical case study & evidence deduction",
    description: "Examine sealed mystery dossiers, analyze technical anomalies, cross-reference suspect data trails, and present an irrefutable deduction before the investigative panel.",
    bannerImage: "/images/events/data-dossier-banner.png",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "9:30 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹3,000",
    prizeBreakup: {
      first: "₹1,500",
      second: "₹1,000",
      third: "₹500",
    },
    teamSize: "2–4 Members",
    registrationFee: {
      hitam: "₹100 / team",
      nonHitam: "₹200 / team",
      perTeam: true,
      note: "2–4 Members | HITAM: ₹100/team | Other Colleges: ₹200/team",
    },
    highlights: ["₹3,000 Prize Pool", "1st: ₹1,500 | 2nd: ₹1,000 | 3rd: ₹500", "Teams of 2–4 Members", "Mystery Dossier Analysis", "Logical Deduction Defense"],
    coordinators: {
      students: [{ name: "Arutla Sai Prasanna", phone: "8106110146", email: "23e51a6711@hitam.org" }],
      faculty: { name: "Ms. Richa Tiwari", phone: "9131539794", email: "richatiwari.cse@hitam.org" },
    },
  },
  {
    id: "torquex-motorsport",
    slug: "torquex-motorsport",
    title: "TorqueX – From Garage to Grid & New Kart Reveal",
    club: "TorqueX Motorsports",
    clubId: "torquex",
    clubLogo: "/images/chapters/torquex-logo.jpg",
    category: "Challenge",
    tagline: "Live official new racing kart reveal & vehicle dynamics challenge",
    description: "Be part of the grand unveiling of HITAM's custom-engineered racing kart. Participate in telemetry design sprints, chassis aerodynamic challenges, and EV powertrain teardown sessions.",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹1,500",
      second: "₹1,000",
      third: "₹500",
    },
    teamSize: "Solo or Team",
    registrationFee: {
      hitam: "₹50 solo / ₹100 team",
      nonHitam: "₹70 solo / ₹140 team",
      perTeam: false,
      note: "Solo: ₹50 (HITAM) / ₹70 (Outside) | Team: ₹100 (HITAM) / ₹140 (Outside)",
    },
    highlights: ["₹5,000 Prize Pool", "1st: ₹1,500 | 2nd: ₹1,000 | 3rd: ₹500", "Solo or Team Entry", "Official Custom Kart Reveal", "Vehicle Telemetry Challenge"],
    coordinators: {
      students: [{ name: "G. Sri Harshika", phone: "9052693939", email: "24e51a0311@hitam.org" }],
      faculty: { name: "Ruchir Shrivastava", phone: "903958390", email: "programhead.mech@hitam.org" },
    },
  },
  {
    id: "build-first-robot",
    slug: "build-first-robot",
    title: "Build Your First Robot",
    club: "ISNT × ISAMPE Student Chapters",
    clubId: "isnt-isampe",
    clubLogo: "/images/chapters/isnt-isampe.png",
    category: "Workshop",
    tagline: "Hands-on robotics hardware assembly & arena racing",
    description: "Assemble an autonomous obstacle-avoiding bot from scratch. Learn DC geared motors, motor drivers, Arduino Uno microcontrollers, ultrasonic sensors, and race in the custom obstacle arena.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹1,000",
      second: "₹800",
      third: "₹500",
    },
    teamSize: "Solo or Team (2–4)",
    registrationFee: {
      hitam: "₹120 (Solo) / ₹250 (Team)",
      nonHitam: "₹120 (Solo) / ₹250 (Team)",
      perTeam: true,
      note: "Individual: ₹120 | Team (2–4): ₹250",
    },
    highlights: [
      "₹5,000 Prize Pool",
      "1st: ₹1,000 | 2nd: ₹800 | 3rd: ₹500",
      "Individual (₹120) & Team (₹250)",
      "Complete Robot Kit Provided",
      "Obstacle Arena Battle"
    ],
    coordinators: {
      students: [
        { name: "Bipul Kumar Yadav", phone: "7093346820", email: "23e51a0301@hitam.org" },
        { name: "Narendra Reddy", phone: "7981427446", email: "24e55a0325@hitam.org" }
      ],
      faculty: {
        name: "Mr. Deepak Kumar Singh & Mr. P. Bhaskar Rao",
        phone: "8982930521",
        email: "deepakkumarsingh.mech@hitam.org"
      },
    },
  },
  {
    id: "technical-tambola",
    slug: "technical-tambola",
    title: "Technical Tambola",
    club: "CSI Student Chapter",
    clubId: "csi",
    clubLogo: "/images/chapters/csi-hitam.png",
    category: "Gaming & Coding",
    tagline: "Classic Tambola electrified with computer science trivia & code clues",
    description: "A fast-paced technical party game. Crack CS theory clues, identify runtime complexity riddles, solve syntax debug puzzles, and claim instant cash rewards on your technical game card.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "11:00 AM – 2:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹1,200",
    prizeBreakup: {
      first: "₹600",
      second: "₹400",
      third: "₹200",
    },
    teamSize: "Solo (Individual)",
    registrationFee: {
      hitam: "₹50 / participant",
      nonHitam: "₹60 / participant",
      perTeam: false,
      note: "Solo Participation | Registration: ₹50 (HITAM) / ₹60 (Non-Hitam)",
    },
    highlights: ["₹1,200 Cash Prize Pool", "1st: ₹600 | 2nd: ₹400 | 3rd: ₹200", "Solo CS Trivia Battle", "Rapid Tech Trivia Clues", "Instant Cash Prizes"],
    coordinators: {
      students: [{ name: "CSI Student Lead", phone: "9059111595", email: "ssg@hitam.org" }],
      faculty: { name: "Faculty Advisor (CSI)", phone: "9059111595", email: "ssg@hitam.org" },
    },
  },
  {
    id: "code-casino",
    slug: "code-casino",
    title: "Code Casino",
    club: "CSI Student Chapter",
    clubId: "csi",
    clubLogo: "/images/chapters/csi-hitam.png",
    category: "Gaming & Coding",
    tagline: "Wager chips on code optimization, speed debugging & logic duels",
    description: "High-stakes competitive coding game organized by CSI Student Chapter. Place strategic chip wagers on code optimization rounds, guess asymptotic complexities, debug under pressure, and maximize your chip stack.",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:30 AM – 3:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹10,000",
    prizeBreakup: {
      first: "₹5,000",
      second: "₹3,000",
      third: "₹2,000",
    },
    teamSize: "2–3 Members",
    registrationFee: {
      hitam: "₹50 / participant",
      nonHitam: "₹60 / participant",
      perTeam: false,
      note: "Team Size: 2–3 Members | Registration: ₹50 (HITAM) / ₹60 (Outside) per participant",
    },
    highlights: ["₹10,000 Cash Prize Pool", "1st: ₹5,000 | 2nd: ₹3,000 | 3rd: ₹2,000", "Teams of 2–3 Members", "Chip Wagering Mechanics", "High-Speed Code Duels", "Strategic Problem Solving"],
    coordinators: {
      students: [{ name: "CSI Student Lead", phone: "9059111595", email: "ssg@hitam.org" }],
      faculty: { name: "Faculty Advisor (CSI)", phone: "9059111595", email: "ssg@hitam.org" },
    },
  },
];

export interface EventTrack {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  tagline: string;
  accentColor: "orange" | "magenta" | "violet" | "cyan";
  highlights: string[];
}

export const EVENT_TRACKS: EventTrack[] = [
  {
    id: "hackathons",
    number: "01",
    title: "FLAGSHIP HACKATHONS",
    category: "INNOVATION & CODE",
    tagline: "Rapid prototyping & collaborative engineering",
    shortDescription:
      "High-energy collaborative arenas including the Reverse Hackathon and Agentic AI Hackathon with ₹20,000+ in prize pools.",
    accentColor: "orange",
    highlights: ["Reverse Hackathon", "Agentic AI Hackathon", "Live Prototype Showdown"],
  },
  {
    id: "competitions",
    number: "02",
    title: "TECHNICAL COMPETITIONS",
    category: "PROBLEM SOLVING",
    tagline: "Algorithmic challenges & coding sprints",
    shortDescription:
      "Competitive programming sprints, Code Casino, Kaggle challenges, and technical problem-solving duels testing speed and precision.",
    accentColor: "magenta",
    highlights: ["Programmers Got Talent", "Kaggle DataQuest", "Code Casino Stakes"],
  },
  {
    id: "robotics",
    number: "03",
    title: "ROBOTICS & MOTORSPORT",
    category: "AUTOMATION & SYSTEMS",
    tagline: "Autonomous bots & intelligent hardware",
    shortDescription:
      "Build Your First Robot and the grand TorqueX custom racing kart reveal with vehicle dynamics telemetry challenges.",
    accentColor: "violet",
    highlights: ["Build Your First Robot", "TorqueX Kart Reveal", "Vehicle Telemetry Sprint"],
  },
  {
    id: "workshops",
    number: "04",
    title: "WORKSHOPS & MASTERCLASSES",
    category: "LEARNING & COLLABORATION",
    tagline: "Hands-on tech talks & industry deep dives",
    shortDescription:
      "Hands-on technology masterclasses including Agentic AI and Smart Manufacturing led by practitioners exploring modern tech stacks.",
    accentColor: "cyan",
    highlights: ["Agentic AI Workshop", "Smart Manufacturing Lab", "Interactive Mentorship"],
  },
];
