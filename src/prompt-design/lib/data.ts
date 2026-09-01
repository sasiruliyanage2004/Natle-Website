export const navLinks = [
  { href: "/prompt-design", label: "Home" },
  { href: "/prompt-design/about", label: "About" },
  { href: "/prompt-design/services", label: "Services" },
  { href: "/prompt-design/products", label: "Products" },
  { href: "/prompt-design/projects", label: "Projects" },
  { href: "/prompt-design/blog", label: "Journal" },
  { href: "/prompt-design/careers", label: "Careers" },
  { href: "/prompt-design/contact", label: "Contact" },
];

export const heroStats = [
  { value: 1240, suffix: "+", label: "acres under live telemetry" },
  { value: 99.2, suffix: "%", label: "probe uptime across Ceylon estates" },
  { value: 18, suffix: "%", label: "average yield lift, first season" },
  { value: 6, suffix: "", label: "harvest cycles of production data" },
];

export const solutionsTabs = [
  {
    id: "fieldos",
    name: "FieldOS™",
    tagline: "The operating layer for every probe, pump and panel on your estate",
    description:
      "FieldOS unifies LoRaWAN soil probes, weather stations and irrigation valves into a single command layer. Field managers see substrate moisture, EC and canopy temperature updates every four minutes, and can trigger irrigation pulses from a phone at the estate gate.",
    points: [
      "Mesh network self-heals around dead probes and dense canopy",
      "Offline-first controller keeps irrigating through connectivity drops",
      "Role-based access for estate managers, agronomists and owners",
    ],
    accent: "quantum",
  },
  {
    id: "yieldai",
    name: "YieldAI™",
    tagline: "A harvest predictor trained on six seasons of Ceylon field data",
    description:
      "YieldAI cross-references live NDVI canopy health, substrate telemetry and five years of regional weather to forecast harvest volume eight weeks out, with a stated confidence band instead of a false-precision single number.",
    points: [
      "Confidence-banded forecasts, not a black-box single figure",
      "Flags stress zones for early agronomist site visits",
      "Retrains each harvest on your estate's own outcomes",
    ],
    accent: "emerald",
  },
  {
    id: "tracelink",
    name: "TraceLink™",
    tagline: "Blockchain-backed compliance trail from soil to shipment",
    description:
      "TraceLink writes each harvest lot, substrate origin, and processing step to an immutable ledger, generating GlobalG.A.P. and EU import documentation automatically instead of at audit time.",
    points: [
      "One-tap export packet for customs and buyer audits",
      "Chain-of-custody visible to your export partner in real time",
      "Cuts documentation turnaround from weeks to same-day",
    ],
    accent: "amber",
  },
];

export const milestones = [
  {
    year: "2018",
    title: "Hosma Ceylon founded",
    body: "A single organic coconut coir substrate operation begins exporting to Dutch greenhouse growers from the Southern Province.",
  },
  {
    year: "2020",
    title: "First moisture probes go live",
    body: "Twelve soil sensors installed on a pilot plot to reduce irrigation guesswork during a drought season.",
  },
  {
    year: "2022",
    title: "NATLE spins out as a software partner",
    body: "The internal telemetry tooling becomes its own engineering team, building for estates beyond Hosma Ceylon.",
  },
  {
    year: "2023",
    title: "FieldOS™ reaches commercial estates",
    body: "Coconut, tea and hydroponic berry operations across three countries move onto the platform.",
  },
  {
    year: "2025",
    title: "YieldAI™ and TraceLink™ launch",
    body: "Machine-learned harvest forecasting and blockchain export compliance join the platform.",
  },
  {
    year: "2026",
    title: "1,240 acres, six harvest cycles of data",
    body: "NATLE and Hosma Ceylon open a joint engineering and agronomy floor at Colombo World Trade Center.",
  },
];

export const certifications = [
  { name: "GlobalG.A.P.", detail: "Integrated Farm Assurance, certified 2021" },
  { name: "OMRI Listed", detail: "Organic input material, coir substrate line" },
  { name: "ISO 27001", detail: "Information security, platform infrastructure" },
  { name: "ISO 9001", detail: "Quality management, export operations" },
];

