# ESPARTO 2026 registration portal

The two deployment files are **Code.gs** and **index.html** in this directory. They replace the older root-level `apps_script_code.gs` and `apps_script_index.html` for the rebuilt portal. Do not combine the old and new scripts in one Apps Script project.

The portal covers all 14 supplied events. IEEE uses its separate official form. The remaining 13 events register locally. Event fees, team limits, coordinator contacts, and prize pools use the supplied rebuild specification. Existing repository descriptions and matching prize breakups are retained. TorqueX and ISAMPE prize breakups are left unannounced because their older breakdowns did not add up to the new ₹5,000 pools. HHC and IUCEE-EWB are listed separately in the 11-chapter strip using their separate Drive logos. HHC events use the combined HHC × IUCEE Drive logo; GDG uses its corrected separate Drive logo.

Logos now load from the supplied Google Drive file IDs using image thumbnail URLs. Set each logo file to **Anyone with the link → Viewer** so visitors can see it without signing in. If Drive fails, the portal falls back to the existing jsDelivr image, then retries its alternate CDN host.

## Deploy these two files

1. Create a **new Google Sheet** using the HITAM account that will own the registration system. Open **Extensions → Apps Script** from that sheet. This rebuild does not import or overwrite old registrations.
2. Replace the default `Code.gs` contents with this directory's `Code.gs`. Add an HTML file named **index** and paste `index.html` into it.
3. In the Apps Script editor, choose **Services (+) → Google Sheets API → v4 → Add**. Keep its identifier as `Sheets`. This is required for the atomic four-tab write. With the default Apps Script Cloud project, adding the service also enables the API; a custom Cloud project requires enabling the Sheets API separately. [Google's advanced-service setup documentation](https://developers.google.com/apps-script/guides/services/advanced).
4. Run **setupDatabase()** manually as the script owner and authorize Sheets and Drive access. Leave `SPREADSHEET_ID` blank in a sheet-bound project; setup saves the spreadsheet and proof-folder IDs in Script Properties. If using a standalone script, set `SPREADSHEET_ID` first.
5. Confirm that setup created the 3 master tabs, 14 event tabs, and `DASHBOARD_LIVE_METRICS` (18 tabs in total, plus any pre-existing default Sheet1). Setup may be rerun: it preserves participant rows, validates their headers, and refreshes dashboard formulas. It refuses to overwrite incompatible legacy schemas.
6. Choose **Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone**. Copy the actual `/exec` deployment URL. When the HITAM deployment supplies a domain URL, use `https://script.google.com/a/macros/hitam.org/s/DEPLOYMENT_ID/exec`. URL shape alone does not grant anonymous access; the Workspace administrator's policies still apply. [Google's web app deployment documentation](https://developers.google.com/apps-script/guides/web).
7. Test the deployment signed out and from an external-college account. Add `?event=reverse-hackathon` to verify preselection. For IEEE deep links, the portal shows a button to the separate official form, so browsers do not block an automatically opened popup.
8. If the deployment ID changed, update `GOOGLE_APPS_SCRIPT_REGISTRATION_URL` in `src/data/events.ts` only after the new deployment has passed the smoke checks below. The website's existing live registration URL has not been changed by this rebuild.

Only these two source files go into Apps Script. No Node.js package or test harness is required in the deployed portal. Editing local files does not update an existing live deployment: update the deployed version through **Deploy → Manage deployments** after pasting any later changes.

## Storage and payment behavior

- `ALL_REGISTRATIONS`: one row per registration, authoritative event name and chapter, participant count, lead contacts, institution, college, member summary, optional additional details, amount submitted, check-in status, payment status, exact text UTR, and Drive proof URL.
- `ALL_PAYMENTS_COLLECTION`: one payment audit row including payer, amount, UTR, Drive file ID, proof URL, verification status, and an idempotency record in Notes.
- `ALL_MEMBERS_ROSTER`: one row per participant, including the team lead. Optional teammate details stay empty when not provided.
- Event-specific tab: one row per registration, a real checkbox, the same reference, contacts, team summary, amount, UTR, proof URL, and DeskNotes.

The server validates event IDs/slugs, allowed team sizes, teammate count, institution, required contact fields, optional contact formats, consent, 8–16 digit UTR, and PNG/JPEG/WebP screenshots up to 2 MB. It computes the fee from its own catalog and rejects client fee tampering. Per-team prices stay flat; per-person prices multiply by the participant count, including the lead. A registration uses one institution tier and one distinct UTR.

All four tabs are written through one `Sheets.Spreadsheets.batchUpdate` call. Google's API applies the requests together atomically. Input text is sent as `stringValue`, so roll numbers/UTRs retain leading zeros and text beginning with `=` is not executed as a spreadsheet formula. [Google's atomic batch guarantee](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate).

