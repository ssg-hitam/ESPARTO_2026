# Private committee reports

1. In the existing production Apps Script editor, add a Script file named `CommitteeReports`.
2. Paste `apps-script/CommitteeReports.gs` into it and save. Leave Code.gs unchanged.
3. As the master spreadsheet owner, run `setupCommitteeReports` in the editor and authorize the required Google permissions.
4. Execution log lists the 13 separate event report links. They are initially private. IEEE is excluded because it uses another backend.
5. Open each report, check that its rows belong only to that event, and share with the appropriate committee leads as **Viewer**, with General access **Restricted**. Do not place them in a broadly shared folder.
6. After leads confirm access, remove their master-file permissions. Check group, domain and shared-folder access too. Keep admins and payment verifiers who genuinely need master access.
7. The owner-installed trigger refreshes reports approximately every five minutes. Run `syncCommitteeReports_` manually for an immediate refresh; check Executions for failures.

Reports contain participant identity/contact information needed for event operations, payment status and check-in status. They do not include UTR, payment proof, amounts, master dashboard, submission tokens or email logs. Reports are reporting copies: edits never flow back to registration sheets. Never grant leads Editor access or connect their reports to the master with IMPORTRANGE.

No website or Web App redeployment is needed. No master sheets are deleted/hidden, and sharing is not automatically removed. To stop sync, remove only the `syncCommitteeReports_` trigger; keep the registration/email triggers intact. Revoking access cannot revoke copies recipients previously downloaded.

## Share the existing reports with the screenshot contacts

Replace the contents of CommitteeReports.gs with the updated repository file and save. Select `shareCommitteeReports` from the editor function menu and click Run as the report owner. Do not run setup again or redeploy the Web App. The function reuses the existing report IDs, keeps General access Restricted, and grants the listed contacts Viewer access only to their event reports. IEEE remains excluded; robot faculty emails were not supplied.

This adds permissions and does not revoke existing individual or group access. Check each report's Share dialog for any previously added people or groups, remove unwanted access, and remove committee access to the master file after confirming their report access. A sharing error can leave earlier grants completed; correct the error and rerun safely.
