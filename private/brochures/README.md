# Course brochures

Files here are **not** public and can't be downloaded from the site. When a visitor fills the brochure form
(full name, email and mobile), the matching PDFs are **emailed** to them and the lead is saved to the Google Sheet
(see `docs/leads-google-sheet.md`).

Which files each website course hands out is set in `src/lib/brochures.ts`.

## What's here

- `<id>.pdf`: the served files.
  - The 14 one-page course brochures were exported from the Word files in `source/`.
  - The 5 detailed syllabi are copied from `source/detailed-courses/`.
- `all-courses.pdf`: all 14 brochures merged into one file, for the "All courses" choice.
- `source/`: the originals. Edit these, never the exported PDFs.

## Updating a brochure

1. Edit the Word file in `source/`.
2. In Word, use File → Save As → PDF.
3. Save it here under the same `<id>.pdf` name. The names are in `src/lib/brochures.ts`.
4. If it is one of the 14 short brochures, rebuild `all-courses.pdf` too.

If a file listed in `src/lib/brochures.ts` is missing, the lead is still saved (marked `missing PDF` in the
sheet) and the email tells the visitor the team will send it.

Do **not** put brochures in `public/`: anything there can be downloaded by anyone, skipping the form.
