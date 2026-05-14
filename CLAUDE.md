# CLAUDE.md — advh-website

This file tells Claude Code everything it needs to know about this project.

## Project Overview
Website for **Advokatfirmaet Holthe & Co AS** — a law firm in Hamar, Norway.
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Hosting:** Vercel (auto-deploys on push to `main`)
- **Content:** All website text lives in `/content/*.json` — edit these files to update the site
- **Admin:** `/admin` route — Claude-powered dashboard for the firm owner

## Design System (Variation 2 – Editorial Sophisticate)
```
Colors:
  Navy:       #1F3451 (primary)
  Navy Dark:  #152540
  Navy Light: #334860
  Gold:       #D99726 (accent)
  Gold Light: #E8B04A
  Gold Dark:  #B87E1E
  Cream:      #FAF9F5 (light sections)
  Light BG:   #ECF0F4

Typography:
  Serif:  Cormorant Garamond (headings, display, hero)
  Sans:   Inter (body, UI)

Patterns:
  - Gold left-border tag lines above section titles (uppercase, tracked)
  - Navy + Gold CTA buttons (pill shape)
  - Card hover: translateY(-6px) + gold border + shadow
  - Gold underline on article/service card hover (scaleX 0→1)
```

## File Structure
```
app/
  page.tsx                → Homepage
  advokat-bedrift/        → Business law page
  advokat-privat/         → Personal law page
  om-oss/                 → About page
  rettsavgjorelser/       → Case studies page
  kontakt/                → Contact page
  personvern/             → Privacy policy
  admin/page.tsx          → Admin dashboard (Claude-powered)
  api/
    contact/route.ts      → Contact form email sender
    admin/
      chat/route.ts       → Claude API integration
      commit/route.ts     → Commit content changes to GitHub
      commits/route.ts    → List commit history
      rollback/route.ts   → Roll back to a previous commit
      deploy/route.ts     → Vercel deployment status

components/
  layout/                 → TopBar, Navigation, Footer
  home/                   → Hero, Services, About, TrustSignals, CityBanner, Articles
  shared/                 → ContactSection (used on every page)

content/                  ← EDIT THESE to update website text
  site.json               → Global: firm info, nav, footer, contact
  home.json               → Homepage sections
  bedrift.json            → Business law page
  privat.json             → Personal law page
  om-oss.json             → About page
  rettsavgjorelser.json   → Case studies

public/
  logo.png
  bg3.jpg                 → Hero background (Hamar winter)
  Advokat 01.jpg          → Lawyer portrait
  Hamar City.webp         → City banner
```

## Key Conventions
- All content changes go in `/content/*.json` — no text hardcoded in components
- Norwegian (Bokmål) for all user-facing content
- New pages follow the pattern: `app/[slug]/page.tsx` importing from `content/[slug].json`
- API routes require `x-admin-password` header matching `ADMIN_PASSWORD` env var
- Images go in `/public/` — referenced as `/filename.jpg`

## Environment Variables
See `.env.example` for all required vars. Copy to `.env.local` before running.

## Running Locally
```bash
npm install
cp .env.example .env.local
# Fill in .env.local
npm run dev
# Visit http://localhost:3000
# Admin: http://localhost:3000/admin
```

## Deploying
Push to GitHub main branch → Vercel auto-deploys.
Set all env vars in Vercel project settings.
