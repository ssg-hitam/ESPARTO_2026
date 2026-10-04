/**
 * ESPARTO 2026 — paste this file into Code.gs and the companion into index.html.
 * SETUP: Create a NEW Google Sheet, then Extensions > Apps Script. Add Sheets API
 * v4 under Services (+). Paste both files. Run setupDatabase() as the owner and
 * approve Sheets/Drive access. Deploy as Web app: Execute as Me, access Anyone.
 * Use the deployment URL returned by Google; the requested hitam.org form is
 * https://script.google.com/a/macros/hitam.org/s/DEPLOYMENT_ID/exec?event=SLUG.
 * Test anonymous/external access: Workspace policy controls whether Anyone and
 * public Drive links are allowed. No URL format bypasses that policy.
 *
 * All four registration tabs are written in ONE atomic Sheets batchUpdate.
 * Drive is a separate service. Pending journals prevent uncertain commits from
 * being retried blindly. Never edit the machine JSON in payment Notes; append
 * human verification notes AFTER that JSON (or use the event DeskNotes column).
 * AmountPaid is the amount CLAIMED by the payer, not confirmed bank settlement.
 * See README.md for recovery, operator verification, and deployment smoke tests.
 */
var SPREADSHEET_ID = "1VXiNoRjIBImgb62MJQIS2WcU6SkIsJQdvejJiWSNbos"; // Registration database spreadsheet.
var DRIVE_FOLDER_NAME = "ESPARTO_2026_PAYMENT_SCREENSHOTS";
var MAX_PROOF_BYTES = 2 * 1024 * 1024;
var IEEE_URL = "https://script.google.com/a/macros/hitam.org/s/AKfycbwoVAJO1VLPibThDX3h5Sewj3HVaZkgGAenKgqiOb8SlhyhJgT6GRzjp4cx2aWlOXK41A/exec";
var CDN_BASE = "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/";
var HEADERS = {
  ALL_REGISTRATIONS: ["Timestamp", "RegID", "EventID", "EventName", "Chapter", "TeamName", "TeamSize", "LeadName", "LeadRoll", "LeadPhone", "LeadEmail", "Institution", "College", "TeammatesSummary", "CustomDetails", "AmountPaid", "CheckInStatus", "PaymentStatus", "UTR", "ScreenshotLink"],
  ALL_PAYMENTS_COLLECTION: ["Timestamp", "RegID", "EventName", "Chapter", "PayerName", "PayerPhone", "Amount", "Mode", "UTR", "DriveFileID", "ScreenshotLink", "VerificationStatus", "Notes"],
  ALL_MEMBERS_ROSTER: ["RegID", "EventName", "TeamName", "MemberIndex", "Role", "FullName", "RollNo", "BranchYear", "Email", "Phone", "College"]
};
var EVENT_HEADERS = ["Checkbox", "RegID", "Chapter", "EventName", "TeamName", "TeamSize", "LeadName", "LeadRoll", "Phone", "Email", "Institution", "College", "AllTeammates", "CustomAnswers", "AmountPaid", "UTR", "ProofLink", "DeskNotes"];
var EVENT_CATALOG = [
  {
    "id": "E01",
    "slug": "ieee-ideathon",
    "title": "INNOVISION (IEEE National Ideathon)",
    "club": "IEEE Student Branch HITAM",
    "category": "Ideathon",
    "minTeam": 3,
    "maxTeam": 4,
    "hitamFee": 199,
    "otherFee": 249,
    "feeModel": "person",
    "prize": 30000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieee-hitam.png",
    "sheetName": "[IEEE] IEEE National Ideathon",
    "themeColor": "#002855",
    "description": "Pitch transformative engineering concepts across clean energy, computing systems, healthcare, and robotics before an esteemed jury of industry practitioners and researchers.",
    "prizeBreakup": {
      "first": "₹15,000",
      "second": "₹10,000",
      "third": "₹5,000"
    },
    "studentContact": "Sai Sampada (+91 88793 41306, ieeesb@hitam.org)",
    "facultyContact": "Bindu Madhavi (+91 91603 08130, bindumadhavi.t@ieee.org)",
    "clubEmail": "",
    "date": "Both Days (Oct 9–10)",
    "timings": "9:30 AM – 4:30 PM",
    "venue": "HITAM, Gowdavelly"
  },
  {
    "id": "E02",
    "slug": "reverse-hackathon",
    "title": "Reverse Hackathon",
    "club": "HHC x IUCEE-EWB",
    "category": "Hackathon",
    "minTeam": 2,
    "maxTeam": 3,
    "hitamFee": 550,
    "otherFee": 600,
    "feeModel": "team",
    "prize": 10000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/hhc-iucee.png",
    "sheetName": "[HHC] Reverse Hackathon",
    "themeColor": "#7c3aed",
    "description": "A high-intensity reverse engineering battle. Teams deconstruct complex production software/hardware stacks, identify critical performance bottlenecks, and architect superior re-engineered solutions.",
    "prizeBreakup": {
      "first": "₹5,000",
      "second": "₹3,000",
      "third": "₹2,000"
    },
    "studentContact": "Ameena (9966864664, 24e51a6612@gmail.com), Kanishka (9494753922, 24e51a05b4@gmail.com), Alankrusha (9063412373, 24e51a6628@gmail.com), Charvitha (7675041666, 24e51a05k5@gmail.com)",
    "facultyContact": "D. Harikrishna (9490425130, associatedean.mdp@hitam.org), Santosh Naik (9980299366, santoshn.mech@hitam.org)",
    "clubEmail": "ewb@hitam.org",
    "date": "Day 1 (Oct 9)",
    "timings": "9:30 AM – 4:30 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E03",
    "slug": "agentic-ai-workshop-hackathon",
    "title": "Agentic AI Workshop & Hackathon",
    "club": "GDG on Campus HITAM",
    "category": "Hackathon",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 150,
    "otherFee": 150,
    "feeModel": "person",
    "prize": 10000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/gdg-hitam.png",
    "sheetName": "[GDG] Agentic AI Workshop & Hackathon",
    "themeColor": "#00629b",
    "description": "One two-day Agentic AI event by Google Developer Groups on Campus – HITAM. On October 9, learn AI agent fundamentals, reasoning, tool usage and multi-step workflows in an interactive, hands-on workshop. After the workshop, receive the problem statement and apply your learning by building a practical Agentic AI solution in a team of 2–4. Final submissions are due at noon on October 10, followed by evaluation and results. One ₹150 registration per participant includes both the workshop and hackathon.",
    "prizeBreakup": {
      "first": "₹5,000",
      "second": "₹3,000",
      "third": "₹2,000"
    },
    "studentContact": "Manik Manohar (9100834381, manikmanohar0@gmail.com), Dhanudeep (7569956911, kdhanudeep@gmail.com), Y Shamsmitha (7396933363, yshamsmitha@gmail.com)",
    "facultyContact": "D. Harikrishna (+91 94904 25130, associatedean.mdp@hitam.org)",
    "clubEmail": "gdgoncampus@hitam.org",
    "participationNote": "Individual registration for the workshop; hackathon teams of 2–4 are formed for the combined event. ₹150 per participant covers both days.",
    "venue": "Activity Block – 2nd/3rd Floor Classroom",
    "agenda": [
      {
        "label": "Day 1 · October 9",
        "detail": "9:30 AM–3:00 PM: interactive, hands-on Agentic AI workshop."
      },
      {
        "label": "Problem statement & development",
        "detail": "Problem statement released 3:00–4:00 PM on October 9; solution development starts after the workshop and continues until noon on October 10."
      },
      {
        "label": "Day 2 · October 10",
        "detail": "Final submission: 12:00 PM. Evaluation: 12:00–1:30 PM. Results & recognition: 2:30–3:30 PM."
      }
    ],
    "date": "Both Days (Oct 9–10)",
    "timings": "Oct 9: Workshop 9:30 AM–3:00 PM; development continues until Oct 10 noon • Evaluation 12:00–1:30 PM • Results 2:30–3:30 PM"
  },
  {
    "id": "E04",
    "slug": "programmers-got-talent",
    "title": "Programmers Got Talent",
    "club": "HHC x IUCEE-EWB",
    "category": "Gaming & Coding",
    "minTeam": 1,
    "maxTeam": 1,
    "hitamFee": 150,
    "otherFee": 150,
    "feeModel": "person",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/hhc-iucee.png",
    "sheetName": "[HHC] Programmers Got Talent",
    "themeColor": "#7c3aed",
    "description": "A stage-based showcase where students get the opportunity to demonstrate their software, hardware, coding, electronics, or other technical skills live. The goal is to make technical talent visible, engaging, and entertaining while giving students a platform to showcase what they can actually build.",
    "prizeBreakup": {
      "first": "₹3,000",
      "second": "₹2,000"
    },
    "studentContact": "Ameena (9966864664, 24e51a6612@gmail.com), Kanishka (9494753922, 24e51a05b4@gmail.com), Alankrusha (9063412373, 24e51a6628@gmail.com), Charvitha (7675041666, 24e51a05k5@gmail.com)",
    "facultyContact": "D. Harikrishna (9490425130, associatedean.mdp@hitam.org), Santosh Naik (9980299366, santoshn.mech@hitam.org)",
    "clubEmail": "ewb@hitam.org",
    "date": "Day 2 (Oct 10)",
    "timings": "10:00 AM – 1:30 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E05",
    "slug": "smart-manufacturing-challenge",
    "title": "Smart Manufacturing Challenge",
    "club": "IEOM HITAM",
    "category": "Challenge",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 200,
    "otherFee": 300,
    "feeModel": "team",
    "allowedTeamSizes": [
      1,
      4
    ],
    "soloHitamFee": 100,
    "soloOtherFee": 150,
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieom-hitam.png",
    "sheetName": "[IEOM] Smart Manufacturing Challenge",
    "themeColor": "#0f766e",
    "description": "Dive into smart factory operations, digital twins, IoT automation, and supply chain telemetry. Solve authentic industrial production bottlenecks under real operational constraints.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹1,500",
      "third": "₹1,000"
    },
    "studentContact": "Rishitha (+91 91210 14558, 24e51a66e1@hitam.org)",
    "facultyContact": "Praveen (+91 89190 46164, praveenp.mech@hitam.org)",
    "clubEmail": "ieom.hitam@gmail.com",
    "date": "Day 1 (Oct 9)",
    "timings": "10:00 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E06",
    "slug": "ieom-startup-pitch",
    "title": "IEOM Startup Pitch Challenge",
    "club": "IEOM HITAM",
    "category": "Ideathon",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 200,
    "otherFee": 300,
    "feeModel": "team",
    "allowedTeamSizes": [
      1,
      4
    ],
    "soloHitamFee": 100,
    "soloOtherFee": 150,
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieom-hitam.png",
    "sheetName": "[IEOM] Startup Pitch Challenge",
    "themeColor": "#0f766e",
    "description": "Pitch viable hardware, software, or manufacturing startups before investor judges. Showcase unit economics, operational prototypes, and commercial viability roadmaps.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹1,500",
      "third": "₹1,000"
    },
    "studentContact": "Rishitha (+91 91210 14558, 24e51a66e1@hitam.org)",
    "facultyContact": "Praveen (+91 89190 46164, praveenp.mech@hitam.org)",
    "clubEmail": "ieom.hitam@gmail.com",
    "date": "Day 2 (Oct 10)",
    "timings": "10:00 AM – 3:30 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E07",
    "slug": "dataquest-kaggle",
    "title": "DataQuest Kaggle Challenge",
    "club": "HITAM AI Club",
    "category": "Challenge",
    "minTeam": 2,
    "maxTeam": 2,
    "hitamFee": 300,
    "otherFee": 300,
    "feeModel": "team",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/hitam-ai.png",
    "sheetName": "[HITAM AI] DataQuest Kaggle Challenge",
    "themeColor": "#4338ca",
    "description": "Compete in an intense Kaggle hackathon. Perform exploratory data analysis, engineer discriminative features, train neural networks, and climb the live private leaderboard.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹1,500",
      "third": "₹1,000"
    },
    "studentContact": "MD Arif (+91 93902 19103, 23e51a6671@hitam.org)",
    "facultyContact": "Dr. M. Rajeshwar (+91 92487 11181, rajeshwarm.cse@hitam.org)",
    "clubEmail": "aiclub@hitam.org",
    "date": "Day 1 (Oct 9)",
    "timings": "10:00 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E08",
    "slug": "n8n-automation-challenge",
    "title": "n8n Automation Challenge",
    "club": "HITAM AI Club",
    "category": "Challenge",
    "minTeam": 2,
    "maxTeam": 2,
    "hitamFee": 300,
    "otherFee": 300,
    "feeModel": "team",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/hitam-ai.png",
    "sheetName": "[HITAM AI] n8n Automation Challenge",
    "themeColor": "#4338ca",
    "description": "Harness n8n to connect multi-source APIs, automate mission-critical organizational workflows, and orchestrate intelligent autonomous triggers without boilerplate code.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹1,500",
      "third": "₹1,000"
    },
    "studentContact": "MD Arif (+91 93902 19103, 23e51a6671@hitam.org)",
    "facultyContact": "Dr. M. Rajeshwar (+91 92487 11181, rajeshwarm.cse@hitam.org)",
    "clubEmail": "aiclub@hitam.org",
    "date": "Day 2 (Oct 10)",
    "timings": "10:00 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E09",
    "slug": "data-heist-datathon",
    "title": "DATA HEIST Datathon",
    "club": "MINDS Club",
    "category": "Challenge",
    "minTeam": 2,
    "maxTeam": 4,
    "hitamFee": 200,
    "otherFee": 300,
    "feeModel": "team",
    "prize": 3000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/minds-hitam.png",
    "sheetName": "[MINDS] DATA HEIST Datathon",
    "themeColor": "#be123c",
    "description": "An investigative data science thriller. Teams analyze fragmented database dumps, decrypt corrupted communication logs, and assemble chronological forensics to crack the case.",
    "prizeBreakup": {
      "first": "₹1,500",
      "second": "₹1,000",
      "third": "₹500"
    },
    "studentContact": "Arutla Sai Prasanna (+91 81061 10146, 23e51a6711@hitam.org)",
    "facultyContact": "Richa Tiwari (+91 91315 39794, richatiwari.cse@hitam.org)",
    "clubEmail": "minds.datascience@hitam.org",
    "date": "Day 1 (Oct 9)",
    "timings": "9:30 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E10",
    "slug": "data-dossier",
    "title": "DATA DOSSIER Case Study",
    "club": "MINDS Club",
    "category": "Challenge",
    "minTeam": 2,
    "maxTeam": 4,
    "hitamFee": 100,
    "otherFee": 200,
    "feeModel": "team",
    "prize": 3000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/minds-hitam.png",
    "sheetName": "[MINDS] DATA DOSSIER Case Study",
    "themeColor": "#be123c",
    "description": "Examine sealed mystery dossiers, analyze technical anomalies, cross-reference suspect data trails, and present an irrefutable deduction before the investigative panel.",
    "prizeBreakup": {
      "first": "₹1,500",
      "second": "₹1,000",
      "third": "₹500"
    },
    "studentContact": "Arutla Sai Prasanna (+91 81061 10146, 23e51a6711@hitam.org)",
    "facultyContact": "Richa Tiwari (+91 91315 39794, richatiwari.cse@hitam.org)",
    "clubEmail": "minds.datascience@hitam.org",
    "date": "Day 2 (Oct 10)",
    "timings": "9:30 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E11",
    "slug": "torquex-motorsport",
    "title": "TorqueX Garage to Grid",
    "club": "TorqueX Motorsports",
    "category": "Challenge",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 50,
    "otherFee": 70,
    "feeModel": "person",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/torquex-logo.jpg",
    "sheetName": "[TorqueX] Garage to Grid",
    "themeColor": "#c2410c",
    "description": "Be part of the grand unveiling of HITAM's custom-engineered racing kart. Participate in telemetry design sprints, chassis aerodynamic challenges, and EV powertrain teardown sessions.",
    "prizeBreakup": {
      "first": "₹1,500",
      "second": "₹1,000",
      "third": "₹500"
    },
    "studentContact": "G. Sri Harshika (9052693939, 24e51a0311@hitam.org)",
    "facultyContact": "Ruchir Shrivastava (903958390, programhead.mech@hitam.org)",
    "clubEmail": "torquex.hitam@gmail.com",
    "teamHitamFee": 100,
    "teamOtherFee": 140,
    "date": "Day 2 (Oct 10)",
    "timings": "10:00 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E12",
    "slug": "build-first-robot",
    "title": "Build Your First Robot",
    "club": "ISNT × ISAMPE Student Chapter",
    "category": "Workshop",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 250,
    "otherFee": 250,
    "feeModel": "team",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/isnt-isampe.png",
    "sheetName": "[ISAMPE] Build Your First Robot",
    "themeColor": "#047857",
    "description": "Assemble an autonomous obstacle-avoiding bot from scratch. Learn DC geared motors, motor drivers, Arduino Uno microcontrollers, ultrasonic sensors, and race in the custom obstacle arena.",
    "prizeBreakup": {
      "first": "₹1,000",
      "second": "₹800",
      "third": "₹500"
    },
    "studentContact": "Bipul Kumar Yadav (7093346820, 23e51a0301@hitam.org), Narendra Reddy (7981427446, 24e55a0325@hitam.org)",
    "facultyContact": "Mr. Deepak Kumar Singh (+91 89829 30521) / Mr. P. Bhaskar Rao (+91 97054 82627)",
    "clubEmail": "",
    "date": "Day 1 (Oct 9)",
    "timings": "10:00 AM – 4:00 PM",
    "venue": "HITAM Campus"
  },
  {
    "id": "E13",
    "slug": "code-casino",
    "title": "Code Casino",
    "club": "CSI Student Chapter",
    "category": "Gaming & Coding",
    "minTeam": 2,
    "maxTeam": 3,
    "hitamFee": 50,
    "otherFee": 60,
    "feeModel": "person",
    "prize": 1200,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/csi-hitam.png",
    "sheetName": "[CSI] Code Casino",
    "themeColor": "#6d28d9",
    "description": "High-stakes competitive coding game organized by CSI Student Chapter. Place strategic chip wagers on code optimization rounds, guess asymptotic complexities, debug under pressure, and maximize your chip stack.",
    "prizeBreakup": {
      "first": "₹600",
      "second": "₹400",
      "third": "₹200"
    },
    "studentContact": "K. Manivenkat — Student HOD, CSE (+91 80088 19830, 24e51a05b5@hitam.org)",
    "facultyContact": "Preeti C M (+91 99850 68108, preethicm.cse@hitam.org)",
    "clubEmail": "",
    "date": "Day 2 (Oct 10)",
    "timings": "10:30 AM – 3:30 PM",
    "venue": "HITAM Campus, Gowdavelly"
  },
  {
    "id": "E14",
    "slug": "technical-tambola",
    "title": "Technical Tambola",
    "club": "CSI Student Chapter",
    "category": "Gaming & Coding",
    "minTeam": 1,
    "maxTeam": 1,
    "hitamFee": 50,
    "otherFee": 60,
    "feeModel": "person",
    "prize": 1200,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/csi-hitam.png",
    "sheetName": "[CSI] Technical Tambola",
    "themeColor": "#6d28d9",
    "description": "A fast-paced technical party game. Crack CS theory clues, identify runtime complexity riddles, solve syntax debug puzzles, and claim instant cash rewards on your technical game card.",
    "prizeBreakup": {
      "first": "₹600",
      "second": "₹400",
      "third": "₹200"
    },
    "studentContact": "K. Manivenkat — Student HOD, CSE (+91 80088 19830, 24e51a05b5@hitam.org)",
    "facultyContact": "Preeti C M (+91 99850 68108, preethicm.cse@hitam.org)",
    "clubEmail": "",
    "date": "Day 1 (Oct 9)",
    "timings": "11:00 AM – 2:00 PM",
    "venue": "HITAM Campus, Gowdavelly"
  }
];

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.action === "desk") {
      requireDeskUser_();
      return HtmlService.createTemplateFromFile("scanner").evaluate().setTitle("ESPARTO | Organizer Check-in").addMetaTag("viewport", "width=device-width, initial-scale=1");
    }
    if (e && e.parameter && e.parameter.action === "payment-status") {
      return ContentService.createTextOutput(JSON.stringify(publicPaymentStatus_(e.parameter.ticketId))).setMimeType(ContentService.MimeType.JSON);
    }
    var template = HtmlService.createTemplateFromFile("index");
    var eventParam = e && e.parameter ? e.parameter.event : "";
    var event = findEvent_(String(eventParam || ""));
    template.initialEvent = String(event ? event.slug : "");
    return template.evaluate().setTitle("ESPARTO 2026 | Registration Portal")
      .addMetaTag("viewport", "width=device-width, initial-scale=1");
  } catch (error) {
    return HtmlService.createHtmlOutput('<main style="font-family:system-ui;padding:32px;max-width:640px;margin:auto"><h1>ESPARTO 2026</h1><p>The registration portal could not load. Please reload or contact <a href="mailto:ssg@hitam.org">ssg@hitam.org</a>.</p></main>')
      .setTitle("ESPARTO 2026");
  }
}

