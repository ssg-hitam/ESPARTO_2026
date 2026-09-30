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
    role: "Student Dean — IIIC",
    department: "Student Organizing Core",
    teamDomain: "lead-organizer",
    contact: "+91 90591 11595",
    highlight: true,
    handling: "Overall Fest Direction, Lead Coordination, Industry Partnerships & Corporate Relations",
    socials: {
      email: "ssg.iiic@hitam.org",
      phone: "+919059111595"
    }
  },
  {
    id: "student-director",
    name: "Student Director",
    role: "Student Director",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Fest Strategy, High-Level Resource Planning & Inter-Wing Alignment",
    socials: {
      email: "ssg.director@hitam.org"
    }
  },
  {
    id: "student-principal",
    name: "Student Principal",
    role: "Student Principal",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Institutional Protocol, Departmental Synergy & Fest Governance",
    socials: {
      email: "ssg.principal@hitam.org"
    }
  },
  {
    id: "student-registrar",
    name: "Student Registrar",
    role: "Student Registrar",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Administrative Approvals, Logistics Clearances & Official Permissions",
    socials: {
      email: "ssg.registrar@hitam.org"
    }
  },
  {
    id: "student-dean-academics",
    name: "Student Dean — Academics",
    role: "Student Dean — Academics",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Technical Symposiums, Paper Presentations & Faculty Jury Coordination",
    socials: {
      email: "ssg.deanacademics@hitam.org"
    }
  },
  {
    id: "student-dean-freshmen",
    name: "Student Dean — Freshmen",
    role: "Student Dean — Freshmen",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "First-Year Student Participation, Induction Arenas & Volunteer Mobilization",
    socials: {
      email: "ssg.deanfreshmen@hitam.org"
    }
  },
  {
    id: "student-lead-se",
    name: "Student Lead — SE",
    role: "Student Lead — Student Engagement",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Campus Ambience, Engagement Zones, Informal Challenges & Student Experience",
    socials: {
      email: "ssg.se@hitam.org"
    }
  },
  {
    id: "student-dean-cdc",
    name: "Student Dean — CDC",
    role: "Student Dean — CDC",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Career Conclaves, Tech Talks, Industry Networking & Sponsor Recruitment Booths",
    socials: {
      email: "ssg.cdc@hitam.org"
    }
  },
  {
    id: "student-dean-sports",
    name: "Student Dean — Sports",
    role: "Student Dean — Sports",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Esports Tournaments, Arena Sports Activities & Outdoor Team Dynamics",
    socials: {
      email: "ssg.sports@hitam.org"
    }
  },
  {
    id: "student-dean-rand",
    name: "Student Dean — R&D",
    role: "Student Dean — R&D",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Flagship Hackathons, Tech Prototype Expos & Patent/Innovation Showcases",
    socials: {
      email: "ssg.rand@hitam.org"
    }
  }
];

export const chapterCommittees: Organizer[] = [
  {
    id: "iucee-ewb-core",
    name: "IUCEE EWB HITAM",
    role: "Engineers Without Borders",
    department: "Sustainable Engineering Chapter",
    teamDomain: "chapter-committee",
    image: "/images/chapters/iucee-ewb-hitam.png"
  },
  {
    id: "ieee-core",
    name: "IEEE Student Branch HITAM",
    role: "IEEE Student Branch",
    department: "Electrical & Electronics Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieee-hitam.png"
  },
  {
    id: "ieom-core",
    name: "IEOM HITAM Student Chapter",
    role: "Operations & Industrial Engineering",
    department: "Industrial Engineering Society",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieom-hitam.png"
  },
  {
    id: "csi-core",
    name: "CSI HITAM Chapter",
    role: "Computer Society of India",
    department: "Computer Science & Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/csi-hitam.png"
  },
  {
    id: "gdg-core",
    name: "GDG on Campus",
    role: "Google Developer Groups",
    department: "Cloud, Web & Mobile Ecosystem",
    teamDomain: "chapter-committee",
    image: "/images/chapters/gdg-hitam.png"
  },
  {
    id: "minds-core",
    name: "MINDS Club",
    role: "Data Science & Analytics",
    department: "Machine Learning & Big Data",
    teamDomain: "chapter-committee",
    image: "/images/chapters/minds-hitam.png"
  },
  {
    id: "hitam-ai-core",
    name: "HITAM AI Club",
    role: "Artificial Intelligence",
    department: "Generative AI & Neural Networks",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-ai.png"
  },
  {
    id: "hitam-coding-core",
    name: "HITAM Coding Club",
    role: "Competitive Programming",
    department: "Data Structures & Algorithms",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-coding-club.png"
  },
  {
    id: "hhc-core",
    name: "HITAM Hackathon Club (HHC)",
    role: "Hackathons & Rapid Prototyping",
    department: "Product Building & Ideation",
    teamDomain: "chapter-committee",
    image: "/images/chapters/HHC.jpg"
  },
  {
    id: "isampe-core",
    name: "ISAMPE Chapter",
    role: "Materials & Process Engineering",
    department: "Advanced Engineering Materials",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ISAMPE.png"
  },
  {
    id: "torquex-core",
    name: "TorqueX Motorsport",
    role: "Automotive & EV Prototyping",
    department: "Vehicle Design & Racing",
    teamDomain: "chapter-committee",
    image: "/images/chapters/torquex-logo.jpg"
  }
];

export interface OperationalLead {
  id: string;
  committee: string;
  leads: string;
  description: string;
  tag?: string;
}

export const operationalCommittees: OperationalLead[] = [
  {
    id: "dec-design",
    committee: "Decoration & Design",
    leads: "Mavya & Vennela",
    description: "Atmosphere design, creative stage backdrops, entrance arches, installations, and visual aesthetic."
  },
  {
    id: "sponsorships",
    committee: "Sponsorships & Partnerships",
    leads: "All of US",
    description: "Corporate sponsor outreach, brochure dissemination, pitch presentations, and partner deliverable tracking.",
    tag: "Collective Effort"
  },
  {
    id: "finance-stalls",
    committee: "Finance / Stall Management",
    leads: "Harsith",
    description: "Budget allocations, commercial tech/food stall management, invoices, and accounting compliance."
  },
  {
    id: "discipline",
    committee: "Discipline & Campus Protocol",
    leads: "Abhinav",
    description: "Campus code of conduct, volunteer security coordination, crowd management, and delegate discipline."
  },
  {
    id: "stage-quality",
    committee: "Stage Management / Program Quality",
    leads: "Bhavya",
    description: "Auditorium scheduling, VIP felicitation protocols, acoustic & screen quality, and live run-of-show."
  },
  {
    id: "registrations",
    committee: "Registrations & Delegate Desk",
    leads: "Hemanth",
    description: "Unstop pass accreditation, QR barcode check-ins, delegate badge kits, and query resolution desks."
  },
  {
    id: "media-photo",
    committee: "Photography & Videography",
    leads: "Branding / Photography Club",
    description: "Official aftermovie production, live event photo coverage, keynote captures, and drone videography."
  },
  {
    id: "public-relations",
    committee: "Public Relations (PR) & Outreach",
    leads: "Sriya",
    description: "Inter-college communication, media communications, campus ambassador network, and press relations."
  },
  {
    id: "logistics",
    committee: "Logistics & Infrastructure",
    leads: "Mahesh & Sreeram",
    description: "Stage hardware, equipment procurement, electrical/network backbone, venue setup, and transport."
  }
];

export const teamData: Organizer[] = [
  ...facultyCoordinators,
  ...ssgLeadership,
  ...chapterCommittees
];

