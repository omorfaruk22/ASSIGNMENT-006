# FitLog — Workout Library

A dark, responsive workout library built with Next.js App Router, TypeScript, Tailwind CSS, Lucide icons, and Sonner toasts. Workout data comes from the FitLog API and the personal plan/saved list persists in localStorage.

## Technologies
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- React
- Lucide React
- Sonner

## Key Features
1. Responsive home page with workout library and API data.
2. Workout detail page with specs, instructions, add-to-plan, and save actions.
3. My Plan page with Today's Plan and Saved tabs plus live Exercises, Minutes, and Calories metrics.
4. Sort by Duration, Calories, or Rating with Duration as the default.
5. localStorage persistence, toast notifications, loading state, and 404/error handling.

## API
- All workouts: https://api.abcz.workers.dev/api/fitlog
- Single workout: https://api.abcz.workers.dev/api/fitlog/:id

## Implementation note
The main route files contain the complete UI code directly. They do not depend on custom UI component imports for the Navbar, Hero, Library cards, My Plan cards, Details sections, metrics, or footer. This keeps the assignment code easy to inspect and edit hands-on.

## Run locally
```bash
npm install
npm run dev
```
