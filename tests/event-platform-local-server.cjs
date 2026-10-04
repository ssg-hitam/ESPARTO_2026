// Local-only backend simulator: executes existing Code.gs, never Google services.
const http = require('node:http');
const { createHarness } = require('./apps-script-mocks.cjs');
const harness = createHarness();
http.createServer(async (req,res) => {
  res.setHeader('Content-Type','application/json'); res.setHeader('Cache-Control','no-store');
  try {
    if(req.method !== 'POST') {res.statusCode=405; return res.end('{}');}
    const chunks=[];let size=0;
    for await(const chunk of req) {size+=chunk.length;if(size>3000000)throw Error('Too large');chunks.push(chunk);}
    const {action,payload}=JSON.parse(Buffer.concat(chunks));
    let result;
    if(action==='catalogue')result=harness.scope.getPortalData();
    else if(action==='submit' && /^E(?:0[2-9]|1[0-4])$/.test(String(payload?.eventId||'')))result=harness.scope.submitRegistration(payload);
    else if(action==='status')result=harness.scope.getRegistrationStatus(payload.regId,payload.requestId);
    else {res.statusCode=400;result={success:false,message:'Shared-backend events only; IEEE is separate.'};}
    res.end(JSON.stringify(result));
  }catch {res.statusCode=400;res.end(JSON.stringify({success:false,message:'Local backend request failed.'}));}
}).listen(4100,'127.0.0.1',()=>console.log('Isolated Code.gs harness: http://127.0.0.1:4100 (no live data or emails)'));
