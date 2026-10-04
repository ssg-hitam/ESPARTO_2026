# Production registration rollout

## Current rollback target
Vercel team/project: esparto/esparto-2026. Dashboard inspection confirmed the live deployment is 2oUZgVFaGdWyd19QwmWJReFtR5hH from commit be66139c2b1a4b408900bca6c67e7702aa2692df (main). Preserve this deployment. Apex redirects to www; both domains have valid configuration. No DNS change is necessary.

## Production Apps Script (not the WEBSITE TEST ONLY project)
Use the existing registration project serving deployment AKfycbyWW19qSK95FeVO35V-aX5Lr2ySIE-ZMLLqem_y6bIFRXLcVEzVtU4qooHetePr09dbHQ.
Back up its current Code.gs first. Replace Code.gs with apps-script/Code.gs from this repository. Check the existing production Sheet ID is 1VXiNoRjIBImgb62MJQIS2WcU6SkIsJQdvejJiWSNbos before saving. Keep proof-folder properties, email triggers and deployment access unchanged. Do not run setupDatabase or install duplicate email triggers.

Set Script properties:

| Property | Value |
|---|---|
| ESPARTO_REGISTRATION_BRIDGE_SECRET | Private value from scratch/production-registration-secret.txt |
| ESPARTO_REGISTRATION_BRIDGE_ENABLED | true |
| ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED | true |
| ESPARTO_REGISTRATION_BRIDGE_EVENT_IDS | E02,E03,E04,E05,E06,E07,E08,E09,E10,E11,E12,E13,E14 |

Update the existing production deployment to a new version; do not create a replacement URL. Suggested description: Production website registration adapter. Existing Apps Script UI, validation, Sheets writes, private proofs and verification/email functions are preserved. Catalogue response adds public payment instructions. IEEE remains separate.

## Vercel server environment (Production)

| Variable | Value |
|---|---|
| EVENT_PLATFORM_PRODUCTION_ENABLED | true |
| EVENT_PLATFORM_APPS_SCRIPT_URL | https://script.google.com/macros/s/AKfycbyWW19qSK95FeVO35V-aX5Lr2ySIE-ZMLLqem_y6bIFRXLcVEzVtU4qooHetePr09dbHQ/exec |
| EVENT_PLATFORM_REGISTRATION_SECRET | Same private production value |
| EVENT_PLATFORM_PRODUCTION_EVENT_IDS | E02,E03,E04,E05,E06,E07,E08,E09,E10,E11,E12,E13,E14 |

Do not use NEXT_PUBLIC secrets, the test deployment, test secret, or test Sheet. Production mode rejects the test endpoint. Create an independent deployment, verify the catalogue/payment readiness and mobile form, then promote it to the existing domains. No DNS edits are needed. Record the new deployment ID.

## Verification and rollback
Confirm a controlled registration produces one matching master/payment/event row and the correct member roster in the production Sheet; verify pending payment status, duplicate recovery, proof restrictions, downloaded ticket and existing organizer verification/email flow. Never mark a sample payment as real payment. Larger traffic and physical-device capacity remain unproven by the five-request HTTP test.

To roll back: in the project's Deployments page select the preserved deployment 2oUZgVFaGdWyd19QwmWJReFtR5hH and restore/promote it to Production. Restore the recorded prior Apps Script version only if its new adapter causes a problem; do not delete any new registration records or proof files. Disable ESPARTO_REGISTRATION_BRIDGE_SUBMIT_ENABLED to stop adapter writes independently. The old Apps Script UI remains the fallback when website production configuration is disabled. Rollback instructions have been documented, not rehearsed on production.

## Preparation completed
Vercel CLI login and project linking succeeded. Four production environment variables were added (production endpoint, sensitive signing key, shared event IDs, explicit enable flag). These changes do not alter the currently running deployment. Production build passed, preserving eight existing carousel lint warnings. Registration unit/contract tests passed; production configuration test confirms isolated endpoints are rejected. The existing production Apps Script has not yet been updated with the adapter/key; current live persistence through the new form is therefore not verified. Do not promote the staged deployment until that connection passes.

Staged deployment: dpl_9DHMsqAbZigyvA4K8Pihu6Y3nWnW, https://esparto-2026-631mqvm1k-esparto.vercel.app, Ready. It was created with --prod --skip-domain, so the public domain was not promoted. Direct unauthenticated inspection hits Vercel deployment protection (API 401), not a successful application smoke test. The direct read-only production Apps Script POST returned a non-JSON response, confirming the signed production adapter is not yet usable. Live Sheet persistence is NOT confirmed. Website adapter enforces GDG teams of at least two without modifying the legacy registration function.
