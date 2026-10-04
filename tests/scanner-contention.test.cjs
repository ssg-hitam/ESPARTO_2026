const test=require('node:test'),assert=require('node:assert/strict'),ts=require('typescript'),vm=require('node:vm'),fs=require('node:fs');
const exportsObject={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/scanner/request.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exportsObject,AbortSignal,fetch,setTimeout,Math,Error});
const deskRequest=exportsObject.deskRequest;
test('five overlapping desk clients retry explicit lock contention without duplicate writes',async()=>{
 let locked=false;const committed=new Set(),bodies=new Map();
 const fetchImpl=async(_,request)=>{const body=JSON.parse(request.body);const attempts=bodies.get(body.reference)||[];attempts.push(request.body);bodies.set(body.reference,attempts);if(locked)return Response.json({success:false,code:'BUSY'});locked=true;await new Promise(r=>setTimeout(r,3));assert.ok(!committed.has(body.reference));committed.add(body.reference);locked=false;return Response.json({success:true});};
 const result=await Promise.all(Array.from({length:5},(_,i)=>deskRequest({action:'confirm',reference:'TEST-'+i,eventId:'E08',identityChecked:true},()=>{}, {fetchImpl,jitter:()=>0,sleep:ms=>new Promise(r=>setTimeout(r,ms/100))})));
 assert.ok(result.every(r=>r.result.success));assert.equal(committed.size,5);for(const values of bodies.values())assert.equal(new Set(values).size,1);
});
test('contention retries are bounded; network uncertainty and validation flags are never retried',async()=>{
 let calls=0;const sleep=async()=>{},jitter=()=>0;
 const busy=await deskRequest({},()=>{},{fetchImpl:async()=>{calls++;return Response.json({success:false,code:'BUSY'});},sleep,jitter});assert.equal(calls,5);assert.equal(busy.result.code,'BUSY');
 for(const code of ['PAYMENT_NOT_VERIFIED','DESK_FORBIDDEN','DESK_REVIEW']){calls=0;await deskRequest({},()=>{},{fetchImpl:async()=>{calls++;return Response.json({success:false,code});},sleep,jitter});assert.equal(calls,1);}
 calls=0;await assert.rejects(deskRequest({},()=>{},{fetchImpl:async()=>{calls++;throw Error('Uncertain save');},sleep,jitter}));assert.equal(calls,1);
});
