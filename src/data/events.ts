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
  featured?: boolean;
  unstopUrl?: string;
}

export const FEST_EVENTS: FestEventItem[] = [
  {
    id: "ieee-ideathon",
    slug: "ieee-ideathon",
    title: "IEEE National Ideathon",
    club: "IEEE Student Branch HITAM",
    clubId: "ieee",
    clubLogo: "/images/chapters/ieee-hitam.png",
    category: "Ideathon",
    tagline: "The flagship innovation stage of ESPARTO 2026",
    description: "Pitch transformative engineering concepts across clean energy, computing systems, healthcare, and robotics before an esteemed jury of industry practitioners and researchers.",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
    timings: "9:30 AM – 4:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹30,000",
    teamSize: "3–4 Members",
    registrationFee: {
      hitam: "₹200 (IEEE Member)",
      nonHitam: "₹300 (Non-IEEE / Other Colleges)",
      perTeam: true,
      note: "Includes official IEEE certificate & delegate kit",
    },
    highlights: ["₹30,000 Mega Cash Pool", "National Jury Evaluation", "Incubation Fast-Track Opportunity"],
    featured: true,
  },
  {
    id: "reverse-hackathon",
    slug: "reverse-hackathon",
    title: "Reverse Hackathon",
    club: "HHC × IUCEE-EWB",
    clubId: "hhc",
    clubLogo: "/images/chapters/HHC.jpg",
    category: "Hackathon",
    tagline: "Deconstruct, debug, and rebuild systems in reverse",
    description: "A high-intensity reverse engineering battle. Teams deconstruct complex production software/hardware stacks, identify critical performance bottlenecks, and architect superior re-engineered solutions.",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
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
    },
    highlights: ["₹10,000 Cash Prizes", "System Architecture Deconstruction", "Live Prototype Showdown"],
    featured: true,
  },
  {
    id: "agentic-ai-hackathon",
    slug: "agentic-ai-hackathon",
    title: "Agentic AI Hackathon",
    club: "GDG on Campus",
    clubId: "gdg",
    clubLogo: "/images/chapters/gdg-hitam.png",
    category: "Hackathon",
    tagline: "Build autonomous multi-agent AI ecosystems",
    description: "Architect and deploy autonomous AI agents capable of planning, tool-calling, and solving multi-step real-world workflows using modern LLM APIs, LangGraph, and vector memory.",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
    timings: "9:30 AM – 4:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹10,000",
    prizeBreakup: {
      first: "₹5,000",
      second: "₹3,000",
      third: "₹2,000",
    },
    teamSize: "2–4 Members",
    registrationFee: {
      hitam: "₹150 / participant",
      nonHitam: "₹150 / participant",
      perTeam: false,
    },
    highlights: ["₹10,000 Cash Prizes", "Multi-Agent System Builds", "Google Developer Mentorship"],
    featured: true,
  },
  {
    id: "agentic-ai-workshop",
    slug: "agentic-ai-workshop",
    title: "Agentic AI Workshop",
    club: "GDG on Campus",
    clubId: "gdg",
    clubLogo: "/images/chapters/gdg-hitam.png",
    category: "Workshop",
    tagline: "Hands-on masterclass in autonomous agent architectures",
    description: "Deep-dive practical workshop covering LLM reasoning loops, tool-calling abstractions, state graphs, multi-agent communication, and deploying production-ready agentic pipelines.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "9:30 AM – 1:00 PM",
    venue: "HITAM Campus",
    prizePool: "Certifications & GDG Kits",
    teamSize: "Solo or Team of 2–4",
    registrationFee: {
      hitam: "₹150 / participant",
      nonHitam: "₹150 / participant",
      perTeam: false,
    },
    highlights: ["Live Code Masterclass", "Hands-on API Labs", "Official GDG Delegate Certification"],
  },
  {
    id: "programmers-got-talent",
    slug: "programmers-got-talent",
    title: "Programmers Got Talent",
    club: "HHC × IUCEE-EWB",
    clubId: "hhc",
    clubLogo: "/images/chapters/HHC.jpg",
    category: "Gaming & Coding",
    tagline: "Speed coding, blind syntax rounds & algorithmic showdowns",
    description: "An electrifying high-speed coding battle: blind syntax rounds, obscure runtime bug hunts, algorithmic sprint races, and rapid-fire problem solving under tournament pressure.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "1:30 PM – 4:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹3,000",
      second: "₹2,000",
    },
    teamSize: "Solo",
    registrationFee: {
      hitam: "₹150 / participant",
      nonHitam: "₹150 / participant",
      perTeam: false,
    },
    highlights: ["₹5,000 Cash Pool", "Blind Coding Arenas", "Live Leaderboard Tracking"],
  },
  {
    id: "smart-manufacturing-challenge",
    slug: "smart-manufacturing-challenge",
    title: "Smart Manufacturing Challenge",
    club: "IEOM HITAM Chapter",
    clubId: "ieom",
    clubLogo: "/images/chapters/ieom-hitam.png",
    category: "Challenge",
    tagline: "Industry 4.0, lean automation & factory optimization",
    description: "Dive into smart factory operations, digital twins, IoT automation, and supply chain telemetry. Solve authentic industrial production bottlenecks under real operational constraints.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹10,000 Track Pool",
    prizeBreakup: {
      first: "₹1,000",
      second: "₹800",
      third: "₹600",
    },
    teamSize: "4 Members / Solo",
    registrationFee: {
      hitam: "₹99 / team (₹79 solo)",
      nonHitam: "₹149 / team (₹99 solo)",
      perTeam: true,
    },
    highlights: ["Industry 4.0 Simulation", "Operational Bottleneck Solves", "IEOM Merit Souvenirs"],
  },
  {
    id: "ieom-startup-pitch",
    slug: "ieom-startup-pitch",
    title: "IEOM Startup Pitch Challenge",
    club: "IEOM HITAM Chapter",
    clubId: "ieom",
    clubLogo: "/images/chapters/ieom-hitam.png",
    category: "Ideathon",
    tagline: "Pitch sustainable engineering ventures & business models",
    description: "Pitch viable hardware, software, or manufacturing startups before investor judges. Showcase unit economics, operational prototypes, and commercial viability roadmaps.",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:00 AM – 3:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹10,000 Track Pool",
    prizeBreakup: {
      first: "₹1,000",
      second: "₹800",
      third: "₹600",
    },
    teamSize: "4 Members / Solo",
    registrationFee: {
      hitam: "₹149 / team (₹79 solo)",
      nonHitam: "₹199 / team (₹99 solo)",
      perTeam: true,
    },
    highlights: ["Startup Deck Defenses", "Direct Investor Critiques", "Incubation Fast-Track"],
  },
  {
    id: "dataquest-kaggle",
    slug: "dataquest-kaggle",
    title: "DataQuest: Kaggle Challenge",
    club: "HITAM AI Club",
    clubId: "hitam-ai",
    clubLogo: "/images/chapters/hitam-ai.png",
    category: "Challenge",
    tagline: "Live machine learning competition on private Kaggle arena",
    description: "Compete in an intense Kaggle hackathon. Perform exploratory data analysis, engineer discriminative features, train neural networks, and climb the live private leaderboard.",
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
    },
    highlights: ["Live Private Kaggle Leaderboard", "Feature Engineering Duel", "High-Performance Compute"],
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
    },
    highlights: ["Event-Driven Pipelines", "No-Code / Low-Code AI", "Live Functional Demos"],
  },
  {
    id: "data-heist-datathon",
    slug: "data-heist-datathon",
    title: "DATA HEIST – Datathon",
    club: "MINDS Club",
    clubId: "minds",
    clubLogo: "/images/chapters/minds-hitam.png",
    category: "Challenge",
    tagline: "Infiltrate forensic datasets and decrypt corrupted timelines",
    description: "An investigative data science thriller. Teams analyze fragmented database dumps, decrypt corrupted communication logs, and assemble chronological forensics to crack the case.",
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
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
    },
    highlights: ["Forensic Data Investigation", "Cipher & Pattern Cracking", "Evidence Synthesis Showdown"],
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
    date: "Both Days (Oct 9–10)",
    dayNumber: 0,
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
    },
    highlights: ["Mystery Dossier Analysis", "Multi-Stage Clue Extraction", "Logical Deduction Defense"],
  },
  {
    id: "torquex-motorsport",
    slug: "torquex-motorsport",
    title: "TorqueX: From Garage to Grid & Kart Reveal",
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
      first: "₹2,500",
      second: "₹1,500",
      third: "₹1,000",
    },
    teamSize: "Individual or Teams",
    registrationFee: {
      hitam: "₹50 / participant (₹100 / team)",
      nonHitam: "₹70 / participant (₹140 / team)",
      perTeam: false,
    },
    highlights: ["Official Custom Kart Reveal", "Vehicle Telemetry Challenge", "Pit-Stop Design Duel"],
  },
  {
    id: "build-first-robot",
    slug: "build-first-robot",
    title: "Build Your First Robot",
    club: "ISAMPE Student Chapter",
    clubId: "isampe",
    clubLogo: "/images/chapters/ISAMPE.png",
    category: "Workshop",
    tagline: "Hands-on robotics hardware assembly & arena racing",
    description: "Assemble an autonomous obstacle-avoiding bot from scratch. Learn DC geared motors, motor drivers, Arduino Uno microcontrollers, ultrasonic sensors, and race in the custom obstacle arena.",
    date: "Day 1 (Oct 9)",
    dayNumber: 1,
    timings: "10:00 AM – 4:00 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹1,500",
      second: "₹1,000",
      third: "₹500",
    },
    teamSize: "Teams of 2–4",
    registrationFee: {
      hitam: "₹200 / team",
      nonHitam: "₹200 / team",
      perTeam: true,
    },
    highlights: ["Complete Robot Kit Provided", "Arduino Microcontroller Coding", "Obstacle Arena Battle"],
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
    teamSize: "Solo",
    registrationFee: {
      hitam: "₹50 / participant",
      nonHitam: "₹60 / participant",
      perTeam: false,
    },
    highlights: ["Rapid Tech Trivia Clues", "Instant Cash Prizes", "Fun Algorithmic Gaming"],
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
    description: "High-stakes competitive coding game. Place strategic chip wagers on code optimization rounds, guess asymptotic complexities, debug under pressure, and maximize your chip stack.",
    date: "Day 2 (Oct 10)",
    dayNumber: 2,
    timings: "10:30 AM – 3:30 PM",
    venue: "HITAM Campus",
    prizePool: "₹5,000",
    prizeBreakup: {
      first: "₹3,000",
      second: "₹2,000",
    },
    teamSize: "2–3 Members",
    registrationFee: {
      hitam: "₹50 / participant",
      nonHitam: "₹60 / participant",
      perTeam: false,
    },
    highlights: ["Chip Wagering Mechanics", "High-Speed Code Duels", "Strategic Problem Solving"],
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

