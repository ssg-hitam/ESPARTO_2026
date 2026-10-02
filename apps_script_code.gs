/**
 * ESPARTO 2026 — Master Central Registration & Finance Engine
 * 
 * STRUCTURE:
 * 1. DASHBOARD_LIVE_METRICS   — Live registration count & revenue dashboard
 * 2. ALL_REGISTRATIONS        — Central master roster of all participants
 * 3. ALL_PAYMENTS_COLLECTION  — Central financial audit with Drive proof links
 * 4. ALL_MEMBERS_ROSTER       — Every team lead & member with roll numbers
 * 5. Event-Wise Sheets        — 14 distinct tabs starting with Chapter/Club name
 */

var DRIVE_FOLDER_NAME = "ESPARTO_2026_PAYMENT_SCREENSHOTS";

// Event Mapping: Event ID / Slug -> Chapter Tab Name
var EVENT_SHEET_MAP = {
  "E01": "[IEEE] IEEE National Ideathon",
  "E02": "[HHC] Reverse Hackathon",
  "E03": "[GDG] Agentic AI Workshop & Hackathon",
  "E04": "[HHC] Programmers Got Talent",
  "E05": "[IEOM] Smart Manufacturing Challenge",
  "E06": "[IEOM] Startup Pitch Challenge",
  "E07": "[HITAM AI] DataQuest Kaggle Challenge",
  "E08": "[HITAM AI] n8n Automation Challenge",
  "E09": "[MINDS] DATA HEIST Datathon",
  "E10": "[MINDS] DATA DOSSIER Case Study",
  "E11": "[TorqueX] Garage to Grid",
  "E12": "[ISAMPE] Build Your First Robot",
  "E13": "[CSI] Code Casino",
  "E14": "[CSI] Technical Tambola",

  // Slugs & Aliases (Handles unified GDG slug and legacy links)
  "ieee-ideathon": "[IEEE] IEEE National Ideathon",
  "reverse-hackathon": "[HHC] Reverse Hackathon",
  "agentic-ai-workshop-hackathon": "[GDG] Agentic AI Workshop & Hackathon",
  "agentic-ai-hackathon": "[GDG] Agentic AI Workshop & Hackathon",
  "agentic-ai-workshop": "[GDG] Agentic AI Workshop & Hackathon",
  "programmers-got-talent": "[HHC] Programmers Got Talent",
  "smart-manufacturing-challenge": "[IEOM] Smart Manufacturing Challenge",
  "ieom-startup-pitch": "[IEOM] Startup Pitch Challenge",
  "dataquest-kaggle": "[HITAM AI] DataQuest Kaggle Challenge",
  "n8n-automation-challenge": "[HITAM AI] n8n Automation Challenge",
  "data-heist-datathon": "[MINDS] DATA HEIST Datathon",
  "data-dossier": "[MINDS] DATA DOSSIER Case Study",
  "torquex-motorsport": "[TorqueX] Garage to Grid",
  "build-first-robot": "[ISAMPE] Build Your First Robot",
  "code-casino": "[CSI] Code Casino",
  "technical-tambola": "[CSI] Technical Tambola"
};