var DRIVE_LOGO_IDS = {
  "ssg-logo.png": "1sMtm29iMFg29ZcVfzh1EM7BEN8kKzcOo",
  "esparto-logo.png": "1d7VRlLtobVhe4ne47mqsfG2gGEmztFzj",
  "hitam_logo.jpg": "13EBtB_px7-U2LiGuEzXqEISv7N-ZIjee",
  "csi-hitam.png": "12nTau20Urv3I3QWb_7uWPd_mz9HrXsTx",
  "gdg-hitam.png": "1ZeAHWKJYdckZWnp1Q4OrMlv6Zl8ed_1W",
  "hhc-iucee.png": "1Ok-GoHhdPkOwWZpVjoQGtuHRIZ-DVMa2",
  "hhc.png": "1JUZxPH3Y8u_qsQljXACSrk36plxoqJnw",
  "iucee.png": "1YqI7tGS98LJrhw584LlY_USH61ZoKuuV",
  "hitam-ai.png": "1mxsj50vSKL0wzpTb9CkjW92Ocw6U1Ex_",
  "hitam-coding-club.png": "1pG4Vy1BTgT5LxJ-wALepirCGlbpg-E7F",
  "minds-hitam.png": "17oB5iIfLc5d3dkFtgbJeQ5asRRxp9Z9x",
  "ieee-hitam.png": "1MPsVJ2oUykl9b06Fc797lTakr8TPtqzN",
  "ieom-hitam.png": "1sqYELsb62BIdM0O-UG9cgyOPgYY9lQKT",
  "ISAMPE.png": "13X-GRYs0EgSAfZPHB-XCQI1xZ5SLIRjv",
  "torquex-logo.jpg": "1LKK83Yw7nbRUOQNOth5YTt5W_1aAHeeW"
};

