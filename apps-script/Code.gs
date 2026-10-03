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
    "title": "IEEE National Ideathon",
    "club": "IEEE Student Branch HITAM",
    "category": "Ideathon",
    "minTeam": 3,
    "maxTeam": 4,
    "hitamFee": 200,
    "otherFee": 300,
    "feeModel": "team",
    "prize": 30000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieee-hitam.png",
    "sheetName": "[IEEE] IEEE National Ideathon",
    "themeColor": "#002855",
    "description": "Pitch transformative engineering concepts across clean energy, computing systems, healthcare, and robotics before an esteemed jury of industry practitioners and researchers.",
    "prizeBreakup": {},
    "studentContact": "Sai Sampada (+91 88793 41306, ieeesb@hitam.org)",
    "facultyContact": "Bindu Madhavi (+91 91603 08130, bindumadhavi.t@ieee.org)",
    "clubEmail": ""
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
    "studentContact": "Ameena (9966864664), Kanishka (9494753922), Alankrusha (9063412373)",
    "facultyContact": "Santosh Naik (+91 99802 99366, santoshn.mech@hitam.org)",
    "clubEmail": ""
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
    "description": "Organized by GDGoC HITAM as a 2-day technical flagship. Day 1 (Oct 9) features an interactive masterclass on Agentic AI fundamentals, reasoning loops, and autonomous tool use. Day 2 (Oct 10) is the high-stakes Agentic AI Hackathon where teams architect and submit real-world agent solutions. A single ₹150 registration covers both the workshop and the hackathon!",
    "prizeBreakup": {
      "first": "₹5,000",
      "second": "₹3,000",
      "third": "₹2,000"
    },
    "studentContact": "Manik Manohar (9100834381), Dhanudeep (7569956911), Y Shamsmitha (7396933363)",
    "facultyContact": "D. Harikrishna (+91 94904 25130, associatedean.mdp@hitam.org)",
    "clubEmail": "gdgoncampus@hitam.org"
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
    "description": "An electrifying high-speed coding battle: blind syntax rounds, obscure runtime bug hunts, algorithmic sprint races, and rapid-fire problem solving under tournament pressure.",
    "prizeBreakup": {
      "first": "₹3,000",
      "second": "₹2,000"
    },
    "studentContact": "Ameena (9966864664), Kanishka (9494753922), Alankrusha (9063412373)",
    "facultyContact": "Santosh Naik (+91 99802 99366, santoshn.mech@hitam.org)",
    "clubEmail": ""
  },
  {
    "id": "E05",
    "slug": "smart-manufacturing-challenge",
    "title": "Smart Manufacturing Challenge",
    "club": "IEOM HITAM",
    "category": "Challenge",
    "minTeam": 4,
    "maxTeam": 4,
    "hitamFee": 99,
    "otherFee": 149,
    "feeModel": "team",
    "prize": 5700,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieom-hitam.png",
    "sheetName": "[IEOM] Smart Manufacturing Challenge",
    "themeColor": "#0f766e",
    "description": "Dive into smart factory operations, digital twins, IoT automation, and supply chain telemetry. Solve authentic industrial production bottlenecks under real operational constraints.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹2,000",
      "third": "₹1,200"
    },
    "studentContact": "Rishitha (+91 91210 14558, 24e51a66e1@hitam.org)",
    "facultyContact": "Praveen (+91 89190 46164, praveenp.mech@hitam.org)",
    "clubEmail": ""
  },
  {
    "id": "E06",
    "slug": "ieom-startup-pitch",
    "title": "IEOM Startup Pitch Challenge",
    "club": "IEOM HITAM",
    "category": "Ideathon",
    "minTeam": 1,
    "maxTeam": 4,
    "hitamFee": 149,
    "otherFee": 199,
    "feeModel": "team",
    "prize": 5700,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ieom-hitam.png",
    "sheetName": "[IEOM] Startup Pitch Challenge",
    "themeColor": "#0f766e",
    "description": "Pitch viable hardware, software, or manufacturing startups before investor judges. Showcase unit economics, operational prototypes, and commercial viability roadmaps.",
    "prizeBreakup": {
      "first": "₹2,500",
      "second": "₹2,000",
      "third": "₹1,200"
    },
    "studentContact": "Rishitha (+91 91210 14558, 24e51a66e1@hitam.org)",
    "facultyContact": "Praveen (+91 89190 46164, praveenp.mech@hitam.org)",
    "clubEmail": ""
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
    "clubEmail": "aiclub@hitam.org"
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
    "clubEmail": "aiclub@hitam.org"
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
    "clubEmail": ""
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
    "clubEmail": ""
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
    "prizeBreakup": {},
    "studentContact": "G. Sri Harshika (9052693939, 24e51a0311@hitam.org)",
    "facultyContact": "Ruchir Shrivastava (903958390, programhead.mech@hitam.org)",
    "clubEmail": ""
  },
  {
    "id": "E12",
    "slug": "build-first-robot",
    "title": "Build Your First Robot",
    "club": "ISAMPE Chapter",
    "category": "Workshop",
    "minTeam": 2,
    "maxTeam": 4,
    "hitamFee": 200,
    "otherFee": 200,
    "feeModel": "team",
    "prize": 5000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/ISAMPE.png",
    "sheetName": "[ISAMPE] Build Your First Robot",
    "themeColor": "#047857",
    "description": "Assemble an autonomous obstacle-avoiding bot from scratch. Learn DC geared motors, motor drivers, Arduino Uno microcontrollers, ultrasonic sensors, and race in the custom obstacle arena.",
    "prizeBreakup": {},
    "studentContact": "ISAMPE Student Lead (+91 90591 11595)",
    "facultyContact": "ssg@hitam.org",
    "clubEmail": ""
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
    "prize": 10000,
    "logo": "https://cdn.jsdelivr.net/gh/ssg-hitam/ESPARTO_2026@main/public/images/chapters/csi-hitam.png",
    "sheetName": "[CSI] Code Casino",
    "themeColor": "#6d28d9",
    "description": "High-stakes competitive coding game organized by CSI Student Chapter. Place strategic chip wagers on code optimization rounds, guess asymptotic complexities, debug under pressure, and maximize your chip stack.",
    "prizeBreakup": {
      "first": "₹5,000",
      "second": "₹3,000",
      "third": "₹2,000"
    },
    "studentContact": "CSI Student Lead (+91 90591 11595)",
    "facultyContact": "ssg@hitam.org",
    "clubEmail": ""
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
    "studentContact": "CSI Student Lead (+91 90591 11595)",
    "facultyContact": "ssg@hitam.org",
    "clubEmail": ""
  }
];

