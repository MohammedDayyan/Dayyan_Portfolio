## Dayyan Portfolio (Premium)

Recruiter-grade portfolio built with:

- **Next.js (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **Recharts** (interactive metrics)
- **Markdown blog** (frontmatter + server rendering)

## Quick start

Install deps and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## What to customize (most important)

- **Identity + links**: `data/site.ts`
  - Update GitHub / LinkedIn / email
  - Update your `metadataBase`, `sitemap.ts`, and `robots.ts` domain when you buy the domain
- **Projects**: `data/projects.ts`
  - Add real metrics (accuracy, latency, throughput) and links
- **Blog posts (Markdown)**: `content/blog/*.md`
  - Add new posts as `.md` files with frontmatter (`title`, `date`, `summary`, `tags`)
- **Resume PDF**: place your file at `public/resume.pdf`

## Pages

- `/` Home
- `/about`
- `/projects` + `/projects/[slug]`
- `/case-study/skin-health`
- `/blog` + `/blog/[slug]`
- `/resume` (includes “AI Resume Explainer”)
- `/contact`

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo into Vercel.
3. Build command: `npm run build`
4. Output: default (Next.js)

Done — Vercel handles SSL + CDN automatically.

## Notes

- `npm run build` is currently clean.
- If you want a real contact form (not mailto), we can add an API route + email provider later.
