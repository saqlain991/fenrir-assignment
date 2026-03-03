# global.md

## Project Overview

This project is built using **Next.js (App Router)** to ensure
production-grade architecture, performance optimization, and
scalability.

The core objective is to achieve:

-   100% Pixel Perfect UI match with the Design Reference
-   Fully responsive design (375px → 1280px+)
-   Fully functional Dark & Light Mode
-   Production-quality reusable component architecture

------------------------------------------------------------------------

## Tech Stack

### Core

-   Next.js 16 (App Router)
-   Javascript
-   Tailwind CSS
-   React Hooks
-   Context API (Theme)
-   Lucide Icons

------------------------------------------------------------------------

## Folder Structure

    src/
    │
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx (Login)
    │   ├── dashboard/page.tsx
    │   ├── scan/[id]/page.tsx
    │
    ├── components/
    │   ├── ui/
    │   ├── layout/
    │
    ├── context/
    │   ├── ThemeContext.tsx
    │
    ├── data/
    │   ├── scans.ts
    │   ├── logs.ts
    │   ├── findings.ts
    │
    ├── styles/
    │   ├── globals.css

------------------------------------------------------------------------

## Design Tokens

### Primary Accent

Teal: #0CC8A8

### Severity Colors

Critical: #EF4444\
High: #F97316\
Medium: #FACC15\
Low: #22C55E

### Dark Mode

Background: #0F0F0F\
Surface: #1A1A1A\
Border: #2A2A2A

### Light Mode

Background: #F5F5F5\
Surface: #FFFFFF\
Border: #E5E7EB

------------------------------------------------------------------------

## Pixel Perfect Strategy

To ensure 100% match:

-   Use 8px spacing system
-   Exact font sizes (Inter)
-   Exact border radius (12px cards, 8px buttons)
-   Compare against PDF at 100% zoom
-   No arbitrary spacing
-   Use Tailwind config for consistent tokens
-   CSS variables for theming

------------------------------------------------------------------------

## Responsiveness Strategy

-   375px → Sidebar collapses to drawer
-   768px → Adaptive table scrolling
-   1280px+ → Full layout with fixed sidebar

All components are built mobile-first.