function driveLogo_(original) {
  var filename = original.split("/").pop();
  return DRIVE_LOGO_IDS[filename] ? "https://drive.google.com/thumbnail?id=" + DRIVE_LOGO_IDS[filename] + "&sz=w600" : original;
}

var EVENT_FORM_CONFIG = {
  E02: {
    tagline: "Build What Wasn’t Built Before!",
    intro: "Work backwards from a mystery product revealed at the opening ceremony: discover who needs it, diagnose what is broken, and design an original replacement.",
    highlights: ["October 9, 2026 · HITAM Campus", "Zero eliminations: every team completes Diagnosis, Rebuild and Pitch.", "Strictly no AI: original, human problem-solving at every stage.", "Teams of 2–3 participants, including the team leader."],
    rules: ["I confirm my team will not use AI tools (ChatGPT, Copilot, image/text generators, or similar) at any stage of the competition.", "I have read and agree to the Reverse Hackathon rules and understand that violations lead to disqualification.", "I consent to photography/video during the event."]
  },
  E04: {
    tagline: "Your Code. Your Build. Center Stage.",
    intro: "A stage-based showcase where students get the opportunity to demonstrate their software, hardware, coding, electronics, or other technical skills live. The goal is to make technical talent visible, engaging, and entertaining while giving students a platform to showcase what they can actually build.",
    highlights: ["October 10, 2026 · HITAM Campus", "Zero eliminations: every act performs in all three rounds through the Grand Finale.", "A live 3-minute spotlight, a surprise Twist Challenge and a finale with audience voting.", "Any technical, working live demonstration belongs on stage."],
    categories: ["Software", "Hardware", "Robotics", "Electronics", "Competitive coding", "Other technical demonstration"],
    rules: ["I confirm this build/performance is my own original work.", "I understand a live, working demo is required and pre-recorded footage may only be used as brief supporting b-roll.", "I agree to strict time limits and understand my slot will be cut off at the buzzer.", "I consent to photography/video during the event."]
  }
};

function getPortalData() {
  var properties = PropertiesService.getScriptProperties();
  var ready = typeof Sheets !== "undefined" && !!(SPREADSHEET_ID || properties.getProperty("ESPARTO_SPREADSHEET_ID")) && !!properties.getProperty("ESPARTO_PROOF_FOLDER_ID");
  var logoFallbacks = {};
  Object.keys(DRIVE_LOGO_IDS).forEach(function (filename) {
    var folder = filename === "ssg-logo.png" || filename === "esparto-logo.png" ? "images/brand/" : filename === "hitam_logo.jpg" ? "images/hitam/" : "images/chapters/";
    var original = CDN_BASE + folder + filename;
    logoFallbacks[driveLogo_(original)] = (filename === "iucee.png" || filename === "hhc.png") ? CDN_BASE + "images/chapters/hhc-iucee.png" : original;
  });
  return {
    logoFallbacks: logoFallbacks,
    registrationAvailable: ready,
    events: EVENT_CATALOG.map(function (event) {
      var copy = Object.assign({}, event);
      copy.registrationForm = EVENT_FORM_CONFIG[event.id] || null;
      copy.fallbackLogo = event.logo;
      copy.logo = driveLogo_(event.logo);
      return copy;
    }),
    ieeeUrl: IEEE_URL,
    upiId: "qr.hitam@sib",
    paymentQrUrl: "https://drive.google.com/thumbnail?id=1WWKBVMZlGpDm5s9Rh7hOH5cdaTJ8Msuz&sz=w1000",
    payee: "HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    support: "Tejal (+91 90591 11595), ssg@hitam.org",
    logos: {
      ssg: driveLogo_(CDN_BASE + "images/brand/ssg-logo.png"),
      esparto: driveLogo_(CDN_BASE + "images/brand/esparto-logo.png"),
      hitam: driveLogo_(CDN_BASE + "images/hitam/hitam_logo.jpg")
    },
    chapters: [
      ["IEEE", "ieee-hitam.png"], ["HHC", "hhc.png"],
      ["IUCEE-EWB", "iucee.png"], ["GDG on Campus", "gdg-hitam.png"],
      ["HITAM AI", "hitam-ai.png"], ["MINDS", "minds-hitam.png"],
      ["IEOM", "ieom-hitam.png"], ["TorqueX", "torquex-logo.jpg"],
      ["ISAMPE", "ISAMPE.png"], ["CSI", "csi-hitam.png"],
      ["Coding Club", "hitam-coding-club.png"]
    ].map(function (entry) { return { name: entry[0], logo: driveLogo_(CDN_BASE + "images/chapters/" + entry[1]) }; })
  };
}

function getChapterName(id, slug) {
  var event = findEvent_(String(id || "")) || findEvent_(String(slug || ""));
  return event ? event.club : "";
}

// Manual, owner-only, idempotent setup. Existing participant rows are never cleared.
function setupDatabase() {
  requireOwner_();
  if (typeof Sheets === "undefined") throw new Error("Add the Google Sheets API v4 service before setup.");
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var props = PropertiesService.getScriptProperties();
    var ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("Open Apps Script from the registration Google Sheet, or set SPREADSHEET_ID.");
    var previous = props.getProperty("ESPARTO_SPREADSHEET_ID");
    if (previous && previous !== ss.getId()) throw new Error("This script is configured for a different spreadsheet. Use a separate script for a new database.");
    Sheets.Spreadsheets.get(ss.getId(), { fields: "spreadsheetId" });
    var schemas = schemaMap_();
    Object.keys(schemas).forEach(function (name) {
      var sheet = ss.getSheetByName(name);
      if (sheet && sheet.getLastRow()) assertHeaders_(sheet, schemas[name]);
    });
    Object.keys(schemas).forEach(function (name) {
      var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
      var headers = schemas[name];
      if (!sheet.getLastRow()) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setBackground("#002855").setFontColor("#ffffff").setFontWeight("bold").setWrap(true);
      sheet.setColumnWidths(1, headers.length, 160);

    });
    var dash = ss.getSheetByName("DASHBOARD_LIVE_METRICS") || ss.insertSheet("DASHBOARD_LIVE_METRICS");
    var metrics = [["EventID", "Chapter", "EventName", "Category", "FeeModel", "TeamFormat", "HITAMFee", "OtherFee", "Registrations", "AmountSubmitted", "VerifiedAmount", "Status"]];
    EVENT_CATALOG.forEach(function (event, index) {
      var r = index + 2;
      metrics.push([event.id, event.club, event.title, event.category, event.feeModel === "team" ? "Per Team" : "Per Person", teamLabel_(event), event.hitamFee, event.otherFee,
        '=COUNTIF(ALL_REGISTRATIONS!C2:C,A' + r + ')',
        '=SUMIF(ALL_REGISTRATIONS!C2:C,A' + r + ',ALL_REGISTRATIONS!P2:P)',
        '=SUMIFS(ALL_REGISTRATIONS!P2:P,ALL_REGISTRATIONS!C2:C,A' + r + ',ALL_REGISTRATIONS!R2:R,"Verified")',
        event.id === "E01" ? "External IEEE form" : "Open"]);
    });
    metrics.push(["TOTAL", "", "", "", "", "", "", "", "=SUM(I2:I15)", "=SUM(J2:J15)", "=SUM(K2:K15)", "Submitted amounts are unverified"]);
    dash.getRange(1, 1, metrics.length, 12).setValues(metrics);
    dash.setFrozenRows(1);
    dash.getRange(1, 1, 1, 12).setBackground("#002855").setFontColor("#ffffff").setFontWeight("bold");
    dash.setColumnWidths(1, 12, 160);
    dash.setColumnWidth(3, 320);
    dash.getRange(2, 7, 15, 2).setNumberFormat('"₹"#,##0');
    dash.getRange(2, 10, 15, 2).setNumberFormat('"₹"#,##0');
    var folderId = props.getProperty("ESPARTO_PROOF_FOLDER_ID");
    var folder;
    if (folderId) folder = DriveApp.getFolderById(folderId);
    else {
      var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
      folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
    }
    props.setProperties({ ESPARTO_SPREADSHEET_ID: ss.getId(), ESPARTO_PROOF_FOLDER_ID: folder.getId() });
    SpreadsheetApp.flush();
    return { success: true, spreadsheetUrl: ss.getUrl(), message: "Setup complete. Existing registration rows were preserved." };
  } finally {
    lock.releaseLock();
  }
}

