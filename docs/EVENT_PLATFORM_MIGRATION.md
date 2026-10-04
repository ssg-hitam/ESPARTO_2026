# Local event platform migration

## Checkpoint and scope
Repository baseline: be66139c2b1a4b408900bca6c67e7702aa2692df. Clean working tree verified before checkpoint 63dc851. This is a repository backup, not confirmation of the hosting provider's active production deployment. Isolated branch: codex/event-platform-migration. No push, deployment, DNS change, live registration submission or Apps Script deployment is authorized in this local phase.

## Architecture audit
Next.js 15 App Router, React 19, Tailwind. npm scripts build/start/dev/typecheck/lint. Production build .next; local dev .next-dev. No hosting configuration or local environment files present in the repository inventory. Hosting provider's active deployment/environment/DNS settings remain unverified. Domain from metadata: https://www.espartohitam.com.

Catalogue: src/data/events.ts. Existing /events cards and modal use getEventRegisterUrl. /register links to shared Apps Script. UI RPCs in apps-script/index.html use google.script.run.getPortalData, submitRegistration and getRegistrationStatus. Code.gs owns fees, member validation, proof decoding, UTR deduplication, request journals, locking, atomic Sheets writes, ticket IDs and email/check-in workflows. Payment status has a minimal existing HTTP GET; HTTP POST currently supports the signed staff scanner only, not registrations. Do not repurpose that endpoint or trust client payment status. IUCEE E02/E04 custom rules/forms remain intact.

Shared public endpoint: see GOOGLE_APPS_SCRIPT_REGISTRATION_URL in src/data/events.ts. IEEE endpoint is separate and its source/contract is unavailable here. Cannot claim IEEE API compatibility. Shared backend still allows GDG solo in this checkout; website says team entry. This pre-existing discrepancy must be resolved with event owner before rollout, not silently changed during migration.

| ID | Backend slug | Event | Integration | Team bounds | Fee HITAM/Other |
|---|---|---|---|---|---|---|
| E01 | ieee-ideathon | INNOVISION (IEEE National Ideathon) | Independent IEEE form | 3–4 | 199/249 (person) |
| E02 | reverse-hackathon | Reverse Hackathon | Shared ESPARTO Apps Script | 2–3 | 550/600 (team) |
| E03 | agentic-ai-workshop-hackathon | Agentic AI Workshop & Hackathon | Shared ESPARTO Apps Script | 1–4 | 150/150 (person) |
| E04 | programmers-got-talent | Programmers Got Talent | Shared ESPARTO Apps Script | 1–1 | 150/150 (person) |
| E05 | smart-manufacturing-challenge | Smart Manufacturing Challenge | Shared ESPARTO Apps Script | 1–4 | 200/300 (team) |
| E06 | ieom-startup-pitch | IEOM Startup Pitch Challenge | Shared ESPARTO Apps Script | 1–4 | 200/300 (team) |
| E07 | dataquest-kaggle | DataQuest Kaggle Challenge | Shared ESPARTO Apps Script | 2–2 | 300/300 (team) |
| E08 | n8n-automation-challenge | n8n Automation Challenge | Shared ESPARTO Apps Script | 2–2 | 300/300 (team) |
| E09 | data-heist-datathon | DATA HEIST Datathon | Shared ESPARTO Apps Script | 2–4 | 200/300 (team) |
| E10 | data-dossier | DATA DOSSIER Case Study | Shared ESPARTO Apps Script | 2–4 | 100/200 (team) |
| E11 | torquex-motorsport | TorqueX Garage to Grid | Shared ESPARTO Apps Script | 1–4 | 50/70 (person) |
| E12 | build-first-robot | Build Your First Robot | Shared ESPARTO Apps Script | 1–4 | 250/250 (team) |
| E13 | code-casino | Code Casino | Shared ESPARTO Apps Script | 2–3 | 50/60 (person) |
| E14 | technical-tambola | Technical Tambola | Shared ESPARTO Apps Script | 1–1 | 50/60 (person) |

