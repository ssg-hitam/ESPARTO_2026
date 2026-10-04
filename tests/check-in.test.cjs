'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),mocks=require('./apps-script-mocks.cjs');
function ready(){const h=mocks.createHarness();h.store.ESPARTO_DESK_ROLES=JSON.stringify({'owner@hitam.org':['E08']});const p=mocks.payloadFor(h,'E08'),saved=h.scope.submitRegistration(p);h.sheets.ALL_REGISTRATIONS.rows[1][17]='Verified';h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11]='Verified';return {h,p,id:saved.receipt.regId,qr:'ESPARTO 2026|'+saved.receipt.regId+'|E08'};}
test('desk access fails closed for missing roles, anonymous and wrong active account regardless of effective owner',()=>{
 const {h,id}=ready();for(const email of ['', 'attacker@hitam.org','owner@example.org']){h.scope.Session.getActiveUser=()=>({getEmail:()=>email});assert.equal(h.scope.lookupDeskTicket(id,'E08').code,'DESK_FORBIDDEN');assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).code,'DESK_FORBIDDEN');}assert.equal(h.batches.length,1);
 h.scope.Session.getActiveUser=()=>({getEmail:()=> 'owner@hitam.org'});delete h.store.ESPARTO_DESK_ROLES;assert.equal(h.scope.getDeskSession().success,false);
});
test('desk lookup only shows minimal verified registration data and never admits a different event',()=>{
 const {h,id,qr}=ready();let result=h.scope.lookupDeskTicket(qr,'E08');assert.equal(result.success,true);assert.equal(result.ticket.members.length,2);const serialized=JSON.stringify(result);assert.ok(!serialized.includes('@example.org'));assert.ok(!serialized.includes('987654321'));assert.ok(!serialized.includes('drive.google.com'));assert.ok(!serialized.includes('whatsapp'));assert.ok(!serialized.includes('000012345678'));
 assert.equal(h.scope.lookupDeskTicket(qr,'E07').code,'DESK_FORBIDDEN');assert.equal(h.scope.lookupDeskTicket('https://evil.example/'+id,'E08').code,'INVALID_QR');assert.equal(h.scope.lookupDeskTicket(qr.replace('|E08','|E07'),'E08').code,'WRONG_EVENT');
 h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11]='Pending Verification';assert.equal(h.scope.lookupDeskTicket(id,'E08').code,'PAYMENT_NOT_VERIFIED');assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).code,'PAYMENT_NOT_VERIFIED');
});
test('identity confirmation is required; attendance and audit notes commit once without changing payment status',()=>{
 const {h,id}=ready();assert.equal(h.scope.confirmDeskCheckIn(id,'E08',false).code,'IDENTITY_REQUIRED');const result=h.scope.confirmDeskCheckIn(id,'E08',true);assert.equal(result.success,true);assert.equal(h.sheets.ALL_REGISTRATIONS.rows[1][16],'CHECKED IN');assert.equal(h.sheets.EVENT_E08_N8N?.rows[1]?.[0] || h.sheets[h.scope.findEvent_('E08').sheetName].rows[1][0],true);assert.equal(h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11],'Verified');assert.equal(h.sheets.ALL_REGISTRATIONS.rows[1][17],'Verified');assert.match(h.sheets[h.scope.findEvent_('E08').sheetName].rows[1][17],/owner@hitam.org/);
 assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).alreadyCheckedIn,true);assert.equal(h.batches.length,2);
});
test('record mismatch and concurrent desk requests fail safely',()=>{
 const {h,id}=ready();h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][6]=1;assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).code,'DESK_REVIEW');assert.equal(h.batches.length,1);h.sheets.ALL_PAYMENTS_COLLECTION.rows[1][6]=300;h.options.busy=true;assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).code,'BUSY');assert.equal(h.batches.length,1);
});
test('an uncertain committed check-in is recovered by lookup without another attendance write',()=>{
 const {h,id}=ready();h.options.batchFailsAfterCommit=true;assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).code,'DESK_UNAVAILABLE');h.options.batchFailsAfterCommit=false;assert.equal(h.scope.lookupDeskTicket(id,'E08').ticket.checkedIn,true);assert.equal(h.scope.confirmDeskCheckIn(id,'E08',true).alreadyCheckedIn,true);assert.equal(h.batches.length,2);
});
test('scanner script parses and vendors its decoder rather than loading executable CDN code',()=>{
 const html=fs.readFileSync('apps-script/scanner.html','utf8'),script=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(script);assert.ok(!/<script[^>]+src=/.test(html));assert.ok(html.includes('textContent'));assert.ok(!html.includes('innerHTML'));
});