function submitRegistration(payload) {
  var lock = LockService.getScriptLock();
  var locked = false;
  var props;
  var journal;
  var journalKey;
  var file;
  var committing = false;
  var ss;
  var data;
  try {
    data = validatePayload_(payload);
    locked = lock.tryLock(1000);
    if (!locked) return failure_("BUSY", "The registration desk is busy. Wait a few seconds, then retry with the same payment reference.", true);
    props = PropertiesService.getScriptProperties();
    ss = database_();
    var sheets = requiredSheets_(ss, data.event);
    var fingerprint = digest_(JSON.stringify(data.normalized) + ":" + digest_(data.proof.bytes));
    var previous = findSubmission_(sheets.payments, data.requestId, data.utr);
    if (previous) {
      var previousResult = existingResult_(previous, data.requestId, fingerprint);
      if (previousResult.success) { try { props.deleteProperty("SUBMISSION_" + data.requestId); } catch (ignoreJournalCleanup) {} }
      return previousResult;
    }
    journalKey = "SUBMISSION_" + data.requestId;
    var raw = props.getProperty(journalKey);
    journal = raw ? JSON.parse(raw) : null;
    if (journal && journal.fingerprint !== fingerprint) return failure_("REQUEST_CHANGED", "This submission reference belongs to different details. Restore your original details or contact SSG before retrying.", false);
    if (journal && journal.state === "committing") return failure_("RECONCILIATION_REQUIRED", "Your submission is being reconciled. Do not pay again. Contact SSG with reference " + data.requestId + ".", false);
    if (!journal) {
      journal = { requestId: data.requestId, fingerprint: fingerprint, regId: newRegId_(sheets.master, data.event.id), state: "preparing", startedAt: Date.now(), fileId: "" };
      props.setProperty(journalKey, JSON.stringify(journal));
    }
    var folderId = props.getProperty("ESPARTO_PROOF_FOLDER_ID");
    if (!folderId) throw new Error("Missing proof folder");
    var folder = DriveApp.getFolderById(folderId);
    var filename = journal.regId + "_" + data.requestId + "." + data.proof.extension;
    if (journal.fileId) file = DriveApp.getFileById(journal.fileId);
    else {
      var matches = folder.getFilesByName(filename);
      file = matches.hasNext() ? matches.next() : folder.createFile(Utilities.newBlob(data.proof.bytes, data.proof.mime, filename));
      journal.fileId = file.getId();
      props.setProperty(journalKey, JSON.stringify(journal));
    }
    try {
      file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
    } catch (sharingError) {
      throw publicError_("PROOF_SHARING", "Payment proof could not be saved with restricted sharing permissions. Contact SSG; do not make another payment.");
    }
    var receipt = receipt_(journal.regId, data);
    var notes = JSON.stringify({ requestId: data.requestId, fingerprint: fingerprint });
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var lead = data.lead;
    var allMembers = [lead].concat(data.members);
    var summary = allMembers.map(function (member, index) { return (index + 1) + ". " + member.name + (member.rollNo ? " (" + member.rollNo + ")" : ""); }).join("\n");
    var customText = data.customDetails || "";
    var institution = data.institution;
    var proofUrl = file.getUrl();
    var masterRow = [timestamp, journal.regId, data.event.id, data.event.title, data.event.club, data.teamName, data.teamSize, lead.name, lead.rollNo, lead.phone, lead.email, institution, data.college, summary, customText, data.amount, "NOT CHECKED IN", "Pending Verification", data.utr, proofUrl];
    var paymentRow = [timestamp, journal.regId, data.event.title, data.event.club, lead.name, lead.phone, data.amount, "UPI", data.utr, file.getId(), proofUrl, "Pending Verification", notes];
    var rosterRows = allMembers.map(function (member, index) {
      return [journal.regId, data.event.title, data.teamName, index + 1, index === 0 ? (data.teamSize === 1 ? "Participant" : "Team Lead") : "Teammate", member.name, member.rollNo, member.branchYear, member.email, member.phone, data.college];
    });
    var eventRow = [false, journal.regId, data.event.club, data.event.title, data.teamName, data.teamSize, lead.name, lead.rollNo, lead.phone, lead.email, institution, data.college, summary, customText, data.amount, data.utr, proofUrl, ""];
    var requests = [appendRequest_(sheets.master, [masterRow]), appendRequest_(sheets.payments, [paymentRow]), appendRequest_(sheets.roster, rosterRows), appendRequest_(sheets.event, [eventRow])];
    // Persist BEFORE the API call: a timeout must never trigger a blind second write.
    journal.state = "committing";
    journal.startedAt = Date.now();
    props.setProperty(journalKey, JSON.stringify(journal));
    committing = true;
    Sheets.Spreadsheets.batchUpdate({ requests: requests }, ss.getId());
    try { props.deleteProperty(journalKey); } catch (cleanupError) { /* Sheet record remains the source of truth. */ }
    return { success: true, receipt: receipt, message: "Registration received. Payment is pending verification." };
  } catch (error) {
    if (committing && ss && data) {
      try {
        var recovered = findSubmission_(ss.getSheetByName("ALL_PAYMENTS_COLLECTION"), data.requestId, data.utr);
        if (recovered) {
          var result = existingResult_(recovered, data.requestId, journal.fingerprint);
          if (result.success) { try { props.deleteProperty(journalKey); } catch (ignoreCleanup) {} }
          return result;
        }
      } catch (recoveryError) { /* Keep the journal and proof for owner reconciliation. */ }
      return failure_("RECONCILIATION_REQUIRED", "We could not confirm the final save. Do not pay again. Retry the same submission once; if it remains pending, contact SSG with reference " + data.requestId + ".", false);
    }
    if (file) { try { file.setTrashed(true); } catch (cleanupFileError) {} }
    if (journalKey && props) { try { props.deleteProperty(journalKey); } catch (cleanupJournalError) {} }
    if (error && error.publicCode) return failure_(error.publicCode, error.message, false);
    return failure_("SERVICE_UNAVAILABLE", "Registration could not be saved right now. Your payment has not been verified. Keep your proof and retry this submission; do not pay again.", true);
  } finally {
    if (locked) lock.releaseLock();
  }
}

