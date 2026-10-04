# Private event groups after verified payment

Group invitation URLs must never be placed in `Code.gs`, `index.html`, website data, the public catalog response, or GitHub. The backend reads them from private Apps Script properties only after payment verification.

## Configure once in Apps Script

Open Project Settings → Script properties → Add script property. Copy the event key/value pairs from the private configuration file supplied in the chat. This file is intentionally outside the repository.

| Property key | Event |
| --- | --- |
| WHATSAPP_GROUP_E02 | Reverse Hackathon — October 9 |
| WHATSAPP_GROUP_E03 | Agentic AI Workshop & Hackathon |
| WHATSAPP_GROUP_E04 | Programmers Got Talent — October 10 |
| WHATSAPP_GROUP_E05 | Smart Manufacturing: Industry Insights & Innovation Challenge |
| WHATSAPP_GROUP_E06 | IEOM Startup Pitch Challenge |
| WHATSAPP_GROUP_E07 | DataQuest — Kaggle Data Science Challenge |
| WHATSAPP_GROUP_E08 | n8n Automation Challenge |
| WHATSAPP_GROUP_E09 | DATA HEIST Datathon |
| WHATSAPP_GROUP_E10 | DATA DOSSIER Case Study |
| WHATSAPP_GROUP_E11 | TorqueX — From Garage to Grid & New Kart Reveal |
| WHATSAPP_GROUP_E13 | Code Casino |
| WHATSAPP_GROUP_E14 | Technical Tambola |

Paste updated `Code.gs` and `index.html`, save, then update the existing deployment with a new version. Do not rerun database setup or replace existing participant rows.

## Verify payment before unlocking access

Uploading a screenshot or submitting a UTR is not payment confirmation. The authorized organizer must check the actual received payment against the reference and expected amount, then set **both** records for the same RegID to the exact value `Verified`:

- `ALL_PAYMENTS_COLLECTION` → `VerificationStatus` (column L).
- `ALL_REGISTRATIONS` → `PaymentStatus` (column R).

Leave the first JSON line of finance `Notes` intact; it stores the private submission token used for recovery and group access. Human notes can be added after a newline.

Participant tickets have no payment verification or WhatsApp-access button. The confirmed email includes the event group only after organizers mark both payment records Verified. **Check my saved registration** restores the submission ticket; no invitations are stored in the browser. The website payment-status page is read-only and never changes payment records.

The backend checks both payment statuses, matches the finance/master records and amount, and returns only that registration's event group. Pending, rejected, mismatched, missing, or failed checks do not return an invitation URL. Events without configured groups wait for organizer configuration before ticket email delivery. IEEE's separate registration system is unchanged.

Group links can be copied or forwarded by verified participants once disclosed; WhatsApp itself governs membership thereafter. This gate prevents pre-verification disclosure by the ESPARTO application.

## Contacts

TorqueX student: G. Sri Harshika — 9052693939 — 24e51a0311@hitam.org.

TorqueX faculty: Ruchir Shrivastava — 903958390 — programhead.mech@hitam.org. The supplied phone has nine digits and is preserved verbatim; confirm it with the coordinator before publishing a corrected value.
