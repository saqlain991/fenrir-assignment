# Task Execution Plan

## Task 1: Screen 1 - Login (Sign-up page)
* **Layout:** Split-screen design.
* **Left Panel:** Dark gradient background featuring the product name ("aps"), tagline, and checkmarked feature list.
* **Right Panel:** White card containing the sign-up form.
    * Inputs: First name, Last name, Email address, Password (8+ characters).
    * Controls: Terms checkbox, Teal "Create account" button.
    * Social Logins: Apple, Google, Meta buttons.
* **Vibe:** Dark, premium, modern.

## Task 2: Screen 2 - Dashboard (Scan list)
* **Layout:** Full app layout with a left navigation sidebar.
* **Sidebar:** Links for Dashboard, Projects, Scans, Schedule, Notifications, Settings, Support, and a bottom user profile.
* **Header Stats:** Four severity counters (Critical, High, Medium, Low) displaying total counts and percentage changes.
* **Toolbar:** Search input, Filter button, Column button, and a Teal "+ New scan" CTA.
* **Data Table:** Columns for Scan Name, Type, Status (color-coded chips), Progress, Vulnerability badges, and Last Scan time.

## Task 3: Screen 3 - Active Scan Detail (Live console)
* **Layout:** Retains the left sidebar from Screen 2.
* **Top Header:** Circular progress indicator paired with a horizontal step tracker (Spidering, Mapping, Testing, Validating, Reporting) highlighting the active step in Teal.
* **Metadata Row:** Displays Scan Type, Targets, Started At, Credentials, Files, and Checklists.
* **Main Content Split:**
    * **Left Panel (Live Console):** Terminal-style log with "Activity Log" and "Verification Loops" tabs. Must feature inline syntax highlighting for URLs and keywords.
    * **Right Panel (Finding Log):** Vertically stacked vulnerability cards containing severity badges, timestamps, titles, and teal endpoint paths.
* **Bottom Footer:** Status bar showing sub-agents, parallel executions, and per-severity counts.