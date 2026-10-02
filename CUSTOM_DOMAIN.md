# ESPARTO custom domain

Target website: https://esparto.hitam.org

The college administrator managing `hitam.org` DNS should add the exact records supplied by Vercel:

| Type | Name / Host | Value / Target |
| --- | --- | --- |
| CNAME | esparto | d898af6e4c04a4dc.vercel-dns-017.com |
| TXT | _vercel | vc-domain-verify=esparto.hitam.org,eb75ee8a66c649c5c7b8 |

Do not add `https://` to the CNAME target. Do not add other records unless Vercel specifically requests them. If a conflicting record already exists at `esparto`, the administrator should resolve it before adding the CNAME. Keep unrelated DNS records intact.

After DNS propagation, refresh the domain verification in the existing project's Vercel Domains settings. Confirm verification succeeds, HTTPS is issued, and the custom domain serves the intended ESPARTO project. The domain currently requires verification because Vercel reports that it is linked to another account.

No application environment variables, backend settings, redirects, or registration destination changes are needed for this domain. Internal Next.js links use relative routes and work on either hostname. The existing Apps Script registration URL remains unchanged.

Smoke check after verification: open the homepage, navigate to `/events`, click the main Register Now button to reach `/register`, follow its registration link in the same tab, and use browser Back to return. Check both desktop and mobile.

DNS and Vercel account settings have not been changed by this repository update.
