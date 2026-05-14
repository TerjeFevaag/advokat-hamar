# advh-website — Setup Guide

Website for **Advokatfirmaet Holthe & Co AS**
Built with Next.js 14 · Tailwind CSS · Deployed on Vercel

---

## Prerequisites

Install these before starting:
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Claude Code](https://claude.ai/code) — `npm install -g @anthropic-ai/claude-code`

---

## Step 1 — Open in VS Code

```bash
cd advh-website
code .
```

---

## Step 2 — Install Dependencies

In VS Code terminal:
```bash
npm install
```

---

## Step 3 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `ADMIN_PASSWORD` | Make up a strong password (you'll use this to log into /admin) |
| `GITHUB_TOKEN` | GitHub → Settings → Developer settings → Personal access tokens → Generate (needs `repo` scope) |
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | The name of the repo you'll create in Step 5 |
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens → Create |
| `VERCEL_PROJECT_ID` | Found in Vercel project → Settings → General |
| `EMAIL_*` | Your Gmail/SMTP credentials for contact form |

---

## Step 4 — Add Images to /public

Copy these files into the `public/` folder:
- `logo.png` — firm logo
- `bg3.jpg` — hero background (Hamar winter scene)
- `Advokat 01.jpg` — lawyer portrait
- `Hamar City.webp` — city banner image

(These are already in your Advokat desktop folder — just copy them in.)

---

## Step 5 — Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `advh-website` (private)
3. Don't add README or .gitignore (we already have them)
4. Run in VS Code terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/advh-website.git
git push -u origin main
```

---

## Step 6 — Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo `advh-website`
3. Framework: **Next.js** (auto-detected)
4. Add all your environment variables from `.env.local`
5. Click **Deploy**

Vercel will give you a URL like `advh-website.vercel.app`. Every future push to `main` auto-deploys.

---

## Step 7 — Connect Your Domain

In Vercel → Project → Settings → Domains:
- Add `advh.no`
- Follow DNS instructions (add A/CNAME records at your domain registrar)

---

## Step 8 — Run Locally

```bash
npm run dev
```
- Website: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Step 9 — Use Claude Code in VS Code

Open VS Code terminal and run:
```bash
claude
```

Claude Code reads `CLAUDE.md` automatically. You can now prompt it:
- *"Add a new practice area called Immaterielle rettigheter to the bedrift page"*
- *"Make the hero title bolder and add a subtitle"*
- *"Create a new page for team members"*

Claude Code will edit the files, you review the diff, then push to deploy.

---

## Admin Dashboard

Visit `/admin` on your live site. Log in with your `ADMIN_PASSWORD`.

**Tabs:**
- **Rediger innhold** — Chat with Claude (Sonnet 4.6) to update any text on the site. Claude shows what will change, you click "Publiser" and it commits to GitHub + auto-deploys.
- **Versjonshistorikk** — See all commits. Click "Gjenopprett" to roll back to any previous version.
- **Deployment** — See live Vercel deployment status.

---

## Project Structure Quick Reference

```
content/          ← All website text (JSON files — edit these!)
  site.json       → Global info, nav, footer, contact details
  home.json       → Homepage sections
  bedrift.json    → Business law page
  privat.json     → Personal law page
  om-oss.json     → About page
  rettsavgjorelser.json → Case studies

app/              ← Next.js pages
components/       ← React components
public/           ← Images
```

---

## Updating Content (Without Admin Dashboard)

Edit any file in `/content/` and push to GitHub. That's it.

```bash
# Example: change the hero tagline
# Edit content/home.json → hero.body
git add content/home.json
git commit -m "Update hero tagline"
git push
# Vercel deploys in ~60 seconds
```