var EVENT_CATALOG = [
  { 
    id: "E01", club: "IEEE Student Branch HITAM", name: "IEEE National Ideathon", cat: "Ideathon", team: "3–4 Members", fee: "₹200 / ₹300 (Team)",
    studentCoord: "Sai Sampada (8879341306, ieeesb@hitam.org)",
    facultyCoord: "Bindu Madhavi (9160308130, bindumadhavi.t@ieee.org)",
    clubEmail: "ieeesb@hitam.org"
  },
  { 
    id: "E02", club: "HHC × IUCEE-EWB", name: "Reverse Hackathon", cat: "Hackathon", team: "2–3 Members", fee: "₹550 / ₹600 (Team)",
    studentCoord: "Ameena (9966864664), Kanishka (9494753922), Alankrusha (9063412373)",
    facultyCoord: "Santosh Naik (9980299366, santoshn.mech@hitam.org)",
    clubEmail: "iucee@hitam.org"
  },
  { 
    id: "E03", club: "Google Developer Groups on Campus – HITAM", name: "Agentic AI Workshop & Hackathon", cat: "Hackathon & Workshop", team: "1–4 Members", fee: "₹150 / person (Covers Both)",
    studentCoord: "Manik Manohar (9100834381), Dhanudeep (7569956911), Y Shamsmitha (7396933363)",
    facultyCoord: "D. Harikrishna (9490425130, associatedean.mdp@hitam.org)",
    clubEmail: "gdgoncampus@hitam.org"
  },
  { 
    id: "E04", club: "HHC × IUCEE-EWB", name: "Programmers Got Talent", cat: "Gaming & Coding", team: "Solo", fee: "₹150 / person",
    studentCoord: "Ameena (9966864664), Kanishka (9494753922), Alankrusha (9063412373)",
    facultyCoord: "Santosh Naik (9980299366, santoshn.mech@hitam.org)",
    clubEmail: "hhc@hitam.org"
  },
  { 
    id: "E05", club: "IEOM HITAM Chapter", name: "Smart Manufacturing: Industry Insights & Innovation Challenge", cat: "Challenge", team: "Team of 4", fee: "₹99 / ₹149 (Team)",
    studentCoord: "Rishitha (9121014558, 24e51a66e1@hitam.org)",
    facultyCoord: "Praveen (8919046164, praveenp.mech@hitam.org)",
    clubEmail: "ieom.hitam@gmail.com"
  },
  { 
    id: "E06", club: "IEOM HITAM Chapter", name: "IEOM Startup Pitch Challenge", cat: "Ideathon", team: "Solo or Team (1-4)", fee: "₹79-₹149 / ₹99-₹199",
    studentCoord: "Rishitha (9121014558, 24e51a66e1@hitam.org)",
    facultyCoord: "Praveen (8919046164, praveenp.mech@hitam.org)",
    clubEmail: "ieom.hitam@gmail.com"
  },
  { 
    id: "E07", club: "HITAM AI Club", name: "DataQuest – Kaggle Data Science Challenge", cat: "Challenge", team: "Team of 2", fee: "₹300 / team",
    studentCoord: "MD Arif (9390219103, 23e51a6671@hitam.org)",
    facultyCoord: "Dr. M. Rajeshwar (9248711181, rajeshwarm.cse@hitam.org)",
    clubEmail: "aiclub@hitam.org"
  },
  { 
    id: "E08", club: "HITAM AI Club", name: "n8n Automation Challenge", cat: "Challenge", team: "Team of 2", fee: "₹300 / team",
    studentCoord: "MD Arif (9390219103, 23e51a6671@hitam.org)",
    facultyCoord: "Dr. M. Rajeshwar (9248711181, rajeshwarm.cse@hitam.org)",
    clubEmail: "aiclub@hitam.org"
  },
  { 
    id: "E09", club: "MINDS Club", name: "DATA HEIST – Datathon", cat: "Challenge", team: "2–4 Members", fee: "₹200 / ₹300 (Team)",
    studentCoord: "Arutla Sai Prasanna (8106110146, 23e51a6711@hitam.org)",
    facultyCoord: "Richa Tiwari (9131539794, richatiwari.cse@hitam.org)",
    clubEmail: "minds.datascience@hitam.org"
  },
  { 
    id: "E10", club: "MINDS Club", name: "DATA DOSSIER Case Study", cat: "Challenge", team: "2–4 Members", fee: "₹100 / ₹200 (Team)",
    studentCoord: "Arutla Sai Prasanna (8106110146, 23e51a6711@hitam.org)",
    facultyCoord: "Richa Tiwari (9131539794, richatiwari.cse@hitam.org)",
    clubEmail: "minds.datascience@hitam.org"
  },
  { 
    id: "E11", club: "TorqueX Motorsports", name: "TorqueX – From Garage to Grid & Kart Reveal", cat: "Challenge", team: "Solo or Team (1-4)", fee: "₹50-₹100 / ₹70-₹140",
    studentCoord: "TorqueX Student Lead (+91 90591 11595)",
    facultyCoord: "TorqueX Faculty Incharge (ssg@hitam.org)",
    clubEmail: "torquex@hitam.org"
  },
  { 
    id: "E12", club: "ISAMPE Chapter", name: "Build Your First Robot", cat: "Workshop", team: "2–4 Members", fee: "₹200 / team",
    studentCoord: "ISAMPE Student Lead (+91 90591 11595)",
    facultyCoord: "ISAMPE Faculty Incharge (ssg@hitam.org)",
    clubEmail: "isampe@hitam.org"
  },
  { 
    id: "E13", club: "CSI Student Chapter", name: "Code Casino", cat: "Gaming & Coding", team: "2–3 Members", fee: "₹50 / ₹60 (Person)",
    studentCoord: "CSI Student Lead (+91 90591 11595)",
    facultyCoord: "CSI Faculty Incharge (ssg@hitam.org)",
    clubEmail: "csi@hitam.org"
  },
  { 
    id: "E14", club: "CSI Student Chapter", name: "Technical Tambola", cat: "Gaming & Coding", team: "Solo", fee: "₹50 / ₹60 (Person)",
    studentCoord: "CSI Student Lead (+91 90591 11595)",
    facultyCoord: "CSI Faculty Incharge (ssg@hitam.org)",
    clubEmail: "csi@hitam.org"
  }
];

