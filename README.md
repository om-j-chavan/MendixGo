# ⚡ MendixGo

A **Duolingo-style app to master Mendix** — daily streaks, XP, hearts, spaced repetition, and an installable PWA with reminders. Built for Om's interview prep, upskilling, and the Cortex build project.

## Courses
- 🎯 **Interview Prep** — the real Mendix interview questions (Three M / MXTechies), scenarios, integration, and practical hands-on drills.
- 🐍 **Python** — learn to code from scratch (variables → functions → OOP → a bridge to FastAPI).
- 🧠 **Cortex Build** — the Cortex spaced-repetition SaaS build course (Modules 0–7).
- 📜 **Intermediate Exam Prep** — Mendix Intermediate certification, exam-blueprint units.

## Features
- Bite-size lessons with instant feedback, hearts, and combos.
- Exercise types: multiple choice, select-all, term↔meaning match, **tap-to-reveal Q&A** (with self-rating), and **order-the-steps**.
- **Spaced repetition** (SM-2) — reveal cards return at the right time; a daily **Review** session.
- **Gamification** — XP, levels, daily goal, streaks, badges.
- **PWA** — installable to your phone home screen, works offline, optional **daily reminder** notification.
- **Accounts** — per-user progress, stored locally in the browser.

## Tech
Vite 5 · React 18 · TypeScript · Tailwind 3 · Zustand · Framer Motion · vite-plugin-pwa.
Pinned versions for Node 22.11 compatibility — do not blind-upgrade to React 19 / Vite 8.

## Run
```bash
npm install
npm run dev      # http://localhost:5181
npm run build    # -> dist/  (static, deploy anywhere)
npm run preview
```

## Deploy
Static output in `dist/`. `netlify.toml` is included. Any static host works
(Netlify / Vercel / GitHub Pages) — the app uses `HashRouter` + relative base
so it runs from any path.

## Content integrity
Course content is authored from Om's own study material and fact-checked; questions
are original (no proprietary Mendix exam text). See `docs/PRD.md` for the full spec.
