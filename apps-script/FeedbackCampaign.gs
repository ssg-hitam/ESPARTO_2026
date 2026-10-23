var ESPARTO_FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLScXTB5J9dZ-OSBukSXouWKK5IC43GkRjcKYvuea3ojoNrNTMA/viewform";
function prepareFeedbackInvitations() {
 requireOwner_();
 var ss=database_(), recipients={}, missing=0, validRows=0;
 ["CERTIFICATE_OUTSIDE_EMAILS","CERTIFICATE_HITAM_EMAILS"].forEach(function(n){
  var s=ss.getSheetByName(n); if(!s) throw Error("Missing recipient sheet: "+n);
  var rows=s.getDataRange().getDisplayValues().slice(4);
  rows.forEach(function(r){ if(!r[0]&&!r[1]&&!r[2])return;
   var email=String(r[2]||"").trim().toLowerCase();
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){missing++;return;}
   validRows++; if(!recipients[email])recipients[email]=[];
   if(recipients[email].indexOf(r[0])<0)recipients[email].push(r[0]);
  });
 });
 var q=ss.getSheetByName("FEEDBACK_EMAIL_DELIVERY")||ss.insertSheet("FEEDBACK_EMAIL_DELIVERY");
 if(q.getLastRow()===0)q.appendRow(["Email","Status","Sent at","Error","Events","Form URL"]);
 var existing={}; q.getDataRange().getDisplayValues().slice(1).forEach(function(r){existing[r[0]]=true;});
 var additions=Object.keys(recipients).sort().filter(function(e){return !existing[e];}).map(function(e){return[e,"Pending","","",recipients[e].join("; "),ESPARTO_FEEDBACK_URL];});
 if(additions.length)q.getRange(q.getLastRow()+1,1,additions.length,6).setValues(additions);
 q.setFrozenRows(1);q.getRange(1,1,1,6).setFontWeight("bold");q.setColumnWidth(1,280);q.setColumnWidth(2,150);q.setColumnWidth(5,450);
 console.log("RECIPIENTS: "+Object.keys(recipients).length+" unique addresses; "+validRows+" email entries; "+missing+" records missing/invalid emails.");
 auditFeedbackInvitations();
}
function sendFeedbackInvitations() {
 requireOwner_(); var lock=LockService.getScriptLock(); if(!lock.tryLock(1000))throw Error("Another run is active");
 try {
  var q=database_().getSheetByName("FEEDBACK_EMAIL_DELIVERY");if(!q)throw Error("Prepare recipients first");
  var rows=q.getDataRange().getValues(), quota=MailApp.getRemainingDailyQuota(), sent=0, started=Date.now();
  for(var i=1;i<rows.length&&sent<500&&sent<quota&&Date.now()-started<210000;i++){
   if(rows[i][1]!=="Pending")continue;
   q.getRange(i+1,2).setValue("Sending - review if interrupted");SpreadsheetApp.flush();
   try {
    MailApp.sendEmail({to:rows[i][0],subject:"ESPARTO 2026 — Share your feedback",name:"ESPARTO 2026 | SSG HITAM",replyTo:"ssg@hitam.org",body:"Dear participant,\n\nThank you for being part of ESPARTO 2026 at HITAM on 9–10 October! We hope you enjoyed the events.\n\nPlease take 2–3 minutes to share your experience using our feedback form:\n"+ESPARTO_FEEDBACK_URL+"\n\nYour feedback on the events, registration, organization and facilities will help us improve future editions. Please select all events you participated in and share your suggestions.\n\nThank you for your time and support!\nSSG and the ESPARTO 2026 Organizing Team\nHITAM"});
    q.getRange(i+1,2,1,3).setValues([["Sent",new Date(),""]]); sent++;
   }catch(err){q.getRange(i+1,2,1,3).setValues([["Review required","",String(err.message||err)]]);break;}
  }
  SpreadsheetApp.flush();console.log("Accepted by mail service this run: "+sent);auditFeedbackInvitations();
 }finally{lock.releaseLock();}
}
function auditFeedbackInvitations(){
 requireOwner_();var q=database_().getSheetByName("FEEDBACK_EMAIL_DELIVERY"),counts={};
 q.getDataRange().getDisplayValues().slice(1).forEach(function(r){counts[r[1]]=(counts[r[1]]||0)+1;});
 console.log("FEEDBACK DELIVERY: "+JSON.stringify(counts));console.log("Remaining email quota: "+MailApp.getRemainingDailyQuota());console.log("Delivery log: "+database_().getUrl()+"#gid="+q.getSheetId());
}
