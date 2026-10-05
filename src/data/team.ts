import { Organizer } from "@/types";

/**
 * ESPARTO 2026 - Master Organizing Committee Data Store
 */

export const facultyCoordinators: Organizer[] = [
  {
    id: "mr-p-praveen",
    name: "Mr. P. Praveen",
    role: "Associate Professor",
    department: "Department of Mechanical Engineering",
    handling: "Convener – ESPARTO",
    affiliation: "HITAM, Hyderabad",
    biography: [
      "Associate Professor in the Department of Mechanical Engineering and Convener for ESPARTO 2026.",
    ],
    teamDomain: "convenor",
    contact: "+91 89190 46164",
    image: "/images/team/faculties/praveen-cutout.png",
    highlight: true,
    socials: {
      email: "praveenp.mech@hitam.org",
      phone: "+918919046164",
    },
  },
  {
    id: "dr-m-chiranjivi",
    name: "Dr. M. Chiranjivi",
    image: "/images/team/faculties/chiranjivi-cutout.png",
    role: "Associate Professor",
    department: "Department of Electrical & Electronics Engineering",
    handling: "Convener – ESPARTO",
    affiliation: "HITAM, Hyderabad",
    biography: [
      "Associate Professor in the Department of Electrical & Electronics Engineering and Convener for ESPARTO 2026.",
    ],
    teamDomain: "convenor",
    contact: "+91 83095 69407",
    socials: {
      email: "chiranjivi.eee@hitam.org",
      phone: "+918309569407",
    },
    highlight: true,
  },
];

export const ssgLeadership: Organizer[] = [
  {
    id: "tejal-iiic",
    name: "Tejal",
    role: "Student Dean — IIIC",
    department: "Student Organizing Core",
    teamDomain: "lead-organizer",
    contact: "+91 83282 32607",
    highlight: true,
    handling: "Overall Fest Direction, Lead Coordination & Sponsorships",
    image: "/images/team/ssg/Student_Dean_IIIC.png",
    socials: {
      email: "ssg.iiic@hitam.org",
      phone: "+918328232607",
    },
  },
  {
    id: "bhavya-director",
    name: "Bhavya",
    role: "Student Director",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Program Quality",
    image: "/images/team/ssg/Student_Director.png",
    contact: "+91 84592 94899",
    socials: {
      email: "ssg.director@hitam.org",
      phone: "+918459294899",
    },
  },
  {
    id: "sriya-principal",
    name: "Sriya",
    role: "Student Principal",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Public Relations (PR) & Outreach",
    image: "/images/team/ssg/Student_Principal.png",
    socials: {
      email: "ssg.principal@hitam.org",
    },
  },
  {
    id: "harsith-registrar",
    name: "Harshit",
    role: "Student Registrar",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Finance / Stall Management",
    image: "/images/team/ssg/Student_Registrar.png",
    contact: "+91 63046 11025",
    socials: {
      email: "ssg.registrar@hitam.org",
      phone: "+916304611025",
    },
  },
  {
    id: "sreeram-academics",
    name: "Sree Ram",
    role: "Student Dean — Academics",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Logistics & Infrastructure",
    image: "/images/team/ssg/Student_Dean_Academics.png",
    contact: "+91 91829 93049",
    socials: {
      email: "ssg.academics@hitam.org",
      phone: "+919182993049",
    },
  },
  {
    id: "hemanth-freshmen",
    name: "Hemanth Nayak",
    role: "Student Dean — Freshmen",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Website & Registrations",
    image: "/images/team/ssg/Student_Dean_Freshmen.png",
    contact: "+91 83282 32607",
    socials: {
      email: "ssg.deanfreshmen@hitam.org",
      phone: "+918328232607",
    },
  },
  {
    id: "mavya-se",
    name: "Mavyaa",
    role: "Student Dean — Student Engagement (SE)",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Decoration & Design",
    image: "/images/team/ssg/Student_Dean_SE.png",
    socials: {
      email: "ssg.se@hitam.org",
    },
  },
  {
    id: "vennela-cdc",
    name: "Vennela",
    role: "Student Dean — CDC",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Decoration & Design",
    image: "/images/team/ssg/Student_Dean_CDC.png",
    socials: {
      email: "ssg.cdc@hitam.org",
    },
  },
  {
    id: "mahesh-rand",
    name: "Mahesh",
    role: "Student Dean — R&D",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Logistics & Infrastructure",
    image: "/images/team/ssg/Student_Dean_R_D.png",
    contact: "+91 81259 32291",
    socials: {
      email: "ssg.randd@hitam.org",
      phone: "+918125932291",
    },
  },
  {
    id: "abhinav-sports",
    name: "Abhinav",
    role: "Student Dean — Sports",
    department: "Student Organizing Core",
    teamDomain: "student-leadership",
    handling: "Discipline & Campus Protocol",
    image: "/images/team/ssg/Student_Dean_Sports.png",
    contact: "+91 70132 24349",
    socials: {
      email: "ssg.sports@hitam.org",
      phone: "+917013224349",
    },
  },
];

