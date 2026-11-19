# Leads → Google Sheet + brochure emails

Both website forms post to one small **Google Apps Script** web app. You don't need a Google Cloud project or a paid service.

| Form | Required | What the script does |
| --- | --- | --- |
| **Brochure** (the "Get the brochure" popup) | full name, email, mobile, course | Adds a row to the sheet, **emails the brochure PDFs** to the visitor and sends you an alert |
| **Contact** (the `/contact` page and the homepage `#contact` section) | full name, mobile (email, course and message optional) | Adds a row to the sheet and sends you an alert |

Nobody can download a brochure directly. The PDFs live in `private/brochures/`, are not public, and only ever go out attached to the email.

## 1. Create the sheet

1. Sign in with the institute's Google account. Brochure emails are sent **from this account**.
2. Create a Google Sheet named **NovaNxt Leads**.
3. Rename the first tab to `Leads` and put these headers in row 1:
   `Timestamp | Type | Name | Phone | Email | Course | Message | Page | UTM | Emailed`

## 2. Add the script

In the sheet, open Extensions → Apps Script and replace the code with:

```js
const SECRET = "PASTE-A-LONG-RANDOM-STRING-HERE"; // same value as LEADS_WEBHOOK_SECRET

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return json({ ok: false, error: "forbidden" });

  // 1. Email the brochure to the visitor (brochure requests only).
  let emailed = "";
  if (d.mail && d.mail.to) {
    try {
      MailApp.sendEmail({
        to: d.mail.to,
        subject: d.mail.subject,
        htmlBody: d.mail.html,
        name: "NovaNxt Lab",
        replyTo: d.replyTo,
        attachments: (d.mail.attachments || []).map(function (a) {
          return Utilities.newBlob(Utilities.base64Decode(a.data), "application/pdf", a.name);
        }),
      });
      emailed = "yes";
    } catch (err) {
      emailed = "FAILED: " + err; // the lead is still saved; send the brochure manually
    }
  }

  // 2. Save the lead.
  SpreadsheetApp.getActive().getSheetByName("Leads").appendRow([
    new Date(d.timestamp), d.type, d.name, "'" + (d.phone || ""), d.email, d.course, d.message, d.page, d.utm, emailed,
  ]);

  // 3. Alert the team.
  if (d.notifyTo) {
    try {
      MailApp.sendEmail(d.notifyTo, "New lead: " + d.type + " — " + d.name,
        [d.type, "Name: " + d.name, "Phone: " + d.phone, "Email: " + (d.email || "-"),
         "Course: " + (d.course || "-"), "Message: " + (d.message || "-"), "Page: " + d.page].join("\n"));
    } catch (err) {}
  }

  return json({ ok: true, emailed: emailed === "yes" });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
```

The `'` before the phone number stops Sheets from treating it as a number.

## 3. Deploy

1. Click Deploy → New deployment → type **Web app**.
2. Set Execute as to **Me** and Who has access to **Anyone**, then click Deploy.
3. Allow the permissions it asks for (Sheets + send email as you).
4. Copy the web-app URL. It ends in `/exec`.

After changing the script later, use Deploy → **Manage deployments → Edit → New version**. That keeps the same URL.

## 4. Environment variables (in the Vercel project, and in `.env.local` for local testing)

| Variable | Value |
| --- | --- |
| `LEADS_WEBHOOK_URL` | the `/exec` URL from step 3 |
| `LEADS_WEBHOOK_SECRET` | the same random string as `SECRET` in the script |
| `LEADS_NOTIFY_EMAIL` | *(optional)* where new-lead alerts go. The default is `info@novanxtlab.com` |

To generate a random string, run:
`node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`

- **Local dev without `LEADS_WEBHOOK_URL`:** the forms show success, but leads are only printed in the terminal.
- **Production without it:** the forms show an error asking visitors to WhatsApp you instead.

## Limits to know

- **Daily email cap:** a free Gmail account can send about **100 emails a day** through Apps Script; Google Workspace allows about 1,500. Each brochure request uses 2 emails (one to the visitor, one alert). If you hit the cap, the row is still saved with `FAILED` in the **Emailed** column. To save quota, remove step 3 or leave `LEADS_NOTIFY_EMAIL` empty and turn on Sheets notifications instead (Tools → Notification settings).
- **Attachment size:** attachments must total under 25 MB per email. The largest set is the all-courses catalogue at about 2.4 MB.

## 5. Brochure files

Put the PDFs in `private/brochures/`. See the README there for file names and `src/lib/brochures.ts` for which course sends which files. If a file is missing, the email says the team will send it, and the sheet row is marked `missing PDF: …` so you can follow up.