// Owner-only recovery. Run through an editor wrapper with the supplied request ID.
// allowReset=true is permitted only after 10 minutes with no committed sheet row.
function reconcileSubmission(requestId, allowReset) {
  requireOwner_();
  if (!/^[a-f0-9]{32}$/.test(String(requestId || ""))) throw new Error("Use the 32-character support reference.");
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var props = PropertiesService.getScriptProperties();
    var key = "SUBMISSION_" + requestId;
    var raw = props.getProperty(key);
    var journal = raw ? JSON.parse(raw) : null;
    var ss = database_();
    var found = findSubmission_(ss.getSheetByName("ALL_PAYMENTS_COLLECTION"), requestId, "");
    if (found) { props.deleteProperty(key); return { success: true, regId: found[1], message: "The batch committed. All four tabs were written together." }; }
    if (!journal) return { success: false, message: "No pending journal or committed record exists." };
    if (allowReset !== true) return { success: false, regId: journal.regId, state: journal.state, message: "Inspect Sheets and Drive before resetting. No participant data is returned." };
    if (Date.now() - journal.startedAt < 10 * 60 * 1000) throw new Error("Wait at least 10 minutes before resetting an uncertain submission.");
    if (journal.fileId) DriveApp.getFileById(journal.fileId).setTrashed(true);
    props.deleteProperty(key);
    return { success: true, message: "Uncommitted journal reset. The participant may retry with the original UTR and proof." };
  } finally { lock.releaseLock(); }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw publicError_("INVALID_FORM", "Please complete the registration form.");
  var event = findEvent_(String(payload.eventId || ""));
  if (!event || event.slug !== payload.eventSlug) throw publicError_("INVALID_EVENT", "Select an event from the directory and try again.");
  if (event.id === "E01") throw publicError_("EXTERNAL_EVENT", "IEEE registrations use the separate official IEEE form.");
  var requestId = String(payload.requestId || "");
  if (!/^[a-f0-9]{32}$/.test(requestId)) throw publicError_("INVALID_REQUEST", "Reload the registration portal before submitting.");
  var institution = payload.institution;
  if (institution !== "HITAM" && institution !== "Other") throw publicError_("INVALID_INSTITUTION", "Choose HITAM Student or Other College.");
  var teamSize = payload.teamSize;
  if (typeof teamSize !== "number" || !Number.isInteger(teamSize) || teamSize < event.minTeam || teamSize > event.maxTeam) throw publicError_("INVALID_TEAM", "Choose a valid number of participants for this event.");
  if (event.allowedTeamSizes && event.allowedTeamSizes.indexOf(teamSize) === -1) throw publicError_("INVALID_TEAM", "Choose individual entry or a team of exactly four participants.");
  if (!Array.isArray(payload.members) || payload.members.length !== teamSize - 1) throw publicError_("INVALID_MEMBERS", "Complete one teammate block for each selected participant.");
  var lead = validateMember_(payload.lead, true, "Team lead", institution);
  var members = payload.members.map(function (member, index) { return validateMember_(member, false, "Teammate " + (index + 2), institution); });
  var emails = Object.create(null), rolls = Object.create(null);
  [lead].concat(members).forEach(function (member) {
    var email = member.email.toLowerCase(), roll = member.rollNo.toLowerCase();
    if ((email && emails[email]) || (roll && rolls[roll])) throw publicError_("DUPLICATE_MEMBER", "Each participant needs their own email and roll number. Check the teammate details.");
    if (email) emails[email] = true;
    if (roll) rolls[roll] = true;
  });
  var college = institution === "HITAM" ? "Hyderabad Institute of Technology and Management (HITAM)" : text_(payload.college, "College name", 160, true);
  var teamName = event.maxTeam === 1 || ((event.allowedTeamSizes || event.id === "E03") && teamSize === 1) ? lead.name : text_(payload.teamName, "Team name", 120, true);
  var unitFee = institution === "HITAM" ? event.hitamFee : event.otherFee;
  if (event.allowedTeamSizes && teamSize === 1) unitFee = institution === "HITAM" ? event.soloHitamFee : event.soloOtherFee;
  if (event.teamHitamFee && teamSize > 1) unitFee = institution === "HITAM" ? event.teamHitamFee : event.teamOtherFee;
  var amount = event.id === "E12" ? (teamSize === 1 ? 120 : 250) : (unitFee * (event.feeModel === "person" && !event.teamHitamFee ? teamSize : 1));
  if (typeof payload.totalFee !== "number" || payload.totalFee !== amount) throw publicError_("FEE_CHANGED", "The displayed amount does not match the event fee. Return to participant details and check the payment amount.");
  var utr = String(payload.utrNumber || "").trim();
  if (!/^\d{8,16}$/.test(utr)) throw publicError_("INVALID_UTR", "Enter the 8–16 digit UPI transaction reference from your payment app.");
  if (payload.agreement !== true) throw publicError_("AGREEMENT_REQUIRED", "Confirm the registration and payment details before submitting.");
  var customDetails = text_(payload.customDetails, "Additional details", 1000, false);
  var formConfig = EVENT_FORM_CONFIG[event.id], eventAnswers = null;
  if (formConfig) {
    if (!payload.eventAnswers || !Array.isArray(payload.eventAnswers.consents) || payload.eventAnswers.consents.length !== formConfig.rules.length || !payload.eventAnswers.consents.every(function (answer) { return answer === true; })) throw publicError_("EVENT_CONSENT_REQUIRED", "Accept every event rule and consent statement before submitting.");
    var category = formConfig.categories ? text_(payload.eventAnswers.category, "Showcase category", 80, true) : "";
    if (formConfig.categories && formConfig.categories.indexOf(category) === -1) throw publicError_("INVALID_CATEGORY", "Choose a valid showcase category.");
    if (event.id === "E02") members.forEach(function (member) { if (!member.email || !member.branchYear) throw publicError_("INVALID_MEMBER", "Enter each teammate’s email and year / department."); });
    eventAnswers = { category: category, consents: formConfig.rules.map(function () { return true; }) };
    customDetails = JSON.stringify({ category: category, acceptedRules: formConfig.rules, additionalDetails: customDetails });
  }
  var proof = decodeProof_(payload.screenshotBase64);
  var normalized = { eventId: event.id, eventSlug: event.slug, institution: institution, college: college, teamSize: teamSize, teamName: teamName, lead: lead, members: members, amount: amount, utr: utr, customDetails: customDetails, eventAnswers: eventAnswers, agreement: true };
  return { event: event, requestId: requestId, institution: institution, college: college, teamSize: teamSize, teamName: teamName, lead: lead, members: members, amount: amount, utr: utr, customDetails: customDetails, proof: proof, normalized: normalized };
}

function validateMember_(member, required, label, institution) {
  if (!member || typeof member !== "object" || Array.isArray(member)) throw publicError_("INVALID_MEMBER", "Complete the " + label.toLowerCase() + " details.");
  var name = text_(member.name, label + " name", 120, true);
  var email = text_(member.email, label + " email", 254, required).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw publicError_("INVALID_EMAIL", "Enter a valid email for " + label.toLowerCase() + ".");
  var rawPhone = text_(member.phone, label + " WhatsApp", 24, required);
  if (rawPhone && !/^\+?[\d ()-]+$/.test(rawPhone)) throw publicError_("INVALID_PHONE", "Enter a valid Indian WhatsApp number for " + label.toLowerCase() + ".");
  var phone = rawPhone.replace(/\D/g, "");
  if (phone.length === 12 && phone.indexOf("91") === 0) phone = phone.slice(2);
  if (phone && !/^[6-9]\d{9}$/.test(phone)) throw publicError_("INVALID_PHONE", "Enter a 10-digit Indian WhatsApp number, optionally prefixed with +91, for " + label.toLowerCase() + ".");
  var branchYear = member.branchYear;
  if (Object.prototype.hasOwnProperty.call(member, "branch") || Object.prototype.hasOwnProperty.call(member, "year")) {
    var branch = text_(member.branch, label + " branch", 80, required);
    var year = text_(member.year, label + " year", 1, required);
    if (year && !/^[1-4]$/.test(year)) throw publicError_("INVALID_YEAR", "Choose a year from 1 to 4.");
    if (branch && institution === "HITAM" && ["CSE", "CSM", "CSD", "ECE", "EEE", "MECH", "ITP - CSE", "ITP - MECH", "IIBMP"].indexOf(branch) === -1) throw publicError_("INVALID_BRANCH", "Choose a listed HITAM branch.");
    if (!!branch !== !!year) throw publicError_("INVALID_MEMBER", "Complete both branch and year, or leave both optional fields blank.");
    branchYear = branch + (year ? " · Year " + year : "");
  }
  return { name: name, email: email, phone: phone, rollNo: text_(member.rollNo, label + " roll number", 60, required || institution === "HITAM"), branchYear: text_(branchYear, label + " branch and year", 100, required) };
}

function decodeProof_(dataUrl) {
  if (typeof dataUrl !== "string" || dataUrl.length > Math.ceil(MAX_PROOF_BYTES / 3) * 4 + 100) throw publicError_("INVALID_PROOF", "Upload a PNG, JPG, or WebP payment screenshot smaller than 2 MB.");
  var match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match || match[2].length % 4 !== 0) throw publicError_("INVALID_PROOF", "Upload a valid PNG, JPG, or WebP payment screenshot.");
  var bytes;
  try { bytes = Utilities.base64Decode(match[2]); } catch (error) { throw publicError_("INVALID_PROOF", "The screenshot could not be read. Select the image again."); }
  if (!bytes.length || bytes.length > MAX_PROOF_BYTES) throw publicError_("INVALID_PROOF", "The screenshot must be no larger than 2 MB.");
  var unsigned = bytes.slice(0, 12).map(function (value) { return (value + 256) % 256; });
  var mime = match[1];
  var png = unsigned.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
  var jpeg = unsigned[0] === 255 && unsigned[1] === 216 && unsigned[2] === 255;
  var webp = unsigned.slice(0, 4).join(",") === "82,73,70,70" && unsigned.slice(8, 12).join(",") === "87,69,66,80";
  if ((mime === "image/png" && !png) || (mime === "image/jpeg" && !jpeg) || (mime === "image/webp" && !webp)) throw publicError_("INVALID_PROOF", "The image contents do not match its format. Export a fresh screenshot as PNG or JPG.");
  return { bytes: bytes, mime: mime, extension: mime === "image/jpeg" ? "jpg" : mime.slice(6) };
}

function text_(value, label, max, required) {
  if (value !== undefined && value !== null && typeof value !== "string") throw publicError_("INVALID_FIELD", "Check " + label.toLowerCase() + ".");
  var result = String(value || "").trim();
  if ((required && !result) || result.length > max || /[\u0000-\u001f\u007f]/.test(result)) throw publicError_("INVALID_FIELD", "Enter " + label.toLowerCase() + " using no more than " + max + " characters.");
  return result;
}

function findEvent_(idOrSlug) {
  var aliases = { "agentic-ai-hackathon": "agentic-ai-workshop-hackathon", "agentic-ai-workshop": "agentic-ai-workshop-hackathon" };
  var key = aliases[idOrSlug] || idOrSlug;
  for (var i = 0; i < EVENT_CATALOG.length; i++) if (EVENT_CATALOG[i].id === key || EVENT_CATALOG[i].slug === key) return EVENT_CATALOG[i];
  return null;
}

function schemaMap_() {
  var map = {};
  Object.keys(HEADERS).forEach(function (name) { map[name] = HEADERS[name]; });
  EVENT_CATALOG.forEach(function (event) { map[event.sheetName] = EVENT_HEADERS; });
  return map;
}

function database_() {
  if (typeof Sheets === "undefined") throw new Error("Sheets service not enabled");
  var id = SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty("ESPARTO_SPREADSHEET_ID");
  if (!id) throw new Error("Database not configured");
  return SpreadsheetApp.openById(id);
}

function assertHeaders_(sheet, headers) {
  var actual = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
  if (actual.join("\u001f") !== headers.join("\u001f")) throw new Error("Header mismatch in " + sheet.getName() + ". Use a new spreadsheet for this rebuild; do not overwrite existing records.");
}

function requiredSheets_(ss, event) {
  var map = { master: "ALL_REGISTRATIONS", payments: "ALL_PAYMENTS_COLLECTION", roster: "ALL_MEMBERS_ROSTER", event: event.sheetName };
  var result = {};
  Object.keys(map).forEach(function (key) {
    var name = map[key], sheet = ss.getSheetByName(name);
    if (!sheet) throw new Error("Missing sheet");
    assertHeaders_(sheet, key === "event" ? EVENT_HEADERS : HEADERS[name]);
    result[key] = sheet;
  });
  return result;
}

function appendRequest_(sheet, rows) {
  return { appendCells: { sheetId: sheet.getSheetId(), rows: rows.map(function (row) {
    return { values: row.map(function (value) {
      var cell = { userEnteredValue: typeof value === "boolean" ? { boolValue: value } : typeof value === "number" ? { numberValue: value } : { stringValue: String(value === undefined || value === null ? "" : value) } };
      if (typeof value === "boolean") cell.dataValidation = { condition: { type: "BOOLEAN" }, strict: true, showCustomUi: true };
      return cell;
    }) };
  }), fields: "userEnteredValue,dataValidation" } };
}

