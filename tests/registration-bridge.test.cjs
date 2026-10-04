const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {createHarness,payloadFor}=require('./apps-script-mocks.cjs');
function setup(){const h=createHarness();h.store.ESPARTO_REGISTRATION_BRIDGE_SECRET='registration-test-key-'.repeat(3);h.store.ESPARTO_REGISTRATION_BRIDGE_ENABLED='true';h.store.ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED='true';const cache=new Map();h.scope.CacheService={getScriptCache:()=>({get:k=>cache.get(k),put:(k,v)=>cache.set(k,v)})};h.scope.Utilities.computeHmacSha256Signature=(message,key)=>[...crypto.createHmac('sha256',key).update(message).digest()];h.scope.Utilities.base64EncodeWebSafe=bytes=>Buffer.from(bytes).toString('base64url');return h;}
function request(h,action='catalogue',data,extra={}){const payload=JSON.stringify({action,payload:data,timestamp:Date.now(),nonce:crypto.randomUUID(),...extra});return {postData:{contents:JSON.stringify({kind:'registration',payload,signature:crypto.createHmac('sha256',h.store.ESPARTO_REGISTRATION_BRIDGE_SECRET).update('ESPARTO-REGISTRATION-V1\n'+payload).digest('base64url')})}};}
test('signed adapter calls unchanged n8n registration functions and persists the same four Sheets batches',()=>{
 const h=setup(),p=payloadFor(h,'E08');const catalogue=h.scope.websiteRegistrationRequest_(request(h));assert.equal(catalogue.events.length,1);assert.equal(catalogue.events[0].id,'E08');assert.equal('sheetName' in catalogue.events[0],false);
 const result=h.scope.websiteRegistrationRequest_(request(h,'submit',p));assert.equal(result.success,true);assert.equal(h.batches.length,1);assert.equal(h.batches[0].requests.length,4);assert.equal(h.sheets.ALL_REGISTRATIONS.rows.length,2);assert.equal(h.sheets.ALL_MEMBERS_ROSTER.rows.length,3);
 const replay=h.scope.websiteRegistrationRequest_(request(h,'submit',p));assert.equal(replay.receipt.regId,result.receipt.regId);assert.equal(h.batches.length,1);
 const status=h.scope.websiteRegistrationRequest_(request(h,'status',{regId:result.receipt.regId,requestId:p.requestId}));assert.equal(status.verified,false);assert.equal('whatsappUrl' in status,false);
});
test('adapter rejects unsigned, altered, expired and replayed envelopes before writes',()=>{
 const h=setup();assert.throws(()=>h.scope.websiteRegistrationRequest_({postData:{contents:'{}'}}));let req=request(h);let value=JSON.parse(req.postData.contents);value.signature='x'.repeat(43);assert.throws(()=>h.scope.websiteRegistrationRequest_({postData:{contents:JSON.stringify(value)}}));assert.throws(()=>h.scope.websiteRegistrationRequest_(request(h,'catalogue',null,{timestamp:Date.now()-61000})));
 h.scope.websiteRegistrationRequest_(req);assert.throws(()=>h.scope.websiteRegistrationRequest_(req));assert.equal(h.batches.length,0);
});
test('catalogue read and submission enable switches are independent and fail closed',()=>{
 const h=setup();delete h.store.ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED;assert.equal(h.scope.websiteRegistrationRequest_(request(h)).success,true);assert.equal(h.scope.websiteRegistrationRequest_(request(h,'submit',payloadFor(h,'E08'))).code,'SUBMISSIONS_DISABLED');assert.equal(h.batches.length,0);
 delete h.store.ESPARTO_REGISTRATION_BRIDGE_ENABLED;assert.throws(()=>h.scope.websiteRegistrationRequest_(request(h)));h.store.ESPARTO_REGISTRATION_BRIDGE_ENABLED='true';delete h.store.ESPARTO_REGISTRATION_BRIDGE_SECRET;assert.throws(()=>h.scope.websiteRegistrationRequest_({postData:{contents:'{}'}}));
});
test('other events/actions are denied and backend fee/member/proof validation stays authoritative',()=>{
 const h=setup();assert.throws(()=>h.scope.websiteRegistrationRequest_(request(h,'confirm',{identityChecked:true})));assert.throws(()=>h.scope.websiteRegistrationRequest_(request(h,'submit',payloadFor(h,'E07'))));assert.throws(()=>h.scope.websiteRegistrationRequest_(request(h,'status',{regId:'ESP26-HITM-E07-001',requestId:'1'.repeat(32)})));
 const p=payloadFor(h,'E08');p.totalFee=1;assert.equal(h.scope.websiteRegistrationRequest_(request(h,'submit',p)).code,'FEE_CHANGED');p.totalFee=300;p.lead.rollNo='';assert.equal(h.scope.websiteRegistrationRequest_(request(h,'submit',p)).success,false);assert.equal(h.batches.length,0);
});
