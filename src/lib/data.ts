export const SERVICES = [
  {
    slug: "product-engineering",
    name: "Product Engineering",
    short: "Full-stack web and mobile apps built for speed, reliability, and scale.",
    detail:
      "From the first line of code to production infrastructure, we design and build software your users trust. React, Next.js, and native mobile stacks, backed by pragmatic architecture.",
    points: ["Web & mobile applications", "API & systems architecture", "Design systems & UI engineering"],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    short: "Infrastructure that scales quietly in the background while you focus on the product.",
    detail:
      "We set up cloud infrastructure, CI/CD pipelines, and observability so releases are boring in the best way — predictable, fast, and safe to roll back.",
    points: ["AWS / GCP / Azure architecture", "CI/CD & release automation", "Monitoring & incident response"],
  },
  {
    slug: "data-ai",
    name: "Data & AI",
    short: "Turning raw data into decisions, and repetitive work into automation.",
    detail:
      "We build data pipelines, analytics dashboards, and applied AI features — recommendation engines, document intelligence, and workflow automation tailored to your data.",
    points: ["Data pipelines & warehousing", "Applied machine learning", "Analytics & reporting dashboards"],
  },
  {
    slug: "product-design",
    name: "Product Design",
    short: "Interfaces people enjoy using, grounded in research and real constraints.",
    detail:
      "Our designers work alongside engineers from day one, so what gets designed is what ships — validated with users, not just stakeholders.",
    points: ["UX research & flows", "Interface & interaction design", "Design systems"],
  },
  {
    slug: "enterprise-systems",
    name: "Enterprise Systems",
    short: "Modernizing the internal tools that keep a business running.",
    detail:
      "We replace spreadsheets and legacy tools with internal platforms for inventory, HR, POS, and operations — built around how your teams actually work.",
    points: ["Custom internal platforms", "Legacy system modernization", "Systems integration"],
  },
  {
    slug: "consulting",
    name: "Technology Consulting",
    short: "An outside team to pressure-test your roadmap and architecture.",
    detail:
      "Technical due diligence, architecture reviews, and fractional CTO support for teams that need senior judgment without a full-time hire.",
    points: ["Architecture & code review", "Technical due diligence", "Fractional CTO support"],
  },
];

export const PRODUCTS = [
  {
    name: "NATLE Ops",
    tag: "Operations Platform",
    description:
      "A unified operations workspace for inventory, orders, and multi-branch reporting, built for retail and distribution teams.",
  },
  {
    name: "NATLE Insight",
    tag: "Analytics",
    description:
      "Self-serve dashboards and forecasting for teams who need answers from their data without waiting on an analyst.",
  },
  {
    name: "NATLE Flow",
    tag: "Workflow Automation",
    description:
      "Turns manual approval chains and repetitive back-office work into automated, auditable workflows.",
  },
  {
    name: "NATLE Connect",
    tag: "Customer Platform",
    description:
      "A lightweight CRM and support hub for growing teams that have outgrown spreadsheets but aren't ready for enterprise software.",
  },
];

export const PROJECTS = [
  {
    name: "Harborline Retail",
    category: "Retail · POS & Inventory",
    result: "Cut stock reconciliation time by 68% across 24 stores.",
  },
  {
    name: "Meridian Health Group",
    category: "Healthcare · Patient Records",
    result: "Replaced 3 legacy systems with a single patient records platform.",
  },
  {
    name: "Fernvale Agritech",
    category: "Agriculture · Field Analytics",
    result: "Gave 400+ growers real-time yield forecasts from a single app.",
  },
  {
    name: "Crestpoint Capital",
    category: "Fintech · Reporting Dashboard",
    result: "Automated a reporting process that used to take 3 days a month.",
  },
  {
    name: "Solano Learning",
    category: "EdTech · Adaptive Platform",
    result: "Built a learning platform now used by 12,000+ students.",
  },
  {
    name: "Ridgeway Logistics",
    category: "Logistics · Fleet Systems",
    result: "Live fleet tracking and route optimization for 150+ vehicles.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "shipping-without-fear",
    category: "Engineering",
    title: "Shipping Without Fear: How We Structure Releases",
    excerpt:
      "The pipeline, feature flags, and rollback habits that let small teams ship daily without breaking production.",
    readTime: "7 min read",
  },
  {
    slug: "design-engineering-handoff",
    category: "Design",
    title: "The Handoff Doesn't Have to Hurt",
    excerpt:
      "Why we stopped treating design and engineering as separate stages, and started building both at once.",
    readTime: "5 min read",
  },
  {
    slug: "data-before-ai",
    category: "Data & AI",
    title: "Fix Your Data Before You Buy an AI Feature",
    excerpt:
      "Most 'AI problems' we get called in for are actually data pipeline problems wearing a trench coat.",
    readTime: "6 min read",
  },
];

export const TEAM = [
  { name: "Ishan Perera", role: "Founder & CEO" },
  { name: "Amaya Silva", role: "Head of Engineering" },
  { name: "Ruwan Fernando", role: "Head of Product Design" },
  { name: "Nadeesha Rathnayake", role: "Head of Client Delivery" },
];

export const VALUES = [
  { title: "Built to last", detail: "We write software we'd be comfortable maintaining ourselves, five years from now." },
  { title: "Clear communication", detail: "No jargon, no surprises. You always know where a project stands." },
  { title: "Design and code together", detail: "Designers and engineers sit in the same room from day one." },
  { title: "Own the outcome", detail: "We measure success by your metrics, not just delivered tickets." },
];

export const OPEN_ROLES = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Colombo / Remote" },
  { title: "Product Designer", team: "Design", location: "Colombo" },
  { title: "DevOps Engineer", team: "Engineering", location: "Remote" },
  { title: "Data Analyst", team: "Data & AI", location: "Colombo" },
  { title: "Delivery Manager", team: "Operations", location: "Colombo" },
];

export const BENEFITS = [
  { title: "Flexible hours", detail: "Work when you're most effective, not just 9 to 5." },
  { title: "Learning budget", detail: "Annual budget for courses, books, and conferences." },
  { title: "Health cover", detail: "Comprehensive health insurance for you and your family." },
  { title: "Remote friendly", detail: "Work from our Colombo studio, home, or a mix of both." },
];