function findSubmission_(payments, requestId, utr) {
  if (!payments || payments.getLastRow() < 2) return null;
  var count = payments.getLastRow() - 1;
  var found;
  if (requestId) found = payments.getRange(2, 13, count, 1).createTextFinder('"requestId":"' + requestId + '"').matchCase(true).findNext();
  if (!found && utr) found = payments.getRange(2, 9, count, 1).createTextFinder(utr).matchEntireCell(true).findNext();
  return found ? payments.getRange(found.getRow(), 1, 1, 13).getDisplayValues()[0] : null;
}

function parseNotes_(value) {
  // Human notes may follow a newline; the first line is the idempotency record.
  try { return JSON.parse(String(value || "").split("\n")[0]); } catch (error) { return null; }
}

function existingResult_(row, requestId, fingerprint) {
  var notes = parseNotes_(row[12]);
  if (!notes || notes.requestId !== requestId) return failure_("DUPLICATE_UTR", "This transaction reference is already registered. Contact SSG with your payment proof; do not submit the same UTR again.", false);
  if (notes.fingerprint !== fingerprint) return failure_("REQUEST_CHANGED", "A registration was already saved with this submission reference. Contact SSG to correct the participant details.", false);
  return { success: true, receipt: { regId: row[1], eventTitle: row[2], chapter: row[3], leadName: row[4], amount: Number(row[6]), status: row[11] || "Pending Verification", utr: row[8], replayed: true }, message: "Your existing registration was recovered; no duplicate rows were added." };
}

function receipt_(regId, data) {
  return { regId: regId, eventId: data.event.id, eventTitle: data.event.title, chapter: data.event.club, teamName: data.teamName, teamSize: data.teamSize, leadName: data.lead.name, amount: data.amount, status: "Pending Verification", utr: data.utr };
}

// Public website lookup discloses status only. Never return personal data,
// UTRs, proof URLs, submission tokens or private group invites here.
function publicPaymentStatus_(ticketId) {
  var id = String(ticketId || "").trim().toUpperCase();
  if (!/^ESP26-(?:E(?:0[1-9]|1[0-4])-\d{4}|HITM-E(?:0[1-9]|1[0-4])-\d{3,6})$/.test(id)) return { status: "Not Found" };
  try {
    var db = database_(), master = db.getSheetByName("ALL_REGISTRATIONS"), finance = db.getSheetByName("ALL_PAYMENTS_COLLECTION");
    assertHeaders_(master, HEADERS.ALL_REGISTRATIONS);
    assertHeaders_(finance, HEADERS.ALL_PAYMENTS_COLLECTION);
    var match = master.getLastRow() > 1 && master.getRange(2, 2, master.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
    if (!match) return { status: "Not Found" };
    var registration = master.getRange(match.getRow(), 1, 1, 20).getDisplayValues()[0];
    var paymentMatch = finance.getLastRow() > 1 && finance.getRange(2, 2, finance.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
    if (!paymentMatch) return { status: "Pending Verification" };
    var payment = finance.getRange(paymentMatch.getRow(), 1, 1, 13).getDisplayValues()[0];
    var event = findEvent_(registration[2]);
    if (!event || event.title !== payment[2] || Number(registration[15]) !== Number(payment[6]) || registration[18] !== payment[8]) return { status: "Pending Verification" };
    if (registration[17] === "Rejected" || payment[11] === "Rejected") return { status: "Rejected" };
    return { status: registration[17] === "Verified" && payment[11] === "Verified" ? "Verified" : "Pending Verification" };
  } catch (error) {
    return { error: "STATUS_UNAVAILABLE" };
  }
}

// The private submission token proves possession of this registration. Neither
// the public catalog nor a registration ID/UTR alone can disclose group links.
function getRegistrationStatus(regId, requestId) {
  try {
    if (!/^ESP26-(?:E(?:0[1-9]|1[0-4])-\d{4}|HITM-E(?:0[1-9]|1[0-4])-\d{3,6})$/.test(String(regId || "")) || !/^[a-f0-9]{32}$/.test(String(requestId || ""))) {
      return failure_("NOT_FOUND", "Unable to find this saved registration. Contact SSG for assistance.", false);
    }
    var spreadsheet = database_();
    var payments = spreadsheet.getSheetByName("ALL_PAYMENTS_COLLECTION");
    assertHeaders_(payments, HEADERS.ALL_PAYMENTS_COLLECTION);
    var payment = findSubmission_(payments, requestId, "");
    var notes = payment && parseNotes_(payment[12]);
    if (!payment || payment[1] !== regId || !notes || notes.requestId !== requestId) {
      return failure_("NOT_FOUND", "Unable to find this saved registration. Contact SSG for assistance.", false);
    }
    var master = spreadsheet.getSheetByName("ALL_REGISTRATIONS");
    assertHeaders_(master, HEADERS.ALL_REGISTRATIONS);
    var match = master.getLastRow() > 1 && master.getRange(2, 2, master.getLastRow() - 1, 1).createTextFinder(regId).matchEntireCell(true).findNext();
    if (!match) return failure_("NOT_FOUND", "Unable to find this saved registration. Contact SSG for assistance.", false);
    var registration = master.getRange(match.getRow(), 1, 1, 20).getDisplayValues()[0];
    var event = findEvent_(registration[2]);
    if (!event || event.title !== payment[2] || Number(registration[15]) !== Number(payment[6])) {
      return failure_("STATUS_UNAVAILABLE", "Payment status is temporarily unavailable. Please contact SSG.", true);
    }
    var verified = payment[11] === "Verified" && registration[17] === "Verified";
    var result = { success: true, verified: verified, status: verified ? "Verified" : "Awaiting payment verification" };
    if (verified) {
      var link = PropertiesService.getScriptProperties().getProperty("WHATSAPP_GROUP_" + event.id);
      if (link && /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+(?:\?[^\s]*)?$/.test(link)) result.whatsappUrl = link;
    }
    return result;
  } catch (error) {
    return failure_("STATUS_UNAVAILABLE", "Payment status is temporarily unavailable. Please try again or contact SSG.", true);
  }
}

function newRegId_(master, eventId) {
  var used = {};
  if (master.getLastRow() > 1) master.getRange(2, 2, master.getLastRow() - 1, 1).getDisplayValues().forEach(function (row) { used[row[0]] = true; });
  // Reserve IDs held by unresolved submissions as well as committed rows.
  var pending = PropertiesService.getScriptProperties().getProperties();
  Object.keys(pending).forEach(function (key) {
    if (key.indexOf("SUBMISSION_") !== 0) return;
    try { var reservation = JSON.parse(pending[key]); if (reservation.regId) used[reservation.regId] = true; } catch (invalidJournal) {}
  });
  var properties = PropertiesService.getScriptProperties();
  var prefix = "ESP26-HITM-" + eventId + "-";
  var counterKey = "REG_COUNTER_" + eventId;
  var last = Number(properties.getProperty(counterKey) || 0);
  Object.keys(used).forEach(function (id) {
    if (id.indexOf(prefix) === 0) last = Math.max(last, Number(id.slice(prefix.length)) || 0);
  });
  // Called under the registration writer's script lock. Persist reservations,
  // including failed attempts, so a reference is never recycled.
  if (last < 999999) {
    var next = last + 1;
    properties.setProperty(counterKey, String(next));
    return prefix + ("00" + next).slice(-Math.max(3, String(next).length));
  }
  throw publicError_("CAPACITY", "This event has reached its registration ID capacity. Please contact SSG.");
}

function digest_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value).map(function (byte) { return ("0" + ((byte + 256) % 256).toString(16)).slice(-2); }).join("");
}
function teamLabel_(event) { if (event.allowedTeamSizes) return "Individual or team of 4"; return event.maxTeam === 1 ? "Solo" : event.minTeam === event.maxTeam ? event.minTeam + " participants" : event.minTeam + "–" + event.maxTeam + " participants"; }
function publicError_(code, message) { var error = new Error(message); error.publicCode = code; return error; }
function failure_(code, message, retryable) { return { success: false, code: code, message: message, retryable: retryable === true }; }
function requireOwner_() {
  var active = Session.getActiveUser().getEmail();
  var effective = Session.getEffectiveUser().getEmail();
  if (!active || active !== effective) throw new Error("Run this administrative function manually as the script owner.");
}

// Organizer-only email automation. Trailing underscores prevent invocation via
// google.script.run. Run setupVerifiedTicketEmails_ in the editor as Elysian.
var TICKET_EMAIL_SENDER = "elysian@hitam.org";
var EMAIL_HEADERS = ["RegID", "Recipient", "State", "AttemptedAt", "SentAt", "Notes"];
function requireTicketSender_() {
  if (String(Session.getEffectiveUser().getEmail()).toLowerCase() !== TICKET_EMAIL_SENDER) {
    throw new Error("Authorize ticket email automation while signed in as elysian@hitam.org.");
  }
}
// Visible editor entry point. An anonymous web-app caller must not be able to
// enable email automation using the deployment owner's effective identity.
function setupVerifiedTicketEmails() {
  if (String(Session.getActiveUser().getEmail()).toLowerCase() !== TICKET_EMAIL_SENDER) {
    throw new Error("Run this setup from the Apps Script editor while signed in as elysian@hitam.org.");
  }
  return setupVerifiedTicketEmails_();
}
function setupVerifiedTicketEmails_() {
  requireTicketSender_();
  var database = database_(), queue = database.getSheetByName("TICKET_EMAIL_DELIVERY");
  if (!queue) {
    queue = database.insertSheet("TICKET_EMAIL_DELIVERY");
    queue.getRange(1, 1, 1, EMAIL_HEADERS.length).setValues([EMAIL_HEADERS]);
    queue.setFrozenRows(1);
  }
  assertHeaders_(queue, EMAIL_HEADERS);
  var existing = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === "processVerifiedTicketEmails_";
  });
  if (!existing) ScriptApp.newTrigger("processVerifiedTicketEmails_").timeBased().everyMinutes(5).create();
  var editTrigger = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === "onPaymentVerificationEdit_";
  });
  if (!editTrigger) ScriptApp.newTrigger("onPaymentVerificationEdit_").forSpreadsheet(database.getId()).onEdit().create();
  PropertiesService.getScriptProperties().setProperty("ESPARTO_TICKET_EMAIL_ENABLED", "true");
  return "Ticket emails enabled. Manual verification edits trigger processing; a five-minute trigger provides fallback checks.";
}
function onPaymentVerificationEdit_(event) {
  if (!event || !event.range || !event.source) return;
  if (event.source.getId() !== database_().getId()) return;
  var range = event.range, name = range.getSheet().getName();
  var column = name === "ALL_REGISTRATIONS" ? 18 : name === "ALL_PAYMENTS_COLLECTION" ? 12 : 0;
  // Include multi-cell paste operations, not just single-cell edits. Both
  // matching records must still be Verified before the worker sends anything.
  if (!column || range.getLastRow() < 2 || range.getColumn() > column || range.getLastColumn() < column) return;
  processVerifiedTicketEmails_();
}
function emailEscape_(value) {
  return String(value || "").replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}
