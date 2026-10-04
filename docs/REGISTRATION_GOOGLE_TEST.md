# Local n8n → Google Sheets test setup

This adapter is implemented and tested with simulated Google services. No real Google deployment is configured or verified yet. Production mode rejects the new API and registration pilot. Existing public registration URLs remain the fallback. Repository checkpoint before this change: `5d4fe3b`.

## Separate test backend

1. Create a **new, empty Google Sheet** named `ESPARTO WEBSITE TEST ONLY`. Open Extensions → Apps Script from that Sheet. Do not use the live registration project.
2. Copy `apps-script/Code.gs`, `apps-script/index.html` and `apps-script/scanner.html` into the test project, using the same filenames.
3. **In the test project's Code.gs only**, replace the hardcoded `SPREADSHEET_ID` with the new test Sheet ID. Set `DRIVE_FOLDER_NAME` to `ESPARTO_WEBSITE_TEST_PROOFS`. The hardcoded ID takes precedence over properties: skipping this step would target the live Sheet. Do not change the repository's production ID.
4. Add Google Sheets API v4 under Services. Create a new private Drive folder for test proofs. Add `ESPARTO_PROOF_FOLDER_ID` with that folder ID in Project Settings → Script properties. Run `setupDatabase` as the project owner and authorize it. Verify the returned spreadsheet URL is the new test Sheet.
5. Do **not** install payment-verification or ticket-email triggers in this test project. Use synthetic participants, sample proof and a synthetic UTR; make no payment. Keep payment status pending.
6. Generate a private random secret locally, for example with `openssl rand -hex 32`. Store it securely; do not paste it into chat, source control or browser-side configuration.
7. Add these script properties in the **test project**:

| Property | Value |
| --- | --- |
| `ESPARTO_REGISTRATION_BRIDGE_SECRET` | The generated secret |
| `ESPARTO_REGISTRATION_BRIDGE_ENABLED` | `true` |
| `ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED` | `false` initially |

8. Deploy this test project as a Web app, Execute as Me, access Anyone. Use its exact `/exec` URL. If Workspace policy prevents anonymous server access, stop and resolve that policy; a domain-only login deployment cannot be used by this server adapter. Do not replace/delete the existing production deployment.

## Local website settings

Add the following to the ignored `.env.local`, replacing placeholders. None use a `NEXT_PUBLIC_` prefix:

```dotenv
EVENT_PLATFORM_GOOGLE_TEST_ENABLED=true
EVENT_PLATFORM_APPS_SCRIPT_URL=YOUR_TEST_DEPLOYMENT_EXEC_URL
EVENT_PLATFORM_REGISTRATION_SECRET=THE_SAME_GENERATED_SECRET
```

Restart the local Next dev server. Open `http://localhost:3000/events/n8n-automation-challenge/register`. It must say **GOOGLE SHEETS TEST**. With submit disabled, event data should load but submission should be rejected without creating records. Misconfiguration fails closed; it never silently switches to simulated storage.

After confirming the test Sheet/proof folder are correct, set `ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED=true` in the test project's Script properties. No new deployment is needed for a property change.

Submit one synthetic team using the sample proof. Verify the matching reference appears once in `ALL_REGISTRATIONS`, `ALL_PAYMENTS_COLLECTION`, `ALL_MEMBERS_ROSTER` and the E08 event tab. Verify amount ₹300, two roster rows, pending payment status, and proof in the private test folder. Download the branded submission ticket; this is not an entry pass. Use Recover submission to confirm the same reference returns with no duplicate rows. Test invalid rolls, duplicate UTR and simultaneous synthetic submissions separately. Automated mock tests are not evidence of real Google concurrency capacity.

## Adapter boundaries and rollback

The website server signs requests using a separate HMAC secret; the browser never receives it. The additive private Apps Script adapter permits only E08 catalogue, submission and token-protected status recovery. Existing registration validation, fees, proof handling, atomic Sheet writes and deduplication remain authoritative. It cannot verify payment or change attendance. Scanner signatures remain separate. Response-loss recovery reuses the original submission; no automatic upstream submission retry is performed.

To stop test writes immediately, set `ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED=false`. Set bridge enabled false to stop all adapter traffic. Remove the three local environment variables and restart Next to return to simulated local mode. Production rollback is unnecessary at this stage because no production traffic or deployment is changed.

Before production enablement, complete real test Sheet verification, abuse/rate-limit planning, Google quota and concurrent-device testing, IEEE integration audit, every event's special requirements (including IUCEE), actual deployment backup/rollback rehearsal, and real-device testing. This development-only pilot does not yet enable the complete production migration.

## Real Google test evidence — 4 October 2026

