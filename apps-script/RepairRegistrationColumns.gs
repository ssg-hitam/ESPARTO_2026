/** Add as a separate Apps Script file. Run repairRegistrationColumns as the owner.
 * Restores column order by moving entire columns, never relabeling participant data.
 */
function repairRegistrationColumns() {
  requireOwner_();
  var ss = database_(), sheet = ss.getSheetByName("ALL_REGISTRATIONS");
  var expected = HEADERS.ALL_REGISTRATIONS.slice();
  function headers() { return sheet.getRange(1, 1, 1, expected.length).getValues()[0]; }
  function validate(actual) {
    if (sheet.getLastColumn() !== expected.length || actual.slice().sort().join("\u001f") !== expected.slice().sort().join("\u001f")) {
      throw Error("Repair stopped: headers are missing, duplicated or unknown. No registration data was changed.");
    }
  }
  validate(headers());
  if (headers().join("\u001f") === expected.join("\u001f")) { console.log("Column order already correct; nothing changed."); return; }
  var backup = ss.copy("ESPARTO registration backup before column repair " + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH-mm-ss"));
  console.log("Backup created: " + backup.getUrl());
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    validate(headers());
    for (var target = 0; target < expected.length; target++) {
      var actual = headers(), source = actual.indexOf(expected[target]);
      if (source !== target) sheet.moveColumns(sheet.getRange(1, source + 1, sheet.getMaxRows(), 1), target + 1);
    }
    SpreadsheetApp.flush();
    assertHeaders_(sheet, expected);
    console.log("ALL_REGISTRATIONS column order restored. Existing rows preserved. Run diagnoseRegistrationHealth next.");
  } finally { lock.releaseLock(); }
}
