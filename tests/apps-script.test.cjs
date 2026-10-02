'use strict';
var test = require('node:test');
var assert = require('node:assert/strict');
var mocks = require('./apps-script-mocks.cjs');
function plain(value) { return JSON.parse(JSON.stringify(value)); }
function rowCount(harness, name) { return harness.sheets[name].rows.length - 1; }
test('catalog has the exact 14 IDs, slugs, fees, models, team bounds, prizes, and chapter contacts', function () {
  var h = mocks.createHarness(), catalog = h.scope.EVENT_CATALOG;
  var expected = [
    ['E01','ieee-ideathon',3,4,200,300,'team',30000],['E02','reverse-hackathon',2,3,550,600,'team',10000],['E03','agentic-ai-workshop-hackathon',1,4,150,150,'person',10000],['E04','programmers-got-talent',1,1,150,150,'person',5000],['E05','smart-manufacturing-challenge',4,4,99,149,'team',5700],['E06','ieom-startup-pitch',1,4,149,199,'team',5700],['E07','dataquest-kaggle',2,2,300,300,'team',5000],['E08','n8n-automation-challenge',2,2,300,300,'team',5000],['E09','data-heist-datathon',2,4,200,300,'team',3000],['E10','data-dossier',2,4,100,200,'team',3000],['E11','torquex-motorsport',1,4,50,70,'person',5000],['E12','build-first-robot',2,4,200,200,'team',5000],['E13','code-casino',2,3,50,60,'person',10000],['E14','technical-tambola',1,1,50,60,'person',1200]
  ];
  assert.deepEqual(plain(catalog.map(function (e) { return [e.id,e.slug,e.minTeam,e.maxTeam,e.hitamFee,e.otherFee,e.feeModel,e.prize]; })), expected);
  catalog.forEach(function (event) { assert.equal(h.scope.getChapterName(event.id, ''), event.club); assert.equal(h.scope.getChapterName('', event.slug), event.club); assert.match(event.logo,/^https:\/\/cdn\.jsdelivr\.net\//); assert.ok(event.studentContact); assert.ok(event.facultyContact); });
  assert.equal(h.scope.getPortalData().chapters.length,11);
  assert.match(h.scope.IEEE_URL,/AKfycbwoVAJO1VLPibThDX3h5Sewj3HVaZkgGAenKgqiOb8SlhyhJgT6GRzjp4cx2aWlOXK41A/);
});
test('every allowed team size and college tier uses the server fee schedule (60 combinations)', function () {
  var catalog = mocks.createHarness().scope.EVENT_CATALOG, count = 0;
  catalog.forEach(function (event) {
    if (event.id === 'E01') return;
    ['HITAM','Other'].forEach(function (tier) { for (var size = event.minTeam; size <= event.maxTeam; size++) {
      var h = mocks.createHarness(), p = mocks.payloadFor(h,event.id,tier,size), result = h.scope.submitRegistration(p);
      assert.equal(result.success,true,event.id+' '+tier+' '+size); assert.equal(result.receipt.amount,p.totalFee);
      assert.equal(rowCount(h,'ALL_REGISTRATIONS'),1); assert.equal(rowCount(h,'ALL_PAYMENTS_COLLECTION'),1); assert.equal(rowCount(h,'ALL_MEMBERS_ROSTER'),size); assert.equal(rowCount(h,event.sheetName),1);
      assert.equal(h.batches.length,1); assert.equal(h.batches[0].requests.length,4); assert.equal(h.files.length,1); assert.equal(h.files[0].shared,true); assert.equal(h.files[0].trashed,false); assert.equal(h.lockHeld(),false); count++;
    } });
  });
  assert.equal(count,60);
});
test('master, finance, roster and event rows retain text UTRs, phones, amounts, and pending status', function () {
  var h = mocks.createHarness(), p = mocks.payloadFor(h,'E03','Other',4); p.lead.phone = '+91 98765 43211'; p.teamName = '=IMPORTXML("bad","bad")'; p.eventTitle='FORGED TITLE'; p.chapter='FORGED CLUB';
  var result = h.scope.submitRegistration(p); assert.equal(result.success,true);
  var master=h.sheets.ALL_REGISTRATIONS.rows[1], finance=h.sheets.ALL_PAYMENTS_COLLECTION.rows[1], roster=h.sheets.ALL_MEMBERS_ROSTER.rows,event=h.sheets[h.scope.findEvent_('E03').sheetName].rows[1];
  assert.equal(master[3],'Agentic AI Workshop & Hackathon'); assert.equal(master[5],p.teamName); assert.equal(master[9],'9876543211'); assert.equal(master[12],'Example Institute'); assert.equal(master[15],600); assert.equal(master[17],'Pending Verification'); assert.equal(master[18],'000012345678'); assert.equal(finance[6],600); assert.equal(finance[8],master[18]); assert.equal(roster.length,5); assert.equal(event[0],false); assert.equal(event[14],600); assert.equal(event[15],master[18]);
  var typed=h.batches[0].requests[0].appendCells.rows[0].values; assert.equal(typed[5].userEnteredValue.stringValue,p.teamName); assert.equal(typed[18].userEnteredValue.stringValue,p.utrNumber); assert.equal(typed[15].userEnteredValue.numberValue,600);
  assert.match(result.receipt.regId,/^ESP26-E03-\d{4}$/); assert.equal(Object.keys(h.store).filter(function(k){return k.startsWith('SUBMISSION_');}).length,0);
});
test('same request and proof recovers the same ticket without extra uploads or rows', function () {
  var h=mocks.createHarness(), p=mocks.payloadFor(h), first=h.scope.submitRegistration(p), second=h.scope.submitRegistration(p);
  assert.equal(second.success,true); assert.equal(second.receipt.regId,first.receipt.regId); assert.equal(second.receipt.replayed,true); assert.equal(h.files.length,1); assert.equal(h.batches.length,1);
});
test('duplicate UTR and changed request contents never disclose an existing ticket or create rows',function(){
  var h=mocks.createHarness(),p=mocks.payloadFor(h);h.scope.submitRegistration(p);
  var duplicate=Object.assign({},p,{requestId:'f'.repeat(32)});var result=h.scope.submitRegistration(duplicate);assert.equal(result.code,'DUPLICATE_UTR');assert.equal(result.receipt,undefined);
  p.lead.name='Changed person';assert.equal(h.scope.submitRegistration(p).code,'REQUEST_CHANGED');assert.equal(h.batches.length,1);assert.equal(h.files.length,1);
});
test('invalid payload cases are rejected before any mutation',function(){
  var changes=[
    function(p){p.totalFee=1;},function(p){p.teamSize=4;},function(p){p.teamSize='2';},function(p){p.members=[];},function(p){p.agreement=false;},function(p){p.utrNumber='abcdef123';},function(p){p.institution='Fake';},function(p){p.eventSlug='code-casino';},function(p){p.requestId='guess';},function(p){p.lead.email='not-email';},function(p){p.lead.phone='1234567890';},function(p){p.lead.name=' ';},function(p){p.college='';p.institution='Other';p.totalFee=600;},function(p){p.members[0].email=p.lead.email;},function(p){p.members[0].rollNo=p.lead.rollNo;},function(p){p.screenshotBase64='data:image/svg+xml;base64,PHN2Zz4=';},function(p){p.screenshotBase64='data:image/png;base64,SGVsbG8=';},function(p){p.screenshotBase64=p.screenshotBase64.replace('image/png','image/jpeg');},function(p){p.screenshotBase64='data:image/png;base64,'+Buffer.alloc(2*1024*1024+1).toString('base64');}
  ];
  changes.forEach(function(change,index){var h=mocks.createHarness(),p=mocks.payloadFor(h);change(p);var result=h.scope.submitRegistration(p);assert.equal(result.success,false,'case '+index);assert.equal(h.files.length,0);assert.equal(h.batches.length,0);assert.equal(h.lockHeld(),false);assert.ok(!result.message.includes('PRIVATE'));});
});
test('IEEE cannot register in this database and unknown events are rejected',function(){var h=mocks.createHarness();assert.equal(h.scope.submitRegistration(mocks.payloadFor(h,'E01')).code,'EXTERNAL_EVENT');var p=mocks.payloadFor(h);p.eventId='E99';assert.equal(h.scope.submitRegistration(p).code,'INVALID_EVENT');assert.equal(h.files.length,0);});
test('optional teammate fields, solo identity, and +91 phones normalize correctly',function(){
  var h=mocks.createHarness(),p=mocks.payloadFor(h);p.members=[{name:'Teammate',email:'',phone:'',rollNo:'',branchYear:''}];assert.equal(h.scope.submitRegistration(p).success,true);assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows[2][8],'');
  h=mocks.createHarness();p=mocks.payloadFor(h,'E14');p.teamName='Ignored';var result=h.scope.submitRegistration(p);assert.equal(result.receipt.teamName,p.lead.name);assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows[1][4],'Participant');
});
test('busy lock, missing schema and sharing/upload failures leave no sheet rows',function(){
  [ {busy:true},{sharingFails:true},{uploadFails:true},{journalWriteFails:true} ].forEach(function(options){var h=mocks.createHarness(options),result=h.scope.submitRegistration(mocks.payloadFor(h));assert.equal(result.success,false);assert.equal(h.batches.length,0);assert.equal(h.files.filter(function(file){return !file.trashed;}).length,0);assert.equal(h.lockHeld(),false);});
  var h=mocks.createHarness();h.sheets.ALL_PAYMENTS_COLLECTION.rows[0][0]='wrong';assert.equal(h.scope.submitRegistration(mocks.payloadFor(h)).success,false);assert.equal(h.files.length,0);
});
test('atomic batch failure keeps all four tabs unchanged and journal blocks blind retries',function(){
  var h=mocks.createHarness({batchFailsBeforeCommit:true}),p=mocks.payloadFor(h),result=h.scope.submitRegistration(p);assert.equal(result.code,'RECONCILIATION_REQUIRED');assert.equal(h.batches.length,0);assert.equal(rowCount(h,'ALL_REGISTRATIONS'),0);assert.equal(rowCount(h,'ALL_PAYMENTS_COLLECTION'),0);assert.equal(rowCount(h,'ALL_MEMBERS_ROSTER'),0);assert.equal(rowCount(h,h.scope.findEvent_('E02').sheetName),0);assert.equal(h.files[0].trashed,false);assert.equal(h.scope.submitRegistration(p).code,'RECONCILIATION_REQUIRED');assert.equal(h.files.length,1);
});
test('lost API response after commit reconciles all four rows instead of duplicating or trashing proof',function(){var h=mocks.createHarness({batchFailsAfterCommit:true}),p=mocks.payloadFor(h),result=h.scope.submitRegistration(p);assert.equal(result.success,true);assert.equal(h.scope.submitRegistration(p).receipt.regId,result.receipt.regId);assert.equal(h.batches.length,1);assert.equal(h.files[0].trashed,false);assert.equal(Object.keys(h.store).filter(function(k){return k.startsWith('SUBMISSION_');}).length,0);});
test('failed journal cleanup still returns success and sheet idempotency remains effective',function(){var h=mocks.createHarness({journalDeleteFails:true}),p=mocks.payloadFor(h);assert.equal(h.scope.submitRegistration(p).success,true);assert.equal(h.scope.submitRegistration(p).success,true);assert.equal(h.batches.length,1);});
test('registration ID collisions are avoided while retaining four digits',function(){var h=mocks.createHarness(),p=mocks.payloadFor(h);h.scope.Math=Object.create(Math);h.scope.Math.random=function(){return 0;};var first=h.scope.submitRegistration(p);var next=Object.assign({},p,{requestId:'a'.repeat(32),utrNumber:'000012345679'});var second=h.scope.submitRegistration(next);assert.notEqual(second.receipt.regId,first.receipt.regId);assert.match(second.receipt.regId,/^ESP26-E02-\d{4}$/);});
test('setup creates 14 event tabs, 3 masters and formulas, then preserves existing participants on rerun',function(){
  var h=mocks.createHarness({emptyDatabase:true});assert.equal(h.scope.setupDatabase().success,true);assert.equal(Object.keys(h.sheets).length,18);var dash=h.sheets.DASHBOARD_LIVE_METRICS.rows;assert.equal(dash.length,16);assert.equal(dash[1][11],'External IEEE form');assert.match(dash[2][8],/COUNTIF\(ALL_REGISTRATIONS!C2:C,A3\)/);assert.match(dash[2][9],/SUMIF\(ALL_REGISTRATIONS!C2:C,A3,ALL_REGISTRATIONS!P2:P\)/);assert.match(dash[2][10],/"Verified"/);h.scope.submitRegistration(mocks.payloadFor(h));assert.equal(h.scope.setupDatabase().success,true);assert.equal(rowCount(h,'ALL_REGISTRATIONS'),1);
});
test('anonymous users cannot invoke setup or reconciliation',function(){var h=mocks.createHarness({anonymousAdmin:true});assert.throws(function(){h.scope.setupDatabase();},/manually/);assert.throws(function(){h.scope.reconcileSubmission('a'.repeat(32),true);},/manually/);});
test('owner recovery enforces waiting, preserves committed proof, and permits a verified-uncommitted retry',function(){
  var h=mocks.createHarness({batchFailsBeforeCommit:true}),p=mocks.payloadFor(h);h.scope.submitRegistration(p);assert.throws(function(){h.scope.reconcileSubmission(p.requestId,true);},/10 minutes/);var key='SUBMISSION_'+p.requestId,journal=JSON.parse(h.store[key]);journal.startedAt=Date.now()-11*60*1000;h.store[key]=JSON.stringify(journal);assert.equal(h.scope.reconcileSubmission(p.requestId,false).state,'committing');assert.equal(h.scope.reconcileSubmission(p.requestId,true).success,true);assert.equal(h.files[0].trashed,true);assert.equal(h.store[key],undefined);h.options.batchFailsBeforeCommit=false;assert.equal(h.scope.submitRegistration(p).success,true);
});
test('deep links are whitelist-coerced strings and hostile scriptlet input is never reflected',function(){var h=mocks.createHarness();h.scope.doGet({parameter:{event:'reverse-hackathon'}});assert.equal(h.scope.renderedSlug,'reverse-hackathon');h.scope.doGet({parameter:{event:'\";alert(1);//'}});assert.equal(h.scope.renderedSlug,'');h.scope.doGet();assert.equal(h.scope.renderedSlug,'');h.scope.doGet({parameter:{event:'agentic-ai-workshop'}});assert.equal(h.scope.renderedSlug,'agentic-ai-workshop-hackathon');});

test('uncertain submissions reserve their registration IDs until resolved',function(){var h=mocks.createHarness();h.scope.Math=Object.create(Math);h.scope.Math.random=function(){return 0;};h.store.SUBMISSION_pending=JSON.stringify({regId:'ESP26-E02-1000',state:'committing'});var result=h.scope.submitRegistration(mocks.payloadFor(h));assert.equal(result.success,true);assert.equal(result.receipt.regId,'ESP26-E02-1001');});

test('the delivered frontend parses, uses the required string scriptlet, and only var declarations',function(){
  var fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
  var html=fs.readFileSync(path.join(__dirname,'../apps-script/index.html'),'utf8');
  var script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
  assert.match(script,/var preselected = "<\?= initialEvent \?>";/);
  new vm.Script(script.replace('<?= initialEvent ?>',''));
  assert.doesNotMatch(script,/\b(?:let|const)\s+[a-zA-Z_$]/);
  assert.doesNotMatch(script,/\bfetch\s*\(/);
  assert.doesNotMatch(script,/console\.(?:log|debug)/);
});

test('an unconfigured backend marks local registration unavailable until setup completes',function(){var h=mocks.createHarness({emptyDatabase:true,properties:{ESPARTO_SPREADSHEET_ID:null,ESPARTO_PROOF_FOLDER_ID:null}});assert.equal(h.scope.getPortalData().registrationAvailable,false);h.scope.setupDatabase();assert.equal(h.scope.getPortalData().registrationAvailable,true);});
