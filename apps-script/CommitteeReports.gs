/** Add as a SEPARATE Apps Script file. Existing registration code is unchanged.
 * Run setupCommitteeReports_ from the editor as the master spreadsheet owner.
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
      var id = props.getProperty("COMMITTEE_REPORT_" + event.id); if (!id) return;
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
    });
  } finally { lock.releaseLock(); }
}
