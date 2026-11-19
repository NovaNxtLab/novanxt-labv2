// Single source of truth for NovaNxt Lab brand + business data.
// Discovered from https://www.novanxtlab.com/ on 2026-11-13.
// Items marked `null` / TODO were not published on the old site and must be supplied by the institute.

export const brand = {
  name: "NovaNxt Lab",
  tagline: "Learn. Build. Get Hired.",
  subTagline: "Your skills. Your future. Starts here.",
  positioning: "Job-oriented computer courses in Kandivali West, Mumbai — with AI built into every program.",
  vision:
    "To become a leading job-oriented computer training institute that empowers students with practical skills and digital expertise to become future-ready professionals.",
  logos: {
    wordmark: "/brand/header_transparent.png", // horizontal lockup with tagline
    wordmarkLinear: "/brand/brand-linear-logo.png", // "NovaNxt LAB" text only, 407x68, transparent
    mark: "/brand/logo_transparent.png", // "N" monogram
    favicon: "/brand/favicon.png",
  },
  legacyColors: {
    navy: "#0A1F44",
    orange: "#FF7A00",
    orangeHover: "#E56B00",
    sky: "#1DA1F2",
    surface: "#F5F7FA",
    whatsapp: "#25D366",
  },
  legacyFont: "Poppins",
} as const;

export const contact = {
  phone: "+91 72082 37876",
  phoneHref: "tel:+917208237876",
  email: "info@novanxtlab.com",
  emailHref: "mailto:info@novanxtlab.com",
  address: "F/29, Profit Center, Mahavir Nagar, Kandivali (West), Mumbai",
  mapsHref: "https://maps.google.com/?q=F/29,Profit+Center,Mahavir+Nagar,Kandivali+West,Mumbai",
  whatsappHref: (text = "Hi NovaNxt Lab, I want to know more about your courses.") =>
    `https://wa.me/917208237876?text=${encodeURIComponent(text)}`,
  socials: {
    instagram: "https://www.instagram.com/novanxtlab/",
    youtube: "https://www.youtube.com/channel/UC8WeDm4qLr8Xuqe7Rv4SRjA",
    facebook: "https://www.facebook.com/p/Novanxtlab-61574248554722/",
    linkedin: "https://in.linkedin.com/in/novanxtlab",
  },
  hours: null as string | null, // TODO: not published on old site
} as const;

export type CourseCategory = "AI & Data" | "Programming" | "Office & Accounts" | "Creative" | "Kids";

export type Course = {
  slug: string;
  // Earlier URLs (old site + the pre-2026-11-17 "-in-kandivali" slugs). Each 301s to /courses/<slug> — see next.config.ts.
  legacyPaths: string[];
  title: string;
  category: CourseCategory;
  tagline: string;
  summary: string;
  duration: string | null; // only AI+ML (12 weeks) was published; others are placeholders to confirm
  modules: string[];
  accent: "brand" | "spark" | "ink";
};

