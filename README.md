# Vaishno Sky — Website

Single-page website for Vaishno Sky, Malad (E). Built with Next.js 16, TypeScript and Tailwind CSS v4.
Enquiries are saved to a Google Sheet and emailed to the sales team through Google Apps Script.

The design and structure are described in [architecture.md](architecture.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start
```

## Connect the enquiry form

Until this is done, the form shows visitors a "not connected" message and no lead is saved.

1. **Create the Sheet.** Go to [sheets.new](https://sheets.new) and name it, for example, *Vaishno Sky Leads*.
2. **Add the script.** In the Sheet, open **Extensions → Apps Script**. Delete whatever is there and paste in
   the whole of [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
3. **Set the email.** At the top of the script, change `NOTIFY_EMAILS` to the address (or addresses, comma-separated)
   that should receive each enquiry. Optionally set `SHARED_SECRET` to any long random text.
4. **Deploy.** Click **Deploy → New deployment**, choose type **Web app**, and set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**

   Click **Deploy** and approve the permissions Google asks for (Sheets and sending email).
5. **Copy the web app URL.** It ends in `/exec`.
6. **Give the URL to the website.** Copy `.env.example` to `.env.local` and fill it in:

   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   GOOGLE_SCRIPT_SECRET=            # same text as SHARED_SECRET, if you set one
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

   On Vercel, add the same three values under **Project → Settings → Environment Variables**, then redeploy.
7. **Test.** Restart the site, submit the form once, and check that a row appears in the *Leads* tab and an
   email arrives.

If you change the script later, publish it with **Deploy → Manage deployments → Edit → New version**.
Saving alone does not update the live web app.

Each lead records: time, name, mobile, email, configuration, message, the button the visitor clicked
(`source`), and the page URL including any ad tracking parameters.

## Change the content

All text and data live in [`app/_content/`](app/_content/) — no need to touch the components.

| To change | Edit |
|---|---|
| Phone, email, address, RERA number, menu | `site.ts` |
| Overview and About text | `overview.ts` |
| Highlights | `highlights.ts` |
| Amenities and their photos | `amenities.ts` |
| Layouts, carpet areas, floor plans | `configurations.ts` |
| Travel times | `connectivity.ts` |

### Add floor plan images

Put the images in `public/floor-plans/` and add an `image` to the matching layout in `configurations.ts`:

```ts
{ id: "1bhk-5", type: "1 BHK", name: "1 BHK", series: "5", carpet: 484, formOption: "1 BHK",
  image: "/floor-plans/1bhk-series-5.jpg" },
```

Layouts without an image show a placeholder card with a "Request This Plan" button.

## Folders

```
app/_content/       text and data
app/_components/    layout, sections and shared UI
app/actions/        enquiry form server action
google-apps-script/ script to paste into Google Sheets
design/             brand kit PDF and reference image (not published)
public/             images and fonts
```
