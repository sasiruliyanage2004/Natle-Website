export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogCardItem {
  meta: string;
  title: string;
  readTime: string;
  author: BlogAuthor;
  href: string;
  badgeColor: string;
}

export const defaultBlogPosts: BlogCardItem[] = [
  {
    meta: "Healthcare AI • Computer Vision",
    title: "Diagnostic Vision in Clinical Radiology: Reducing PACS Imaging Miss Rates by 34%",
    readTime: "6 min read",
    badgeColor: "from-sky-500/20 to-blue-500/20 border-sky-200/80 hover:border-[#0EA5E9]",
    author: {
      name: "Sasiru Liyanage",
      role: "Founder & Chief Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#healthcare-ai",
  },
  {
    meta: "Agriculture AI • IoT Telemetry",
    title: "FieldOS™ Edge Telemetry: Multi-Depth LoRaWAN Sensor Meshes for 50,000-Hectare Yield Optimization",
    readTime: "7 min read",
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-200/80 hover:border-[#059669]",
    author: {
      name: "Dileepa Haripriya",
      role: "Solution Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#fieldos-telemetry",
  },
  {
    meta: "Point of Sales • Predictive Analytics",
    title: "Real-Time Retail Loss Prevention & Demand Forecasting with Edge AI Across 60 Branches",
    readTime: "5 min read",
    badgeColor: "from-orange-500/20 to-amber-500/20 border-orange-200/80 hover:border-[#F97316]",
    author: {
      name: "Dilan Kanushka",
      role: "Head of Business Development",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#retail-pos-ai",
  },
  {
    meta: "Education Tech • Neural Architectures",
    title: "Adaptive Learning Paths: Serving 200,000+ Students with Real-Time Skill Acquisition Models",
    readTime: "8 min read",
    badgeColor: "from-purple-500/20 to-violet-500/20 border-purple-200/80 hover:border-[#A855F7]",
    author: {
      name: "Tharushi Fernando",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#edureach-lms",
  },
  {
    meta: "Enterprise Strategy • Industry 4.0",
    title: "The Enterprise AI ROI Imperative: Accelerating Production Deployment Under 90 Days",
    readTime: "9 min read",
    badgeColor: "from-indigo-500/20 to-blue-500/20 border-indigo-200/80 hover:border-[#6366F1]",
    author: {
      name: "Prof. Henrik von Scheel",
      role: "Strategic Advisor (Originator of Industry 4.0)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#industry-4-0-roi",
  },
  {
    meta: "HR Tech • Security & Compliance",
    title: "Automating Multi-Jurisdiction Payroll & Talent Analytics with SOC 2 & HIPAA Enforced AI",
    readTime: "6 min read",
    badgeColor: "from-teal-500/20 to-emerald-500/20 border-teal-200/80 hover:border-[#14B8A6]",
    author: {
      name: "Kokila Wanigasundara",
      role: "Senior Manager — QA",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#enterprise-hr-compliance",
  },
];