export const leadership = [
  {
    name: "Ruwan De Alwis",
    role: "Co-Founder & CEO",
    bio: "Third-generation coir exporter who spent four years wiring his own family estate before founding NATLE.",
  },
  {
    name: "Ishara Munasinghe",
    role: "Co-Founder & CTO",
    bio: "Built telemetry firmware for maritime shipping before turning LoRaWAN mesh networks toward agriculture.",
  },
  {
    name: "Dinesh Kariyawasam",
    role: "Head of Agronomy",
    bio: "Two decades advising coconut and tea estates across the Southern and Uva Provinces on substrate science.",
  },
  {
    name: "Amaya Fernando",
    role: "VP Engineering",
    bio: "Leads the FieldOS and YieldAI engineering pods, previously shipped fleet telemetry at scale in Singapore.",
  },
];

export const services = [
  {
    id: "telemetry",
    name: "Wireless IoT Telemetry Mesh",
    summary:
      "Self-healing LoRaWAN sensor networks that report substrate moisture, EC, temperature and canopy conditions across estates too large or too remote for Wi-Fi.",
    specs: [
      { k: "Range", v: "Up to 8 km line-of-sight per gateway" },
      { k: "Battery life", v: "3–5 years per probe, solar-assisted option" },
      { k: "Report interval", v: "4 minutes, configurable to 30 seconds" },
      { k: "Network topology", v: "Self-healing mesh, no single point of failure" },
    ],
  },
  {
    id: "substrate",
    name: "Custom Substrate Compaction",
    summary:
      "Engineered coconut coir blends compacted to a buyer's exact EC, pH and water-retention specification, tracked from husk to bale.",
    specs: [
      { k: "EC range", v: "0.3–1.2 mS/cm, blended to order" },
      { k: "Bale formats", v: "5kg brick to 650kg bulk bale" },
      { k: "Buffering", v: "Calcium nitrate pre-buffered on request" },
      { k: "Traceability", v: "Lot-level origin logged via TraceLink™" },
    ],
  },
  {
    id: "engineering",
    name: "Full-Stack Cloud / Mobile Engineering",
    summary:
      "Custom dashboards, mobile field apps and integrations built on the FieldOS platform for operations with workflows off the standard template.",
    specs: [
      { k: "Stack", v: "Next.js, React Native, Postgres, edge functions" },
      { k: "Delivery", v: "4–10 week sprints, weekly demos" },
      { k: "Integration", v: "REST and webhook APIs into existing ERP" },
      { k: "Support", v: "SLA-backed on-call for production estates" },
    ],
  },
  {
    id: "ndvi",
    name: "Satellite NDVI & Drone Imaging",
    summary:
      "Weekly satellite canopy health passes supplemented by on-demand drone flights over flagged stress zones, layered into YieldAI's forecast model.",
    specs: [
      { k: "Satellite cadence", v: "Weekly NDVI pass, cloud-gap filled" },
      { k: "Drone resolution", v: "2 cm/pixel multispectral" },
      { k: "Turnaround", v: "Stress-zone report within 48 hours" },
      { k: "Coverage", v: "Any estate over 15 acres" },
    ],
  },
];

