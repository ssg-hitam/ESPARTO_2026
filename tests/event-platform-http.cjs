const assert=require('node:assert/strict');const crypto=require('node:crypto');
const {createHarness,payloadFor}=require('./apps-script-mocks.cjs');
(async()=>{
 const url='http://localhost:3000/api/registration-preview';
 const call=async(data,origin='http://localhost:3000')=>{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(data)});return {status:r.status,body:await r.json()};};
 assert.equal((await call({action:'catalogue'},'https://wrong.example')).status,403);
 const h=createHarness();let base=Date.now();
 const payload=()=>{const p=payloadFor(h,'E08');p.requestId=crypto.randomBytes(16).toString('hex');p.utrNumber=String(++base);return p;};
 const bad=payload();bad.lead.rollNo='';const validation=await call({action:'submit',payload:bad});assert.equal(validation.body.success,false);
 const requests=Array.from({length:5},payload);const results=await Promise.all(requests.map(p=>call({action:'submit',payload:p})));assert.ok(results.every(r=>r.body.success));assert.equal(new Set(results.map(r=>r.body.receipt.regId)).size,5);
 const recovered=await call({action:'submit',payload:requests[0]});assert.equal(recovered.body.receipt.regId,results[0].body.receipt.regId);
 const duplicate={...requests[0],requestId:crypto.randomBytes(16).toString('hex')};assert.equal((await call({action:'submit',payload:duplicate})).body.success,false);
 console.log('Local HTTP: cross-origin rejection, invalid roll, 5 simultaneous requests, same-ticket recovery and duplicate UTR rejection passed.');
})().catch(e=>{console.error(e);process.exit(1);});
