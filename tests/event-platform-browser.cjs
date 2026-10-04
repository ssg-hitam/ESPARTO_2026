const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const catalog=require('./apps-script-mocks.cjs').createHarness().scope.EVENT_CATALOG;
  for(const event of catalog){const slug=event.id==='E01'?'innovision':event.slug;const response=await page.goto('http://localhost:3000/events/'+slug);assert.equal(response.status(),200,slug);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.espartohitam.com/events/'+slug);assert.ok(await page.locator('meta[property="og:title"]').getAttribute('content'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,slug);}
  await page.setViewportSize({width:1440,height:900});
  for(let i=0;i<10;i++){const response=await page.goto('http://localhost:3000/events/n8n-automation-challenge');assert.equal(response.status(),200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
  const missing=await page.goto('http://localhost:3000/events/not-an-event');assert.equal(missing.status(),404);
  await page.goto('http://localhost:3000/events/ieee-ideathon');assert.ok(page.url().endsWith('/events/innovision'));
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:3000/events/n8n-automation-challenge/register');
  await page.getByLabel('Team name',{exact:true}).fill('Local Test');
  const groups=page.locator('fieldset');
  for(let i=0;i<2;i++){const g=groups.nth(i);await g.getByLabel('Name',{exact:true}).fill('Local Person '+i);await g.getByLabel('Email',{exact:true}).fill('test'+i+'@example.org');await g.getByLabel('WhatsApp number').fill('987654321'+i);await g.getByLabel('Roll number').fill('TEST-'+i);await g.getByLabel('Branch',{exact:true}).selectOption('CSD');await g.getByLabel('Year',{exact:true}).selectOption('4');}
  await page.getByRole('button',{name:'Continue to review'}).click();
  await page.getByLabel('UPI transaction reference').fill(String(Date.now()));
  await page.getByRole('button',{name:'Use sample local test proof'}).click();
  await page.getByText('I confirm these local test details are correct.').click();await page.getByRole('button',{name:'Submit local test registration'}).click();
  await page.getByText('LOCAL TEST RECEIPT — not valid for entry').waitFor();assert.ok(await page.getByRole('heading',{name:'Registration successful',exact:true}).isVisible());assert.ok(await page.getByRole('link',{name:'Check your payment status',exact:true}).isVisible());assert.equal(await page.getByRole('link',{name:'Hemanth Nayak · +91 8328232607'}).getAttribute('href'),'tel:+918328232607');assert.equal(await page.getByRole('link',{name:'Tejal · +91 9059111595'}).getAttribute('href'),'tel:+919059111595');assert.equal(await page.getByRole('link',{name:'ssg@hitam.org',exact:true}).getAttribute('href'),'mailto:ssg@hitam.org');
  const original=await page.getByTestId('ticket-reference').innerText();await page.getByRole('button',{name:'Test recovery of same submission'}).click();await page.getByText('Existing submission recovered; no duplicate registration.').waitFor();assert.equal(await page.getByTestId('ticket-reference').innerText(),original);
  const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Download submission e-ticket'}).click();const download=await downloadEvent;assert.ok(download.suggestedFilename().endsWith('-local-submission-ticket.png'));const file=await download.path();const bytes=require('node:fs').readFileSync(file);assert.equal(bytes.subarray(1,4).toString(),'PNG');assert.equal(bytes.readUInt32BE(16),1000);assert.ok(bytes.readUInt32BE(20)>1500);require('node:fs').copyFileSync(file,'/private/tmp/esparto-downloaded-ticket.png');
  assert.equal(errors.length,0,errors.join('\n'));
  await page.screenshot({path:'/private/tmp/esparto-local-pilot-receipt.png',fullPage:true});
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('header').first().evaluate(el=>getComputedStyle(el).visibility),'hidden');await page.pdf({path:'/private/tmp/esparto-local-ticket.pdf',format:'A4',printBackground:true});await page.emulateMedia({media:'screen'});

  console.log('14 event routes, canonical/OG metadata, mobile/desktop layout, ten repeat opens, 404/legacy alias, n8n registration and duplicate recovery passed.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
