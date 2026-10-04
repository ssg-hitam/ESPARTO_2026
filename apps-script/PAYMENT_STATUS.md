# Payment status page

Website route: `/payment-status`. Link appears on registration and in the footer.

## Manual verification

1. Find the registration ID in ALL_REGISTRATIONS and its corresponding row in ALL_PAYMENTS_COLLECTION.
2. Check the actual credit in the official bank/UPI transaction history against the submitted UTR, amount and event. A screenshot alone does not confirm payment.
3. After confirming payment, set ALL_REGISTRATIONS → PaymentStatus to `Verified` and ALL_PAYMENTS_COLLECTION → VerificationStatus to `Verified` (exact spelling). If payment is rejected, use `Rejected`; otherwise keep Pending Verification.
4. The event-specific Checkbox and ALL_REGISTRATIONS CheckInStatus are check-in fields. Do not use them to approve payment.
5. Visitors enter their registration ID on the website. Both records must agree before Verified is displayed. No personal details, screenshot URLs, UTRs, submission tokens or WhatsApp links are returned by this public lookup.

The page says reviews typically complete within 12 hours. This is an organizer turnaround target, not an automated approval or guaranteed deadline. The existing separate ticket-email automation must be configured under elysian@hitam.org for emails to be sent.

## Freshness and deployment

Every button press makes a fresh server-side Sheet lookup through Apps Script. Browser, Next.js fetch and API response caches are disabled. No cache invalidation trigger is needed. An already open page changes when the participant checks again; it does not poll continuously.

Deploy the updated Code.gs to a new version of the EXISTING Apps Script deployment before deploying the website page. Keep the existing deployment URL. An older version does not expose this JSON endpoint; the website then shows a temporary unavailable message, never a false approval. Verify anonymous Apps Script access still works. No frontend Google credentials or spreadsheet access tokens are used.

IEEE registrations remain on their independent portal. This lookup covers records in the current ESPARTO registration spreadsheet.

Tests: `node --test tests/payment-status.test.cjs` and existing registration tests. These are mocked/local tests and do not verify the live deployment or send emails.