export const projects = [
  {
    id: "coconut-estate",
    name: "1,200-Acre Ceylon Coconut Estate",
    location: "Southern Province, Sri Lanka",
    summary:
      "Full FieldOS deployment across a mature coconut estate previously irrigated on a fixed weekly schedule regardless of soil condition.",
    metrics: [
      { label: "Water use", value: "-31%" },
      { label: "Yield, year one", value: "+16%" },
      { label: "Probes deployed", value: "340" },
    ],
  },
  {
    id: "dutch-hydroponics",
    name: "Dutch Berry Hydroponics Greenhouse",
    location: "Westland, Netherlands",
    summary:
      "Hosma Ceylon coir substrate paired with FieldOS EC monitoring for a 4-hectare strawberry and raspberry greenhouse operation.",
    metrics: [
      { label: "EC drift incidents", value: "-84%" },
      { label: "Substrate reorder lead time", value: "-9 days" },
      { label: "Fruit class-A rate", value: "+7%" },
    ],
  },
  {
    id: "tea-consortium",
    name: "Highland Ceylon Tea Consortium",
    location: "Uva Province, Sri Lanka",
    summary:
      "A cooperative of eleven smallholder tea gardens sharing one NDVI and weather layer, with YieldAI forecasting pooled for the consortium's export contracts.",
    metrics: [
      { label: "Gardens onboarded", value: "11" },
      { label: "Forecast accuracy", value: "±6%" },
      { label: "Export docs turnaround", value: "Same day" },
    ],
  },
];

export const posts = [
  {
    id: "coir-ec-drift",
    category: "Agronomy",
    title: "Why EC drift shows up two weeks after a bad blend, not immediately",
    excerpt:
      "Field data from three greenhouse seasons on why electrical conductivity problems in coir substrate take time to surface, and what to watch in week one.",
    date: "August 2026",
  },
  {
    id: "mesh-firmware-v4",
    category: "Firmware",
    title: "Rebuilding the probe mesh firmware for sub-30-second reporting",
    excerpt:
      "Engineering notes on the LoRaWAN duty-cycle tradeoffs behind FieldOS firmware v4, and why most estates still run the 4-minute default.",
    date: "July 2026",
  },
  {
    id: "ndvi-cloud-gaps",
    category: "Research",
    title: "Filling monsoon-season cloud gaps in weekly NDVI passes",
    excerpt:
      "How YieldAI blends satellite, drone and ground-truth probe data during Sri Lanka's cloudiest months without a forecast blackout.",
    date: "June 2026",
  },
  {
    id: "smallholder-consortium",
    category: "Field Notes",
    title: "What eleven smallholder tea gardens learned sharing one dashboard",
    excerpt:
      "Lessons from the Highland Ceylon Tea Consortium's first pooled season, including where a shared NDVI layer changed planting decisions.",
    date: "May 2026",
  },
  {
    id: "tracelink-audit",
    category: "Compliance",
    title: "Cutting a GlobalG.A.P. audit from three weeks to one afternoon",
    excerpt:
      "A walkthrough of the export documentation trail TraceLink generates automatically, and where manual records used to bottleneck.",
    date: "April 2026",
  },
  {
    id: "battery-life",
    category: "Firmware",
    title: "Getting five years out of a soil probe battery in full sun",
    excerpt:
      "The solar-assist and sleep-cycle tuning behind FieldOS probe hardware's field-measured battery life.",
    date: "March 2026",
  },
];

export const roles = [
  {
    id: "iot-firmware",
    title: "IoT Firmware Engineer",
    team: "Hardware",
    location: "Colombo, hybrid",
    summary: "Own the LoRaWAN probe firmware, from duty-cycle tuning to over-the-air update reliability across 1,200+ deployed sensors.",
  },
  {
    id: "fullstack-nextjs",
    title: "Full-Stack Engineer, Next.js",
    team: "Platform",
    location: "Colombo or remote (LK)",
    summary: "Build the FieldOS dashboard and mobile field app alongside a small platform team shipping weekly to live estates.",
  },
  {
    id: "agronomy-specialist",
    title: "Agronomy Specialist",
    team: "Field Science",
    location: "Uva Province",
    summary: "Translate telemetry and NDVI signals into agronomist-trusted guidance, and train estate teams on reading the data.",
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    team: "YieldAI",
    location: "Colombo, hybrid",
    summary: "Improve harvest forecast confidence bands using six seasons of estate outcome data across three crop types.",
  },
];

export const perks = [
  "Field days on active estates, not just office demos",
  "Equipment budget for your own home lab and hardware experiments",
  "Private health cover extended to immediate family",
  "Profit-sharing tied to estate outcomes, not just headcount",
];