export const courses: Course[] = [
  {
    slug: "ai-ml-generative-ai",
    legacyPaths: ["/ai-ml-course-in-mumbai/", "/courses/ai-ml-course-in-kandivali"],
    title: "AI + ML + Generative AI",
    category: "AI & Data",
    tagline: "Learn AI. Build Real Systems. Prepare for the Future.",
    summary: "Build real AI systems — automation, computer vision, agentic AI and robotics — in a 90% practical program.",
    duration: "12 weeks",
    modules: [
      "AI Foundations + GenAI",
      "Python + Data Handling",
      "Machine Learning",
      "Computer Vision",
      "Agentic AI + Automation",
      "AI System Design",
      "Robotics + AI",
      "Deployment + MLOps",
    ],
    accent: "spark",
  },
  {
    slug: "python-with-ai",
    legacyPaths: ["/course-python.html", "/courses/python-with-ai-course-in-kandivali"],
    title: "Python + AI",
    category: "Programming",
    tagline: "Logic | Automation | APIs | Real Applications",
    summary: "Learn Python programming, automation, APIs, and real-world problem solving with AI-powered coding techniques.",
    duration: "2 months", // TODO: placeholder — confirm with institute
    modules: ["Python Basics", "Loops & Functions", "Data Structures", "OOP Concepts", "APIs", "Automation", "GUI (Tkinter)", "AI Integration"],
    accent: "spark",
  },
  {
    slug: "full-stack-web-development",
    legacyPaths: ["/course-web-development.html", "/courses/full-stack-web-development-course-in-kandivali"],
    title: "Web Development + AI",
    category: "Programming",
    tagline: "From first tag to deployed full-stack app.",
    summary: "Create modern websites using HTML, CSS, JavaScript, and backend with real projects and AI tools.",
    duration: "4 months", // TODO: placeholder — confirm with institute
    modules: ["HTML & CSS", "JavaScript", "Backend", "Real Projects", "AI Tools"],
    accent: "ink",
  },
  {
    slug: "core-java",
    legacyPaths: ["/course-core-java.html", "/courses/core-java-course-in-kandivali"],
    title: "Core Java + AI",
    category: "Programming",
    tagline: "Strong logic. Solid OOP. Real applications.",
    summary: "Build strong programming logic with OOP concepts, real-world applications, and AI tools for coding assistance.",
    duration: "2 months", // TODO: placeholder — confirm with institute
    modules: ["Java Fundamentals", "OOP Concepts", "Real-world Applications", "AI Coding Assistants"],
    accent: "ink",
  },
  {
    slug: "advanced-excel-with-ai",
    legacyPaths: ["/advanced-excel-with-ai-course/", "/courses/advanced-excel-with-ai-course-in-kandivali"],
    title: "Advanced Excel + AI",
    category: "Office & Accounts",
    tagline: "Learn Excel Smarter. Analyse Better. Work Faster with AI.",
    summary: "Master data analysis, formulas, dashboards, MIS reporting, and AI tools used in real corporate environments.",
    duration: "6 weeks", // TODO: placeholder — confirm with institute
    modules: ["Formulas & Functions", "XLOOKUP, INDEX & MATCH", "Pivot Tables", "Charts & Dashboards", "MIS Reporting", "Macros"],
    accent: "brand",
  },
  {
    slug: "tally-gst-payroll",
    legacyPaths: ["/tally-course/", "/courses/tally-gst-course-in-kandivali"],
    title: "Tally + GST + Payroll",
    category: "Office & Accounts",
    tagline: "Master Accounting. Understand Taxation. Build Job-Ready Skills.",
    summary: "Learn accounting, GST, billing, and business management with practical Tally skills and AI support.",
    duration: "2 months", // TODO: placeholder — confirm with institute
    modules: ["Tally Prime", "GST Filing", "Input Tax Credit", "E-Way Bill & E-Invoicing", "TDS & TRACES", "Payroll"],
    accent: "brand",
  },
  {
    slug: "office-automation-with-ai",
    legacyPaths: ["/course-complete-computer.html", "/courses/office-automation-with-ai-course-in-kandivali"],
    title: "Office Automation + AI",
    category: "Office & Accounts",
    tagline: "Job-ready for every office role.",
    summary: "Complete MS Office training with real-world tasks, internet skills, and AI tools to become job-ready for office roles.",
    duration: "2 months", // TODO: placeholder — confirm with institute
    modules: ["MS Word", "MS Excel", "MS PowerPoint", "Internet & Email", "AI Productivity Tools"],
    accent: "brand",
  },
  {
    slug: "graphic-design-video-editing",
    legacyPaths: ["/course-graphic-videoediting.html", "/courses/graphic-design-video-editing-course-in-kandivali"],
    title: "Graphic Design & Video Editing",
    category: "Creative",
    tagline: "Design. Edit. Go viral.",
    summary: "Master graphic design, cinematic video editing, motion graphics, branding, reels and AI-powered creative tools.",
    duration: "3 months", // TODO: placeholder — confirm with institute
    modules: ["Graphic Design", "Branding", "Video Editing", "Motion Graphics", "Reels Creation", "AI Creative Tools"],
    accent: "ink",
  },
  {
    slug: "kids-coding-and-ai",
    legacyPaths: ["/course-child.html", "/courses/kids-computer-course-in-kandivali"],
    title: "Kids Coding + AI Adventure",
    category: "Kids",
    tagline: "A Creative Coding + AI Adventure Program (Age 5–10)",
    summary: "Fun-based learning: computer basics, typing, drawing tools and beginner coding, designed for school students.",
    duration: "6 levels", // TODO: placeholder — confirm with institute
    modules: [
      "L1 · Digital Hero Training",
      "L2 · Creative Design Universe",
      "L3 · Game Creator Lab",
      "L4 · App Creator Zone",
      "L5 · AI Superpowers",
      "L6 · Digital Creator Studio",
    ],
    accent: "brand",
  },
];

// Where students come from. The lab is in Kandivali West; these are real commute areas (western suburbs).
// Online batches are planned — flip `online.live` when they launch, and the site copy switches over.
export const reach = {
  lab: { area: "Kandivali West", city: "Mumbai", slug: "kandivali-west" },
  nearby: ["Borivali", "Malad", "Dahisar", "Goregaon", "Charkop", "Mira Road"],
  online: { live: false, label: "Live online batches — coming soon" },
} as const;

export const seo = {
  title: "Computer Courses in Kandivali West, Mumbai | NovaNxt Lab",
  description:
    "Hands-on AI, Python, web development, Excel, Tally, design and kids coding courses at NovaNxt Lab, Kandivali West, Mumbai. Book a free demo class today.",
  primaryKeywords: [
    "computer courses in Mumbai",
    "computer classes in Kandivali West",
    "computer courses in Kandivali",
    "computer institute in Kandivali",
    "computer classes near Borivali and Malad",
  ],
  courseKeywords: [
    "AI & ML course in Kandivali",
    "Generative AI course Mumbai",
    "Machine Learning course in Kandivali",
    "Python with AI course in Kandivali West",
    "Full Stack Development course in Kandivali",
    "Advanced Excel with AI course in Kandivali",
    "Tally Prime course in Kandivali West",
    "Tally classes in Kandivali",
    "Kids computer course in Kandivali West",
  ],
} as const;
