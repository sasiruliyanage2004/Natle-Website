# ⚡ NATLE — Engineering the Future

<div align="center">

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-090A0F.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Bespoke Software Engineering, High-Throughput Distributed Architectures & AI Solutions.</b><br>
  Designed and engineered for ambitious enterprises that innovate, build, and scale faster.
</p>

[Explore Website](https://natle.dev) • [Our Services](#-core-capabilities) • [Architecture](#-clean-architecture) • [Getting Started](#-quick-start)

</div>

---

## 💎 Overview

**NATLE** is an elite digital engineering studio and systems consultancy. We bridge cutting-edge creative interaction with battle-tested enterprise architecture — crafting scalable custom software, high-throughput Web3 applications, cloud infrastructures, and production-grade AI platforms.

This repository contains the flagship **NATLE Studio Web Platform**, engineered with an **Awwwards-tier interactive stack** featuring custom WebGL shaders, butter-smooth inertia scrolling, magnetic physics, and seamless route transitions.

---

## ✨ Flagship Design & Interactive Features

### 🌌 1. WebGL 3D Simplex Fluid Mesh (Hero3D.tsx)
- Powered by raw **GLSL Fragment & Vertex Shaders** on a Three.js canvas.
- Dynamically responds to cursor velocity with interactive noise wave fields and multi-stop gradient diffusion (Azure, Teal, and Lime).
- Fully garbage-collected with zero memory leaks across route navigation.

### 📜 2. Cinematic Curtain-Reveal Footer (Footer.tsx)
- Multi-layered fixed viewport architecture with mathematical clip-path masks.
- **GSAP ScrollTrigger** parallax on giant background typography (NATLE).
- High-velocity dual-direction kinetic marquee ticker.
- Comprehensive 4-column enterprise directory (Services, Company, Direct Contact & Legal).
- Fully responsive across desktop, tablet, and mobile screens.

### 🌀 3. Uiverse Morphing Page Transitions (	emplate.tsx)
- Integrated with Next.js App Router template lifecycles.
- Quad-color orbital rotating loader (spin988) styled in NATLE's signature brand palette (Azure Blue #1E7FE8, Teal #12B8A6, Lime #6FCF3E, Charcoal #090A0F).
- Fades out seamlessly as the incoming view is mounted without layout shift.

### 🏷️ 4. Cult UI Notch-Cutout Cards (CutoutCard.tsx)
- Inspired by Cult UI's inverted border radius geometry.
- Pixel-perfect SVG inverted bezier curves (CutoutCorner) carving clean tabs directly into visual media.
- Showcases publications with dynamic badges (*NEW*, *POPULAR*, *INSIGHT*), high-resolution 3D abstract imagery, and author metadata.

### 🧲 5. Magnetic Button Physics (Magnetic.tsx)
- Built using **Framer Motion spring dynamics** (stiffness: 200, damping: 15).
- Pulls interactive CTA elements towards the user's cursor within proximity thresholds.

### 🌊 6. Lenis Inertia Smooth Scroll (SmoothScroll.tsx)
- Hardware-accelerated virtual scrolling powered by **Studio Freight / Darkroom Engineering Lenis**.
- Coupled with GSAP's global ticker for 60fps frame-synced performance.
- Hidden native browser scrollbars paired with an ultra-thin top reading progress bar (ScrollProgress.tsx).

### 🧬 7. Bioluminescent Quantum Logo (NatleLogo.tsx)
- Scalable SVG vector identity with animated ambient glow aura.
- Color-adaptive typography (currentColor / theme-aware) rendering with optimal contrast on light and dark surfaces.

---

## 🎨 Color System & Design Tokens

Designed in a modern **Charcoal / Onyx** high-tech palette inspired by Linear and Vercel:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Ink (Charcoal)** | #090A0F | Primary dark surface & deep text typography |
| **Ink Soft** | #171922 | Card backgrounds & subtle elevated surfaces |
| **Azure Blue** | #1E7FE8 | Primary accent, interactive links & active states |
| **Teal** | #12B8A6 | Secondary bio-accent, metrics & badges |
| **Lime** | #6FCF3E | Highlights, live status pulses & tertiary glows |
| **Mist** | #F5F8FB | Secondary background sections & soft contrast |
| **Paper** | #FCFDFE | Main page background canvas |

---

## 🗂️ Clean Architecture

The codebase adheres strictly to modern Next.js App Router best practices under the /src convention:

`	ext
natle-website/
├── public/
│   ├── images/                        # High-resolution optimized visual assets
│   └── logo.png                       # Studio favicon & brand markers
├── src/
│   ├── app/                           # App Router (Pages, Layouts & Route Handlers)
│   │   ├── layout.tsx                 # Root layout, metadata & global providers
│   │   ├── template.tsx               # Route animation template & Uiverse loader
│   │   ├── globals.css                # Tailwind directives & custom CSS keyframes
│   │   ├── fonts/                     # Self-hosted Space Grotesk & Inter font assets
│   │   ├── page.tsx                   # Master Homepage Architecture
│   │   ├── about/page.tsx             # Studio heritage, mission & team
│   │   ├── services/page.tsx          # 6 Core architectural services
│   │   ├── products/page.tsx          # Pre-built enterprise solutions
│   │   ├── projects/page.tsx          # Portfolio & case studies
│   │   ├── blog/page.tsx              # Publications hub with Cutout Cards
│   │   ├── careers/page.tsx           # Culture, benefits & open roles
│   │   └── contact/page.tsx           # Consultation booking engine
│   ├── components/                    # Modular, composable UI components
│   │   ├── NatleLogo.tsx              # Bioluminescent vector SVG logo
│   │   ├── Navbar.tsx                 # Responsive header with active segment tracking
│   │   ├── Footer.tsx                 # Cinematic GSAP curtain reveal footer
│   │   ├── Hero3D.tsx                 # Three.js WebGL shader fluid mesh
│   │   ├── HeroContent.tsx            # Hero typography & action buttons
│   │   ├── Preloader.tsx              # First-visit animated SVG preloader
│   │   ├── CutoutCard.tsx             # Cult UI curved SVG corner notch card
│   │   ├── Magnetic.tsx               # Magnetic spring cursor pull wrapper
│   │   ├── ScrollProgress.tsx         # Ultra-thin top reading progress indicator
│   │   ├── SmoothScroll.tsx           # Lenis virtual scroll & GSAP ticker
│   │   ├── Marquee.tsx                # Infinite kinetic partner logo ticker
│   │   ├── Counter.tsx                # Scroll-triggered animated numeric metrics
│   │   └── Reveal.tsx                 # GSAP ScrollTrigger entry animations
│   └── lib/
│       ├── data.ts                    # Type-safe datasets (Projects, Blog, Services)
│       └── nav.ts                     # Navigation routes & directory hierarchies
├── middleware.ts                      # Vercel Edge runtime geo-personalization
├── start.bat                          # One-Click Windows Development Server Runner
├── tailwind.config.ts                 # Design tokens, gradients & animations
├── tsconfig.json                      # Strict TypeScript compiler configuration
├── next.config.mjs                    # Next.js optimization configuration
└── package.json                       # Dependencies & scripts
`

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.18.0 or higher
- **Package Manager**: 
pm, pnpm, or yarn

### 1. Clone & Install
`ash
git clone https://github.com/sasiruliyanage2004/Natle-Website.git
cd Natle-Website
npm install
`

### 2. Run Development Server

#### Option A: Windows One-Click (Recommended)
Double-click start.bat in the root folder. It will verify dependencies and start the server on [http://localhost:3000](http://localhost:3000).

#### Option B: Terminal Command
`ash
npm run dev
`

### 3. Production Build & Verification
`ash
# Verify type safety & zero lint errors
npm run lint

# Compile optimized static output (11/11 pages)
npm run build

# Preview production server
npm run start
`

---

## 🛡️ Performance & Code Quality Benchmarks

- **Zero Build Errors:** All 11 static routes compile cleanly with zero TypeScript errors.
- **Zero ESLint Warnings:** Strict code hygiene verified with 
px next lint.
- **Lighthouse 100/100 Ready:** Full semantic HTML5 tags (<nav>, <header>, <main>, <footer>), ARIA attributes, and complete OpenGraph / Twitter metadata.
- **No Cumulative Layout Shift (CLS):** Clean height constraints, font preloading, and unoptimized-friendly Next.js image loading.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---

<div align="center">
  <sub>Engineered with precision by <b>NATLE Studio</b>. Innovate • Build • Grow.</sub>
</div>
