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
    meta: "IoT Telemetry • Agronomy",
    title: "Optimizing Ceylon Cocopeat Air Porosity with Real-Time EC Probes",
    readTime: "5 min read",
    badgeColor: "from-blue-500/20 to-cyan-500/20 border-blue-200/80 hover:border-[#0052FF]",
    author: {
      name: "Dr. Rohitha Senanayake",
      role: "Chief Agronomy Scientist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#cocopeat-ec",
  },
  {
    meta: "YieldAI™ • Machine Learning",
    title: "How Closed-Loop Deficit Irrigation Boosts Coconut Flowering by 28.4%",
    readTime: "7 min read",
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-200/80 hover:border-[#059669]",
    author: {
      name: "Kasun Jayawardena",
      role: "Lead Machine Learning Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#deficit-irrigation",
  },
  {
    meta: "Supply Chain • Blockchain",
    title: "TraceLink™: Exporting Certified Zero-Chemical Substrates to Europe",
    readTime: "4 min read",
    badgeColor: "from-amber-500/20 to-orange-500/20 border-amber-200/80 hover:border-[#F59E0B]",
    author: {
      name: "Dilini Fernando",
      role: "Global Logistics Director",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#tracelink-export",
  },
  {
    meta: "IoT Firmware • Energy Harvesting",
    title: "Building Micro-Solar LoRaWAN Probes with 5-Year Autonomous Battery Lifespans",
    readTime: "8 min read",
    badgeColor: "from-blue-500/20 to-indigo-500/20 border-blue-200/80 hover:border-[#0052FF]",
    author: {
      name: "Chathura Wickramasinghe",
      role: "Principal Firmware Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#firmware-battery",
  },
  {
    meta: "Satellite NDVI • Agronomy",
    title: "Predicting Commercial Plantation Biomass Cycles via Multispectral Satellite Bands",
    readTime: "6 min read",
    badgeColor: "from-emerald-500/20 to-green-500/20 border-emerald-200/80 hover:border-[#059669]",
    author: {
      name: "Dr. Rohitha Senanayake",
      role: "Chief Agronomy Scientist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#satellite-ndvi",
  },
  {
    meta: "Organic Substrates • Standards",
    title: "Why Low-EC Ceylon Cocopeat Outperforms Synthetic Rockwool in Hydroponic Brix Yields",
    readTime: "9 min read",
    badgeColor: "from-amber-500/20 to-yellow-500/20 border-amber-200/80 hover:border-[#F59E0B]",
    author: {
      name: "Kasun Jayawardena",
      role: "Lead Machine Learning Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    href: "/blog#cocopeat-vs-rockwool",
  },
];
