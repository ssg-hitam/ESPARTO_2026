# Organizer QR check-in desk

The desk looks up existing ESPARTO registration records and records attendance. It cannot mark payments Verified. IEEE's separate registration system is excluded.

## Files and deployment

1. Update Code.gs in the existing Apps Script project. Keep the current registration index.html. Add HTML files named scanner and qrdecoder using scanner.html and qrdecoder.html. The QR decoder is vendored jsQR 1.4.0 (license in QR_DECODER_LICENSE.txt); no executable third-party CDN code is loaded.
2. Under Project settings → Script properties, create ESPARTO_DESK_ROLES. Its value is a JSON object mapping each explicitly authorized HITAM Google account to an array of event IDs. Example only: `{"desk.organizer@hitam.org":["E08","E07"]}`. Replace the placeholder with approved accounts. No accounts are granted access by default; `*` is not supported.
3. Update the registration deployment to include the new files. For staff, create an additional deployment of the same project, Execute as Me, accessible only within the HITAM Workspace organization (if Workspace policy offers this option). Do not change public participant access on the original deployment. Open the staff URL with `?action=desk`.
4. Staff sign in with the exact allowlisted HITAM Google account. Every lookup and attendance write rechecks Google's active user email and event permissions. An anonymous/blank active identity is denied even if the effective executor is the owner. If Workspace policy does not provide the active email, do not bypass this check; review the deployment/Workspace settings with the administrator. Google documents these identity limitations at https://developers.google.com/apps-script/reference/base/session#getActiveUser().
5. Test with an approved demo ticket, one unauthorized account, a pending-payment ticket, a wrong-event QR and repeated check-in. This repo's browser tests use mocked Google services; live authorization/device-camera behavior requires this test.

## Event-day workflow

Select the staff member's assigned event. Start the camera, use image/camera capture, or enter the complete reference. QR images are decoded locally and never uploaded. Live camera access can be blocked by Apps Script/browser iframe permissions; the image/manual paths remain available. Camera scanning stops after one minute or when the page is hidden.

Only records with both payment statuses Verified and matching master/finance/event/roster records can be checked in. Staff sees names, roll numbers, team and college—never payment proof, UTR, email, phone or WhatsApp invites. A copied QR is not identity: compare all listed participants with college IDs. Staff explicitly checks the identity-confirmation box and confirms the WHOLE registration/team. Partial team arrival requires administrator handling; do not mark the whole team present prematurely.

Attendance writes use one atomic Sheets batch: master CheckInStatus, event checkbox, and event DeskNotes audit text recording time/account. Existing notes are preserved. Payment status is never changed. Duplicate check-in does not write again. If the connection fails after a save, look up the ticket again before retrying. Details clear on page hiding or after inactivity.

No biometric or automated identity matching is implemented. The desk records a staff comparison; it cannot prove a person's identity on its own. Keep the scanner URL limited to event staff and keep the backing Sheets/Drive restricted. Event-day load/real-device testing remains necessary.

## Approved SSG accounts

The user-approved initial list is in `SSG_DESK_ROLES.json`: all eleven supplied SSG addresses are assigned E02–E14. E01 (IEEE) uses a separate system and is excluded. Copy the entire JSON object into the `ESPARTO_DESK_ROLES` Script property; saving this file in Git does not activate permissions. Add future registration-team accounts explicitly after approval. Staff must sign in with the exact account: a mailing-list address or alias alone does not establish a Google active-user identity.
