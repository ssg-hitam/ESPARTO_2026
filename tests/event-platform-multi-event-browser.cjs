const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const {createHarness}=require('./apps-script-mocks.cjs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const h=createHarness();let tested=0;
  for(const event of h.scope.EVENT_CATALOG.filter(e=>e.id!=='E01'&&e.id!=='E08'&&(!process.env.TEST_EVENT||process.env.TEST_EVENT===e.id))){
   const response=await page.goto('http://localhost:3000/events/'+event.slug+'/register');assert.equal(response.status(),200);
   await page.getByRole('button',{name:'Continue to review',exact:true}).waitFor();
   assert.ok(await page.getByText('LOCAL TEST ONLY.',{exact:false}).isVisible());
   const size=event.allowedTeamSizes?4:event.id==='E03'?2:event.minTeam;
   const select=page.getByLabel('Participant count');if(await select.count())await select.selectOption(String(size));
   if(size>1)await page.getByLabel('Team name',{exact:true}).fill('LOCAL MULTI EVENT '+event.id);
   const groups=page.locator('fieldset');
   for(let i=0;i<size;i++){
    const g=groups.nth(i);await g.getByLabel('Name',{exact:true}).fill('Synthetic '+event.id+' '+i);await g.getByLabel('Email',{exact:true}).fill(event.id.toLowerCase()+i+'@example.org');await g.getByLabel('Roll number',{exact:true}).fill('TEST-'+event.id+'-'+i);if(i===0)await g.getByLabel('WhatsApp number',{exact:true}).fill('9876543210');await g.getByLabel('Branch',{exact:true}).selectOption('CSD');await g.getByLabel('Year',{exact:true}).selectOption('4');
   }
   if(event.id==='E03')assert.equal(await select.locator('option[value="1"]').count(),0);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.getByRole('button',{name:'Continue to review',exact:true}).click();
   await page.getByRole('button',{name:'Use sample local test proof',exact:true}).click();
   const config=h.scope.EVENT_FORM_CONFIG[event.id];
   if(config){if(config.categories)await page.getByLabel('Showcase category').selectOption(config.categories[0]);for(const rule of config.rules)await page.getByLabel(rule,{exact:true}).check();}
   await page.getByLabel('I confirm these local test details are correct.',{exact:true}).check();
   await page.getByRole('button',{name:'Submit local test registration',exact:true}).click();
   await page.getByText('LOCAL TEST RECEIPT — not valid for entry',{exact:true}).waitFor();assert.ok(await page.getByTestId('ticket-reference').innerText());
   console.log(event.id+' local form and backend save passed');tested++;
  }
  assert.equal(tested,process.env.TEST_EVENT?1:12);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
