// Which PDFs a visitor gets for each brochure request. Files live in private/brochures/<id>.pdf
// (originals: private/brochures/source). Two kinds: a 1-page course brochure, and a detailed syllabus where one exists.
// The brochure form's choices are "general" + every course slug; one request unlocks all files listed for it.

export type BrochureFile = { id: string; label: string; kind: "Brochure" | "Detailed syllabus" | "Catalogue"; pages: number };

const f = (id: string, label: string, kind: BrochureFile["kind"], pages = 1): BrochureFile => ({ id, label, kind, pages });

export const brochureFiles: Record<string, BrochureFile[]> = {
  general: [f("all-courses", "All 14 courses — brochure catalogue", "Catalogue", 14)],
  "ai-ml-generative-ai": [
    f("ai-generative-ai", "AI + Generative AI", "Brochure"),
    f("ai-ml-robotics", "AI / ML + Robotics", "Brochure"),
    f("generative-ai-syllabus", "Generative AI", "Detailed syllabus", 9),
  ],
  "python-with-ai": [
    f("python-programming", "Python Programming", "Brochure"),
    f("python-syllabus", "Python Programming", "Detailed syllabus", 9),
  ],
  "full-stack-web-development": [
    f("full-stack-web-development", "Full Stack Web Development", "Brochure"),
    f("full-stack-js-ts-syllabus", "Full Stack — JavaScript / TypeScript track", "Detailed syllabus", 11),
    f("full-stack-python-syllabus", "Full Stack — Python track", "Detailed syllabus", 11),
  ],
  "core-java": [f("core-java-ai", "Core Java (AI Integrated)", "Brochure")],
  "advanced-excel-with-ai": [
    f("advanced-excel-ai", "Advanced Excel + AI", "Brochure"),
    f("advanced-excel-ai-syllabus", "Advanced Excel + AI", "Detailed syllabus", 6),
  ],
  "tally-gst-payroll": [f("tally-gst-payroll", "Tally + GST + Payroll", "Brochure")],
  "office-automation-with-ai": [f("basic-computer-course", "Basic Computer Course", "Brochure")],
  "graphic-design-video-editing": [
    f("video-graphics-basics", "Video and Graphics — Basics", "Brochure"),
    f("video-graphics-advance", "Video and Graphics — Advance", "Brochure"),
  ],
  "kids-coding-and-ai": [f("kids-course", "Kids Course", "Brochure")],
};

/** Every servable file id (also the 3 brochures for courses not yet on the site: MS-CIT, Digital Marketing Basic/Advance). */
export const allBrochureIds = new Set([
  ...Object.values(brochureFiles).flat().map((b) => b.id),
  "ms-cit",
  "digital-marketing-basic",
  "digital-marketing-advance",
]);