Drive is separate from the Sheets transaction. Screenshots are uploaded with restricted sharing (PRIVATE), not anyone-with-link access. Only authorized Drive users should access proof links. Use a dedicated restricted proof folder and share it only with named verification staff; inherited folder permissions must also be reviewed. Previously uploaded public files are not changed automatically: set those files and the proof folder to Restricted in Drive. If upload or access restriction fails, no registration rows are written; uncertain batches retain proof and a recovery journal.

Every new e-ticket says **Pending Verification**. Local event registration is disabled until the database and proof folder have been configured by setup. UTRs and screenshots are submitted evidence; this system does not connect to the bank or automatically confirm that money reached the UPI account. No amount is marked verified solely because the form was submitted.

## Organizer verification and dashboard

- Verify the UTR, amount, recipient, and screenshot against the actual UPI collection account.
- When approved, update `PaymentStatus` in `ALL_REGISTRATIONS` **and** `VerificationStatus` in `ALL_PAYMENTS_COLLECTION` to exactly `Verified`. For rejection, set both to `Rejected` and record an explanation in event `DeskNotes` or append it on a new line after the payment Notes JSON.
- The dashboard separates **AmountSubmitted** from **VerifiedAmount**. `COUNTIF` and `SUMIF` use EventID, not potentially edited event titles; verified amounts use `SUMIFS` with `PaymentStatus = "Verified"`.
- IEEE registrations/payments live in the external form's database. Its local dashboard row is labeled **External IEEE form** and remains zero unless an organizer performs a separately planned import.
- Do not delete participant rows, edit ID/UTR fields, replace payment Notes' first JSON line, or run another Apps Script writer against these tabs. The lock coordinates this script's submissions; it does not lock out human spreadsheet edits or other projects.
- New references use `ESP26-HITM-E08-001`, with sequential numbering per event that expands beyond three digits. Reservations and counters are protected by the writer lock; failed attempts may leave gaps. Existing four-digit references remain valid and must not be renamed.
- Screenshot uploads and API calls are subject to the owning account's Apps Script/Drive quotas. A busy-lock response asks the participant to retry; this was not a live-account capacity/load test.

## Recover an uncertain submission

The frontend creates a random 32-character support reference for each attempt. It disables double-submit and reuses the same reference and payload on a retry. If a response is lost after commit, the backend recovers the original ticket without creating more rows or files. A different request trying to reuse a recorded UTR is rejected without exposing the original participant's ticket.

If the UI reports `RECONCILIATION_REQUIRED`, ask for the support reference shown in its message and the UTR. The participant should keep their screenshot and **not pay again**.

The owner can temporarily add an editor-only convenience wrapper to `Code.gs`, replacing the reference with the supplied 32-character string:

```javascript
function inspectPendingRegistration() {
  return reconcileSubmission("REPLACE_WITH_32_CHARACTER_REFERENCE", false);
}
```

Run it manually as the owner and inspect its returned result. If the batch committed, it clears the stale journal and returns the RegID. If no record is found, inspect the spreadsheet, Drive proof, and script execution timing first. After **at least 10 minutes since the API attempt**, a confirmed uncommitted attempt may be reset with a deliberate owner call:

```javascript
function resetConfirmedUncommittedRegistration() {
  return reconcileSubmission("REPLACE_WITH_32_CHARACTER_REFERENCE", true);
}
```

Reset refuses while the waiting period is active. It preserves committed submissions and trashes only the proof for a confirmed uncommitted journal. The participant can then retry with the original UTR and screenshot. Remove the temporary wrappers after recovery. Administrative methods check owner identity; an anonymous browser cannot run setup or recovery.

## Live deployment smoke checks

The local tests below use mocked Google services. Complete these checks on an isolated Google Sheet before switching the live registration link:

1. Open the `/exec` URL signed out, on an iPhone and an Android phone; open it again as an external-college Google account. Confirm the directory loads without requesting script-editor access.
2. Test IEEE handoff and all supported local `?event=SLUG` links.
3. For a per-team event, compare HITAM/Other totals and change team size: total stays flat. For a per-person event, change participant count: total changes correctly. Check that the UPI app link includes the displayed amount. The official bank QR is static: participants must enter that exact amount after scanning.
4. Submit an organizer-authorized test payment/proof into the isolated database. Confirm exactly one matching RegID exists in all four tabs, roster row count equals selected team size, text UTR is intact, proof URL is viewable with its link, and every payment status is pending.
5. Retry the same attempt after an interrupted browser response. Confirm no extra registration, payment, roster, event row, or screenshot is added. A new request using that UTR must show a friendly duplicate message.
6. Verify/reject the test payment manually and check dashboard counts, submitted amounts, and verified amounts. Test print/save from the e-ticket screen.
7. Check the HITAM Drive link-sharing policy, real QR rendering/scanning, UPI-app launch, actual spreadsheet formulas, and Apps Script authorization/scopes. These cannot be established by a local mock.

## Repeatable local tests

```bash
npm run test:registration
```

