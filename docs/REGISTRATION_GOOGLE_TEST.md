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
