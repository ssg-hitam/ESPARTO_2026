/**
 * ESPARTO 2026 - Master Event & Track Experience Data Store
 * Structured for the interactive Event Explorer.
 * Official rulebooks, exact timing, and registration links can be plugged in when provided.
 */

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
    title: "FLAGSHIP HACKATHON",
    category: "INNOVATION & CODE",
    tagline: "Rapid prototyping & collaborative engineering",
    shortDescription:
      "A high-energy collaborative arena where developers, designers, and innovators unite to architect scalable technological solutions for real-world industry challenges.",
    accentColor: "orange",
    highlights: ["24-Hour Intensive Build", "Industry Mentorship", "Prototype Demonstration"],
  },
  {
    id: "competitions",
    number: "02",
    title: "TECHNICAL COMPETITIONS",
    category: "PROBLEM SOLVING",
    tagline: "Algorithmic challenges & coding sprints",
    shortDescription:
      "Competitive programming sprints, system design showdowns, and technical problem-solving duels testing speed, optimization, and analytical precision.",
    accentColor: "magenta",
    highlights: ["Speed Coding", "Algorithm Optimization", "System Architecture"],
  },
  {
    id: "robotics",
    number: "03",
    title: "ROBOTICS & HARDWARE",
    category: "AUTOMATION & SYSTEMS",
    tagline: "Autonomous bots & intelligent hardware",
    shortDescription:
      "A dedicated battleground for autonomous robotics, circuit design, embedded systems, and cutting-edge hardware prototyping.",
    accentColor: "violet",
    highlights: ["Autonomous Navigation", "Circuit Design", "Embedded Prototyping"],
  },
  {
    id: "workshops",
    number: "04",
    title: "WORKSHOPS & MASTERCLASSES",
    category: "LEARNING & COLLABORATION",
    tagline: "Hands-on tech talks & industry deep dives",
    shortDescription:
      "Hands-on technology masterclasses led by practitioners, exploring emerging frontiers in AI, cloud computing, cyber architecture, and modern web systems.",
    accentColor: "cyan",
    highlights: ["Hands-on Labs", "Emerging Tech Stacks", "Interactive Q&A"],
  },
];