This uses Node's built-in runner and requires no extra test dependencies. It runs 20 backend/source tests, including all 60 allowed local event/team-size/tier combinations, schema setup, exact row contracts, duplicate prevention, fee tampering, invalid uploads, sharing errors, busy locks, ambiguous commits, administrative recovery, reference collisions, and deep-link escaping.

For the browser harness, install Playwright in your local test environment, download its test browsers, and run:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium webkit firefox
BROWSER_ENGINES=chromium,webkit,firefox node tests/apps-script-browser.cjs
```

An existing system Chrome can instead be supplied through `CHROME_EXECUTABLE`. An externally provided Playwright module can be supplied through `PLAYWRIGHT_MODULE`; use `PLAYWRIGHT_BROWSERS_PATH` for a temporary browser cache. The harness hosts the actual HTML and backend on an ephemeral loopback port with mocked Sheets and Drive, closes the server after testing, and writes screenshots to `/private/tmp/esparto-registration-review` by default (override with `AUDIT_SCREENSHOT_DIR`). It creates no real registrations or Drive files.

The browser matrix covers directory filters/search, all 14 deep links, participant details, draft preservation, dynamic amounts/UPI app payloads, screenshot upload, confirmation focus and Escape, double-submit prevention, pending e-ticket, print styles, interrupted-response recovery, and atomic failure messages. Viewports are 320×740, 390×844, 600×900, 768×1024, 1024×768, 1440×900, and 844×390 landscape. Drive logo loading is deliberately blocked to exercise fallback; local logos serve the CDN paths; QR images and external fonts are mocked/blocked so the flow also exercises network-independent behavior. There are no real bank transfers and no scanner/UPI app is launched.

WebKit testing helps check the Safari engine, but it is not certification on physical iOS hardware. Real Google services, Workspace access/sharing policies, bank settlement, native UPI-app routing, mobile keyboards, font/CDN availability, and production traffic capacity still require the deployment smoke checks above.

## Private post-payment WhatsApp access

See [POST_PAYMENT_GROUPS.md](POST_PAYMENT_GROUPS.md) for private Script Property configuration, event mappings, organizer verification, and participant status checks. Group invitation URLs are intentionally excluded from repository files and public portal data.

## Official payment setup

The supplied South Indian Bank QR decodes to `qr.hitam@sib` for `HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT`. The portal displays the original bank QR from Drive file `1WWKBVMZlGpDm5s9Rh7hOH5cdaTJ8Msuz`; scanning requires entering the exact displayed registration fee. The UPI app link includes that fee automatically. Keep this image publicly viewable. Update both Apps Script files and deploy a new version of the existing deployment. Verify the recipient and scan on a real phone before collecting registrations.

## Current registration deployment

Version 6 was deployed on October 4, 2026 (12:37 AM), incorporating the updated E12 "Build Your First Robot" ISNT × ISAMPE Student Chapter dual pricing (Solo ₹120 / Team ₹250) and team bounds (1–4), along with E01 "INNOVISION (IEEE National Ideathon)" branding updates. The website uses the existing web app URL: [ESPARTO registration portal](https://script.google.com/macros/s/AKfycbyWW19qSK95FeVO35V-aX5Lr2ySIE-ZMLLqem_y6bIFRXLcVEzVtU4qooHetePr09dbHQ/exec). Updating this deployment keeps the same URL. IEEE retains its separate official form.

## Event-specific HHC registration forms

Reverse Hackathon (E02) has a mystery-product introduction, Diagnosis / Rebuild / Pitch format, 2–3 total participants, required teammate email and year/department, and three required rules/consent statements. Programmers Got Talent (E04) has a solo live-showcase introduction, a required technical category, and four required rules/consent statements. The backend validates these answers and stores the category and accepted rule text in the existing CustomDetails / CustomAnswers cells. No sheet schema changes or database setup rerun are needed. Other event forms, fees, payment proof limits and verified-payment group access are unchanged. These are portal forms; separate Google Forms are not edited.

The pasted Ameena contact `99668646647` has eleven digits; the existing `9966864664` is retained pending clarification. The portal retains the established 2 MB image proof limit instead of the pasted Google Forms 100 MB limit.

### HITAM rolls and peak-time retries

HITAM participants, including every teammate, must supply a roll number. Other-college teammate roll numbers remain optional. The server enforces this before any upload or write. Busy registration writers return promptly; the browser backs off and retries up to three times using the same payload, UTR and request token. Uncertain saves still require recovery, not a new payment. Retry exhaustion asks the participant to retry the same submission. Live Apps Script execution/daily service quotas remain limits; mocked tests do not establish a production traffic rating.

### Organizer QR check-in

See [SCANNER_SETUP.md](SCANNER_SETUP.md) for the separate staff deployment, explicit account/event permissions, required HTML files and event-day identity checks. Scanner access defaults to closed; ticket scanning does not change payment status.