## Local test boundary
The pilot is E08 n8n Automation Challenge. A loopback-only Node harness executes the unchanged Code.gs in an isolated VM with mocked Sheets/Drive. No Google network calls, email, real payment or production data. Website preview API is development-only, rejects cross-origin writes and accepts only loopback harness configuration. It is closed in production. Other events retain their existing registration fallback. Backend rules are never recreated in the test server; it delegates to getPortalData/submitRegistration/getRegistrationStatus.

## Run locally
1. node tests/event-platform-local-server.cjs (port 4100, isolated volatile data).
2. Stop the existing local Next server, then EVENT_PLATFORM_LOCAL_BACKEND=http://127.0.0.1:4100 npm run dev -- --port 3000.
3. Open /events/n8n-automation-challenge/register. All receipts are labelled LOCAL TEST. Use synthetic participant and UTR data. Restart harness to erase its in-memory records.

## Rollback
For local rollback: stop preview processes; git switch main; npm run dev. Repository checkpoint is 63dc851. Preserve migration branch rather than resetting/deleting it. No live backend rollback is needed because none is changed. Before any future production promotion record hosting deployment ID and actual commit, securely back up environment configuration, test redeployment of the previous version, and verify all Apps Script deployment versions/access settings.

## Remaining rollout gates
Secure authenticated registration adapter and deployment required for real Google integration; no such production endpoint is enabled by this local pilot. Audit IEEE independently. Preserve IUCEE custom requirements. Test all real integrations in approved test Sheets, proof uploads, ticket emails, uncertain-response recovery, traffic limits and owner-controlled payment verification. Hosting/DNS rollback and real phone tests must precede promotion. Never present a pending submission as verified payment.

## Verification evidence
- Existing registration suite: 41 tests passed; includes all allowed team/fee combinations, lost response recovery, duplicate UTRs, HITAM roll requirements and overlapping lock behavior.
- Local pilot contract: 2 tests passed against the original Code.gs functions.
- Local HTTP tests: cross-origin rejection, invalid roll, five simultaneous synthetic requests, duplicate UTR rejection, same-request recovery.
- Browser checks: all 14 event URLs, mobile overflow and event-specific canonical/OG metadata; n8n two-step form, receipt and duplicate recovery. Repeat-opening/desktop/legacy alias checks are in tests/event-platform-browser.cjs.
- Production build passed; eight pre-existing CircularCarousel lint warnings. Local production-mode API returned 503 and pilot form 404, confirming the simulator is closed. No production deployment was performed.
- Screenshot: /private/tmp/esparto-local-pilot-receipt.png. These are simulated backend tests, not evidence of live Google service performance or real-device coverage.

## Branded local registration preview
The n8n pilot now uses local official HITAM/ESPARTO/SSG images, the full event poster, description, schedule, venue, team format, prize pool and brochure. Participant/review UI includes separate branch/year, mandatory HITAM roll numbers and an explicit roster review. A local-only sample proof generator makes no payment. The submission ticket supports a 1000×1550 PNG download and print/save PDF, labels pending organizer verification and local-test status, and includes the confirmed-email notice. No entry QR/private group link is generated before verification. Browser checks cover sample proof, successful save, replay recovery, PNG signature/dimensions, and print PDF. Production integration and real ticket email remain future rollout gates.

## Ticket layout checkpoint
Checkpoint fc0c19c precedes the centered ticket redesign. Downloaded PNG now has rounded ticket edges/perforations, centered event/reference/details, participant roster, submitted → verification pending → confirmed ticket progress, and support contacts (Hemanth 8328232607, Tejal 9059111595, ssg@hitam.org). Height expands to fit the details. Local output remains a pending-verification submission record, never an entry pass. Changes stay on the local migration branch; no production traffic or Apps Script deployment changes. Actual live Sheets persistence is still unverified and the pilot remains simulated.
