var ESPARTO_CERT_TEXT="Hi everyone!\n\nThank you for participating in ESPARTO 2026 at HITAM!\n\nAs the official sponsor, Techsnap is offering ESPARTO participants 1 month of Techsnap PRO access for FREE.\n\nClaim your digital participation and achievement e-certificates through Techsnap:\n1. Download/open Techsnap: https://app.techsnap.in/signin\n2. Register or log in to your Techsnap account.\n3. Fill out the certificate form: https://forms.gle/Yr1HENTqCxjmJ8GP8\nIMPORTANT: Enter the same registered email and username used on Techsnap. Fill in your full name, college, year and branch accurately.\n\nYour certificate will have a unique shareable URL for your resume and LinkedIn. Once you receive it, share it on LinkedIn and tag HITAM and Techsnap.\n\nThe attached poster includes the app QR code and PRO offer details.\n\nSSG & the ESPARTO 2026 Organizing Team\nHITAM\nQuestions? ssg@hitam.org";
var ESPARTO_CERT_HTML="<div style=\"background:#f1edf8;padding:24px;font-family:Arial,sans-serif\"><div style=\"max-width:640px;margin:auto;background:white;border-radius:18px;overflow:hidden\"><div style=\"background:#20103e;padding:22px;text-align:center\"><img alt=\"ESPARTO\" src=\"https://www.espartohitam.com/images/brand/esparto-logo.png\" width=\"135\" style=\"vertical-align:middle;background:white;border-radius:8px;padding:8px;margin:8px\"><img alt=\"HITAM\" src=\"https://www.espartohitam.com/images/hitam/hitam_logo.jpg\" height=\"80\" style=\"vertical-align:middle;margin:8px\"><img alt=\"SSG\" src=\"https://www.espartohitam.com/images/brand/ssg-logo.png\" height=\"80\" style=\"vertical-align:middle;margin:8px\"><h1 style=\"color:white;font-size:26px\">Claim your ESPARTO 2026 e-certificate</h1></div><div style=\"padding:28px\"><p>Hi everyone! 👋</p><p>Thank you for being part of ESPARTO 2026 at HITAM!</p><p>Our official sponsor <b>Techsnap</b> is offering participants <b>1 month of Techsnap PRO for FREE</b> 🎁</p><h2 style=\"color:#72208d;font-size:21px\">Your certificate, in 3 steps</h2><ol style=\"line-height:1.8\"><li>Download/open the Techsnap app.</li><li>Register or log in to your account.</li><li>Complete the certificate Google Form.</li></ol><p style=\"padding:14px;background:#f2e9fa;border-left:4px solid #8c289c\"><b>Important:</b> Use the same registered email and username as your Techsnap account. Enter your name, college, year and branch accurately.</p><p style=\"margin:25px 0\"><a href=\"https://app.techsnap.in/signin\" style=\"display:inline-block;background:#72208d;color:white;padding:14px 18px;border-radius:8px;text-decoration:none;margin:5px\">Open Techsnap</a><a href=\"https://forms.gle/Yr1HENTqCxjmJ8GP8\" style=\"display:inline-block;background:#ff9300;color:#1b102e;padding:14px 18px;border-radius:8px;text-decoration:none;margin:5px\">Claim e-certificate</a></p><p>Your digital participation/achievement e-certificate will have a unique shareable URL. Add it to your resume and showcase it on LinkedIn.</p><p><b>Once received, share your certificate on LinkedIn and tag HITAM and Techsnap!</b></p><img src=\"cid:techsnapPoster\" alt=\"Techsnap — ESPARTO participant offer and download QR\" style=\"width:100%;height:auto\"><p style=\"font-size:13px;color:#666\">SSG & the ESPARTO 2026 Organizing Team · HITAM<br>Questions? <a href=\"mailto:ssg@hitam.org\">ssg@hitam.org</a></p></div></div></div>";
function prepareCertificateAnnouncement(){
 requireOwner_();var ss=database_(), recovered=0, missing=0, rec={};
 ["CERTIFICATE_OUTSIDE_EMAILS","CERTIFICATE_HITAM_EMAILS"].forEach(function(n){
  var s=ss.getSheetByName(n);if(!s)throw Error("Missing "+n);var a=s.getDataRange().getDisplayValues().slice(4);
  a.forEach(function(r,i){if(!r[0]&&!r[1]&&!r[2])return;var e=String(r[2]||"").trim().toLowerCase(), roll=String(r[4]||"").trim().toLowerCase();
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){
    if((n==="CERTIFICATE_HITAM_EMAILS"||/hitam|hyderabad institute of technology and management/i.test(r[3]))&&/^\d{2}e(?:51|55|61)[a-z0-9]{5}$/.test(roll)){
     e=roll+"@hitam.org";s.getRange(i+5,3).setValue(e);s.getRange(i+5,6).setValue("Derived from HITAM roll number");recovered++;
    }else{missing++;return;}
   }
   rec[e]=true;
  });
 });SpreadsheetApp.flush();
 var q=ss.getSheetByName("CERTIFICATE_NOTICE_DELIVERY")||ss.insertSheet("CERTIFICATE_NOTICE_DELIVERY");
 if(q.getLastRow()===0)q.appendRow(["Email","Status","Sent at","Error","Campaign","Form URL"]);
 var done={};q.getDataRange().getDisplayValues().slice(1).forEach(function(r){done[r[0]]=true;});
 var add=Object.keys(rec).sort().filter(function(e){return !done[e];}).map(function(e){return[e,"Pending","","","Techsnap certificate instructions","https://forms.gle/Yr1HENTqCxjmJ8GP8"];});
 if(add.length)q.getRange(q.getLastRow()+1,1,add.length,6).setValues(add);
 q.setFrozenRows(1);q.getRange(1,1,1,6).setFontWeight("bold");q.setColumnWidth(1,280);q.setColumnWidth(2,180);q.setColumnWidth(5,280);
 console.log("EMAIL RECOVERY: "+recovered+" HITAM records derived; "+missing+" still missing/invalid; "+Object.keys(rec).length+" unique recipients.");
 prepareFeedbackInvitations();auditParticipantAnnouncements();
}
function sendCertificateAnnouncementBcc(){
 requireOwner_();var poster=DriveApp.getFileById("10cNSyWDRGxcSpWtmhbFuhj65Cvr6zQZ7").getBlob().setName("Techsnap-ESPARTO-2026-offer.png");
 sendParticipantBcc_("CERTIFICATE_NOTICE_DELIVERY","ESPARTO 2026 — Claim your e-certificate + free Techsnap PRO",ESPARTO_CERT_TEXT,ESPARTO_CERT_HTML,poster);
 auditParticipantAnnouncements();
}
function sendOnlyUnsentFeedbackBcc(){
 requireOwner_();var text="Dear participant,\n\nThank you for joining ESPARTO 2026 at HITAM on 9–10 October! Please take 2–3 minutes to share your feedback:\n"+ESPARTO_FEEDBACK_URL+"\n\nYour suggestions help us improve future events.\n\nSSG & the ESPARTO 2026 Organizing Team";
 sendParticipantBcc_("FEEDBACK_EMAIL_DELIVERY","ESPARTO 2026 — Share your feedback",text,"",null);auditParticipantAnnouncements();
}
function sendParticipantBcc_(sheetName,subject,text,html,poster){
 var lock=LockService.getScriptLock();if(!lock.tryLock(1000))throw Error("Another sender is running");
 try{var q=database_().getSheetByName(sheetName);if(!q)throw Error("Prepare first");var a=q.getDataRange().getValues(), pending=[];
 for(var i=1;i<a.length;i++)if(a[i][1]==="Pending")pending.push({row:i+1,email:a[i][0]});
 var accepted=0,started=Date.now();
 while(pending.length&&Date.now()-started<210000){var batch=pending.splice(0,40);if(MailApp.getRemainingDailyQuota()<batch.length+1)break;
  batch.forEach(function(r){q.getRange(r.row,2).setValue("Sending - review if interrupted");});SpreadsheetApp.flush();
  try{var msg={to:"elysian@hitam.org",bcc:batch.map(function(r){return r.email;}).join(","),subject:subject,body:text,name:"ESPARTO 2026 | SSG HITAM",replyTo:"ssg@hitam.org"};
   if(html)msg.htmlBody=html;if(poster){msg.inlineImages={techsnapPoster:poster};msg.attachments=[poster];}
   MailApp.sendEmail(msg);var now=new Date();batch.forEach(function(r){q.getRange(r.row,2,1,3).setValues([["Sent",now,""]]);});accepted+=batch.length;SpreadsheetApp.flush();
  }catch(err){batch.forEach(function(r){q.getRange(r.row,2,1,3).setValues([["Review required","",String(err.message||err)]]);});break;}
 }
 console.log(sheetName+": "+accepted+" recipients accepted in BCC batches this run.");
 }finally{lock.releaseLock();}
}
function auditParticipantAnnouncements(){
 requireOwner_();["FEEDBACK_EMAIL_DELIVERY","CERTIFICATE_NOTICE_DELIVERY"].forEach(function(n){var q=database_().getSheetByName(n);if(!q)return;var counts={};q.getDataRange().getDisplayValues().slice(1).forEach(function(r){counts[r[1]]=(counts[r[1]]||0)+1;});console.log(n+": "+JSON.stringify(counts));console.log("Log: "+database_().getUrl()+"#gid="+q.getSheetId());});console.log("Remaining daily recipient quota: "+MailApp.getRemainingDailyQuota());
}

