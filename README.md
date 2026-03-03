# Aps Dashboard

A modern, production-ready dashboard frontend interface designed for scanning, analyzing, and reviewing application security vulnerabilities. Built using Next.js 16 (App Router), React, and Tailwind CSS. The design language emphasizes high-fidelity layout replication and cross-device responsiveness.

## Architecture & Tech Stack

The platform demonstrates best-practice frontend architecture with a clear separation of UI components, centralized state management for themes, and simulated local data handling.

- **Framework**: [Next.js v16](https://nextjs.org/) using the App Directory.
- **Language**: TypeScript (Strict mode enabled).
- **Styling**: Tailwind CSS with native CSS custom variables mapped to design tokens.
- **Component System**: Shadcn UI-inspired modular core with Radix UI primitives and Lucide React icons.
- **Data Emulation**: Dedicated mock logic utilizing `date-fns` and JSON object definitions (`mockData.ts`) to validate functional data flow without backend dependencies.

## Key Features

- **High-Fidelity UI Match**: Specific utilization of exact variables, padding systems, and color definitions mappings (`#0CC8A8` teal primary variant).
- **Theming Capabilities**: Dark and Light theme toggle functionality leveraging `useTheme` capabilities alongside CSS variables for strict contrast standards.
- **Functional Dashboards**: Full interaction layers demonstrating functional states for search filters, data refreshing, structured pagination components, and scanning processes (spidering, mapping, and reporting).
- **Responsive Strategies**: Built mobile-first. Accommodates standard viewport sizes ranging automatically down to tablet sizes using column degradation and hamburger drawer navigation systems.

## Local Development & Setup

Follow these instructions to spin up the local project layer. 

### Prerequisites

Node.js v18.17 or higher is required.

### Installation

1. Clone the repository to your local system.
   
```bash
git clone https://github.com/saqlain991/fenrir-assignment
```

2. Navigate into the application root and install packages.
```bash
npm install 
```

3. Initialize the development environment.

```bash
npm run dev
```

4. View the project build running locally. Navigate your web browser to:
**[http://localhost:3000](http://localhost:3000)**

## Structure Overview

- `/src/app/`: The central application routes and layouts (covering `/login`, `/dashboard`, and `/scans/[id]`). 
- `/src/components/ui/`: Base and reusable user interface components (Badges, Buttons, Inputs, Radix wrappers).
- `/src/components/layout/`: Global architecture wrappers (Sidebars, Top Navigation, Theme Providers).
- `/src/data/mockData.ts`: Holds data array schemas and records bridging testing states inside the Next.js hooks.

## Considerations & Limitations

- **State Emulation**: Actions such as "Stop Scan" or dynamic loading intervals are locally simulated via `setTimeout` logic and hooks. State persistence drops on hard refresh as data originates from stateless constants.
- **Accessibility Integration**: Interactive components utilize `aria-labels` and semantic DOM placement structurally, but deeper ARIA relationships logic is only partially mapped to Radix UI components specifically.

