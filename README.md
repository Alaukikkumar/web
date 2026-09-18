# Alaukik Kumar — Industrial Automation Engineer Portfolio

A static, product-style portfolio for SCADA / PLC / EMS / industrial data work, built as an interactive "digital control room".

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion (lazy-loaded) · Lucide icons · hand-drawn SVG.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in ./out
npm run typecheck
npm run lint
```

`./out` can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3).

## Before deploying — fill these in

| Where | What |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` (env) | Production domain. Used for canonical URLs, sitemap, robots and Open Graph. Defaults to `https://www.example.com`. |
| `src/data/site.ts` → `email` | Enables the **Email me** button and the email fallback for the contact form. |
| `src/data/site.ts` → `linkedin` | Shows the **View LinkedIn** button (hidden while empty) and adds `sameAs` to the JSON-LD. |
| `src/data/site.ts` → `resumeUrl` | Path to a real CV in `/public` (e.g. `/alaukik-kumar-cv.pdf`). Shows **Download CV**; until then the button reads **Request full CV**. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` (env, optional) | A form backend that accepts JSON POST (e.g. Formspree). Without it the form opens the visitor's email client; without an email either, it shows a "not configured" notice. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (env, optional) | The `content` value from Google Search Console's "HTML tag" verification method. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` (env, optional) | The `content` value from Bing Webmaster Tools' meta-tag verification. |

## Pages

- `/` — home (all sections)
- `/case-studies/` — overview: benefits matrix, what was added and who benefits, per project
- `/projects/<slug>/` — full case studies (at a glance + 10 sections)
- `/resume/` — printable web resume

## SEO built in

Per-page titles, descriptions and canonical URLs · Open Graph / Twitter images · `sitemap.xml` and `robots.txt` ·
JSON-LD: `Person` + `WebSite` (all pages), `ProfilePage` (home), `CollectionPage` + `ItemList` + `BreadcrumbList` (case studies),
`Article` + `BreadcrumbList` (each case study).

## Logo concepts

`design/logo-options/` holds six logo concepts (`logo-options.png` compares them). Once one is chosen it replaces
`src/components/layout/LogoMark.tsx` and `src/app/icon.svg`.

## Structure

```
src/
  app/                  routes, metadata, sitemap, robots, OG image, 404
    projects/[slug]/    case-study pages (static params)
    resume/             printable web resume built from real data
  components/
    layout/             Navbar, Footer, LogoMark
    sections/           one file per home-page section
    projects/           ProjectPanel, ProjectFilterList, ProjectDetail, ProjectVisual, visuals/*
    diagrams/           IndustrialIcon (SVG glyph set), FlowDiagram, Sparkline
    signature/          DataLine — the moving SENSOR → PLC → SCADA → DATABASE → REPORT line
    ui/                 buttons, headings, badges, counter
    providers/          MotionController (shared IntersectionObservers)
  data/                 all copy and content (site, projects, stack, experience, systems, engineering…)
  lib/                  hooks and utilities
```

All text content lives in `src/data/` — edit there, not in components.

## Adding real project screenshots

1. Put images in `public/projects/<slug>/` (compressed WebP/AVIF, ~1600px wide).
2. Add them to that project's `gallery` array in `src/data/projects.ts`:
   ```ts
   gallery: [{ src: "/projects/electroplating-scada/overview.webp", alt: "SCADA overview screen", caption: "Overview" }]
   ```
3. The first image replaces the animated placeholder on the project panel and case-study hero; all images appear in the case-study gallery.

Only publish screens you have permission to share.

## Content rules followed

- No client names, costs, production numbers, savings percentages, testimonials, logos, certifications or awards.
- The only numbers shown as facts come from supplied information (career start 2021, 12 RS485 rectifiers, education year).
- Results are qualitative. Every SCADA-style visual and value is labelled **Demo system**, **Concept visual** or **Simulated**.
- Code snippets under "Under the screen" are labelled illustrative and simplified.

## Performance & accessibility notes

- Fully static HTML; no images or video to download; fonts self-hosted via `next/font`.
- Continuous animations are CSS transforms/opacity, paused automatically when their section is off-screen.
- Live demo values (hero, SCADA room) only tick while visible.
- `prefers-reduced-motion` disables packets, auto-play, sweeps and live ticking.
- Semantic landmarks, one `h1` per page, skip link, visible focus rings, keyboard-operable tabs, slider and filters, labelled form fields with inline errors.
