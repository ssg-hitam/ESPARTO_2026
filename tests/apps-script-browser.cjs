'use strict';
// Local-only integration: actual frontend + backend running against mocked Google
// services. No registration, payment, or Drive upload reaches a real account.
var fs = require('node:fs');
var http = require('node:http');
var path = require('node:path');
var assert = require('node:assert/strict');
var mocks = require('./apps-script-mocks.cjs');
var playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
var template = fs.readFileSync(path.join(__dirname, '../apps-script/index.html'), 'utf8');
var sessions = new Map();
var serial = 0;
var screenshotDir = process.env.AUDIT_SCREENSHOT_DIR || '/private/tmp/esparto-registration-review';
fs.mkdirSync(screenshotDir, { recursive: true });
function session(options) { var id = String(++serial); var state = { harness: mocks.createHarness(options), calls: [], dropNext: false }; sessions.set(id, state); return { id: id, state: state }; }
function stub(id) {
  return '<script>(function(){var sessionId=' + JSON.stringify(id) + ';function call(method,payload,ok,fail){fetch("/rpc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:sessionId,method:method,payload:payload})}).then(function(response){if(!response.ok)throw Error("Transport failure");return response.json();}).then(function(result){if(ok)ok(result);}).catch(function(error){if(fail)fail(error);});}function runner(ok,fail){return {withSuccessHandler:function(fn){return runner(fn,fail);},withFailureHandler:function(fn){return runner(ok,fn);},getPortalData:function(){call("getPortalData",null,ok,fail);},getRegistrationStatus:function(regId,requestId){call("getRegistrationStatus",{regId:regId,requestId:requestId},ok,fail);},submitRegistration:function(payload){call("submitRegistration",payload,ok,fail);}};}window.google={script:{run:runner()}};})();</script>';
}
var server = http.createServer(async function(req,res) {
  try {
    if (req.method === 'POST' && req.url === '/rpc') {
      var body = ''; for await (var chunk of req) { body += chunk; if (body.length > 3000000) throw Error('Oversized test payload'); }
      var message = JSON.parse(body), state = sessions.get(message.sessionId);
      if (!state || ['getPortalData','submitRegistration','getRegistrationStatus'].indexOf(message.method) === -1) { res.writeHead(400); res.end(); return; }
      state.calls.push(message.method); var result = message.method === 'getRegistrationStatus' ? state.harness.scope.getRegistrationStatus(message.payload.regId,message.payload.requestId) : state.harness.scope[message.method](message.payload);
      if (message.method === 'submitRegistration') await new Promise(function(resolve){setTimeout(resolve,200);});
      if (message.method === 'submitRegistration' && state.dropNext) { state.dropNext = false; res.writeHead(503); res.end(); return; }
      res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify(result));return;
    }
    var url = new URL(req.url,'http://localhost'), id = url.searchParams.get('session');
    var state = sessions.get(id);
    if (!state) { res.writeHead(404);res.end();return; }
    var event = state.harness.scope.findEvent_(url.searchParams.get('event') || '');
    var html = template.replace('<?= initialEvent ?>',event ? event.slug : '').replace('<script>',stub(id)+'<script>');
    res.writeHead(200,{'Content-Type':'text/html'});res.end(html);
  } catch { res.writeHead(500);res.end('Local test harness error'); }
});
function listen() { return new Promise(function(resolve) { server.listen(0,'127.0.0.1',function(){resolve('http://127.0.0.1:'+server.address().port);}); }); }
function close() { return new Promise(function(resolve) { server.close(resolve); }); }
async function routeAssets(page) {
  await page.route('https://drive.google.com/thumbnail?**',function(route){if(route.request().url().includes('1WWKBVMZlGpDm5s9Rh7hOH5cdaTJ8Msuz'))return route.fulfill({body:Buffer.from(mocks.PNG.split(',')[1],'base64'),contentType:'image/png'});return route.abort();});
  await page.route('https://cdn.jsdelivr.net/**',function(route) { var pathname = new URL(route.request().url()).pathname;var match = pathname.match(/\/public\/(.+)$/);var local = match && path.join(__dirname,'../public',match[1]); if (local && fs.existsSync(local)) return route.fulfill({path:local});return route.abort(); });
  await page.route('https://api.qrserver.com/**',function(route){return route.fulfill({body:Buffer.from(mocks.PNG.split(',')[1],'base64'),contentType:'image/png'});});
  // Font/network availability must never block the registration flow.
  await page.route('https://fonts.googleapis.com/**',function(route){return route.abort();});
}
async function noOverflow(page,label) { var dimensions = await page.evaluate(function(){return {viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth};});assert.ok(dimensions.html<=dimensions.viewport && dimensions.body<=dimensions.viewport,label+' horizontal overflow: '+JSON.stringify(dimensions)); }
async function fillLead(page) { await page.locator('#leadName').fill('Test Team Lead');await page.locator('#leadEmail').fill('test.lead@example.org');await page.locator('#leadPhone').fill('+91 98765 43211');await page.locator('#leadRoll').fill('TEST-001');if(await page.locator('#leadBranch').evaluate(el=>el.tagName)==='SELECT')await page.locator('#leadBranch').selectOption('CSE');else await page.locator('#leadBranch').fill('CSE');await page.locator('#leadYear').selectOption('2'); }
async function completeDetails(page,size) { if(await page.locator('#teamSize').isEnabled())await page.locator('#teamSize').selectOption(String(size));await page.getByText('Other College',{exact:true}).click();await page.locator('#collegeName').fill('Test Institute of Technology');if(await page.locator('#teamName').isVisible())await page.locator('#teamName').fill('Team Orbit');await fillLead(page);for(var i=2;i<=size;i++){await page.locator('#member'+i+'Name').fill('Test Teammate '+i);if(await page.locator('#member'+i+'Email').getAttribute('required')!==null){await page.locator('#member'+i+'Email').fill('teammate'+i+'@example.org');await page.locator('#member'+i+'Branch').fill('CSE');await page.locator('#member'+i+'Year').selectOption('2');}}if(await page.locator('#eventCategoryPanel').isVisible())await page.locator('#eventCategory').selectOption('Software'); }
async function goPayment(page,width) { await page.locator(width<=600?'#mobileCta':'#detailsSummary button').click();await page.locator('#paymentTitle').waitFor({state:'visible'}); }
async function uploadProof(page) { await page.locator('#proofFile').setInputFiles({name:'payment-proof.png',mimeType:'image/png',buffer:Buffer.from(mocks.PNG.split(',')[1],'base64')});await page.waitForFunction(function(){return !!proof;}); }
async function readyToConfirm(page,width) { await page.locator('#utrNumber').fill('000012345678');await uploadProof(page);await page.locator('#agreement').check();var rules=page.locator('#eventRuleFields input');for(var i=0;i<await rules.count();i++)await rules.nth(i).check();await page.locator(width<=600?'#mobileCta':'#paymentReview').click();await page.locator('#confirmation').waitFor({state:'visible'}); }
async function newPage(browser,base,entry,viewport,slug) { var page=await browser.newPage({viewport:viewport});page.errors=[];page.on('pageerror',function(error){page.errors.push(error.message);});await routeAssets(page);await page.goto(base+'/?session='+entry.id+(slug?'&event='+encodeURIComponent(slug):''));await page.locator('#loadingView').waitFor({state:'hidden'});return page; }
async function viewportMatrix(browser,base,engineName) {
  var viewports=[{width:320,height:740},{width:390,height:844},{width:600,height:900},{width:768,height:1024},{width:1024,height:768},{width:1440,height:900},{width:844,height:390}];
  for(var viewport of viewports) {
    var entry=session(),page=await newPage(browser,base,entry,viewport);
    await noOverflow(page,engineName+' directory '+viewport.width);
    assert.equal(await page.locator('.event-card').count(),14);
    assert.equal(await page.locator('.chapter').count(),11);
    assert.match(await page.locator('#ssgLogo').getAttribute('src'), /ssg-logo\.png$|id=1sMtm29iMFg29ZcVfzh1EM7BEN8kKzcOo/);
    assert.match(await page.locator('#brandLogo').getAttribute('src'), /esparto-logo\.png$|id=1d7VRlLtobVhe4ne47mqsfG2gGEmztFzj/);
    await page.waitForFunction(function(){var images=document.querySelectorAll('.chapter img');return images.length===11 && Array.prototype.every.call(images,function(image){return image.complete && image.naturalWidth>0;});});
    if(viewport.width===390 || viewport.width===1440)await page.screenshot({path:path.join(screenshotDir,engineName+'-directory-'+viewport.width+'.png'),fullPage:true});
    await page.getByRole('button',{name:'Workshops',exact:true}).click();assert.equal(await page.locator('.event-card').count(),1);
    await page.getByRole('button',{name:'All events',exact:true}).click();
    await page.locator('#eventSearch').fill('noeventmatches');assert.equal(await page.locator('.event-card').count(),0);await page.locator('#resetDirectory').click();
    await page.locator('[data-event="agentic-ai-workshop-hackathon"]').click();await completeDetails(page,4);
    assert.match(await page.locator('#ssgLogo').getAttribute('src'), /gdg-hitam\.png$|id=1ZeAHWKJYdckZWnp1Q4OrMlv6Zl8ed_1W/);
    assert.match(await page.locator('#brandLogo').getAttribute('src'), /esparto-logo\.png$|id=1d7VRlLtobVhe4ne47mqsfG2gGEmztFzj/);
    assert.equal(await page.locator('#mobileAmount').textContent(),'₹600');
    await noOverflow(page,engineName+' details '+viewport.width);
    // Shrink/expand preserves entered teammate drafts.
    await page.locator('#teamSize').selectOption('2');await page.locator('#teamSize').selectOption('4');assert.equal(await page.locator('#member4Name').inputValue(),'Test Teammate 4');
    if(viewport.width===390)await page.screenshot({path:path.join(screenshotDir,engineName+'-mobile-details.png'),fullPage:true});
    await goPayment(page,viewport.width);await noOverflow(page,engineName+' payment '+viewport.width);
    assert.equal(await page.locator('#paymentQr').getAttribute('src'),'https://drive.google.com/thumbnail?id=1WWKBVMZlGpDm5s9Rh7hOH5cdaTJ8Msuz&sz=w1000');var upi=new URL(await page.locator('#openUpi').getAttribute('href'));assert.equal(upi.searchParams.get('am'),'600');assert.equal(upi.searchParams.get('pa'),'qr.hitam@sib');assert.equal(upi.searchParams.get('tn'),'ESP-E03');assert.equal(upi.searchParams.get('pn'),'HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT');
    await readyToConfirm(page,viewport.width);assert.ok((await page.locator('#confirmationBody').textContent()).includes('Test Teammate 4'));await noOverflow(page,engineName+' confirmation '+viewport.width);
    await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(function(){return document.activeElement.id;}),'confirmSubmit');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#confirmation').isVisible(),false);assert.equal(await page.locator('#appContent').evaluate(function(el){return el.inert;}),false);
    await page.locator(viewport.width<=600?'#mobileCta':'#paymentReview').click();
    await page.locator('#confirmSubmit').click();await page.evaluate(function(){submitRegistration();submitRegistration();});
    await page.locator('#ticketTitle').waitFor({state:'visible'});await noOverflow(page,engineName+' ticket '+viewport.width);
    assert.match(await page.locator('#ticketRegId').textContent(),/^ESP26-HITM-E03-\d{3,6}$/);assert.ok((await page.locator('#ticketDetails').textContent()).includes('Pending Verification'));
    assert.equal(entry.state.harness.batches.length,1);assert.equal(entry.state.calls.filter(function(call){return call==='submitRegistration';}).length,1);assert.equal(entry.state.harness.sheets.ALL_MEMBERS_ROSTER.rows.length,5);
    assert.equal(await page.locator('#checkPayment').count(),0);
    assert.equal(await page.locator('#eventGroupLink').count(),0);
    assert.equal(entry.state.harness.sheets.ALL_PAYMENTS_COLLECTION.rows[1][11],'Pending Verification');
    assert.equal(entry.state.harness.sheets.ALL_REGISTRATIONS.rows[1][17],'Pending Verification');
    assert.equal(await page.locator('#ticketHitamLogo').isVisible(),true);
    assert.equal(await page.locator('#ticketEspartoLogo').isVisible(),true);
    assert.equal(await page.locator('#ticketSsgLogo').isVisible(),true);
    await page.emulateMedia({media:'print'});assert.equal(await page.locator('.header').isVisible(),false);assert.equal(await page.locator('#ticketRegId').isVisible(),true);await page.emulateMedia({media:'screen'});
    await page.locator('#exploreEvents').click();assert.equal(await page.locator('#directoryView').isVisible(),true);assert.deepEqual(page.errors,[]);
    console.log('PASS',engineName,viewport.width+'x'+viewport.height,'directory → details → payment → confirmation → ticket; four-tab storage');await page.close();
  }
}
async function edgeCases(browser,base,engineName) {
  var catalog=mocks.createHarness().scope.EVENT_CATALOG;
  for(var event of catalog) {
    var entry=session(),page=await newPage(browser,base,entry,{width:390,height:844},event.slug);
    if(event.id==='E01'){assert.equal(await page.locator('#externalPanel').isVisible(),true);assert.equal(await page.locator('#externalPanel a.btn').getAttribute('href'),entry.state.harness.scope.IEEE_URL);assert.equal(await page.locator('#mobileBar').isVisible(),false);}
    else {assert.equal(await page.locator('#detailsView').isVisible(),true);assert.equal(Number(await page.locator('#teamSize').inputValue()),event.minTeam);assert.equal(await page.locator('#mobileAmount').textContent(),'₹'+(mocks.payloadFor(entry.state.harness,event.id,'HITAM',event.minTeam).totalFee).toLocaleString('en-IN'));}
    await noOverflow(page,engineName+' deep link '+event.id);assert.deepEqual(page.errors,[]);await page.close();
  }
  for(var ieomSlug of ['smart-manufacturing-challenge','ieom-startup-pitch']){
    var ieom=session(),ip=await newPage(browser,base,ieom,{width:390,height:844},ieomSlug);
    assert.deepEqual(await ip.locator('#teamSize option').evaluateAll(function(options){return options.map(function(option){return option.value;});}),['1','4']);
    assert.equal(await ip.locator('#mobileAmount').textContent(),'₹100');
    await ip.getByText('Other College',{exact:true}).click();assert.equal(await ip.locator('#mobileAmount').textContent(),'₹150');
    await ip.locator('#teamSize').selectOption('4');assert.equal(await ip.locator('#mobileAmount').textContent(),'₹300');
    await ip.getByText('HITAM Student',{exact:true}).click();assert.equal(await ip.locator('#mobileAmount').textContent(),'₹200');
    await noOverflow(ip,'IEOM four-person details');await ip.close();
  }
  var showcase=session(),showcasePage=await newPage(browser,base,showcase,{width:320,height:740},'programmers-got-talent');
  assert.equal(await showcasePage.locator('#eventCategory').getAttribute('required'),'');
  await completeDetails(showcasePage,1);await goPayment(showcasePage,320);
  await showcasePage.locator('#utrNumber').fill('000012345678');await uploadProof(showcasePage);await showcasePage.locator('#agreement').check();
  await showcasePage.locator('#mobileCta').click();assert.equal(await showcasePage.locator('#confirmation').isVisible(),false);
  await readyToConfirm(showcasePage,320);assert.ok((await showcasePage.locator('#confirmationBody').textContent()).includes('Software'));
  await showcasePage.locator('#confirmSubmit').click();await showcasePage.locator('#ticketTitle').waitFor({state:'visible'});assert.equal(showcase.state.harness.batches.length,1);
  assert.equal(JSON.parse(showcase.state.harness.sheets.ALL_REGISTRATIONS.rows[1][14]).category,'Software');
  await noOverflow(showcasePage,engineName+' showcase ticket');await showcasePage.close();
  var entry=session(),page=await newPage(browser,base,entry,{width:390,height:844},'reverse-hackathon');
  await page.locator('#mobileCta').click();assert.equal(await page.locator('#detailsView').isVisible(),true);assert.equal(entry.state.harness.batches.length,0);
  await completeDetails(page,2);await goPayment(page,390);
  await page.locator('#proofFile').setInputFiles({name:'wrong.svg',mimeType:'image/svg+xml',buffer:Buffer.from('<svg/>')});assert.ok((await page.locator('#paymentError').textContent()).includes('PNG, JPG'));
  await page.locator('#proofFile').setInputFiles({name:'oversized.png',mimeType:'image/png',buffer:Buffer.alloc(2*1024*1024+1)});assert.ok((await page.locator('#paymentError').textContent()).includes('2 MB'));
  entry.state.dropNext=true;await readyToConfirm(page,390);await page.locator('#confirmSubmit').click();await page.locator('#submitError').waitFor({state:'visible'});assert.equal(entry.state.harness.batches.length,1);assert.equal(await page.locator('#confirmSubmit').isEnabled(),true);await page.locator('#confirmSubmit').click();await page.locator('#ticketTitle').waitFor({state:'visible'});assert.equal(entry.state.harness.batches.length,1);assert.equal(entry.state.harness.files.length,1);assert.deepEqual(page.errors,[]);await page.close();
  var failed=session({batchFailsBeforeCommit:true});page=await newPage(browser,base,failed,{width:320,height:740},'reverse-hackathon');await completeDetails(page,2);await goPayment(page,320);await readyToConfirm(page,320);await page.locator('#confirmSubmit').click();await page.locator('#submitError').waitFor({state:'visible'});assert.ok((await page.locator('#submitError').textContent()).includes('Do not pay again'));assert.ok(!(await page.locator('#submitError').textContent()).includes('PRIVATE'));assert.equal(failed.state.harness.batches.length,0);assert.equal(await page.locator('#ticketView').isVisible(),false);assert.deepEqual(page.errors,[]);await page.close();
  var unavailable=session({properties:{ESPARTO_SPREADSHEET_ID:null,ESPARTO_PROOF_FOLDER_ID:null}});
  page=await newPage(browser,base,unavailable,{width:390,height:844},'reverse-hackathon');
  assert.equal(await page.locator('#directoryView').isVisible(),true);
  assert.equal(await page.locator('[data-event="reverse-hackathon"]').isDisabled(),true);
  assert.ok((await page.locator('#pageMessage').textContent()).includes('unavailable'));
  assert.equal(await page.locator('#paymentView').isVisible(),false);
  await page.close();
  console.log('PASS',engineName,'all 14 deep links; required fields; invalid uploads; lost-response retry; atomic failure UX');
}
(async function(){var base=await listen();try{
  var engines=(process.env.BROWSER_ENGINES||'chromium').split(',');
  for(var engineName of engines){var options={headless:true};if(engineName==='chromium'&&process.env.CHROME_EXECUTABLE)options.executablePath=process.env.CHROME_EXECUTABLE;var browser=await playwright[engineName].launch(options);try{if(!process.env.EDGE_CASES_ONLY)await viewportMatrix(browser,base,engineName);await edgeCases(browser,base,engineName);}finally{await browser.close();}}
}finally{await close();}})().catch(function(error){console.error(error);process.exitCode=1;});