Using the separate test project and test Sheet above, localhost loaded the signed E08 catalogue. The disabled-write check returned `SUBMISSIONS_DISABLED`. After the operator enabled test submissions, a synthetic two-person team saved with reference `ESP26-HITM-E08-001`, amount ₹300, and pending verification in both payment records. An exported real workbook confirmed one master row, one payment row, two roster rows (CSD · Year 4), and one n8n event row. The existing-submission recovery UI returned the same reference with its no-duplicate message. A Drive proof link was present in the saved records; Drive permissions were not independently inspected in this run. No actual payment or verification/email trigger was performed.

The in-app browser download event did not complete within its timeout during this real test; the PNG download already passed automated local browser tests, but real in-app-browser download remains unconfirmed. This is evidence for the n8n test backend only, not production readiness or all-event/concurrency verification. Production endpoints and traffic remain unchanged.

## Expand the shared-backend test to 13 events

IEEE/E01 remains on its separate official link, as requested. The local simulator supports E02–E14. The frontend reads backend team bounds, allowed sizes, fee fields and IUCEE form/rule/category text. GDG frontend requires 2–4 participants per the user's earlier decision; legacy backend still allows solo, so align that contract before production. The additional signed adapter exposes these non-sensitive form fields only for explicitly enabled events. Defaults remain E08 alone; production mode remains disabled.

To run real Google tests for the other shared events:
1. Replace Code.gs in the **test project only** with `scratch/google-registration-test/Code.gs`. This prepared copy retains the test Sheet ID and test proof folder name. Existing business functions and IEEE routing are preserved. No index.html update is needed for the adapter change.
2. Add test Script property `ESPARTO_REGISTRATION_BRIDGE_EVENT_IDS` with `E02,E03,E04,E05,E06,E07,E08,E09,E10,E11,E12,E13,E14`. Keep the existing bridge secret and flags.
3. Update that test Web app deployment to a new version, description `Shared event website test v2`. Keep its URL and access settings. Do not touch the production deployment.
4. Only after the updated catalogue is verified, set local `EVENT_PLATFORM_GOOGLE_TEST_EVENT_IDS` to the same list and restart Next. Before this setting, only n8n uses Google; other forms use the simulator.
5. Test each event with synthetic data and verify the same four record sets, proof privacy, failed validation and recovery. Real concurrent submission, ticket email and real-device coverage are still rollout gates.

Expanded-preview validation: all 12 additional shared-event forms (E02–E07 and E09–E14) passed mobile browser submission to the isolated simulator, including exact IUCEE consents/category and individual/four-member selection. Together with the real n8n pilot, all 13 shared-event frontend paths have been exercised, but only n8n has real Google persistence evidence. 56 contract tests and the production build passed; eight existing CircularCarousel lint warnings remain. IEEE was excluded throughout.

## Test deployment v2 follow-up

The operator updated the isolated deployment to version 2. Its signed catalogue returned all 13 permitted event IDs. A transport encoding mismatch rejected Unicode payloads; the website now escapes non-ASCII characters in signed JSON so Node and Apps Script sign identical bytes while parsed participant text remains unchanged. A read-only Unicode probe passed, and 57 contract tests passed with type checking and targeted lint clean.

Real test requests returned pending-verification receipts for E02–E05, in addition to the earlier verified workbook evidence for E08. Complete workbook inspection for these newer receipts remains pending. A burst of five distinct synthetic E08 submissions returned one successful receipt and four retryable BUSY responses in approximately 3–6.5 seconds. This is a production rollout blocker for the requested simultaneous-device experience; no claim of error-free concurrency is supported. Test requests are persisted before sending and must be reused when recovering or retrying. No production deployment, DNS, payment verification, or email trigger was changed.

The sequential run subsequently completed all 12 remaining shared events (E02–E07 and E09–E14): each returned a successful pending-verification receipt and replay recovered the identical reference without a new registration. Together with E08, all 13 permitted events have real test-backend submission/recovery responses. The newer rows still require independent workbook inspection; simultaneous-device behavior remains blocked by the observed BUSY responses. The signature fix is frontend-server only and does not require another test Apps Script deployment.

## Authorized production promotion — pending prerequisites

The owner authorized production promotion after the local tests. Production has not been switched. Vercel CLI inspection returned no saved credentials, so the actual active deployment ID, environment and rollback target could not be inspected. Hosting access is required before promotion. The test deployment and test Sheet must never be used for live visitor registrations.

The registration client now makes up to eight bounded, jittered retries only after explicit retryable BUSY responses. Every attempt uses the same frozen request ID, participant data, UTR and proof; connection uncertainty and validation failures are never automatically retried. Three new tests cover successful recovery, no retry on uncertainty and retry exhaustion. Type checking and targeted lint pass.

Before cutover, configure the additive signed adapter in the existing production Apps Script project with a new production-only secret, approved E02–E14 IDs and the enable flags. Preserve its production Sheet ID, proof folder, triggers, access settings and public URL. The website must receive that production endpoint and secret only in server-side hosting variables. Current production-mode registration remains closed until production configuration/UI/payment presentation is explicitly implemented and verified. Keep the previous hosting deployment available for rollback. IEEE stays external.
