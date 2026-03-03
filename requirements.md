# Project Requirements & Constraints

## Core Deliverables
* **R1: Recreate the UI:** Implement three distinct screens matching the design reference for both light and dark modes.

* **R2: Navigation:** Connect all three screens logically (e.g., Login transitions to Dashboard; Dashboard scan row opens Scan Detail).
* **R3: Interactivity:** Ensure functional tabs, theme toggles, filters, and responsive buttons (using toasts or modals for actions like "New Scan").
* **R4: Responsiveness:** The app must render flawlessly on Mobile (375px) and Desktop (1280px+). Sidebar must collapse on mobile, and tables must be scrollable.
* **R5: Mock Data:** Do not use a real backend; utilize realistic hardcoded JSON for logs, scans, and dashboard stats.

## R1 --- Recreate UI

Three screens:

1.  Login (Sign-up Split Layout)
2.  Dashboard (Scan Overview)
3.  Active Scan Detail (Live Console)

All screens must support:

-   Dark Mode
-   Light Mode
-   Pixel-perfect spacing
-   Exact color match
-   Accurate typography hierarchy

------------------------------------------------------------------------

## R2 --- Navigation

Flow:

Login → Dashboard\
Dashboard row click → Scan Detail

Use Next.js App Router.

------------------------------------------------------------------------

## R3 --- Interactivity

Must support:

-   Working theme toggle
-   Functional search filter
-   Column toggle
-   Tabs switch
-   Toast notifications (New Scan, Export, Stop Scan)
-   Sidebar navigation
-   Row click navigation

------------------------------------------------------------------------

## R4 --- Responsive

Mobile (375px):

-   Sidebar becomes drawer
-   Panels stack vertically
-   Tables scroll horizontally

Desktop (1280px+):

-   Fixed 240px sidebar
-   Split 60/40 console layout

------------------------------------------------------------------------

## R5 --- Mock Data

Use realistic hardcoded JSON:

-   15+ scans
-   Multiple logs
-   Multiple findings
-   Real timestamps
-   Real vulnerability counts

