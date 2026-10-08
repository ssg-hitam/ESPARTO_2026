/** Add as a separate file. Owner runs setupPublicCommitteeCheckIn once.
 * Public event-file edit access is explicitly authorized by the organizer.
 * Attendance is participant-level and stays in event files; it does not mark
 * payment verified or change the master ticket's scanner check-in status.
 */
function setupPublicCommitteeCheckIn() {
  requireOwner_();
  var props = PropertiesService.getScriptProperties();
  if (Session.getEffectiveUser().getEmail() !== props.getProperty("COMMITTEE_REPORT_OWNER")) throw Error("Report owner only.");
  syncCommitteeReports_();
  EVENT_CATALOG.filter(function(event) { return event.id !== "E01"; }).forEach(function(event) {
    var id = props.getProperty("COMMITTEE_REPORT_" + event.id);
    if (!id || id === database_().getId()) throw Error("Invalid event report ID.");
    var file = DriveApp.getFileById(id);
    if (file.getOwner().getEmail() !== Session.getEffectiveUser().getEmail()) throw Error("Not report owner.");
    var report = SpreadsheetApp.openById(id), source = report.getSheetByName("Event responses");
    if (!source) throw Error("Event responses missing.");
    syncCommitteeAttendance_(report, source.getDataRange().getValues().slice(1).filter(function(row) {return !!row[0];}).map(function(row){return row.slice(0,12);}));
    protectCommitteeSheet_(source, []);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    console.log(event.id + " CHECK-IN READY: " + report.getUrl());
  });
  console.log("Public event-file edit access enabled. Only Attendance Present checkboxes are editable. Master access unchanged.");
}
function committeeAttendanceKey_(row) {
  return [row[0], row[3], row[5], row[7], row[4]].map(function(v){return String(v == null ? "" : v).trim();}).join("\u001f");
}
function syncCommitteeAttendance_(report, rows) {
  var sheet = report.getSheetByName("Attendance");
  if (!sheet) sheet = report.insertSheet("Attendance");
  var headers = ["Ticket", "Event", "Team", "Role", "Name", "Roll number", "Branch / Year", "Email", "Phone", "College", "Payment status", "Ticket check-in status", "Present"];
  sheet.getRange(1,1,1,headers.length).setValues([headers]).setFontWeight("bold");
  var existing = sheet.getLastRow() > 1 ? sheet.getRange(2,1,sheet.getLastRow()-1,13).getValues() : [];
  var index = Object.create(null);
  existing.forEach(function(row,i){if(row[0])index[committeeAttendanceKey_(row)] = i+2;});
  var pending = [];
  rows.forEach(function(row){
    var values = row.slice(0,12), key = committeeAttendanceKey_(values);
    if (index[key]) {
      // Never write the Present column for an existing attendee. A volunteer
      // may be clicking that checkbox while this refresh is running.
      existing[index[key]-2] = values.concat([existing[index[key]-2][12]]);
    } else {
      if (pending.some(function(other){return committeeAttendanceKey_(other)===key;})) return;
      pending.push(values.concat([false]));
    }
  });
  if (existing.length) sheet.getRange(2,1,existing.length,12).setValues(existing.map(function(row){return row.slice(0,12);}));
  if (pending.length) {
    var start = sheet.getLastRow()+1;
    if(start+pending.length-1>sheet.getMaxRows())sheet.insertRowsAfter(sheet.getMaxRows(),start+pending.length-1-sheet.getMaxRows());
    sheet.getRange(start,1,pending.length,13).setValues(pending);
    sheet.getRange(start,13,pending.length,1).insertCheckboxes();
  }
  sheet.setFrozenRows(1);
  protectCommitteeSheet_(sheet, [sheet.getRange(2,13,sheet.getMaxRows()-1,1)]);
}
function protectCommitteeSheet_(sheet, editable) {
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  var protection = protections.filter(function(p){return p.getDescription()==="ESPARTO generated registration data";})[0];
  if (!protection) protection = sheet.protect().setDescription("ESPARTO generated registration data");
  protection.setWarningOnly(false);
  protection.setUnprotectedRanges(editable);
  var editors = protection.getEditors();
  if (editors.length) protection.removeEditors(editors);
  if (protection.canDomainEdit()) protection.setDomainEdit(false);
}
