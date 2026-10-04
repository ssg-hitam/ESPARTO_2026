'use strict';
var fs = require('node:fs');
var vm = require('node:vm');
var crypto = require('node:crypto');
var path = require('node:path');
var BACKEND = fs.readFileSync(path.join(__dirname, '../apps-script/Code.gs'), 'utf8');
var PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aOe0AAAAASUVORK5CYII=';
function createHarness(options) {
  options = options || {};
  var store = Object.assign({ ESPARTO_SPREADSHEET_ID: 'sheet-id', ESPARTO_PROOF_FOLDER_ID: 'folder-id' }, options.properties || {});
  var files = [], batches = [], sheetMap = {}, sheetCounter = 1, lockHeld = false;
  function Range(sheet, row, col, height, width) { this.sheet = sheet; this.row = row; this.col = col; this.height = height || 1; this.width = width || 1; }
  Range.prototype.getDisplayValues = function () {
    var values = [];
    for (var r = 0; r < this.height; r++) { var row = []; for (var c = 0; c < this.width; c++) { var value = (this.sheet.rows[this.row + r - 1] || [])[this.col + c - 1]; row.push(value === undefined ? '' : String(value)); } values.push(row); }
    return values;
  };
  Range.prototype.setValues = function (values) { var self = this; values.forEach(function (row, index) { if (!self.sheet.rows[self.row + index - 1]) self.sheet.rows[self.row + index - 1] = []; row.forEach(function (value, c) { self.sheet.rows[self.row + index - 1][self.col + c - 1] = value; }); }); return this; };
  ['setBackground', 'setFontColor', 'setFontWeight', 'setWrap', 'setDataValidation', 'setNumberFormat'].forEach(function (name) { Range.prototype[name] = function () { return this; }; });
  Range.prototype.createTextFinder = function (text) {
    var range = this, whole = false, caseSensitive = false;
    var finder = { matchCase: function (value) { caseSensitive = value; return finder; }, matchEntireCell: function (value) { whole = value; return finder; }, findNext: function () {
      var values = range.getDisplayValues();
      for (var r = 0; r < values.length; r++) { for (var c = 0; c < values[r].length; c++) { var haystack = values[r][c], needle = text; if (!caseSensitive) { haystack = haystack.toLowerCase(); needle = needle.toLowerCase(); } if (whole ? haystack === needle : haystack.indexOf(needle) !== -1) return { getRow: function () { return range.row + r; } }; } }
      return null;
    } };
    return finder;
  };
  function Sheet(name) { this.name = name; this.id = sheetCounter++; this.rows = []; }
  Sheet.prototype.getName = function () { return this.name; };
  Sheet.prototype.getSheetId = function () { return this.id; };
  Sheet.prototype.getLastRow = function () { return this.rows.length; };
  Sheet.prototype.getMaxRows = function () { return Math.max(1000, this.rows.length); };
  Sheet.prototype.getRange = function (r, c, h, w) { return new Range(this, r, c, h, w); };
  ['setFrozenRows', 'setColumnWidths', 'setColumnWidth'].forEach(function (name) { Sheet.prototype[name] = function () { return this; }; });
  var spreadsheet = { getId: function () { return 'sheet-id'; }, getUrl: function () { return 'https://docs.google.com/spreadsheets/d/sheet-id/edit'; }, getSheetByName: function (name) { return sheetMap[name] || null; }, insertSheet: function (name) { if (sheetMap[name]) throw Error('Duplicate sheet'); return sheetMap[name] = new Sheet(name); } };
  function iterator(list) { var i = 0; return { hasNext: function () { return i < list.length; }, next: function () { return list[i++]; } }; }
  var folder = { getId: function () { return 'folder-id'; }, getFilesByName: function (name) { return iterator(files.filter(function (file) { return file.name === name && !file.trashed; })); }, createFile: function (blob) {
    if (options.uploadFails) throw Error('PRIVATE DRIVE FAILURE');
    var file = { id: 'file-' + (files.length + 1), name: blob.name, bytes: blob.bytes, mime: blob.mime, shared: false, trashed: false, getId: function () { return this.id; }, getUrl: function () { return 'https://drive.google.com/file/d/' + this.id + '/view'; }, setSharing: function () { if (options.sharingFails) throw Error('PRIVATE POLICY FAILURE'); this.shared = true; return this; }, setTrashed: function (value) { this.trashed = value; return this; } };
    files.push(file); return file;
  } };
  var props = { getProperties: function () { return Object.assign({}, store); }, getProperty: function (key) { return store[key] === undefined ? null : store[key]; }, setProperty: function (key, value) { if (options.journalWriteFails) throw Error('PRIVATE PROPERTY QUOTA'); store[key] = value; return props; }, setProperties: function (values) { Object.assign(store, values); return props; }, deleteProperty: function (key) { if (options.journalDeleteFails) throw Error('PRIVATE PROPERTY FAILURE'); delete store[key]; return props; } };
  var scriptLock = { tryLock: function () { if (options.busy || lockHeld) return false; lockHeld = true; return true; }, waitLock: function () { if (!this.tryLock()) throw Error('Busy'); }, releaseLock: function () { lockHeld = false; } };
  var scope = {
    SpreadsheetApp: { getActiveSpreadsheet: function () { return spreadsheet; }, openById: function (id) { if (id !== 'sheet-id') throw Error('PRIVATE SHEET ID'); return spreadsheet; }, newDataValidation: function () { return { requireCheckbox: function () { return this; }, build: function () { return {}; } }; }, flush: function () {} },
    PropertiesService: { getScriptProperties: function () { return props; } },
    LockService: { getScriptLock: function () { return scriptLock; } },
    Session: { getActiveUser: function () { return { getEmail: function () { return options.anonymousAdmin ? '' : 'owner@hitam.org'; } }; }, getEffectiveUser: function () { return { getEmail: function () { return 'owner@hitam.org'; } }; } },
    DriveApp: { Access: { ANYONE_WITH_LINK: 'public-link' }, Permission: { VIEW: 'view' }, getFolderById: function () { return folder; }, getFoldersByName: function () { return iterator([folder]); }, createFolder: function () { return folder; }, getFileById: function (id) { var file = files.find(function (item) { return item.id === id; }); if (!file) throw Error('Missing file'); return file; } },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, base64Decode: function (value) { return Array.from(Buffer.from(value, 'base64')).map(function (byte) { return byte > 127 ? byte - 256 : byte; }); }, newBlob: function (bytes, mime, name) { return { bytes: bytes, mime: mime, name: name }; }, computeDigest: function (_, value) { return Array.from(crypto.createHash('sha256').update(typeof value === 'string' ? value : Buffer.from(value.map(function (byte) { return (byte + 256) % 256; }))).digest()).map(function (byte) { return byte > 127 ? byte - 256 : byte; }); }, formatDate: function () { return '2026-10-02 12:00:00'; } },
    HtmlService: { createTemplateFromFile: function () { var template = { evaluate: function () { scope.renderedSlug = template.initialEvent; return output; } }; return template; }, createHtmlOutput: function () { return output; } },
    Sheets: { Spreadsheets: { get: function () { return { spreadsheetId: 'sheet-id' }; }, batchUpdate: function (body) {
      if (options.batchFailsBeforeCommit) throw Error('PRIVATE SHEETS FAILURE');
      var updates = body.requests.map(function (request) { var target = Object.values(sheetMap).find(function (sheet) { return sheet.id === request.appendCells.sheetId; }); if (!target) throw Error('Invalid sheet'); return { target: target, rows: request.appendCells.rows.map(function (row) { return row.values.map(function (cell) { var value = cell.userEnteredValue; return Object.values(value)[0]; }); }) }; });
      // Validate the entire request before applying ANY mutations, like Sheets.
      batches.push(body); updates.forEach(function (update) { update.target.rows.push.apply(update.target.rows, update.rows); });
      if (options.batchFailsAfterCommit) throw Error('PRIVATE LOST RESPONSE');
      return { replies: body.requests.map(function () { return {}; }) };
    } } }
  };
  var output = { setTitle: function () { return output; }, addMetaTag: function () { return output; } };
  vm.createContext(scope); vm.runInContext(BACKEND, scope);
  // Keep tests isolated from the configured production spreadsheet.
  scope.SPREADSHEET_ID = '';
  if (!options.emptyDatabase) { var schemas = scope.schemaMap_(); Object.keys(schemas).forEach(function (name) { spreadsheet.insertSheet(name).rows.push(Array.from(schemas[name])); }); }
  return { scope: scope, options: options, store: store, files: files, batches: batches, sheets: sheetMap, spreadsheet: spreadsheet, lockHeld: function () { return lockHeld; } };
}
function payloadFor(harness, id, institution, teamSize) {
  var event = harness.scope.findEvent_(id || 'E02'); institution = institution || 'HITAM'; teamSize = teamSize || event.minTeam;
  function member(index) { return { name: 'Participant ' + index, email: 'member' + index + '@example.org', phone: '987654321' + index, rollNo: 'ROLL-' + index, branchYear: 'CSE · Year 2' }; }
  var members = []; for (var i = 2; i <= teamSize; i++) members.push(member(i));
  var totalFee = event.id === 'E12' ? (teamSize === 1 ? 120 : 250) : ((institution === 'HITAM' ? event.hitamFee : event.otherFee) * (event.feeModel === 'person' ? teamSize : 1));
  if(event.allowedTeamSizes && teamSize === 1) totalFee = institution === 'HITAM' ? event.soloHitamFee : event.soloOtherFee;
  return { requestId: '1234567890abcdef1234567890abcdef', eventId: event.id, eventSlug: event.slug, institution: institution, college: 'Example Institute', teamSize: teamSize, teamName: 'Team Orbit', lead: member(1), members: members, totalFee: totalFee, utrNumber: '000012345678', agreement: true, screenshotBase64: PNG, customDetails: '', eventAnswers: harness.scope.EVENT_FORM_CONFIG[event.id] ? { category: event.id === 'E04' ? 'Software' : '', consents: harness.scope.EVENT_FORM_CONFIG[event.id].rules.map(function(){return true;}) } : null };
}
module.exports = { createHarness: createHarness, payloadFor: payloadFor, PNG: PNG, BACKEND: BACKEND };
