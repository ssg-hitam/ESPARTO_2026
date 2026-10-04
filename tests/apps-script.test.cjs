'use strict';
var test = require('node:test');
var assert = require('node:assert/strict');
var mocks = require('./apps-script-mocks.cjs');
function plain(value) { return JSON.parse(JSON.stringify(value)); }
function rowCount(harness, name) { return harness.sheets[name].rows.length - 1; }
test('group links stay private until both payment records are verified, with possession of the submission token', function () {
  ['E02', 'E03', 'E04', 'E05', 'E06', 'E07', 'E08', 'E09', 'E10', 'E11', 'E13', 'E14'].forEach(function (id) {
    var h = mocks.createHarness(), payload = mocks.payloadFor(h, id);
    var privateLink = 'https://chat.whatsapp.com/PrivateGroup' + id;
    h.store['WHATSAPP_GROUP_' + id] = privateLink;
    var saved = h.scope.submitRegistration(payload);
    assert.equal(saved.success, true);
    assert.ok(!JSON.stringify(h.scope.getPortalData()).includes(privateLink));
    assert.ok(!JSON.stringify(saved).includes(privateLink));
    var regId = saved.receipt.regId;
    assert.equal(h.scope.getRegistrationStatus(regId, payload.requestId).whatsappUrl, undefined);
    h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Verified';
    assert.equal(h.scope.getRegistrationStatus(regId, payload.requestId).whatsappUrl, undefined);
    h.sheets.ALL_REGISTRATIONS.rows[1][17] = 'Verified';
    assert.equal(h.scope.getRegistrationStatus(regId, payload.requestId).whatsappUrl, privateLink);
    assert.equal(h.scope.getRegistrationStatus(regId, 'f'.repeat(32)).success, false);
    assert.equal(h.scope.getRegistrationStatus('ESP26-E02-0000', payload.requestId).success, false);
    h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Rejected';
    assert.equal(h.scope.getRegistrationStatus(regId, payload.requestId).whatsappUrl, undefined);
  });
});
test('group access fails closed for invalid URLs, mismatched records, or backend errors', function () {
  var h = mocks.createHarness(), payload = mocks.payloadFor(h, 'E02');
  var saved = h.scope.submitRegistration(payload);
  h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11] = 'Verified';
  h.sheets.ALL_REGISTRATIONS.rows[1][17] = 'Verified';
  h.store.WHATSAPP_GROUP_E02 = 'javascript:alert(1)';
  assert.equal(h.scope.getRegistrationStatus(saved.receipt.regId, payload.requestId).whatsappUrl, undefined);
  h.sheets.ALL_REGISTRATIONS.rows[1][15] = 1;
  assert.equal(h.scope.getRegistrationStatus(saved.receipt.regId, payload.requestId).success, false);
  h.sheets.ALL_REGISTRATIONS.rows[1][15] = saved.receipt.amount;
  delete h.scope.Sheets;
  assert.equal(h.scope.getRegistrationStatus(saved.receipt.regId, payload.requestId).success, false);
});
test('catalog has the exact 14 IDs, slugs, fees, models, team bounds, prizes, and chapter contacts', function () {
  var h = mocks.createHarness(), catalog = h.scope.EVENT_CATALOG;
  var expected = [
    ['E01','ieee-ideathon',3,4,199,249,'person',30000],['E02','reverse-hackathon',2,3,550,600,'team',10000],['E03','agentic-ai-workshop-hackathon',1,4,150,150,'person',10000],['E04','programmers-got-talent',1,1,150,150,'person',5000],['E05','smart-manufacturing-challenge',1,4,200,300,'team',5000],['E06','ieom-startup-pitch',1,4,200,300,'team',5000],['E07','dataquest-kaggle',2,2,300,300,'team',5000],['E08','n8n-automation-challenge',2,2,300,300,'team',5000],['E09','data-heist-datathon',2,4,200,300,'team',3000],['E10','data-dossier',2,4,100,200,'team',3000],['E11','torquex-motorsport',1,4,50,70,'person',5000],['E12','build-first-robot',1,4,250,250,'team',5000],['E13','code-casino',2,3,50,60,'person',1200],['E14','technical-tambola',1,1,50,60,'person',1200]
  ];
  assert.deepEqual(plain(catalog.map(function (e) { return [e.id,e.slug,e.minTeam,e.maxTeam,e.hitamFee,e.otherFee,e.feeModel,e.prize]; })), expected);
  catalog.forEach(function (event) { assert.equal(h.scope.getChapterName(event.id, ''), event.club); assert.equal(h.scope.getChapterName('', event.slug), event.club); assert.match(event.logo,/^https:\/\/cdn\.jsdelivr\.net\//); assert.ok(event.studentContact); if(event.id === "E13" || event.id === "E14") {assert.match(event.facultyContact, /Preeti C M/);assert.match(event.facultyContact, /preethicm\.cse@hitam\.org/);assert.match(event.studentContact,/K\. Manivenkat/);assert.ok(!event.studentContact.includes("Nandhitha"));assert.ok(!event.studentContact.includes("Kyathieshwary"));} else assert.ok(event.facultyContact); });
  assert.equal(h.scope.getPortalData().chapters.length,11);
  assert.match(h.scope.IEEE_URL,/AKfycbwoVAJO1VLPibThDX3h5Sewj3HVaZkgGAenKgqiOb8SlhyhJgT6GRzjp4cx2aWlOXK41A/);
});
test('every allowed team size and college tier uses the server fee schedule (60 combinations)', function () {
  var catalog = mocks.createHarness().scope.EVENT_CATALOG, count = 0;
  catalog.forEach(function (event) {
    if (event.id === 'E01') return;
    ['HITAM','Other'].forEach(function (tier) { for (var size = event.minTeam; size <= event.maxTeam; size++) {
      if(event.allowedTeamSizes && !event.allowedTeamSizes.includes(size))continue;
      var h = mocks.createHarness(), p = mocks.payloadFor(h,event.id,tier,size), result = h.scope.submitRegistration(p);
      assert.equal(result.success,true,event.id+' '+tier+' '+size); assert.equal(result.receipt.amount,p.totalFee);
      assert.equal(rowCount(h,'ALL_REGISTRATIONS'),1); assert.equal(rowCount(h,'ALL_PAYMENTS_COLLECTION'),1); assert.equal(rowCount(h,'ALL_MEMBERS_ROSTER'),size); assert.equal(rowCount(h,event.sheetName),1);
      assert.equal(h.batches.length,1); assert.equal(h.batches[0].requests.length,4); assert.equal(h.files.length,1); assert.equal(h.files[0].shared,false); assert.equal(h.files[0].trashed,false); assert.equal(h.lockHeld(),false); count++;
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
  assert.match(result.receipt.regId,/^ESP26-HITM-E03-\d{3,6}$/); assert.equal(Object.keys(h.store).filter(function(k){return k.startsWith('SUBMISSION_');}).length,0);
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
  var h=mocks.createHarness(),p=mocks.payloadFor(h,'E03','HITAM',2);p.members=[{name:'Teammate',email:'',phone:'',rollNo:'TEST-002',branchYear:''}];assert.equal(h.scope.submitRegistration(p).success,true);assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows[2][8],'');
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
test('registration references are sequential and unique',function(){var h=mocks.createHarness(),p=mocks.payloadFor(h);h.scope.Math=Object.create(Math);h.scope.Math.random=function(){return 0;};var first=h.scope.submitRegistration(p);var next=Object.assign({},p,{requestId:'a'.repeat(32),utrNumber:'000012345679'});var second=h.scope.submitRegistration(next);assert.notEqual(second.receipt.regId,first.receipt.regId);assert.match(second.receipt.regId,/^ESP26-HITM-E02-\d{3,6}$/);});
test('setup creates 14 event tabs, 3 masters and formulas, then preserves existing participants on rerun',function(){
  var h=mocks.createHarness({emptyDatabase:true});assert.equal(h.scope.setupDatabase().success,true);assert.equal(Object.keys(h.sheets).length,18);var dash=h.sheets.DASHBOARD_LIVE_METRICS.rows;assert.equal(dash.length,16);assert.equal(dash[1][11],'External IEEE form');assert.match(dash[2][8],/COUNTIF\(ALL_REGISTRATIONS!C2:C,A3\)/);assert.match(dash[2][9],/SUMIF\(ALL_REGISTRATIONS!C2:C,A3,ALL_REGISTRATIONS!P2:P\)/);assert.match(dash[2][10],/"Verified"/);h.scope.submitRegistration(mocks.payloadFor(h));assert.equal(h.scope.setupDatabase().success,true);assert.equal(rowCount(h,'ALL_REGISTRATIONS'),1);
});
test('anonymous users cannot invoke setup or reconciliation',function(){var h=mocks.createHarness({anonymousAdmin:true});assert.throws(function(){h.scope.setupDatabase();},/manually/);assert.throws(function(){h.scope.reconcileSubmission('a'.repeat(32),true);},/manually/);});
test('owner recovery enforces waiting, preserves committed proof, and permits a verified-uncommitted retry',function(){
  var h=mocks.createHarness({batchFailsBeforeCommit:true}),p=mocks.payloadFor(h);h.scope.submitRegistration(p);assert.throws(function(){h.scope.reconcileSubmission(p.requestId,true);},/10 minutes/);var key='SUBMISSION_'+p.requestId,journal=JSON.parse(h.store[key]);journal.startedAt=Date.now()-11*60*1000;h.store[key]=JSON.stringify(journal);assert.equal(h.scope.reconcileSubmission(p.requestId,false).state,'committing');assert.equal(h.scope.reconcileSubmission(p.requestId,true).success,true);assert.equal(h.files[0].trashed,true);assert.equal(h.store[key],undefined);h.options.batchFailsBeforeCommit=false;assert.equal(h.scope.submitRegistration(p).success,true);
});
test('deep links are whitelist-coerced strings and hostile scriptlet input is never reflected',function(){var h=mocks.createHarness();h.scope.doGet({parameter:{event:'reverse-hackathon'}});assert.equal(h.scope.renderedSlug,'reverse-hackathon');h.scope.doGet({parameter:{event:'\";alert(1);//'}});assert.equal(h.scope.renderedSlug,'');h.scope.doGet();assert.equal(h.scope.renderedSlug,'');h.scope.doGet({parameter:{event:'agentic-ai-workshop'}});assert.equal(h.scope.renderedSlug,'agentic-ai-workshop-hackathon');});

test('uncertain submissions reserve their registration IDs until resolved',function(){var h=mocks.createHarness();h.scope.Math=Object.create(Math);h.scope.Math.random=function(){return 0;};h.store.SUBMISSION_pending=JSON.stringify({regId:'ESP26-HITM-E02-001',state:'committing'});var result=h.scope.submitRegistration(mocks.payloadFor(h));assert.equal(result.success,true);assert.equal(result.receipt.regId,'ESP26-HITM-E02-002');});

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

test('event forms enforce category, teammate details and every consent on the server and persist answers', function () {
  ['E02','E04'].forEach(function(id){
    var h=mocks.createHarness(), p=mocks.payloadFor(h,id);
    p.eventAnswers.consents[0]=false;
    assert.equal(h.scope.submitRegistration(p).success,false);
    assert.equal(h.batches.length,0);
    p.eventAnswers.consents[0]=true;
    if(id==='E04'){p.eventAnswers.category='Invalid';assert.equal(h.scope.submitRegistration(p).success,false);p.eventAnswers.category='Software';}
    else {p.members[0].email='';assert.equal(h.scope.submitRegistration(p).success,false);p.members[0].email='member2@example.org';}
    assert.equal(h.scope.submitRegistration(p).success,true);
    var stored=JSON.parse(h.sheets.ALL_REGISTRATIONS.rows[1][14]);
    assert.deepEqual(stored.acceptedRules,plain(h.scope.EVENT_FORM_CONFIG[id].rules));
    if(id==='E04')assert.equal(stored.category,'Software');
  });
});

test('IEOM allows only individuals or four-member teams with exact tier fees', function(){
 ['E05','E06'].forEach(function(id){
  ['HITAM','Other'].forEach(function(tier){
   [1,4].forEach(function(size){var h=mocks.createHarness(),p=mocks.payloadFor(h,id,tier,size);var result=h.scope.submitRegistration(p);assert.equal(result.success,true);assert.equal(result.receipt.amount,size===1?(tier==='HITAM'?100:150):(tier==='HITAM'?200:300));});
   [2,3].forEach(function(size){var h=mocks.createHarness(),p=mocks.payloadFor(h,id,tier,size);assert.equal(h.scope.submitRegistration(p).code,'INVALID_TEAM');assert.equal(h.batches.length,0);});
  });
 });
});

test('TorqueX charges a flat team fee for both college tiers', function () {
  ['HITAM', 'Other'].forEach(function(tier) {
    [1,2,3,4].forEach(function(size) {
      var h=mocks.createHarness(), p=mocks.payloadFor(h,'E11',tier,size);
      var expected = size === 1 ? (tier === 'HITAM' ? 50 : 70) : (tier === 'HITAM' ? 100 : 140);
      assert.equal(p.totalFee,expected);
      assert.equal(h.scope.submitRegistration(p).receipt.amount,expected);
    });
  });
});

test('GDG is one two-day event with individual registration and per-participant fees',function(){
 var h=mocks.createHarness(),event=h.scope.findEvent_('E03');
 assert.equal(h.scope.EVENT_CATALOG.filter(function(e){return e.slug==='agentic-ai-workshop-hackathon';}).length,1);
 assert.equal(event.minTeam,1); assert.match(event.participationNote,/teams of 2–4/);
 assert.equal(event.agenda.length,3);assert.match(event.agenda[2].detail,/12:00 PM/);
 var p=mocks.payloadFor(h,'E03','Other',1);p.teamName='';
 var result=h.scope.submitRegistration(p);assert.equal(result.success,true);assert.equal(result.receipt.amount,150);
 assert.equal(result.receipt.teamName,p.lead.name);
});

function emailHarness(options) {
  options = options || {};
  var h = mocks.createHarness(), mail = [], qrRequests = [];
  h.scope.Session.getEffectiveUser = function () { return { getEmail: function () { return options.sender || 'elysian@hitam.org'; } }; };
  h.scope.LockService.getUserLock = h.scope.LockService.getScriptLock;
  h.scope.MailApp = { getRemainingDailyQuota: function () { return options.quota === undefined ? 100 : options.quota; }, sendEmail: function (message) { mail.push(message); if (options.mailFails) throw Error('Private mail error'); } };
  h.scope.UrlFetchApp = { fetch: function(url) { qrRequests.push(url); return { getResponseCode:function(){return options.qrFails ? 503 : 200;},getBlob:function(){return {getContentType:function(){return 'image/png';},setName:function(name){this.name=name;return this;}};}}; } };
  var queue = h.spreadsheet.insertSheet('TICKET_EMAIL_DELIVERY');queue.rows.push(Array.from(h.scope.EMAIL_HEADERS));
  h.store.ESPARTO_TICKET_EMAIL_ENABLED='true';h.store.WHATSAPP_GROUP_E02='https://chat.whatsapp.com/PrivateVerifiedGroup';
  var p=mocks.payloadFor(h,'E02'), result=h.scope.submitRegistration(p);
  return {h:h,mail:mail,requests:qrRequests,p:p,result:result,queue:queue,verify:function(){h.sheets.ALL_REGISTRATIONS.rows[1][17]='Verified';h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11]='Verified';}};
}
test('ticket email only follows verification and includes private group, ticket and QR once',function(){
 var e=emailHarness();e.h.scope.processVerifiedTicketEmails_();assert.equal(e.mail.length,0);
 e.h.sheets.ALL_REGISTRATIONS.rows[1][17]='Verified';e.h.scope.processVerifiedTicketEmails_();assert.equal(e.mail.length,0);
 e.verify();e.h.scope.processVerifiedTicketEmails_();assert.equal(e.mail.length,1);
 var message=e.mail[0];assert.equal(message.to,e.p.lead.email);assert.equal(message.replyTo,'elysian@hitam.org');assert.match(message.htmlBody,/cid:ticketQr/);assert.equal(message.attachments.length,1);assert.match(message.body,/PrivateVerifiedGroup/);assert.ok(message.body.includes(e.result.receipt.regId));
 var qrText=new URL(e.requests[0]).searchParams.get('data');assert.equal(qrText,'ESPARTO 2026|'+e.result.receipt.regId+'|E02');assert.ok(!qrText.includes(e.p.requestId));assert.ok(!qrText.includes(e.p.lead.email));
 assert.equal(e.queue.rows[1][2],'Sent');e.h.scope.processVerifiedTicketEmails_();assert.equal(e.mail.length,1);assert.equal(e.h.lockHeld(),false);
});
test('email automation fails closed for wrong sender, missing group, mismatched amount and quota exhaustion',function(){
 var wrong=emailHarness({sender:'other@hitam.org'});assert.throws(function(){wrong.h.scope.processVerifiedTicketEmails_();},/elysian/);assert.equal(wrong.mail.length,0);
 var quota=emailHarness({quota:0});quota.verify();quota.h.scope.processVerifiedTicketEmails_();assert.equal(quota.mail.length,0);
 var group=emailHarness();group.verify();delete group.h.store.WHATSAPP_GROUP_E02;group.h.scope.processVerifiedTicketEmails_();assert.equal(group.mail.length,0);
 var amount=emailHarness();amount.verify();amount.h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][6]=1;amount.h.scope.processVerifiedTicketEmails_();assert.equal(amount.mail.length,0);
});
test('QR failure is safely retried, uncertain mail delivery requires organizer review',function(){
 var qr=emailHarness({qrFails:true});qr.verify();qr.h.scope.processVerifiedTicketEmails_();assert.equal(qr.mail.length,0);assert.equal(qr.queue.rows[1][2],'Pending');
 var mail=emailHarness({mailFails:true});mail.verify();mail.h.scope.processVerifiedTicketEmails_();assert.equal(mail.queue.rows[1][2],'ReviewRequired');mail.h.scope.processVerifiedTicketEmails_();assert.equal(mail.mail.length,1);assert.equal(mail.h.lockHeld(),false);
});

test('visible ticket setup rejects anonymous and other-account callers',function(){
 var h=mocks.createHarness({anonymousAdmin:true});h.scope.Session.getEffectiveUser=function(){return {getEmail:function(){return 'elysian@hitam.org';}};};
 assert.throws(function(){h.scope.setupVerifiedTicketEmails();},/Apps Script editor/);
 h.scope.Session.getActiveUser=function(){return {getEmail:function(){return 'other@hitam.org';}};};
 assert.throws(function(){h.scope.setupVerifiedTicketEmails();},/Apps Script editor/);
 h.scope.Session.getActiveUser=function(){return {getEmail:function(){return 'elysian@hitam.org';}};};
 h.scope.setupVerifiedTicketEmails_=function(){return 'enabled';};
 assert.equal(h.scope.setupVerifiedTicketEmails(),'enabled');
});

test('verification edit trigger handles only payment status columns including pasted ranges',function(){
 var h=mocks.createHarness(),calls=0;h.scope.processVerifiedTicketEmails_=function(){calls++;};
 function edit(name,start,end,lastRow){return {source:h.spreadsheet,range:{getSheet:function(){return {getName:function(){return name;}};},getColumn:function(){return start;},getLastColumn:function(){return end;},getLastRow:function(){return lastRow;}}};}
 h.scope.onPaymentVerificationEdit_(edit('ALL_REGISTRATIONS',18,18,2));
 h.scope.onPaymentVerificationEdit_(edit('ALL_PAYMENTS_COLLECTION',10,13,3));assert.equal(calls,2);
 h.scope.onPaymentVerificationEdit_(edit('ALL_REGISTRATIONS',17,17,2));h.scope.onPaymentVerificationEdit_(edit('ALL_REGISTRATIONS',18,18,1));h.scope.onPaymentVerificationEdit_(edit('ALL_MEMBERS_ROSTER',1,20,2));h.scope.onPaymentVerificationEdit_();assert.equal(calls,2);
});

 test('separate branch/year validate HITAM choices and preserve existing sheet format',function(){
 var h=mocks.createHarness(),p=mocks.payloadFor(h,'E03','HITAM',1);
 p.lead.branch='ITP - MECH';p.lead.year='4';p.lead.branchYear='tampered';
 assert.equal(h.scope.submitRegistration(p).success,true);
 assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows[1][7],'ITP - MECH · Year 4');
 ['Civil','CSE'].forEach(function(branch,index){var bad=mocks.createHarness(),payload=mocks.payloadFor(bad,'E03','HITAM',1);payload.lead.branch=branch;payload.lead.year=index?'5':'2';assert.equal(bad.scope.submitRegistration(payload).success,false);});
 var other=mocks.createHarness(),external=mocks.payloadFor(other,'E03','Other',1);external.lead.branch='Civil Engineering';external.lead.year='3';assert.equal(other.scope.submitRegistration(external).success,true);
 });
 test('ticket email embeds official logo separately from the attached ticket QR',function(){
 var e=emailHarness();e.h.scope.DriveApp.getFileById=function(id){assert.ok(['1d7VRlLtobVhe4ne47mqsfG2gGEmztFzj','13EBtB_px7-U2LiGuEzXqEISv7N-ZIjee','1sMtm29iMFg29ZcVfzh1EM7BEN8kKzcOo'].includes(id));return {getBlob:function(){return {logo:true};}};};
 e.verify();e.h.scope.processVerifiedTicketEmails_();var message=e.mail[0];assert.match(message.htmlBody,/cid:espartoLogo/);assert.equal(message.inlineImages.espartoLogo.logo,true);assert.equal(message.inlineImages.hitamLogo.logo,true);assert.equal(message.inlineImages.ssgLogo.logo,true);assert.match(message.htmlBody,/cid:hitamLogo/);assert.match(message.htmlBody,/cid:ssgLogo/);assert.equal(message.attachments.length,1);assert.equal(message.attachments[0],message.inlineImages.ticketQr);
 });

test('participant status reads cannot change payment verification even with forged flags',function(){
 var h=mocks.createHarness(),p=mocks.payloadFor(h),saved=h.scope.submitRegistration(p),before=JSON.stringify(h.sheets);
 assert.equal(h.scope.getRegistrationStatus(saved.receipt.regId,p.requestId,true).verified,false);
 assert.equal(h.scope.publicPaymentStatus_(saved.receipt.regId,true).status,'Pending Verification');
 assert.equal(JSON.stringify(h.sheets),before);
});
test('new numbering expands after 999 and old issued tickets remain readable',function(){
 var h=mocks.createHarness();h.store.REG_COUNTER_E08='999';assert.equal(h.scope.newRegId_(h.sheets.ALL_REGISTRATIONS,'E08'),'ESP26-HITM-E08-1000');
 var p=mocks.payloadFor(h);h.scope.submitRegistration(p);h.sheets.ALL_REGISTRATIONS.rows[1][1]='ESP26-E02-8419';h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][1]='ESP26-E02-8419';
 assert.equal(h.scope.publicPaymentStatus_('ESP26-E02-8419').status,'Pending Verification');assert.equal(h.scope.getRegistrationStatus('ESP26-E02-8419',p.requestId).success,true);
});

test("payment proof uploads request restricted Drive sharing",function(){var h=mocks.createHarness();assert.equal(h.scope.submitRegistration(mocks.payloadFor(h)).success,true);assert.equal(h.files[0].access,"private");assert.equal(h.files[0].shared,false);});

test('HITAM lead and every teammate must supply roll numbers before any write',function(){
 ['lead','teammate'].forEach(function(role){var h=mocks.createHarness(),p=mocks.payloadFor(h,'E08','HITAM',2);if(role==='lead')p.lead.rollNo='';else p.members[0].rollNo='';assert.equal(h.scope.submitRegistration(p).success,false);assert.equal(h.files.length,0);assert.equal(h.batches.length,0);});
 var h=mocks.createHarness(),p=mocks.payloadFor(h,'E08','Other',2);p.members[0].rollNo='';assert.equal(h.scope.submitRegistration(p).success,true);
});
test('local burst preserves unique references and exactly one atomic batch per request including replays',function(){
 var h=mocks.createHarness(),ids=new Set();for(var i=1;i<=100;i++){var p=mocks.payloadFor(h,'E08','HITAM',2);p.requestId=i.toString(16).padStart(32,'0');p.utrNumber=String(100000000000+i);var result=h.scope.submitRegistration(p);assert.equal(result.success,true);assert.ok(!ids.has(result.receipt.regId));ids.add(result.receipt.regId);assert.equal(h.scope.submitRegistration(p).receipt.regId,result.receipt.regId);}
 assert.equal(h.batches.length,100);assert.equal(h.sheets.ALL_REGISTRATIONS.rows.length,101);assert.equal(h.sheets.ALL_PAYMENTS_COLLECTION.rows.length,101);assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows.length,201);assert.equal(h.files.length,100);
});
test('overlapping submission cannot write while another commit holds the lock and retries cleanly',function(){
 var h=mocks.createHarness(),first=mocks.payloadFor(h,'E08'),second=mocks.payloadFor(h,'E08');second.requestId='b'.repeat(32);second.utrNumber='000012345679';
 var batch=h.scope.Sheets.Spreadsheets.batchUpdate,overlap,injected=false;
 h.scope.Sheets.Spreadsheets.batchUpdate=function(body){if(!injected){injected=true;overlap=h.scope.submitRegistration(second);assert.equal(overlap.code,'BUSY');assert.equal(h.batches.length,0);assert.equal(h.files.length,1);}return batch(body);};
 var a=h.scope.submitRegistration(first),b=h.scope.submitRegistration(second);assert.equal(a.success,true);assert.equal(b.success,true);assert.notEqual(a.receipt.regId,b.receipt.regId);assert.equal(h.batches.length,2);assert.equal(h.files.length,2);assert.equal(h.lockHeld(),false);
});

test('outside-college referral choices are stored in master and event records; HITAM ignores them', function () {
  ['Promotions', 'Social media', 'LinkedIn', 'Instagram', 'Friends', 'Other'].forEach(function (source) {
    var h = mocks.createHarness(), p = mocks.payloadFor(h, 'E14', 'Other', 1);
    p.referralSource = source;
    assert.equal(h.scope.submitRegistration(p).success, true);
    assert.equal(h.sheets.ALL_REGISTRATIONS.rows[1][20], source);
    assert.equal(h.sheets[h.scope.findEvent_('E14').sheetName].rows[1][18], source);
  });
  var h = mocks.createHarness(), p = mocks.payloadFor(h, 'E14', 'Other', 1);
  p.referralSource = 'Forged option';
  assert.equal(h.scope.submitRegistration(p).code, 'INVALID_REFERRAL');
  assert.equal(h.batches.length, 0);
  p.institution = 'HITAM'; p.totalFee = 50;
  assert.equal(h.scope.submitRegistration(p).success, true);
  assert.equal(h.sheets.ALL_REGISTRATIONS.rows[1][20], '');
});

test('referral header migration appends only to an exact legacy schema', function () {
  var h = mocks.createHarness(), headers = h.scope.HEADERS.ALL_REGISTRATIONS;
  var row = Array.from(headers).slice(0, -1), writes = [];
  var sheet = { getName: function () { return 'ALL_REGISTRATIONS'; }, getRange: function (r, c, n, width) {
    return { getDisplayValues: function () { return [Array.from({length: width}, function (_, i) { return row[i] || ''; })]; },
      setValue: function (value) { writes.push([c, value]); row[c - 1] = value; } };
  } };
  h.scope.assertHeaders_(sheet, headers);
  assert.deepEqual(writes, [[21, 'HowDidYouHearAboutEvent']]);
  h.scope.assertHeaders_(sheet, headers);
  assert.equal(writes.length, 1);
  row[0] = 'Unexpected'; row[20] = '';
  assert.throws(function () { h.scope.assertHeaders_(sheet, headers); }, /Header mismatch/);
  assert.equal(writes.length, 1);
});
