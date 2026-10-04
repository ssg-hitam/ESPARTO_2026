const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_EXECUTABLE});
try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const qr='data:image/gif;base64,'+fs.readFileSync('/private/tmp/esparto-scanner-test.gif').toString('base64');
 await page.addInitScript(qr=>{Object.defineProperty(navigator,'mediaDevices',{value:{getUserMedia:async()=>{const canvas=document.createElement('canvas');canvas.width=640;canvas.height=480;const ctx=canvas.getContext('2d');const img=new Image();img.src=qr;await img.decode();const paint=()=>{ctx.fillStyle='white';ctx.fillRect(0,0,640,480);ctx.drawImage(img,180,100,280,280);};paint();const stream=canvas.captureStream(10);const timer=setInterval(paint,100);stream.getTracks().forEach(t=>{const stop=t.stop.bind(t);t.stop=()=>{clearInterval(timer);stop();};});return stream;}}});},qr);
 let calls=0;
 await page.route('**/api/scanner',async route=>{const request=route.request();if(request.method()==='GET')return route.fulfill({json:{success:true,email:'staff@hitam.org',events:[{id:'E08',title:'n8n Automation Challenge'}]}});const body=request.postDataJSON();calls++;assert.equal(body.action,'lookup');assert.equal(body.reference,'ESPARTO 2026|ESP26-HITM-E08-001|E08');await route.fulfill({json:{success:true,ticket:{regId:'ESP26-HITM-E08-001',eventId:'E08',eventTitle:'n8n Automation Challenge',teamName:'Test team',college:'HITAM',checkedIn:false,paymentStatus:'Verified',members:[{name:'Test participant',rollNo:'TEST001',role:'Team Lead'}]}}});});
 await page.goto('http://localhost:3000/scanner');await page.getByRole('button',{name:'Start camera',exact:true}).click();await page.getByText('Test participant',{exact:true}).waitFor();assert.equal(calls,1);assert.equal(await page.getByRole('button',{name:'Confirm attendance',exact:true}).isEnabled(),false);assert.equal(await page.locator('video').evaluate(el=>el.srcObject),null);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);assert.deepEqual(errors,[]);
 await page.screenshot({path:'/private/tmp/website-scanner-'+width+'.png',fullPage:true});console.log('PASS '+width+'px live camera QR detection → automatic lookup → identity gate (synthetic video)');await page.close();
}
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
