# Verified-payment ticket emails

## Activation — organizer steps

1. Sign into **elysian@hitam.org**. This account needs editor access to the Apps Script project and registration spreadsheet. The sender is the account that creates the trigger; setting a display name or reply address does not change it.
2. Paste the updated `Code.gs` and `index.html` into the existing Apps Script project. Save and deploy a new version of the existing web app. Do not rerun database setup or replace existing data.
3. Configure each event's `WHATSAPP_GROUP_E##` in Script properties. Emails wait if the group is missing or invalid. IEEE uses its separate portal; no robot group has been supplied yet, so robot emails wait until its group is configured.
4. In the Apps Script editor, select **setupVerifiedTicketEmails**, then Run. Authorize mail sending, external QR requests, spreadsheet access and trigger creation as **elysian@hitam.org**. This sets up `TICKET_EMAIL_DELIVERY` and a spreadsheet edit trigger plus one five-minute fallback trigger. Running setup alone does not send mail immediately; the trigger will process existing eligible verified records as well as new ones.
5. For one controlled registration, independently check the bank payment. Set `ALL_REGISTRATIONS.PaymentStatus` AND `ALL_PAYMENTS_COLLECTION.VerificationStatus` to exactly **Verified** for that registration. Merely submitting a proof/UTR never triggers a confirmed ticket email.
6. After editing the second verification status, or in a later fallback run, check the lead's inbox/spam and the `TICKET_EMAIL_DELIVERY` row. Confirm the event, amount, group, schedule and QR attachment. A `Sent` state means Google's send call succeeded, not guaranteed inbox delivery.

## Email and ticket

The email is from Elysian, displayed as ESPARTO 2026; replies go to elysian@hitam.org. It goes to the lead/individual's supplied registration email, not every teammate. It contains a confirmed ticket with registration ID, event, participant/team, participant count, verified amount, date/timing/venue and the event's private WhatsApp invitation. The ticket QR appears inline and as a PNG attachment.

The QR encodes only `ESPARTO 2026|REG_ID|EVENT_ID`. It is a registration identifier, not a payment QR or automatic admission authorization. Desk staff scan it and check the verified registration record/check-in status. It does not contain names, emails, phone numbers, proof links, WhatsApp links or private submission tokens. The external QR provider receives only the encoded registration/event identifiers.

## Delivery safeguards and recovery

- An installable spreadsheet edit trigger reacts to manual changes in either verification column, including pasted ranges. Five-minute polling catches scripted/API changes and provides fallback checks. Google controls trigger scheduling and email delivery; a five-second arrival cannot be guaranteed. The email helpers end with `_` and cannot be called through google.script.run.
- A separate user lock serializes email workers without occupying the registration writer's lock during mail/QR requests. Each run sends at most 20 tickets within a two-minute budget, subject to remaining daily recipient quota. To upgrade an existing installation, run setupVerifiedTicketEmails again as Elysian; it adds the edit trigger without duplicating existing triggers.
- Pending/rejected/inconsistent payments, duplicate finance references, missing groups and exhausted quota send nothing. QR failures leave Pending for a later attempt.
- Sent rows are never automatically resent. Sending or ReviewRequired rows require organizer review: a send may have succeeded before an acknowledgement/error. Check sender mail/delivery evidence first; set State to Pending only when a resend is appropriate. Do not delete delivery rows to retry.
- To pause, set `ESPARTO_TICKET_EMAIL_ENABLED` to `false` in Script properties. Registration and portal status checks continue working.
- Confirmed messages already sent cannot be recalled by later changing payment status. No live messages were sent by the local tests.

## Participant confirmation copy

“Thank you for registering for this event. After your payment is verified, you will receive an email from elysian@hitam.org with your event ticket, QR code, and WhatsApp group link for event communication.”

## Branded ticket and participant fields

Verified emails use the official ESPARTO logo inline, a ticket panel, schedule and WhatsApp button. Only the ticket QR PNG is attached; the logo is not a ticket attachment. Logo access failure falls back to the public official asset without blocking delivery. Existing Sent tickets are not resent by this update.

The portal collects branch and year separately. HITAM branches are CSE, CSM, CSD, ECE, EEE, MECH, ITP - CSE, ITP - MECH and IIBMP; years are 1–4. Other-college branches use free text. The server validates these fields and combines them into the existing BranchYear Sheets column, so no sheet migration is required. Existing legacy submissions remain supported. IUCEE event questions and consent are preserved. Save both Code.gs and index.html, then update the existing web app deployment to a new version.

## Organizer verification and references

Participant tickets no longer contain a payment-status button or WhatsApp invitation. Confirmed tickets and group invitations are delivered by email only after both organizer payment records are Verified. The separate website payment-status page is read-only and cannot mark payments Verified.

New registration references use ESP26-HITM-E08-001 (event-specific sequential numbering). Numbers expand beyond 999 and are reserved under the writer lock; failed submissions can leave gaps. Existing ESP26-E08-6535-style references remain valid and must not be renamed in Sheets. The submission ticket and confirmed email both show official ESPARTO, HITAM and SSG logos.
