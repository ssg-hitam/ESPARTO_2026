const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const {createHarness,payloadFor}=require('./apps-script-mocks.cjs');
test('n8n frontend payload uses existing validation and atomic persistence',()=>{
 const h=createHarness(),p=payloadFor(h,'E08','HITAM',2);
 [p.lead,...p.members].forEach((member,i)=>{delete member.branchYear;member.branch='CSD';member.year='4';member.rollNo='LOCAL-'+i;});
 const invalid={...p,lead:{...p.lead,rollNo:''}};assert.equal(h.scope.submitRegistration(invalid).success,false);assert.equal(h.batches.length,0);
 const wrongFee={...p,totalFee:1};assert.equal(h.scope.submitRegistration(wrongFee).code,'FEE_CHANGED');
 const first=h.scope.submitRegistration(p);assert.equal(first.success,true);assert.equal(first.receipt.status,'Pending Verification');assert.equal(h.batches.length,1);assert.equal(h.files[0].shared,false);
 const retry=h.scope.submitRegistration(p);assert.equal(retry.receipt.regId,first.receipt.regId);assert.equal(h.batches.length,1);
 const duplicate={...p,requestId:'abcdefabcdefabcdefabcdefabcdefab'};assert.equal(h.scope.submitRegistration(duplicate).success,false);assert.equal(h.batches.length,1);
});
test('HTTP pilot stays closed in production, backend and IUCEE forms are unchanged',()=>{
 const route=fs.readFileSync('src/app/api/registration-preview/route.ts','utf8');assert.match(route,/NODE_ENV !== 'development'/);assert.match(route,/127\.0\.0\.1:4100/);assert.match(route,/headers.get\('origin'\)/);
 const h=createHarness();assert.ok(h.scope.EVENT_FORM_CONFIG.E02.rules.length);assert.ok(h.scope.EVENT_FORM_CONFIG.E04.rules.length);
 const existing=fs.readFileSync('src/data/events.ts','utf8');assert.match(existing,/AKfycbyWW19qSK95/);assert.match(existing,/AKfycbwoVAJO1VLP/);
});
