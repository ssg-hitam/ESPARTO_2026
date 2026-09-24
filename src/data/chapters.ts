/**
 * ESPARTO 2026 — Verified Technical Chapters & Student Bodies
 * Official partner chapters and clubs participating in ESPARTO 2026 at HITAM.
 */

export interface TechnicalChapter {
  id: string;
  name: string;
  shortName: string;
  category: "Technical Chapter" | "Student Society" | "Developer Community";
  logo: string;
  description?: string;
}

export const TECHNICAL_CHAPTERS: TechnicalChapter[] = [
  {
    id: "iucee-ewb",
    name: "IUCEE-EWB HITAM Student Chapter",
    shortName: "IUCEE-EWB",
    category: "Technical Chapter",
    logo: "/images/chapters/iucee-ewb-hitam.png",
    description: "Indo Universal Collaboration for Engineering Education & Engineers Without Borders",
  },
  {
    id: "ieee",
    name: "IEEE Student Branch HITAM",
    shortName: "IEEE",
    category: "Technical Chapter",
    logo: "/images/chapters/ieee-hitam.png",
    description: "Institute of Electrical and Electronics Engineers Student Branch",
  },
  {
    id: "ieom",
    name: "IEOM HITAM Student Chapter",
    shortName: "IEOM",
    category: "Technical Chapter",
    logo: "/images/chapters/ieom-hitam.png",
    description: "Industrial Engineering and Operations Management Society",
  },
  {
    id: "gdg",
    name: "Google Developer Groups On Campus • HITAM",
    shortName: "GDG on Campus",
    category: "Developer Community",
    logo: "/images/chapters/gdg-hitam.png",
    description: "Google Developer Groups on Campus student tech community",
  },
  {
    id: "minds",
    name: "MINDS",
    shortName: "MINDS",
    category: "Student Society",
    logo: "/images/chapters/minds-hitam.png",
    description: "Modern Innovation for Next-Gen Data-Science Society",
  },
];
