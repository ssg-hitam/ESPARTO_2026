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
    domain: "Engineering Education & Global Impact",
    logo: "/images/chapters/iucee-ewb-hitam.png",
    description: "Indo Universal Collaboration for Engineering Education & Engineers Without Borders",
  },
  {
    id: "ieee",
    name: "IEEE Student Branch HITAM",
    shortName: "IEEE HITAM",
    category: "Technical Chapter",
    domain: "Computing & Electrical Engineering",
    logo: "/images/chapters/ieee-hitam.png",
    description: "Institute of Electrical and Electronics Engineers Student Branch",
  },
  {
    id: "ieom",
    name: "IEOM HITAM Student Chapter",
    shortName: "IEOM HITAM",
    category: "Technical Chapter",
    domain: "Industrial & Operations Management",
    logo: "/images/chapters/ieom-hitam.png",
    description: "Industrial Engineering and Operations Management Society",
  },
  {
    id: "csi",
    name: "Computer Society of India - HITAM Student Chapter",
    shortName: "CSI HITAM",
    category: "Technical Chapter",
    domain: "Computer Science & Information Technology",
    logo: "/images/chapters/csi-hitam.png",
    description: "Computer Society of India Student Chapter at HITAM",
  },
  {
    id: "gdg",
    name: "Google Developer Groups On Campus",
    shortName: "GDG on Campus",
    category: "Developer Community",
    domain: "Cloud, Mobile & AI Technologies",
    logo: "/images/chapters/gdg-hitam.png",
    description: "Google Developer Groups on Campus student tech community",
  },
  {
    id: "minds",
    name: "MINDS Club",
    shortName: "MINDS Club",
    category: "Technical Club",
    domain: "Data Science & Artificial Intelligence",
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
    name: "Coding Club",
    shortName: "Coding Club",
    category: "Technical Club",
    domain: "Algorithms, Competitive Programming & Dev",
    logo: "/images/chapters/hitam-coding-club.png",
    description: "Premier coding and algorithmic problem solving club at HITAM",
  },
];