function doGet(e) {
  var template = HtmlService.createTemplateFromFile("index");
  template.initialEvent = (e && e.parameter && e.parameter.event) ? e.parameter.event : "";
  return template.evaluate()
    .setTitle("ESPARTO 2026 | Festival Portal & Registrations")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ONE-CLICK SETUP FOR NEW GOOGLE SHEET:
 * Creates Dashboard with Live Formulas, 3 Master Sheets, and 15 Chapter Event Tabs!
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. DASHBOARD_LIVE_METRICS
  var dashSheet = ss.getSheetByName("DASHBOARD_LIVE_METRICS");
  if (!dashSheet) {
    dashSheet = ss.insertSheet("DASHBOARD_LIVE_METRICS", 0);
  }
  dashSheet.clear();

  var dashHeaders = [
    "S.No", "Chapter / Club", "Event Name", "Category", "Team Format",
    "Pricing Model (HITAM / Outside)", "Total Registrations Count", "Total Revenue (₹)", "Status"
  ];
  dashSheet.appendRow(dashHeaders);
  var dashHeaderRange = dashSheet.getRange(1, 1, 1, dashHeaders.length);
  dashHeaderRange.setBackground("#002855")
                 .setFontColor("#ffffff")
                 .setFontWeight("bold")
                 .setHorizontalAlignment("center");
  dashSheet.setFrozenRows(1);

  // Populate Dashboard Rows with Live formulas linking to ALL_REGISTRATIONS
  for (var i = 0; i < EVENT_CATALOG.length; i++) {
    var ev = EVENT_CATALOG[i];
    var rowIdx = i + 2;
    var formulaCount = "=COUNTIF(ALL_REGISTRATIONS!D:D, C" + rowIdx + ")";
    var formulaRevenue = "=SUMIF(ALL_REGISTRATIONS!D:D, C" + rowIdx + ", ALL_REGISTRATIONS!P:P)";

    dashSheet.appendRow([
      i + 1,
      ev.club,
      ev.name,
      ev.cat,
      ev.team,
      ev.fee,
      formulaCount,
      formulaRevenue,
      "Active"
    ]);
  }

  // Summary Row at Bottom of Dashboard
  var lastRow = EVENT_CATALOG.length + 2;
  dashSheet.appendRow([
    "TOTAL", "ALL CHAPTERS", "ALL 14 FESTIVAL EVENTS", "—", "—", "—",
    "=SUM(G2:G" + (lastRow - 1) + ")",
    "=SUM(H2:H" + (lastRow - 1) + ")",
    "LIVE"
  ]);
  var totalRange = dashSheet.getRange(lastRow, 1, 1, dashHeaders.length);
  totalRange.setBackground("#f1f5f9").setFontWeight("bold");

  dashSheet.setColumnWidth(1, 60);
  dashSheet.setColumnWidth(2, 220);
  dashSheet.setColumnWidth(3, 300);
  dashSheet.setColumnWidth(4, 130);
  dashSheet.setColumnWidth(5, 130);
  dashSheet.setColumnWidth(6, 180);
  dashSheet.setColumnWidth(7, 180);
  dashSheet.setColumnWidth(8, 160);
  dashSheet.setColumnWidth(9, 100);

  // 2. ALL_REGISTRATIONS (Master Sheet)
  var masterHeaders = [
    "Timestamp", "Reg ID", "Event ID", "Event Name", "Chapter / Club",
    "Team / Solo Name", "Team Size", "Lead Name", "Lead Roll Number", "Lead WhatsApp",
    "Lead Email", "Institution", "College Name", "Teammates Summary",
    "Custom Track / Technical Details", "Amount Paid (₹)", "Check-In Status", "Payment Status", "Payment UTR", "Screenshot Link"
  ];
  createOrFormatSheet(ss, "ALL_REGISTRATIONS", masterHeaders, "#0f172a", false);

  // 3. ALL_PAYMENTS_COLLECTION (Finance Team)
  var paymentHeaders = [
    "Timestamp", "Reg ID", "Event Name", "Chapter / Club", "Payer Name",
    "Payer WhatsApp", "Amount (₹)", "Payment Mode", "UTR / Txn ID", "Screenshot Drive File ID",
    "Screenshot Proof Link", "Verification Status", "Verified By / Notes"
  ];
  createOrFormatSheet(ss, "ALL_PAYMENTS_COLLECTION", paymentHeaders, "#047857", false);

  // 4. ALL_MEMBERS_ROSTER (All individual participants)
  var memberHeaders = [
    "Reg ID", "Event Name", "Team Name", "Member Index", "Role",
    "Full Name", "Roll Number", "Branch & Year", "Email", "WhatsApp", "College Name"
  ];
  createOrFormatSheet(ss, "ALL_MEMBERS_ROSTER", memberHeaders, "#4338ca", false);

  // 5. EVENT-WISE SHEETS (14 Distinct Tabs for Event-Day Stalls)
  var eventHeaders = [
    "Checked In?", "Reg ID", "Chapter / Club", "Event Name", "Team / Solo Name",
    "Team Size", "Lead Name", "Lead Roll No", "WhatsApp", "Email",
    "Institution", "College Name", "All Teammates (Roll & Name)",
    "Custom Track / Answers", "Amount Paid (₹)", "Payment UTR", "Proof Link", "Desk Notes"
  ];

  var createdTabs = {};
  for (var k in EVENT_SHEET_MAP) {
    var tabName = EVENT_SHEET_MAP[k];
    if (!createdTabs[tabName]) {
      createOrFormatSheet(ss, tabName, eventHeaders, "#1e3a8a", true);
      createdTabs[tabName] = true;
    }
  }

  // Remove default "Sheet1" if empty
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }

  Logger.log("✅ Zero-duplicate database created with Dashboard, Master sheets & 15 Chapter tabs!");
}