export const chapterCommittees: Organizer[] = [
  {
    id: "iucee-ewb-core",
    name: "IUCEE EWB HITAM",
    role: "Engineers Without Borders",
    department: "Sustainable Engineering Chapter",
    teamDomain: "chapter-committee",
    image: "/images/chapters/iucee-ewb-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/iucee.ewb.hitam/"
    }
  },
  {
    id: "ieee-core",
    name: "IEEE Student Branch HITAM",
    role: "IEEE Student Branch",
    department: "Electrical & Electronics Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieee-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/ieee_hitam/"
    }
  },
  {
    id: "iete-core",
    name: "IETE HITAM Student Forum",
    role: "Electronics & Telecommunication",
    department: "Electronics & Telecommunication Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/iete-hitam.png",
  },
  {
    id: "ieom-core",
    name: "IEOM HITAM Student Chapter",
    role: "Operations & Industrial Engineering",
    department: "Industrial Engineering Society",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ieom-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/ieom_hitam/"
    }
  },
  {
    id: "csi-core",
    name: "CSI HITAM Chapter",
    role: "Computer Society of India",
    department: "Computer Science & Engineering",
    teamDomain: "chapter-committee",
    image: "/images/chapters/csi-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/csi_hitam/"
    }
  },
  {
    id: "gdg-core",
    name: "GDG on Campus",
    role: "Google Developer Groups",
    department: "Cloud, Web & Mobile Ecosystem",
    teamDomain: "chapter-committee",
    image: "/images/chapters/gdg-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/gdgoc.hitam/"
    }
  },
  {
    id: "minds-core",
    name: "MINDS Club",
    role: "Data Science & Analytics",
    department: "Machine Learning & Big Data",
    teamDomain: "chapter-committee",
    image: "/images/chapters/minds-hitam.png",
    socials: {
      instagram: "https://www.instagram.com/hitam_minds_club/"
    }
  },
  {
    id: "hitam-ai-core",
    name: "HITAM AI Club",
    role: "Artificial Intelligence",
    department: "Generative AI & Neural Networks",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-ai.png",
    socials: {
      instagram: "https://www.instagram.com/hitamaiclub/"
    }
  },
  {
    id: "hitam-coding-core",
    name: "HITAM Coding Club",
    role: "Competitive Programming",
    department: "Data Structures & Algorithms",
    teamDomain: "chapter-committee",
    image: "/images/chapters/hitam-coding-club.png",
    socials: {
      instagram: "https://www.instagram.com/coding_club_hitam/"
    }
  },
  {
    id: "hhc-core",
    name: "HITAM Hackathon Club (HHC)",
    role: "Hackathons & Rapid Prototyping",
    department: "Product Building & Ideation",
    teamDomain: "chapter-committee",
    image: "/images/chapters/HHC.jpg",
    socials: {
      instagram: "https://www.instagram.com/hitam_hackathon_club/"
    }
  },
  {
    id: "isampe-core",
    name: "ISAMPE Chapter",
    role: "Materials & Process Engineering",
    department: "Advanced Engineering Materials",
    teamDomain: "chapter-committee",
    image: "/images/chapters/ISAMPE.png",
    socials: {
      instagram: "https://www.instagram.com/isampe_hitam/"
    }
  },
  {
    id: "isnt-core",
    name: "ISNT HITAM Student Chapter",
    role: "Non-Destructive Testing",
    department: "Indian Society for Non-Destructive Testing",
    teamDomain: "chapter-committee",
    image: "/images/chapters/isnt.png",
  },
  {
    id: "torquex-core",
    name: "TorqueX Motorsport",
    role: "Automotive & EV Prototyping",
    department: "Vehicle Design & Racing",
    teamDomain: "chapter-committee",
    image: "/images/chapters/torquex-logo.jpg",
    socials: {
      instagram: "https://www.instagram.com/motorsportsclub.hitam/"
    }
  }
];

export interface EventSupportWing {
  id: string;
  name: string;
  lead: string;
  role: string;
  handling: string;
}

export const eventSupportWings: EventSupportWing[] = [
  {
    id: "media-photo",
    name: "Photography & Videography",
    lead: "Branding / Photography Club",
    role: "Media & Visual Documentation",
    handling: "Official aftermovie production, live event photo coverage, keynote captures, and drone videography."
  },
  {
    id: "sponsorships-collective",
    name: "Sponsorships & Partnerships",
    lead: "All of US (Organizing Committee)",
    role: "Collective Organizing Effort",
    handling: "Corporate sponsor outreach, pitch presentations, brochure dissemination, and partner deliverable tracking."
  }
];



export const teamData: Organizer[] = [
  ...facultyCoordinators,
  ...ssgLeadership,
  ...chapterCommittees
];
