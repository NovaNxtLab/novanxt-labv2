// Marketing structure for each course: who it's for, outcomes, projects, tools, career roles.
// The old site only published titles, summaries and module lists (see brand.ts). Everything here is
// drafted copy in the usual institute format. It deliberately avoids unverifiable claims
// (placement %, salaries, batch sizes). TODO: have the institute review before launch.

import type { Course } from "@/lib/brand";

export type CourseLevel = "Beginner" | "Beginner → Intermediate" | "Intermediate → Advanced" | "Ages 5–10";

export type CourseDetails = {
  level: CourseLevel;
  badge?: "Flagship" | "Most popular" | "Job-ready" | "For kids";
  idealFor: string[];
  outcomes: string[];
  projects: string[];
  tools: string[];
  careers: string[];
  certificate: string;
};

const certificate = "NovaNxt Lab course-completion certificate";

export const courseDetails: Record<Course["slug"], CourseDetails> = {
  "ai-ml-course-in-kandivali": {
    level: "Intermediate → Advanced",
    badge: "Flagship",
    idealFor: ["Engineering & IT students", "Developers moving into AI", "Graduates targeting AI roles"],
    outcomes: [
      "Train, evaluate and tune machine-learning models on real datasets",
      "Build computer-vision apps that detect and track objects",
      "Create AI agents that automate multi-step workflows",
      "Deploy models as APIs others can actually use",
    ],
    projects: ["Face & object detection system", "AI customer-support agent", "Sales-forecasting ML model", "AI-driven robotics demo"],
    tools: ["Python", "NumPy & Pandas", "scikit-learn", "TensorFlow", "OpenCV", "LLM APIs"],
    careers: ["AI Engineer", "ML Engineer", "Data Scientist", "Automation Engineer"],
    certificate,
  },
  "python-with-ai-course-in-kandivali": {
    level: "Beginner → Intermediate",
    badge: "Most popular",
    idealFor: ["Students starting to code", "Working professionals automating tasks", "Anyone heading towards AI/Data"],
    outcomes: [
      "Write clean Python using functions, data structures and OOP",
      "Automate repetitive file, Excel and web tasks",
      "Call real APIs and build small desktop apps",
      "Use AI coding assistants to debug and build faster",
    ],
    projects: ["Expense tracker desktop app (Tkinter)", "Weather app using a live API", "Office task automation scripts"],
    tools: ["Python", "VS Code", "Tkinter", "REST APIs", "AI coding assistants"],
    careers: ["Python Developer", "Automation Executive", "Junior Data Analyst"],
    certificate,
  },
  "full-stack-web-development-course-in-kandivali": {
    level: "Beginner → Intermediate",
    badge: "Job-ready",
    idealFor: ["Students who want to build websites", "Freelancers & small-business owners", "Career switchers into IT"],
    outcomes: [
      "Build responsive websites with HTML, CSS and JavaScript",
      "Create a backend with a database and login",
      "Ship and host a full-stack project online",
      "Use AI tools to design, write and debug code",
    ],
    projects: ["Personal portfolio website", "Business landing page", "Full-stack app with login & database"],
    tools: ["HTML", "CSS", "JavaScript", "Node.js", "Git & GitHub", "AI dev tools"],
    careers: ["Web Developer", "Front-end Developer", "Full-stack Developer (Junior)"],
    certificate,
  },
  "core-java-course-in-kandivali": {
    level: "Beginner → Intermediate",
    idealFor: ["BSc IT / BCA / engineering students", "Placement & interview preparation", "Learners building strong logic"],
    outcomes: [
      "Solve programming problems with solid logic",
      "Apply OOP: classes, inheritance, polymorphism, interfaces",
      "Handle exceptions, collections and files",
      "Answer common Java interview questions",
    ],
    projects: ["Bank account management system", "Student records app", "Console-based quiz game"],
    tools: ["Java", "IntelliJ / Eclipse", "Collections framework", "AI coding assistants"],
    careers: ["Java Developer (Trainee)", "Software Tester", "Backend Developer (Junior)"],
    certificate,
  },
  "advanced-excel-with-ai-course-in-kandivali": {
    level: "Beginner → Intermediate",
    badge: "Most popular",
    idealFor: ["Accounts, sales & admin staff", "MIS / back-office aspirants", "Commerce students & graduates"],
    outcomes: [
      "Use XLOOKUP, INDEX-MATCH and nested formulas with confidence",
      "Summarise large data with Pivot Tables",
      "Build interactive dashboards and MIS reports",
      "Automate routine work with Macros and AI prompts",
    ],
    projects: ["Sales MIS dashboard", "Monthly attendance & payroll sheet", "Inventory tracker with alerts"],
    tools: ["Excel", "Pivot Tables", "Power Query", "Macros", "AI in Excel"],
    careers: ["MIS Executive", "Data Entry / Back-office Executive", "Junior Data Analyst"],
    certificate,
  },
  "tally-gst-course-in-kandivali": {
    level: "Beginner → Intermediate",
    badge: "Job-ready",
    idealFor: ["Commerce students & graduates", "Accounts assistants", "Small-business owners"],
    outcomes: [
      "Maintain complete books of accounts in Tally Prime",
      "Prepare GST returns and claim input tax credit",
      "Generate e-way bills and e-invoices",
      "Process payroll, TDS and statutory reports",
    ],
    projects: ["Full-year accounts for a sample trading firm", "GST return filing walkthrough", "Payroll for a 10-employee company"],
    tools: ["Tally Prime", "GST Portal", "E-Way Bill portal", "TRACES", "Excel"],
    careers: ["Accountant", "Tally Operator", "GST Assistant", "Accounts Executive"],
    certificate,
  },
  "office-automation-with-ai-course-in-kandivali": {
    level: "Beginner",
    idealFor: ["First-time computer users", "Job seekers for office roles", "Homemakers & senior learners"],
    outcomes: [
      "Type and format professional documents and letters",
      "Manage data in Excel with everyday formulas",
      "Make clean presentations in PowerPoint",
      "Use email, online forms and AI tools for daily office work",
    ],
    projects: ["Professional resume & cover letter", "Office budget sheet", "Company presentation deck"],
    tools: ["MS Word", "MS Excel", "MS PowerPoint", "Gmail & Google Drive", "ChatGPT-style AI tools"],
    careers: ["Office Assistant", "Data Entry Operator", "Front-desk / Admin Executive"],
    certificate,
  },
  "graphic-design-video-editing-course-in-kandivali": {
    level: "Beginner → Intermediate",
    idealFor: ["Aspiring designers & content creators", "Social-media managers", "Small-business owners"],
    outcomes: [
      "Design posters, logos and social posts that look professional",
      "Build a basic brand identity kit",
      "Edit reels and videos with cuts, colour and sound",
      "Add motion graphics and use AI creative tools",
    ],
    projects: ["Brand identity kit", "Instagram reel series", "Promo video with motion titles"],
    tools: ["Photoshop", "Illustrator", "Canva", "Premiere Pro", "After Effects", "AI image tools"],
    careers: ["Graphic Designer", "Video Editor", "Social-media Designer", "Content Creator"],
    certificate,
  },
  "kids-computer-course-in-kandivali": {
    level: "Ages 5–10",
    badge: "For kids",
    idealFor: ["School students aged 5–10", "First-time young learners", "Parents who want screen time to count"],
    outcomes: [
      "Use a computer, keyboard and mouse confidently",
      "Draw and design with kid-friendly creative tools",
      "Build simple games and apps with block coding",
      "Understand what AI is and use it safely",
    ],
    projects: ["Digital drawing portfolio", "First animated game", "Mini app made with blocks"],
    tools: ["Typing tutor", "Paint & drawing tools", "Scratch", "Block-based app builders", "Kid-safe AI tools"],
    careers: ["Builds logic & creativity", "Ready for school computer exams", "Strong base for coding later"],
    certificate: "Level-wise achievement certificates",
  },
};
