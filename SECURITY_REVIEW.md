# Security review — 4 October 2026

This is a focused code/dependency review, not a penetration test or guarantee against breaches.

## Changes

- New Apps Script payment proofs request PRIVATE Drive sharing rather than anyone-with-link access. Submission copy reflects organizer-only access. Dedicated proof-folder permissions must be restricted because inherited access is controlled by Drive.
- Website responses add nosniff, DENY framing, strict-origin referrers, disabled camera/microphone/geolocation permissions and HTTPS transport policy. Framework identification header is disabled.
- Next.js patched to 15.5.27; PostCSS updated/overridden to 8.5.28. Production npm audit reports zero known vulnerabilities at review time.

## Checked safeguards

Participant status functions do not write verification state. Successful registration starts Pending Verification in both records. WhatsApp invitations are excluded from public catalog/submission responses and email delivery requires both organizer records Verified with matching event, UTR, registration reference and amount. Admin setup/recovery require the active owner account. Participant HTML/email values are escaped and Sheets values use RAW writes. Uploads are size-limited and format-signature checked. Public status API returns an allowlisted status only and disables caching.

43 backend/API tests and typecheck/build pass. Existing carousel lint warnings remain unrelated to this change.

## Activation and remaining work

1. Save updated apps-script/Code.gs AND index.html and deploy a new version on the existing deployment. V9 alone does not include restricted proof sharing.
2. In Drive, set the payment-proof folder and previously uploaded payment screenshots to Restricted. Grant access only to named authorized payment-verification staff. Test a new screenshot link using that organizer account.
3. Keep the spreadsheet restricted to authorized organizers; verification edit access is an administrative privilege. This review did not inspect live account permissions or historical file permissions.
4. Full npm audit still flags seven development-tool dependency entries caused by the braces advisory in Tailwind/ESLint transitive dependencies. No compatible automated upgrade was applied to those roots; a major toolchain migration requires separate testing. Production-only audit is clear; the full audit is not.
5. A production simultaneous-submission/load test remains outstanding. Apps Script quotas and unauthenticated endpoint abuse can affect availability; this review does not provide a traffic-capacity guarantee or shared distributed rate limiting.

## Additional traffic safeguards

HITAM lead and teammate roll numbers are mandatory in browser and server validation. The writer lock now waits at most one second; an explicitly BUSY response triggers up to three browser retries with increasing delay and jitter, reusing the same request/payload. Other failures are never blindly retried automatically. The status API bounds request-body bytes before JSON parsing and rejects malformed input before calling Apps Script.

A local 100-submission burst plus identical replays produces exactly 100 atomic batches, 100 proofs and unique references. An interleaved overlap test confirms a second writer gets BUSY until the lock is released. Browser testing covers contention recovery without duplicate writes. These are mocked integration tests, not a measurement of live Google/Vercel capacity. Install the latest Code.gs/index.html and redeploy before these safeguards are active.
