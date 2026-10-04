# Live camera scanner on the official website

The new /scanner route is a top-level HTTPS page, outside Apps Script's iframe. It uses a large inline live-camera view. QR detection automatically requests ticket details and stops the camera; staff compares every participant with college IDs before confirming whole-registration attendance. Camera frames remain on the device. Use Chrome on Android or Safari/Chrome on supported iPhones; a phone's localhost/LAN HTTP URL is not an HTTPS camera test.

## 1. Google sign-in

Using the HITAM Google Cloud project, configure Google Auth Platform / OAuth consent for an Internal application if the Workspace organization permits it. Create an OAuth client of type Web application. Add these Authorized JavaScript origins, exactly:

- https://www.espartohitam.com
- https://espartohitam.com (only if that host is served)
- http://localhost and http://localhost:3000 (local testing only; add the actual port you use)

The page uses Google's popup credential callback, not an OAuth redirect handler; no redirect URI is required for this flow. Copy the client ID ending in .apps.googleusercontent.com. Client IDs are public identifiers, not secrets. If you cannot create an Internal application, ask HITAM's Workspace/Cloud administrator to configure it. Do not grant Google access to Sheets or Drive from this sign-in client; only identity is needed.

## 2. Generate two different private secrets

Generate each with a trusted password manager, or run `openssl rand -hex 32` twice locally. Never paste either secret into chat, Git, screenshots, or client-side NEXT_PUBLIC variables.

## 3. Vercel environment variables

Under the project's Settings → Environment Variables, configure Production:

- SCANNER_GOOGLE_CLIENT_ID: the Google Web client ID.
- SCANNER_SESSION_SECRET: first generated secret (signs one-hour HttpOnly staff sessions).
- SCANNER_BRIDGE_SECRET: second generated secret (authenticates website server requests to Apps Script).

Redeploy the website after saving them. Assign Preview values only if you explicitly configure preview origins and intend to test there. Neither secret is sent to browsers. Missing configuration leaves scanner access closed.

## 4. Apps Script

Save the latest Code.gs. Keep the existing ESPARTO_DESK_ROLES property with the approved SSG accounts.
Add Script property ESPARTO_SCANNER_BRIDGE_SECRET with the exact SAME value as Vercel SCANNER_BRIDGE_SECRET.
Update the EXISTING PUBLIC REGISTRATION deployment (the original URL starting AKfycbyWW19...), Execute as Me and its existing participant access. The website server calls its new signed doPost endpoint. Do not use the organization-only staff URL here; a server cannot complete the interactive Workspace sign-in flow. The signed endpoint rejects requests without the shared key and rechecks current organizer roles on every request. A browser-provided email alone never authorizes a request.
Keep the separate organization-only Apps Script scanner for fallback; its access remains unchanged. No spreadsheet/Drive sharing expansion is needed.

## 5. Controlled live acceptance test

Open https://www.espartohitam.com/scanner directly in the phone browser. Sign in with an approved actual HITAM Google account. Select the demo event. Tap Start camera and allow camera permission. Aim at a verified demo QR; details should appear automatically. Verify a pending-payment ticket and wrong-event QR are denied. Compare college IDs, confirm the demo's attendance, then rescan to verify duplicate entry is blocked. Test an unauthorized HITAM account is denied. Both QR lookup and attendance require current event permission, and attendance never changes payment status.

If Google reports origin_mismatch, check the exact scheme/hostname/port in Authorized JavaScript origins. If sign-in is denied, check that the email is an actual Google Workspace account, the allowlist, matching bridge secrets and the updated PUBLIC deployment. Camera permission denial is handled on-page; allow camera in the browser site settings. Sign out after the desk shift. Sessions expire after one hour; details clear after inactivity/page hiding. This feature does not replace live device testing or capacity testing.

## Verification

Local backend tests exercise invalid signatures, replay rejection, stale requests, wrong roles, identity gating and duplicate attendance. Session tests cover tampering, expiry, cross-origin denial and body limits. Browser tests use synthetic live video at 390px and 1440px to exercise automatic QR detection and identity-confirmation gating. Google OAuth sign-in and real phone cameras still require the live test above.

Google setup: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
Token verification: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
