# Design System & Component Library Guidelines

## Theming Architecture
* **Native Feel:** Both dark mode and light mode must feel natively designed, not just inverted. Surfaces, borders, and shadows require careful adjustment per theme.
* **Global Toggle:** The theme toggle must trigger instant changes across the entire application.

## UI Elements
* **Cards & Tables:** Ensure generous padding; components must not feel cramped.
* **Interactive Components:** Buttons, chips, and badges must feature rounded corners, subtle borders, and distinct hover states. Strip away all default browser styling.
* **Log Output:** Terminal text requires timestamp formatting `[09:00:00]` and distinct color coding for server paths (e.g., `helpdesk.democorp.com`) and vulnerabilities (e.g., `**IDOR vulnerability**`).

## Bonus UI Enhancements (Optional but Recommended)
* Integrate skeleton loaders while mock data mounts.
* Add smooth screen transitions and micro-animations for UI elements.
* Build standalone, reusable React components for severity badges and status chips.
* Implement full keyboard navigation and ARIA accessibility labels.