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

## Organizer QR check-in portal

The desk requires an exact HITAM active-user account with explicit event assignments in ESPARTO_DESK_ROLES; missing identities or roles fail closed. Each lookup and confirmation rechecks authorization. Ticket lookup returns only verified registration/team names, college and rolls; it excludes email, phone, payment proof, UTR and WhatsApp links. Staff must compare college IDs before confirming whole-registration attendance. A script lock and one atomic Sheets batch prevent duplicate attendance changes; payment status is never changed by the scanner. QR decoding runs on the device using the vendored Apache-licensed jsQR library.

All 49 local backend tests pass. Mocked desktop/mobile browser checks cover QR-image decoding, identity-confirmation gating, attendance, duplicate rejection and closed access. Live Workspace identity availability, deployment permissions and phone camera operation still require controlled testing. See apps-script/SCANNER_SETUP.md before activation.

## Standalone website live scanner

The /scanner route allows same-origin camera access while other website routes retain camera denial. It is framed-denied and not indexed. Google identity tokens are verified with Google's supported server library (audience, signature, expiry, Workspace hosted domain and verified HITAM email), followed by current Apps Script role authorization. One-hour staff cookies are signed, HttpOnly, SameSite Strict, and Secure in production. Mutating endpoints require same-origin requests and bounded bodies. Server-to-Apps-Script payloads require HMAC, a one-minute timestamp window and a nonce replay check; every operation rechecks event roles. Responses expose only the existing minimal ticket view. Missing secrets/client ID deny access. Secrets must stay out of Git/client environment variables. Live OAuth, real phone camera and traffic tests remain required.
