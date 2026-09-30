import { Organizer } from "@/types";

/**
 * ESPARTO 2026 - Master Organizing Committee Data Store
 */

export const facultyCoordinators: Organizer[] = [
  {
    id: "dr-bindu-madhavi",
    name: "Dr. Bindu Madhavi",
    role: "Faculty Coordinator",
    department: "Electronics & Communication Engineering (ECE)",
    teamDomain: "faculty-coordinator",
    contact: "+91 91 6030 813 0",
    highlight: true,
    socials: {
      email: "bindum.ece@hitam.org",
      phone: "+919160308130"
    }
  },
  {
    id: "mr-p-praveen",
    name: "Mr. P. Praveen",
    role: "Faculty Coordinator",
    department: "Mechanical Engineering (MECH)",
    teamDomain: "faculty-coordinator",
    highlight: true,
    socials: {
      email: "praveenp.mech@hitam.org"
    }
  }
];

export const ssgLeadership: Organizer[] = [
  {
    id: "tejal-iiic",
    name: "Tejal",
    role: "Student Dean — IIIC & Lead Fest Organizer",
    department: "Industry Institute Incubation Centre (IIIC)",
    teamDomain: "lead-organizer",
    contact: "+91 90591 11595",
    highlight: true,
    socials: {
      email: "ssg.iiic@hitam.org",
      phone: "+919059111595"
    }
  },
  {
    id: "student-director",
    name: "Student Director",
    role: "Director of Student Self Governance",
    department: "Student Self Governance (SSG)",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.director@hitam.org"
    }
  },
  {
    id: "student-principal",
    name: "Student Principal",
    role: "Head of Student Governance Council",
    department: "Student Self Governance (SSG)",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.principal@hitam.org"
    }
  },
  {
    id: "student-registrar",
    name: "Student Registrar",
    role: "Registrar — Student Administration",
    department: "Student Self Governance (SSG)",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.registrar@hitam.org"
    }
  },
  {
    id: "student-dean-academics",
    name: "Student Dean — Academics",
    role: "Dean of Academic Affairs",
    department: "Academic Affairs Council",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.deanacademics@hitam.org"
    }
  },
  {
    id: "student-dean-freshmen",
    name: "Student Dean — Freshmen",
    role: "Dean of Freshmen Engineering",
    department: "Freshmen Engineering Council",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.deanfreshmen@hitam.org"
    }
  },
  {
    id: "student-lead-se",
    name: "Student Lead — SE",
    role: "Lead — Student Engagement",
    department: "Student Engagement & Activities",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.se@hitam.org"
    }
  },
  {
    id: "student-dean-cdc",
    name: "Student Dean — CDC",
    role: "Dean of Career Development Centre",
    department: "Career Development Centre (CDC)",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.cdc@hitam.org"
    }
  },
  {
    id: "student-dean-sports",
    name: "Student Dean — Sports",
    role: "Dean of Sports & Athletics Council",
    department: "Sports Council",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.sports@hitam.org"
    }
  },
  {
    id: "student-dean-rand",
    name: "Student Dean — R&D",
    role: "Dean of Research & Development",
    department: "Research & Development Council",
    teamDomain: "student-leadership",
    socials: {
      email: "ssg.rand@hitam.org"
    }
  }
];

export const chapterCommittees: Organizer[] = [
  {
    id: "iucee-ewb-core",
    name: "IUCEE EWB HITAM",
    role: "Technical Chapter Core Committee",
    department: "Engineers Without Borders",
    teamDomain: "chapter-committee",
    image: "/images/chapters/iucee-ewb-hitam.png"
  },
  {
    id: "ieee-core",
    name: "IEEE Student Branch HITAM",
    role: "Technical Chapter Core Committee",
    department: "IEEE HITAM",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieee-hitam.png"
  },
  {
    id: "ieom-core",
    name: "IEOM HITAM Student Chapter",
    role: "Technical Chapter Core Committee",
    department: "Industrial Engineering & Operations",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieom-hitam.png"
  },
  {
    id: "csi-core",
    name: "CSI HITAM Chapter",
    role: "Technical Chapter Core Committee",
    department: "Computer Society of India",
    teamDomain: "chapter-committee",
    image: "/images/chapters/csi-hitam.png"
  },
  {
    id: "gdg-core",
    name: "GDG on Campus",
    role: "Developer Community Core Committee",
    department: "Google Developer Groups",
    teamDomain: "chapter-committee",
    image: "/images/chapters/gdg-hitam.png"
  },
  {
    id: "minds-core",
    name: "MINDS Club",
    role: "Data Science Society Core Committee",
    department: "Data Science & AI",
    teamDomain: "chapter-committee",
    image: "/images/chapters/minds-hitam.png"
  },
  {
    id: "hitam-ai-core",
    name: "HITAM AI Club",
    role: "Artificial Intelligence Core Committee",
    department: "AI & Neural Systems",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-ai.png"
  },
  {
    id: "hitam-coding-core",
    name: "HITAM Coding Club",
    role: "Competitive Coding Core Committee",
    department: "Algorithms & Competitive Programming",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-coding-club.png"
  },
  {
    id: "hhc-core",
    name: "HITAM Hackathon Club (HHC)",
    role: "Hackathon Track Core Committee",
    department: "Product Prototyping & Hackathons",
    teamDomain: "chapter-committee",
    image: "/images/chapters/HHC.jpg"
  },
  {
    id: "isampe-core",
    name: "ISAMPE Chapter",
    role: "Technical Chapter Core Committee",
    department: "Materials & Process Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ISAMPE.png"
  },
  {
    id: "torquex-core",
    name: "TorqueX Motorsport",
    role: "Technical Club Core Committee",
    department: "Automotive & EV Prototyping",
    teamDomain: "chapter-committee",
    image: "/images/chapters/torquex-logo.jpg"
  }
];

export const teamData: Organizer[] = [
  ...facultyCoordinators,
  ...ssgLeadership,
  ...chapterCommittees
];