function doGet(e) {
  try {
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
    locked = lock.tryLock(15000);
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
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (sharingError) {
      throw publicError_("PROOF_SHARING", "Payment proof could not be saved with the required sharing permissions. Contact SSG; do not make another payment.");
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
  if (!Array.isArray(payload.members) || payload.members.length !== teamSize - 1) throw publicError_("INVALID_MEMBERS", "Complete one teammate block for each selected participant.");
  var lead = validateMember_(payload.lead, true, "Team lead");
  var members = payload.members.map(function (member, index) { return validateMember_(member, false, "Teammate " + (index + 2)); });
  var emails = Object.create(null), rolls = Object.create(null);
  [lead].concat(members).forEach(function (member) {
    var email = member.email.toLowerCase(), roll = member.rollNo.toLowerCase();
    if ((email && emails[email]) || (roll && rolls[roll])) throw publicError_("DUPLICATE_MEMBER", "Each participant needs their own email and roll number. Check the teammate details.");
    if (email) emails[email] = true;
    if (roll) rolls[roll] = true;
  });
  var college = institution === "HITAM" ? "Hyderabad Institute of Technology and Management (HITAM)" : text_(payload.college, "College name", 160, true);
  var teamName = event.maxTeam === 1 ? lead.name : text_(payload.teamName, "Team name", 120, true);
  var unitFee = institution === "HITAM" ? event.hitamFee : event.otherFee;
  var amount = unitFee * (event.feeModel === "person" ? teamSize : 1);
  if (typeof payload.totalFee !== "number" || payload.totalFee !== amount) throw publicError_("FEE_CHANGED", "The displayed amount does not match the event fee. Return to participant details and check the payment amount.");
  var utr = String(payload.utrNumber || "").trim();
  if (!/^\d{8,16}$/.test(utr)) throw publicError_("INVALID_UTR", "Enter the 8–16 digit UPI transaction reference from your payment app.");
  if (payload.agreement !== true) throw publicError_("AGREEMENT_REQUIRED", "Confirm the registration and payment details before submitting.");
  var customDetails = text_(payload.customDetails, "Additional details", 1000, false);
  var proof = decodeProof_(payload.screenshotBase64);
  var normalized = { eventId: event.id, eventSlug: event.slug, institution: institution, college: college, teamSize: teamSize, teamName: teamName, lead: lead, members: members, amount: amount, utr: utr, customDetails: customDetails, agreement: true };
  return { event: event, requestId: requestId, institution: institution, college: college, teamSize: teamSize, teamName: teamName, lead: lead, members: members, amount: amount, utr: utr, customDetails: customDetails, proof: proof, normalized: normalized };
}

function validateMember_(member, required, label) {
  if (!member || typeof member !== "object" || Array.isArray(member)) throw publicError_("INVALID_MEMBER", "Complete the " + label.toLowerCase() + " details.");
  var name = text_(member.name, label + " name", 120, true);
  var email = text_(member.email, label + " email", 254, required).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw publicError_("INVALID_EMAIL", "Enter a valid email for " + label.toLowerCase() + ".");
  var rawPhone = text_(member.phone, label + " WhatsApp", 24, required);
  if (rawPhone && !/^\+?[\d ()-]+$/.test(rawPhone)) throw publicError_("INVALID_PHONE", "Enter a valid Indian WhatsApp number for " + label.toLowerCase() + ".");
  var phone = rawPhone.replace(/\D/g, "");
  if (phone.length === 12 && phone.indexOf("91") === 0) phone = phone.slice(2);
  if (phone && !/^[6-9]\d{9}$/.test(phone)) throw publicError_("INVALID_PHONE", "Enter a 10-digit Indian WhatsApp number, optionally prefixed with +91, for " + label.toLowerCase() + ".");
  return { name: name, email: email, phone: phone, rollNo: text_(member.rollNo, label + " roll number", 60, required), branchYear: text_(member.branchYear, label + " branch and year", 100, required) };
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

// The private submission token proves possession of this registration. Neither
// the public catalog nor a registration ID/UTR alone can disclose group links.
function getRegistrationStatus(regId, requestId) {
  try {
    if (!/^ESP26-E\d{2}-\d{4}$/.test(String(regId || "")) || !/^[a-f0-9]{32}$/.test(String(requestId || ""))) {
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
  var start = Math.floor(1000 + Math.random() * 9000);
  for (var i = 0; i < 9000; i++) {
    var candidate = "ESP26-" + eventId + "-" + (1000 + ((start - 1000 + i) % 9000));
    if (!used[candidate]) return candidate;
  }
  throw publicError_("CAPACITY", "This event has reached its registration ID capacity. Please contact SSG.");
}

function digest_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value).map(function (byte) { return ("0" + ((byte + 256) % 256).toString(16)).slice(-2); }).join("");
}
function teamLabel_(event) { return event.maxTeam === 1 ? "Solo" : event.minTeam === event.maxTeam ? event.minTeam + " participants" : event.minTeam + "–" + event.maxTeam + " participants"; }
function publicError_(code, message) { var error = new Error(message); error.publicCode = code; return error; }
function failure_(code, message, retryable) { return { success: false, code: code, message: message, retryable: retryable === true }; }
function requireOwner_() {
  var active = Session.getActiveUser().getEmail();
  var effective = Session.getEffectiveUser().getEmail();
  if (!active || active !== effective) throw new Error("Run this administrative function manually as the script owner.");
}