function createOrFormatSheet(ss, sheetName, headers, headerColor, isEventTab) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(headerColor)
               .setFontColor("#ffffff")
               .setFontWeight("bold")
               .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);

    sheet.setColumnWidth(1, isEventTab ? 100 : 160);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 180);
  }
}

/**
 * Handles Form Submissions from Web App
 */
function submitRegistration(payload) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date();

    // Generate Reg ID: ESP26-E02-8419
    var eventTag = (payload.eventId || "GEN").toUpperCase().replace(/[^A-Z0-9]/g, "");
    var regId = "ESP26-" + eventTag + "-" + Math.floor(1000 + Math.random() * 9000);

    // Save screenshot to Drive
    var screenshotUrl = "No screenshot";
    var fileId = "";
    if (payload.screenshotBase64 && payload.screenshotBase64.indexOf("base64,") !== -1) {
      try {
        var base64Data = payload.screenshotBase64.split("base64,")[1];
        var decoded = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decoded, payload.screenshotMime || "image/png", regId + "_payment_proof.png");

        var folderIter = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
        var folder = folderIter.hasNext() ? folderIter.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
        fileId = file.getId();
      } catch (uploadErr) {
        screenshotUrl = "Upload error: " + uploadErr.toString();
      }
    }

    var lead = payload.lead || {};
    var isHitam = payload.isHitam === true || payload.isHitam === "true";
    var institution = isHitam ? "HITAM" : "Non-HITAM";
    var collegeName = isHitam ? "Hyderabad Institute of Technology and Management (HITAM)" : (lead.college || "Other College");

    // Format Teammates Summary
    var membersList = [];
    membersList.push("1. " + (lead.name || "Lead") + " (" + (lead.rollNo || "No Roll") + ")");
    if (payload.members && payload.members.length > 0) {
      payload.members.forEach(function(m, idx) {
        membersList.push((idx + 2) + ". " + m.name + " (" + (m.rollNo || "No Roll") + ")");
      });
    }
    var teamSummaryText = membersList.join("\n");

    // Dynamic Questions / Answers
    var customDetails = [];
    if (payload.customAnswers) {
      for (var k in payload.customAnswers) {
        customDetails.push(k + ": " + payload.customAnswers[k]);
      }
    }
    var customText = customDetails.length > 0 ? customDetails.join("; ") : "N/A";

    var chapterName = getChapterName(payload.eventId, payload.eventSlug);

    // 1. ALL_REGISTRATIONS Master
    var masterSheet = ss.getSheetByName("ALL_REGISTRATIONS");
    if (!masterSheet) { setupDatabase(); masterSheet = ss.getSheetByName("ALL_REGISTRATIONS"); }

    masterSheet.appendRow([
      timestamp,
      regId,
      payload.eventId || "",
      payload.eventTitle || "",
      chapterName,
      payload.teamName || lead.name || "",
      payload.teamSize || 1,
      lead.name || "",
      lead.rollNo || "",
      lead.phone || "",
      lead.email || "",
      institution,
      collegeName,
      teamSummaryText,
      customText,
      payload.totalFee || 0,
      "NOT CHECKED IN",
      "Under Verification",
      payload.utrNumber || "",
      screenshotUrl
    ]);

    // 2. ALL_PAYMENTS_COLLECTION Finance
    var paymentsSheet = ss.getSheetByName("ALL_PAYMENTS_COLLECTION");
    if (paymentsSheet) {
      paymentsSheet.appendRow([
        timestamp,
        regId,
        payload.eventTitle || "",
        chapterName,
        lead.name || "",
        lead.phone || "",
        payload.totalFee || 0,
        "UPI",
        payload.utrNumber || "",
        fileId,
        screenshotUrl,
        "Under Verification",
        ""
      ]);
    }

    // 3. ALL_MEMBERS_ROSTER
    var membersSheet = ss.getSheetByName("ALL_MEMBERS_ROSTER");
    if (membersSheet) {
      // Lead
      membersSheet.appendRow([
        regId, payload.eventTitle || "", payload.teamName || "", 1, "Team Lead",
        lead.name || "", lead.rollNo || "", lead.branchYear || "", lead.email || "", lead.phone || "", collegeName
      ]);
      // Teammates
      if (payload.members && payload.members.length > 0) {
        payload.members.forEach(function(m, idx) {
          membersSheet.appendRow([
            regId, payload.eventTitle || "", payload.teamName || "", idx + 2, "Teammate",
            m.name || "", m.rollNo || "", m.branchYear || "", m.email || "", m.phone || "", collegeName
          ]);
        });
      }
    }

    // 4. WRITE DIRECTLY TO THE CHAPTER EVENT SHEET!
    var eventTabName = EVENT_SHEET_MAP[payload.eventId] || EVENT_SHEET_MAP[payload.eventSlug];
    if (eventTabName) {
      var eventSheet = ss.getSheetByName(eventTabName);
      if (!eventSheet) {
        setupDatabase();
        eventSheet = ss.getSheetByName(eventTabName);
      }

      var nextRow = eventSheet.getLastRow() + 1;
      eventSheet.appendRow([
        false, // Interactive Checkbox in Column A
        regId,
        chapterName,
        payload.eventTitle || "",
        payload.teamName || lead.name || "",
        payload.teamSize || 1,
        lead.name || "",
        lead.rollNo || "",
        lead.phone || "",
        lead.email || "",
        institution,
        collegeName,
        teamSummaryText,
        customText,
        payload.totalFee || 0,
        payload.utrNumber || "",
        screenshotUrl,
        "" // Volunteer spot notes
      ]);

      try {
        var checkboxCell = eventSheet.getRange(nextRow, 1);
        checkboxCell.insertCheckboxes();
      } catch (cbErr) {}
    }

    return {
      success: true,
      regId: regId,
      message: "Registration successfully recorded!"
    };

  } catch (error) {
    return {
      success: false,
      message: "Error processing registration: " + error.toString()
    };
  }
}