// Supply owner-approved [name, email, college] rows at runtime; never commit student contacts.
function importConfirmedIeeeEmails(sourceRows){
 if(!Array.isArray(sourceRows)||!sourceRows.length)throw Error("Supply confirmed IEEE contact rows");
 requireOwner_();var ss=database_(),src=sourceRows, map={},updated=0,conflicts=0;
 function key(v){return String(v||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
 src.forEach(function(r){var k=key(r[0]);if(map[k]&&map[k][1]!==r[1])throw Error("Duplicate source name "+r[0]);map[k]=r;});
 var s=ss.getSheetByName("IEEE_IMPORTED_ROSTER");s.getDataRange().getDisplayValues().slice(1).forEach(function(r,i){var m=map[key(r[1])];if(!m)return;if(r[4]&&r[4].toLowerCase()!==m[1]){conflicts++;return;}s.getRange(i+2,4,1,2).setValues([[m[2],m[1]]]);updated++;});
 ["CERTIFICATE_OUTSIDE_EMAILS","CERTIFICATE_HITAM_EMAILS"].forEach(function(n){var s=ss.getSheetByName(n);s.getDataRange().getDisplayValues().slice(4).forEach(function(r,i){if(r[0]!=="INNOVISION / Ideathon")return;var m=map[key(r[1])];if(!m)return;if(r[2]&&r[2].toLowerCase()!==m[1]){conflicts++;return;}s.getRange(i+5,3,1,4).setValues([[m[1],m[2],r[4],"Confirmed IEEE source roster"]]);});});
 SpreadsheetApp.flush();console.log("IEEE emails matched: "+updated+"; conflicting records skipped: "+conflicts);prepareCertificateAnnouncement();
}

// Supply owner-approved [name, email] rows at runtime.
function importAdditionalIeeeContacts(contactRows){
 if(!Array.isArray(contactRows)||!contactRows.length)throw Error("Supply confirmed contact rows");
 requireOwner_();var ss=database_(), contacts=contactRows,matched=0;
 function k(v){return String(v||"").toLowerCase().replace(/[^a-z0-9]/g,"");}
 var map={};contacts.forEach(function(c){map[k(c[0])]=c[1];});
 var t=ss.getSheetByName("IEEE_IMPORTED_ROSTER");t.getDataRange().getDisplayValues().slice(1).forEach(function(r,i){var e=map[k(r[1])];if(e){if(r[4]&&r[4].toLowerCase()!==e)throw Error("Email conflict "+r[1]);t.getRange(i+2,5).setValue(e);matched++;}});
 ["CERTIFICATE_OUTSIDE_EMAILS","CERTIFICATE_HITAM_EMAILS"].forEach(function(n){var t=ss.getSheetByName(n);t.getDataRange().getDisplayValues().slice(4).forEach(function(r,i){var e=map[k(r[1])];if(e){if(r[2]&&r[2].toLowerCase()!==e)throw Error("Email conflict "+r[1]);t.getRange(i+5,3).setValue(e);t.getRange(i+5,6).setValue("Confirmed organizer contact");}});});
 SpreadsheetApp.flush();console.log("Additional IEEE matched: "+matched);prepareCertificateAnnouncement();
}
