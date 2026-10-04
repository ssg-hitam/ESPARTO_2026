/**
 * ESPARTO 2026 — Verified Technical Chapters & Student Bodies
 * Official partner chapters and clubs participating in ESPARTO 2026 at HITAM.
 */

export interface TechnicalChapter {
  id: string;
  name: string;
  shortName: string;
  category: "Technical Chapter" | "Student Society" | "Developer Community" | "Technical Club";
  domain: string;
  logo: string;
  description: string;
}

export const TECHNICAL_CHAPTERS: TechnicalChapter[] = [
  {
    id: "iucee-ewb",
    name: "IUCEE EWB HITAM Student Chapter",
    shortName: "IUCEE EWB HITAM",
    category: "Technical Chapter",
    domain: "Engineers Without Borders",
    logo: "/images/chapters/iucee-ewb-hitam.png",
    description: "Indo Universal Collaboration for Engineering Education & Engineers Without Borders",
  },
  {
    id: "ieee",
    name: "IEEE Student Branch HITAM",
    shortName: "IEEE HITAM",
    category: "Technical Chapter",
    domain: "Institute of Electrical and Electronics Engineers",
    logo: "/images/chapters/ieee-hitam.png",
    description: "Institute of Electrical and Electronics Engineers Student Branch",
  },
  {
    id: "ieom",
    name: "IEOM HITAM Student Chapter",
    shortName: "IEOM HITAM",
    category: "Technical Chapter",
    domain: "Industrial Engineering & Operations Management",
    logo: "/images/chapters/ieom-hitam.png",
    description: "Industrial Engineering and Operations Management Society",
  },
  {
    id: "csi",
    name: "Computer Society of India - HITAM Student Chapter",
    shortName: "CSI HITAM",
    category: "Technical Chapter",
    domain: "Computer Society of India",
    logo: "/images/chapters/csi-hitam.png",
    description: "Computer Society of India Student Chapter at HITAM",
  },
  {
    id: "gdg",
    name: "Google Developer Groups On Campus",
    shortName: "GDG on Campus",
    category: "Developer Community",
    domain: "Google Developer Student Community",
    logo: "/images/chapters/gdg-hitam.png",
    description: "Google Developer Groups on Campus student tech community",
  },
  {
    id: "minds",
    name: "MINDS Club",
    shortName: "MINDS Club",
    category: "Technical Club",
    domain: "Modern Innovation for Next-Gen Data-Science Society",
    logo: "/images/chapters/minds-hitam.png",
    description: "Modern Innovation for Next-Gen Data-Science Society",
  },
  {
    id: "hitam-ai",
    name: "HITAM AI Club",
    shortName: "HITAM AI Club",
    category: "Technical Club",
    domain: "Artificial Intelligence & Neural Systems",
    logo: "/images/chapters/hitam-ai.png",
    description: "HITAM Artificial Intelligence Club for machine learning & deep tech innovations",
  },
  {
    id: "hitam-coding-club",
    name: "HITAM Coding Club",
    shortName: "Coding Club",
    category: "Technical Club",
    domain: "Algorithms & Competitive Programming",
    logo: "/images/chapters/hitam-coding-club.png",
    description: "Premier coding and algorithmic problem solving club at HITAM",
  },
  {
    id: "hhc",
    name: "HITAM Hackathon Club",
    shortName: "HHC",
    category: "Technical Club",
    domain: "HITAM Hackathon Club",
    logo: "/images/chapters/HHC.jpg",
    description: "HITAM Hackathon Club - competitive coding, ideation & product hackathons",
  },
  {
    id: "isampe",
    name: "ISAMPE HITAM Chapter",
    shortName: "ISAMPE",
    category: "Technical Chapter",
    domain: "Advancement of Materials & Process Engineering",
    logo: "/images/chapters/ISAMPE.png",
    description: "Indian Society for the Advancement of Materials and Process Engineering",
  },
  {
    id: "isnt",
    name: "ISNT HITAM Student Chapter",
    shortName: "ISNT",
    category: "Technical Chapter",
    domain: "Non-Destructive Testing",
    logo: "/images/chapters/isnt.png",
    description: "Indian Society for Non-Destructive Testing",
  },
  {
    id: "torquex",
    name: "TorqueX - MotorSport Club of HITAM",
    shortName: "TorqueX",
    category: "Technical Club",
    domain: "MotorSport Club of HITAM",
    logo: "/images/chapters/torquex-logo.jpg",
    description: "TorqueX - MotorSport Club of HITAM: automotive engineering, EV prototyping & racing",
  },
];

