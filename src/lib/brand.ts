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
    instagram: "https://www.instagram.com/novanxtlab",
    facebook: "https://www.facebook.com/share/17Q8CBPmVX/",
  },
  hours: null as string | null, // TODO: not published on old site
} as const;

export type CourseCategory = "AI & Data" | "Programming" | "Office & Accounts" | "Creative" | "Kids";

export type Course = {
  slug: string;
  legacyPath: string; // old URL — must 301 to the new slug to keep rankings
  title: string;
  category: CourseCategory;
  tagline: string;
  summary: string;
  duration: string | null;
  modules: string[];
  accent: "brand" | "spark" | "ink";
};

export const courses: Course[] = [
  {
    slug: "ai-ml-course-in-kandivali",
    legacyPath: "/ai-ml-course-in-mumbai/",
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
    slug: "python-with-ai-course-in-kandivali",
    legacyPath: "/course-python.html",
    title: "Python + AI",
    category: "Programming",
    tagline: "Logic | Automation | APIs | Real Applications",
    summary: "Learn Python programming, automation, APIs, and real-world problem solving with AI-powered coding techniques.",
    duration: null,
    modules: ["Python Basics", "Loops & Functions", "Data Structures", "OOP Concepts", "APIs", "Automation", "GUI (Tkinter)", "AI Integration"],
    accent: "spark",
  },
  {
    slug: "full-stack-web-development-course-in-kandivali",
    legacyPath: "/course-web-development.html",
    title: "Web Development + AI",
    category: "Programming",
    tagline: "From first tag to deployed full-stack app.",
    summary: "Create modern websites using HTML, CSS, JavaScript, and backend with real projects and AI tools.",
    duration: null,
    modules: ["HTML & CSS", "JavaScript", "Backend", "Real Projects", "AI Tools"],
    accent: "ink",
  },
  {
    slug: "core-java-course-in-kandivali",
    legacyPath: "/course-core-java.html",
    title: "Core Java + AI",
    category: "Programming",
    tagline: "Strong logic. Solid OOP. Real applications.",
    summary: "Build strong programming logic with OOP concepts, real-world applications, and AI tools for coding assistance.",
    duration: null,
    modules: ["Java Fundamentals", "OOP Concepts", "Real-world Applications", "AI Coding Assistants"],
    accent: "ink",
  },
  {
    slug: "advanced-excel-with-ai-course-in-kandivali",
    legacyPath: "/advanced-excel-with-ai-course/",
    title: "Advanced Excel + AI",
    category: "Office & Accounts",
    tagline: "Learn Excel Smarter. Analyse Better. Work Faster with AI.",
    summary: "Master data analysis, formulas, dashboards, MIS reporting, and AI tools used in real corporate environments.",
    duration: null,
    modules: ["Formulas & Functions", "XLOOKUP, INDEX & MATCH", "Pivot Tables", "Charts & Dashboards", "MIS Reporting", "Macros"],
    accent: "brand",
  },
  {
    slug: "tally-gst-course-in-kandivali",
    legacyPath: "/tally-course/",
    title: "Tally + GST + Payroll",
    category: "Office & Accounts",
    tagline: "Master Accounting. Understand Taxation. Build Job-Ready Skills.",
    summary: "Learn accounting, GST, billing, and business management with practical Tally skills and AI support.",
    duration: null,
    modules: ["Tally Prime", "GST Filing", "Input Tax Credit", "E-Way Bill & E-Invoicing", "TDS & TRACES", "Payroll"],
    accent: "brand",
  },
  {
    slug: "office-automation-with-ai-course-in-kandivali",
    legacyPath: "/course-complete-computer.html",
    title: "Office Automation + AI",
    category: "Office & Accounts",
    tagline: "Job-ready for every office role.",
    summary: "Complete MS Office training with real-world tasks, internet skills, and AI tools to become job-ready for office roles.",
    duration: null,
    modules: ["MS Word", "MS Excel", "MS PowerPoint", "Internet & Email", "AI Productivity Tools"],
    accent: "brand",
  },
  {
    slug: "graphic-design-video-editing-course-in-kandivali",
    legacyPath: "/course-graphic-videoediting.html",
    title: "Graphic Design & Video Editing",
    category: "Creative",
    tagline: "Design. Edit. Go viral.",
    summary: "Master graphic design, cinematic video editing, motion graphics, branding, reels and AI-powered creative tools.",
    duration: null,
    modules: ["Graphic Design", "Branding", "Video Editing", "Motion Graphics", "Reels Creation", "AI Creative Tools"],
    accent: "ink",
  },
  {
    slug: "kids-computer-course-in-kandivali",
    legacyPath: "/course-child.html",
    title: "Kids Coding + AI Adventure",
    category: "Kids",
    tagline: "A Creative Coding + AI Adventure Program (Age 5–10)",
    summary: "Fun-based learning: computer basics, typing, drawing tools and beginner coding, designed for school students.",
    duration: null,
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

export const seo = {
  title: "Computer Classes in Kandivali West | AI, Python, Excel & Tally Courses — NovaNxt Lab",
  description:
    "NovaNxt Lab offers practical, job-oriented computer courses in Kandivali West, Mumbai — AI & ML, Python, Full Stack Development, Advanced Excel, Tally and more.",
  primaryKeywords: [
    "computer classes in Kandivali West",
    "computer courses in Kandivali",
    "job-oriented computer courses Mumbai",
    "computer institute in Kandivali",
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