function getChapterName(id, slug) {
  var mapping = {
    "E01": "IEEE Student Branch HITAM",
    "E02": "HHC × IUCEE-EWB",
    "E03": "Google Developer Groups on Campus – HITAM",
    "E04": "HHC × IUCEE-EWB",
    "E05": "IEOM HITAM Chapter",
    "E06": "IEOM HITAM Chapter",
    "E07": "HITAM AI Club",
    "E08": "HITAM AI Club",
    "E09": "MINDS Club",
    "E10": "MINDS Club",
    "E11": "TorqueX Motorsports",
    "E12": "ISAMPE Chapter",
    "E13": "CSI Student Chapter",
    "E14": "CSI Student Chapter",

    // Slugs
    "ieee-ideathon": "IEEE Student Branch HITAM",
    "reverse-hackathon": "HHC × IUCEE-EWB",
    "agentic-ai-workshop-hackathon": "Google Developer Groups on Campus – HITAM",
    "agentic-ai-hackathon": "Google Developer Groups on Campus – HITAM",
    "agentic-ai-workshop": "Google Developer Groups on Campus – HITAM",
    "programmers-got-talent": "HHC × IUCEE-EWB",
    "smart-manufacturing-challenge": "IEOM HITAM Chapter",
    "ieom-startup-pitch": "IEOM HITAM Chapter",
    "dataquest-kaggle": "HITAM AI Club",
    "n8n-automation-challenge": "HITAM AI Club",
    "data-heist-datathon": "MINDS Club",
    "data-dossier": "MINDS Club",
    "torquex-motorsport": "TorqueX Motorsports",
    "build-first-robot": "ISAMPE Chapter",
    "code-casino": "CSI Student Chapter",
    "technical-tambola": "CSI Student Chapter"
  };
  return mapping[id] || mapping[slug] || "HITAM Club";
}
