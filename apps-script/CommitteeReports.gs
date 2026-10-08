// Visible editor entry point; setup still enforces master ownership.
function setupCommitteeReports() {
  requireOwner_();
  return setupCommitteeReports_();
}

/** Add as a SEPARATE Apps Script file. Existing registration code is unchanged.
 * Run setupCommitteeReports from the editor as the master spreadsheet owner.
 * Reports start PRIVATE. Share each generated file only with its event leads as Viewers.
 */
function setupCommitteeReports_() {
  requireOwner_();
  var source = database_(), owner = DriveApp.getFileById(source.getId()).getOwner();
  var email = Session.getEffectiveUser().getEmail();
  if (!owner || owner.getEmail() !== email) throw Error("Only the master spreadsheet owner may create reports.");
  var props = PropertiesService.getScriptProperties();
  props.setProperty("COMMITTEE_REPORT_OWNER", email);
  var links = [];
  EVENT_CATALOG.filter(function (event) { return event.id !== "E01"; }).forEach(function (event) {
    var key = "COMMITTEE_REPORT_" + event.id, id = props.getProperty(key);
    if (!id) {
      var report = SpreadsheetApp.create("ESPARTO 2026 — " + event.title + " — Committee report");
      DriveApp.getFileById(report.getId()).setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
      id = report.getId(); props.setProperty(key, id);
    }
    links.push(event.title + ": https://docs.google.com/spreadsheets/d/" + id + "/edit");
  });
  syncCommitteeReports_();
  var exists = ScriptApp.getProjectTriggers().some(function (trigger) { return trigger.getHandlerFunction() === "syncCommitteeReports_"; });
  if (!exists) ScriptApp.newTrigger("syncCommitteeReports_").timeBased().everyMinutes(5).create();
  console.log(links.join("\n")); // Owner editor execution only: report links, no participant data.
  return links;
}
function syncCommitteeReports_() {
  var props = PropertiesService.getScriptProperties();
  if (Session.getEffectiveUser().getEmail() !== props.getProperty("COMMITTEE_REPORT_OWNER")) throw Error("Report sync is owner-only.");
  var lock = LockService.getUserLock();
  if (!lock.tryLock(1000)) return;
  try {
    var source = database_(), master = source.getSheetByName("ALL_REGISTRATIONS"), roster = source.getSheetByName("ALL_MEMBERS_ROSTER");
    assertHeaders_(master, HEADERS.ALL_REGISTRATIONS); assertHeaders_(roster, HEADERS.ALL_MEMBERS_ROSTER);
    var registrations = master.getDataRange().getValues().slice(1), members = roster.getDataRange().getValues().slice(1);
    var headers = ["Ticket", "Event", "Team", "Role", "Name", "Roll number", "Branch / Year", "Email", "Phone", "College", "Payment status", "Check-in status"];
    EVENT_CATALOG.filter(function (event) { return event.id !== "E01"; }).forEach(function (event) {
      try {
      var id = props.getProperty("COMMITTEE_REPORT_" + event.id); if (!id) throw Error("Missing report ID");
      if (id === source.getId()) throw Error("Report cannot target the master.");
      var matching = Object.create(null);
      registrations.filter(function (row) { return row[2] === event.id; }).forEach(function (row) { matching[row[1]] = row; });
      var rows = members.filter(function (row) { return !!matching[row[0]]; }).map(function (row) {
        var registration = matching[row[0]];
        return [row[0], row[1], row[2], row[4], row[5], row[6], row[7], row[8], row[9], row[10], registration[17], registration[16]].map(function (value) {
          var text = String(value == null ? "" : value); return /^[=+@-]/.test(text) ? "'" + text : text;
        });
      });
      var report = SpreadsheetApp.openById(id), sheet = report.getSheets()[0];
      sheet.setName("Event responses");
      var oldRows = sheet.getLastRow();
      sheet.getRange(1, 1, rows.length + 1, headers.length).setNumberFormat("@").setValues([headers].concat(rows));
      if (oldRows > rows.length + 1) sheet.getRange(rows.length + 2, 1, oldRows - rows.length - 1, headers.length).clearContent();
      sheet.setFrozenRows(1); sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.getRange(1, 14).setValue("Updated: " + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss"));
      if (typeof syncCommitteeAttendance_ === "function" && report.getSheetByName("Attendance")) syncCommitteeAttendance_(report, rows);
      console.log(event.id + " SYNC OK: " + rows.length + " participant rows");
      } catch (error) { console.error(event.id + " SYNC FAILED: " + String(error.message || error)); }
    });
  } finally { lock.releaseLock(); }
}

// Run manually as owner after reviewing this event-to-email list.
// Adds Viewers only; does not remove existing individual/group permissions.
function shareCommitteeReports() {
  requireOwner_();
  var props = PropertiesService.getScriptProperties();
  if (Session.getEffectiveUser().getEmail() !== props.getProperty("COMMITTEE_REPORT_OWNER")) throw Error("Report owner only.");
  var contacts = {
    E02: ["24e51a6612@hitam.org", "24e51a05b4@hitam.org", "24e51a6628@hitam.org", "24e51a05k5@hitam.org", "associatedean.mdp@hitam.org", "santoshn.mech@hitam.org", "ewb@hitam.org"],
    E03: ["manikmanohar0@gmail.com", "kdhanudeep@gmail.com", "yshamsmitha@gmail.com", "associatedean.mdp@hitam.org", "gdgoncampus@hitam.org"],
    E04: ["24e51a6612@hitam.org", "24e51a05b4@hitam.org", "24e51a6628@hitam.org", "24e51a05k5@hitam.org", "associatedean.mdp@hitam.org", "santoshn.mech@hitam.org", "ewb@hitam.org"],
    E05: ["24e51a66e1@hitam.org", "ieom.hitam@gmail.com", "praveen.mech@hitam.org"],
    E06: ["24e51a66e1@hitam.org", "ieom.hitam@gmail.com", "praveen.mech@hitam.org"],
    E07: ["23e51a6671@hitam.org", "aiclub@hitam.org", "rajeshwarm.cse@hitam.org"],
    E08: ["23e51a6671@hitam.org", "aiclub@hitam.org", "rajeshwarm.cse@hitam.org"],
    E09: ["23e51a6711@hitam.org", "minds.datascience@hitam.org", "richatiwari.cse@hitam.org"],
    E10: ["23e51a6711@hitam.org", "minds.datascience@hitam.org", "richatiwari.cse@hitam.org"],
    E11: ["24e51a0311@hitam.org", "programhead.mech@hitam.org", "torquex.hitam@gmail.com"],
    E12: ["23e51a0301@hitam.org", "24e55a0325@hitam.org"],
    E13: ["25e55a0512@hitam.org", "preethicm.cse@hitam.org"],
    E14: ["24e51a0592@hitam.org", "24e51a05b5@hitam.org", "preethicm.cse@hitam.org"]
  };
  var masterId = database_().getId();
  var granted = 0, failed = 0;
  Object.keys(contacts).forEach(function (eventId) {
    var id = props.getProperty("COMMITTEE_REPORT_" + eventId);
    if (!id || id === masterId) throw Error("Missing or invalid report for " + eventId);
    var file = DriveApp.getFileById(id), owner = file.getOwner();
    if (!owner || owner.getEmail() !== Session.getEffectiveUser().getEmail()) throw Error("Not report owner: " + eventId);
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);
    contacts[eventId].forEach(function (email) {
      try {
        file.addViewer(email);
        granted++;
        console.log(eventId + " VIEWER OK: " + email);
      } catch (error) {
        failed++;
        console.error(eventId + " VIEWER FAILED: " + email + " — " + String(error.message || error));
      }
    });
  });
  console.log("Sharing complete: " + granted + " successful, " + failed + " failed. Review VIEWER FAILED entries; failed contacts have not been granted access by this run.");
}

// Repairs only this owner's report trigger, then performs an immediate sync.
function repairCommitteeReportSync() {
  requireOwner_();
  var props = PropertiesService.getScriptProperties();
  if (Session.getEffectiveUser().getEmail() !== props.getProperty("COMMITTEE_REPORT_OWNER")) throw Error("Report owner only.");
  ScriptApp.getProjectTriggers().filter(function(trigger){return trigger.getHandlerFunction() === "syncCommitteeReports_";}).forEach(function(trigger){ScriptApp.deleteTrigger(trigger);});
  ScriptApp.newTrigger("syncCommitteeReports_").timeBased().everyMinutes(5).create();
  syncCommitteeReports_();
}