function ticketEmailCandidate_(registration, payment, properties) {
  var event = findEvent_(registration[2]);
  if (!/^ESP26-(?:E(?:0[1-9]|1[0-4])-\d{4}|HITM-E(?:0[1-9]|1[0-4])-\d{3,6})$/.test(String(registration[1] || "")) || !event || event.id === "E01" || !payment || registration[17] !== "Verified" || payment[11] !== "Verified") return null;
  if (!new RegExp("^ESP26-(?:HITM-)?" + event.id + "-").test(String(registration[1])) || registration[1] !== payment[1] || event.title !== payment[2] || registration[18] !== payment[8] || Number(registration[15]) !== Number(payment[6])) return null;
  var email = String(registration[10] || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  var group = properties.getProperty("WHATSAPP_GROUP_" + event.id);
  if (!group || !/^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+(?:\?[^\s]*)?$/.test(group)) return null;
  return { regId: registration[1], email: email, name: registration[7], team: registration[5], size: registration[6], amount: Number(registration[15]), event: event, group: group };
}
function composeTicketEmail_(ticket, qrBlob, logoBlob, extraLogos) {
  var event = ticket.event;
  var schedule = event.agenda ? event.agenda.map(function (item) { return item.label + ": " + item.detail; }).join("\n") : event.date + " · " + event.timings;
  var venue = event.venue || "HITAM Campus, Gowdavelly, Hyderabad";
  var body = "Thank you for registering for " + event.title + ".\n\nYour payment has been verified.\nRegistration ID: " + ticket.regId + "\nParticipant: " + ticket.name + "\nTeam / participant: " + ticket.team + "\nParticipants: " + ticket.size + "\nAmount verified: ₹" + ticket.amount + "\nVenue: " + venue + "\n\n" + schedule + "\n\nJoin your event WhatsApp group for communication: " + ticket.group + "\n\nYour event ticket is included in this email and your ticket QR is attached. Present them at the event desk. The QR identifies your registration; organizers must check the verified registration record.\n\nESPARTO 2026\n" + TICKET_EMAIL_SENDER;
  var rows = [["Participant", ticket.name], ["Team / participant", ticket.team], ["Participants", ticket.size], ["Amount verified", "₹" + ticket.amount], ["Venue", venue]];
  var details = rows.map(function (row) { return '<tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:40%;vertical-align:top">' + emailEscape_(row[0]) + '</td><td style="padding:8px 0;font-size:14px;font-weight:bold;word-break:break-word">' + emailEscape_(row[1]) + '</td></tr>'; }).join('');
  extraLogos = extraLogos || {};
  var logoUrl = logoBlob ? "cid:espartoLogo" : CDN_BASE + "images/brand/esparto-logo.png";
  var brandRow = '<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>' +
    '<td align="center" width="25%"><img src="' + (extraLogos.hitam ? 'cid:hitamLogo' : CDN_BASE + 'images/hitam/hitam_logo.jpg') + '" alt="HITAM" width="64" style="width:64px;max-width:100%;height:auto"></td>' +
    '<td align="center" width="50%"><img src="' + emailEscape_(logoUrl) + '" alt="ESPARTO — HITAM Technical Fest" width="140" style="width:140px;max-width:100%;height:auto"></td>' +
    '<td align="center" width="25%"><img src="' + (extraLogos.ssg ? 'cid:ssgLogo' : CDN_BASE + 'images/brand/ssg-logo.png') + '" alt="SSG HITAM" width="64" style="width:64px;max-width:100%;height:auto"></td></tr></table>';
  var html = '<!doctype html><html><body style="margin:0;padding:0;background:#f1f5f9;color:#0f172a;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:20px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden"><tr><td align="center" style="padding:24px;background:#ffffff;border-bottom:4px solid #ff5e00">' + brandRow + '<p style="margin:12px 0 0;color:#002855;font-size:12px;letter-spacing:2px;font-weight:bold">ESPARTO 2026 · OCTOBER 9–10</p></td></tr><tr><td style="padding:24px"><p style="margin:0 0 12px;color:#059669;font-size:12px;font-weight:bold;letter-spacing:1px">PAYMENT VERIFIED · REGISTRATION CONFIRMED</p><h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#002855">' + emailEscape_(event.title) + '</h1><p style="font-size:14px;line-height:1.6">Thank you for registering, ' + emailEscape_(ticket.name) + '. Your confirmed event ticket is below.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px dashed #cbd5e1;border-radius:12px"><tr><td style="padding:20px"><p style="margin:0 0 6px;font-size:11px;color:#64748b;letter-spacing:1px">REGISTRATION ID</p><p style="margin:0 0 16px;font-family:monospace;font-weight:bold;font-size:20px;color:#002855">' + emailEscape_(ticket.regId) + '</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + details + '</table><div style="text-align:center;margin-top:20px"><img src="cid:ticketQr" width="220" height="220" style="display:block;margin:auto;max-width:100%;height:auto" alt="Your event ticket QR — also attached as PNG"><p style="font-size:12px;color:#64748b;line-height:1.5">Your event ticket QR<br>Save the attached PNG and present it at the event desk.</p></div></td></tr></table><h2 style="font-size:16px;color:#002855;margin-top:24px">Event schedule</h2><p style="font-size:14px;line-height:1.6;white-space:pre-line">' + emailEscape_(schedule) + '</p><p style="font-size:14px;line-height:1.6">Join your event group for updates and communication:</p><table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#059669" style="border-radius:8px"><a href="' + emailEscape_(ticket.group) + '" style="display:inline-block;padding:14px 20px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold">Join event WhatsApp group</a></td></tr></table><p style="font-size:12px;color:#64748b;line-height:1.5;margin-top:20px">The ticket QR identifies your registration. Event staff will check your verified record at entry.</p></td></tr><tr><td style="padding:20px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6">Organized by SSG · HITAM<br>Questions? <a href="mailto:' + TICKET_EMAIL_SENDER + '" style="color:#002855">' + TICKET_EMAIL_SENDER + '</a></td></tr></table></td></tr></table></body></html>';
  var images = { ticketQr: qrBlob };
  if (logoBlob) images.espartoLogo = logoBlob;
  if (extraLogos.hitam) images.hitamLogo = extraLogos.hitam;
  if (extraLogos.ssg) images.ssgLogo = extraLogos.ssg;
  return { to: ticket.email, subject: "ESPARTO 2026 · Confirmed ticket · " + event.title + " · " + ticket.regId, body: body, htmlBody: html, name: "ESPARTO 2026", replyTo: TICKET_EMAIL_SENDER, inlineImages: images, attachments: [qrBlob] };
}
function processVerifiedTicketEmails_() {
  requireTicketSender_();
  var properties = PropertiesService.getScriptProperties();
  if (properties.getProperty("ESPARTO_TICKET_EMAIL_ENABLED") !== "true") return;
  // A separate user lock avoids holding the registration writer's script lock
  // while contacting the QR/email services.
  var lock = LockService.getUserLock();
  if (!lock.tryLock(1000)) return;
  try {
    var database = database_(), master = database.getSheetByName("ALL_REGISTRATIONS"), finance = database.getSheetByName("ALL_PAYMENTS_COLLECTION"), queue = database.getSheetByName("TICKET_EMAIL_DELIVERY");
    assertHeaders_(master, HEADERS.ALL_REGISTRATIONS); assertHeaders_(finance, HEADERS.ALL_PAYMENTS_COLLECTION); assertHeaders_(queue, EMAIL_HEADERS);
    var payments = {}, delivery = {};
    if (finance.getLastRow() > 1) finance.getRange(2, 1, finance.getLastRow() - 1, 13).getDisplayValues().forEach(function (row, index) {
      // Duplicate registration references fail closed instead of guessing.
      payments[row[1]] = payments[row[1]] ? { duplicate: true } : { row: row, index: index + 2 };
    });
    if (queue.getLastRow() > 1) queue.getRange(2, 1, queue.getLastRow() - 1, EMAIL_HEADERS.length).getDisplayValues().forEach(function (row, index) { delivery[row[0]] = { state: row[2], index: index + 2 }; });
    var rows = master.getLastRow() > 1 ? master.getRange(2, 1, master.getLastRow() - 1, 20).getDisplayValues() : [];
    var started = Date.now(), sent = 0, quota = MailApp.getRemainingDailyQuota(), logoBlob = null, extraLogos = {};
    if (quota > 0) {
      try { logoBlob = DriveApp.getFileById("1d7VRlLtobVhe4ne47mqsfG2gGEmztFzj").getBlob(); } catch (logoError) { /* Public CDN fallback in the email. */ }
    }
    if (quota > 0) {
      try { extraLogos.hitam = DriveApp.getFileById("13EBtB_px7-U2LiGuEzXqEISv7N-ZIjee").getBlob(); } catch (hitamLogoError) {}
      try { extraLogos.ssg = DriveApp.getFileById("1sMtm29iMFg29ZcVfzh1EM7BEN8kKzcOo").getBlob(); } catch (ssgLogoError) {}
    }
    for (var index = 0; index < rows.length && sent < 20 && sent < quota && Date.now() - started < 120000; index++) {
      var registration = rows[index], existing = delivery[registration[1]], payment = payments[registration[1]];
      if (existing && existing.state !== "Pending") continue;
      if (!payment || payment.duplicate) continue;
      // Read current records again immediately before preparing a ticket.
      var freshMaster = master.getRange(index + 2, 1, 1, 20).getDisplayValues()[0];
      var freshPayment = finance.getRange(payment.index, 1, 1, 13).getDisplayValues()[0];
      var ticket = ticketEmailCandidate_(freshMaster, freshPayment, properties);
      if (!ticket) continue;
      var queueRow = existing ? existing.index : queue.getLastRow() + 1;
      if (!existing) { queue.getRange(queueRow, 1, 1, EMAIL_HEADERS.length).setValues([[ticket.regId, "'" + ticket.email, "Pending", "", "", ""]]); delivery[ticket.regId] = { state: "Pending", index: queueRow }; }
      var qrBlob;
      try {
        // Only event/registration identifiers reach the QR provider: no name,
        // email, phone, payment proof, group invitation or private access token.
        var qrText = "ESPARTO 2026|" + ticket.regId + "|" + ticket.event.id;
        var qr = UrlFetchApp.fetch("https://api.qrserver.com/v1/create-qr-code/?size=300x300&format=png&data=" + encodeURIComponent(qrText), { muteHttpExceptions: true });
        if (qr.getResponseCode() !== 200) continue;
        qrBlob = qr.getBlob();
        if (qrBlob.getContentType() !== "image/png") continue;
        qrBlob.setName(ticket.regId + "-ticket-qr.png");
      } catch (qrError) { continue; } // No mail attempted: safe to retry later.
      var latestTicket = ticketEmailCandidate_(master.getRange(index + 2, 1, 1, 20).getDisplayValues()[0], finance.getRange(payment.index, 1, 1, 13).getDisplayValues()[0], properties);
      if (!latestTicket || latestTicket.regId !== ticket.regId || latestTicket.email !== ticket.email) continue;
      ticket = latestTicket;
      queue.getRange(queueRow, 2, 1, 5).setValues([["'" + ticket.email, "Sending", new Date(), "", ""]]);
      SpreadsheetApp.flush();
      try {
        MailApp.sendEmail(composeTicketEmail_(ticket, qrBlob, logoBlob, extraLogos));
        // If this acknowledgement fails, leave Sending for manual review. Never
        // automatically resend an email whose delivery may already have happened.
        queue.getRange(queueRow, 3, 1, 4).setValues([["Sent", new Date(), new Date(), "Accepted by email service; inbox delivery is not guaranteed."]]);
        delivery[ticket.regId].state = "Sent"; sent++;
      } catch (mailError) {
        queue.getRange(queueRow, 3, 1, 4).setValues([["ReviewRequired", new Date(), "", "Email outcome uncertain. Check sender mail before setting Pending to retry."]]);
        delivery[ticket.regId].state = "ReviewRequired";
        break;
      }
    }
  } finally { lock.releaseLock(); }
}

// Staff-only entry desk. Identity comes from Google's active session, never
// effectiveUser (which may be the owner for anonymous public requests).
function requireDeskUser_(eventId) {
  var email = String(Session.getActiveUser().getEmail() || "").trim().toLowerCase();
  var roles;
  try { roles = JSON.parse(PropertiesService.getScriptProperties().getProperty("ESPARTO_DESK_ROLES") || "{}"); } catch (invalidRoles) { roles = {}; }
  if (!email || !/@hitam\.org$/.test(email) || !Object.prototype.hasOwnProperty.call(roles, email) || !Array.isArray(roles[email])) throw publicError_("DESK_FORBIDDEN", "Sign in with an authorized HITAM organizer account. Contact the desk administrator.");
  var events = roles[email].filter(function (id) { return id !== "E01" && !!findEvent_(id); });
  if (!events.length || (eventId && events.indexOf(eventId) === -1)) throw publicError_("DESK_FORBIDDEN", "This account is not authorized for the selected event.");
  return { email: email, events: events };
}
function getDeskSession() {
  try { var user = requireDeskUser_(); return { success: true, email: user.email, events: user.events.map(function(id){var event=findEvent_(id);return {id:id,title:event.title};}) }; }
  catch(error) { return failure_(error.publicCode || "DESK_UNAVAILABLE", error.publicCode ? error.message : "The organizer desk is unavailable.", false); }
}
function deskReference_(raw, selectedEvent) {
  if (typeof raw !== "string" || raw.length > 100) throw publicError_("INVALID_QR", "Scan an ESPARTO ticket QR or enter its registration reference.");
  var value = raw.trim(), parts = value.split("|"), id = value;
  if (parts.length > 1) {
    if (parts.length !== 3 || parts[0] !== "ESPARTO 2026" || parts[2] !== selectedEvent) throw publicError_("WRONG_EVENT", "This QR is not for the selected ESPARTO event.");
    id = parts[1];
  }
  var match = /^ESP26-(?:HITM-)?(E(?:0[1-9]|1[0-4]))-(\d{3,6})$/.exec(id);
  if (!match || (id.indexOf("HITM-") === -1 && match[2].length !== 4)) throw publicError_("INVALID_QR", "Enter the complete ESPARTO registration reference.");
  if (match[1] !== selectedEvent) throw publicError_("WRONG_EVENT", "This ticket belongs to a different event.");
  return id;
}
function deskRecord_(id,eventId) {
  var db=database_(),master=db.getSheetByName("ALL_REGISTRATIONS"),finance=db.getSheetByName("ALL_PAYMENTS_COLLECTION"),roster=db.getSheetByName("ALL_MEMBERS_ROSTER"),event=findEvent_(eventId),eventSheet=db.getSheetByName(event.sheetName);
  assertHeaders_(master,HEADERS.ALL_REGISTRATIONS);assertHeaders_(finance,HEADERS.ALL_PAYMENTS_COLLECTION);assertHeaders_(roster,HEADERS.ALL_MEMBERS_ROSTER);assertHeaders_(eventSheet,EVENT_HEADERS);
  function matching(sheet,width,col) { var found=[];if(sheet.getLastRow()>1)sheet.getRange(2,1,sheet.getLastRow()-1,width).getDisplayValues().forEach(function(row,index){if(row[col]===id)found.push({row:row,index:index+2});});return found; }
  var registrations=matching(master,20,1),payments=matching(finance,13,1),eventRows=matching(eventSheet,18,1),members=matching(roster,11,0);
  if (!registrations.length) throw publicError_("TICKET_NOT_FOUND","Ticket not found. Refer the participant to registration support.");
  if(registrations.length!==1||payments.length!==1||eventRows.length!==1)throw publicError_("DESK_REVIEW","Registration records need administrator review. Do not admit automatically.");
  var registration=registrations[0],payment=payments[0],eventRow=eventRows[0],r=registration.row,p=payment.row;
  if(r[2]!==eventId||r[3]!==event.title||p[2]!==event.title||eventRow.row[3]!==event.title||r[18]!==p[8]||Number(r[15])!==Number(p[6])||members.length!==Number(r[6]))throw publicError_("DESK_REVIEW","Registration records do not match. Contact the administrator.");
  if(r[17]!=="Verified"||p[11]!=="Verified")throw publicError_("PAYMENT_NOT_VERIFIED","Organizer payment verification is incomplete. Do not check in this ticket.");
  var checked=r[16]==="CHECKED IN";
  if((r[16]!=="NOT CHECKED IN"&&!checked)||(/^(true|TRUE)$/.test(eventRow.row[0])!==checked))throw publicError_("DESK_REVIEW","Attendance records need administrator review.");
  return {master:master,eventSheet:eventSheet,registration:registration,eventRow:eventRow,view:{regId:id,eventId:eventId,eventTitle:event.title,teamName:r[5],college:r[12],checkedIn:checked,paymentStatus:"Verified",members:members.sort(function(a,b){return Number(a.row[3])-Number(b.row[3]);}).map(function(member){return {name:member.row[5],rollNo:member.row[6],role:member.row[4]};})}};
}
function lookupDeskTicket(raw,eventId) {
  try { requireDeskUser_(eventId);var id=deskReference_(raw,eventId);return {success:true,ticket:deskRecord_(id,eventId).view}; }
  catch(error){return failure_(error.publicCode||"DESK_UNAVAILABLE",error.publicCode?error.message:"Ticket lookup is unavailable. Try again or contact the administrator.",false);}
}
function confirmDeskCheckIn(raw,eventId,identityChecked) {
  var lock=LockService.getScriptLock(),locked=false;
  try {
    var user=requireDeskUser_(eventId),id=deskReference_(raw,eventId);
    if(identityChecked!==true)throw publicError_("IDENTITY_REQUIRED","Compare every listed participant with their college ID before confirming the whole registration.");
    locked=lock.tryLock(1000);if(!locked)return failure_("BUSY","The desk is busy. Look up this ticket again before retrying.",true);
    var record=deskRecord_(id,eventId);
    if(record.view.checkedIn)return {success:true,alreadyCheckedIn:true,ticket:record.view,message:"Already checked in. Do not admit a duplicate entry."};
    var note="CHECK-IN | "+Utilities.formatDate(new Date(),"Asia/Kolkata","yyyy-MM-dd HH:mm:ss")+" IST | "+user.email+" | Whole registration identity checked";
    var previous=record.eventRow.row[17];if(previous.length>3000)throw publicError_("DESK_REVIEW","Desk notes need administrator review.");
    function cell(sheet,row,col,value){return {updateCells:{range:{sheetId:sheet.getSheetId(),startRowIndex:row-1,endRowIndex:row,startColumnIndex:col-1,endColumnIndex:col},rows:[{values:[{userEnteredValue:typeof value==="boolean"?{boolValue:value}:{stringValue:value}}]}],fields:"userEnteredValue"}};}
    Sheets.Spreadsheets.batchUpdate({requests:[cell(record.master,record.registration.index,17,"CHECKED IN"),cell(record.eventSheet,record.eventRow.index,1,true),cell(record.eventSheet,record.eventRow.index,18,previous?previous+"\n"+note:note)]},database_().getId());
    record.view.checkedIn=true;return {success:true,ticket:record.view,message:"Whole registration checked in. Identity check recorded."};
  }catch(error){return failure_(error.publicCode||"DESK_UNAVAILABLE",error.publicCode?error.message:"Check-in could not be confirmed. Look up the ticket again before retrying.",false);}
  finally{if(locked)lock.releaseLock();}
}
