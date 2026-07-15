# CIMILab Website — Project Blueprint
**Computation Informatics and Machine Intelligence Lab**
Prepared as an end-to-end architecture and content plan for building the lab's public website.

Stack decided: **Next.js (static export)** · **Content via Markdown/JSON on GitHub** · **Hosted on GitHub Pages**

---

## 0. Executive Summary

CIMILab has strong research substance (four research pillars, five active research themes, six repositories including an active stroke-lesion-segmentation project) but no public face. This document is the complete plan for turning that GitHub-org README into a real, professional research lab website — one that a PhD applicant, a journal reviewer, or an industry collaborator would trust within ten seconds of landing on it.

The approach in one sentence: **a statically-exported Next.js site whose content (team, projects, publications, news, open positions) lives in plain Markdown/JSON files inside the repo**, so any lab member can add or edit content directly on GitHub.com without touching a line of React — and GitHub Actions rebuilds and redeploys the site automatically on every push.

---

## 1. Benchmarking — What the Best Research Lab Websites Get Right

| Lab / Site | Standout pattern | Why it matters for CIMILab |
|---|---|---|
| **BAIR** (Berkeley AI Research) | Leads with hard numbers — faculty count, student count, research areas — right on the research/about pages | We should surface stats (active projects, publications, members) prominently, even at our current scale |
| **HCIL** (U. Maryland) | Organizes research around *problems and prototypes*, not just papers; demos and screenshots before dense text | Our flagship repos (DSANet-ISLES, DERNet) should get demo-first project pages, not just a GitHub link |
| **AESB Lab** (NUS) | Live-style animated stat counter; consistent, authentic photography of real lab environments | Cheap to build, high perceived credibility — good fit for our homepage |
| **BBML** (Biomimetic Materials Lab) | Concept communicated visually *before* any paragraph of text | Our four research pillars should each get one clear image/icon + a one-line concept, not a wall of text first |
| **Mila** | Dedicated "responsible/trustworthy AI" section woven through the site, not buried in a footer | Maps directly onto our existing "Trustworthy AI Systems" pillar — give it real visual presence |
| **Personal/lab site research (Jennifer van Alstyne, The Social Academic)** | PI gets their own page (bio, photo, contact, research philosophy); co-PIs get the same treatment; a funders/partnerships page is recommended wherever relevant | We should give the PI a real profile page, not just a name in a list |

**Non-negotiables this implies for CIMILab:**
1. A real "Research" page organized by the four pillars already defined (Machine Intelligence, Computational Informatics, Trustworthy AI Systems, Translational AI) — concept-first, not text-first.
2. Individual **project pages** for flagship repos, demo-first (screenshots/GIFs/notebook previews), each carrying the same Active/Planned status labels already used in the GitHub README.
3. A **People** page with a proper PI profile and real bios for every member — not just a name grid.
4. Visible **stats** (publications, active projects, years active, members) somewhere above the fold on the homepage.
5. A clear **Join Us** page, since the lab already actively recruits RAs, MSc, PhD, and visiting researchers.
6. A **Reproducibility / Resources** page — this is a genuine differentiator few labs bother to make visible, and CIMILab already has the standard written out.

---

## 2. Recommended Architecture

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router, TypeScript)** | Chosen stack; scalable, huge ecosystem, easy to hand off to future students |
| Rendering mode | **Full static export** (`output: 'export'`) | GitHub Pages only serves static files — no Node server, no API routes, no ISR |
| Styling | **Tailwind CSS** | Fast to build a professional, consistent academic UI; pairs natively with Next.js |
| Content | **Markdown (YAML frontmatter) + JSON**, parsed at build time | Matches your choice — anyone can edit a `.md`/`.json` file directly on GitHub.com, no local setup needed |
| Hosting | **GitHub Pages**, org root repo `CIMILab.github.io` | Free, matches your choice, gives a clean root URL: `https://cimilab.github.io/` |
| CI/CD | **GitHub Actions** | Auto-builds and redeploys on every push to `main` |
| Forms | **Formspree** (or similar third-party form endpoint) | Static hosting has no backend — contact/application forms need an external POST target |
| Icons / motion | **lucide-react**, **Framer Motion** | Both are client-side only, so they work fine inside a static export |

### Important constraints of "Next.js + GitHub Pages" (and how we handle them)

| Constraint | Mitigation |
|---|---|
| No Next.js Image Optimization server | Set `images.unoptimized = true` in `next.config.js`; serve pre-sized images from `/public` |
| No API routes / server actions | All data is resolved at **build time** from `/content`; forms go to Formspree instead |
| No ISR/SSR, no middleware | Fine — a lab site's content changes at the pace of a `git push`, not per-request |
| Project-repo URLs get a `/repo-name/` subpath | Solved by naming the repo exactly `CIMILab.github.io` so it serves at the **root** domain instead |
| Client-only search/filter (e.g., publications) | Use React state + a lightweight fuzzy-search lib (`fuse.js`) — dataset size (dozens–hundreds of papers) doesn't need a server |

---

## 3. Information Architecture (Sitemap)

```
/                      Home
/about                 About the Lab (mission, philosophy, affiliation)
/people                Team grid (PI, students, postdocs, alumni)
/people/[slug]         Individual member profile (optional deep page, PI gets one for sure)
/research              Research Pillars + Current Research Themes
/projects              Flagship project list (DSANet-ISLES, CIMILab-Bench, CIMILab-DataOps,
                        CIMILab-Deploy, DERNet, BioMed-LLM, ...)
/projects/[slug]       Individual project page (demo-first: media, status, links, contributors)
/publications          Filterable/searchable publication list + BibTeX export
/news                  Lab news / blog (paper acceptances, talks, awards)
/news/[slug]           Individual news post
/join-us               Open positions (PhD, MSc, RA, visiting researcher) + how to apply
/resources             Reproducibility Standard, released datasets/benchmarks, software/tools
/collaboration         Academic / industry / open-source collaboration info + partner logos
/contact               Contact form, email, social links
/policies              License, Code of Conduct, Citation policy, Acknowledgments
/404                   Not found page
```

Each route pulls from exactly one `/content` subfolder (see §4), so adding a page's worth of content never requires touching `/src`.

---

## 4. Content Model (what a lab member actually edits)

All content lives under `/content`. Everything here is plain text — safe to edit in the GitHub.com web editor.

**`content/site-config.json`** — global settings
```json
{
  "labName": "Computation Informatics and Machine Intelligence Lab",
  "shortName": "CIMILab",
  "motto": "Building next-generation machine intelligence and computational systems for data-driven insights, intelligent decision-making, and real-world impact.",
  "email": "deycimilab@gmail.com",
  "github": "https://github.com/CIMILab",
  "social": { "twitter": "", "linkedin": "" },
  "stats": { "publications": 0, "members": 0, "activeProjects": 2, "yearsActive": 1 }
}
```

**`content/team/*.md`** — one file per person
```md
---
name: "Dr. [PI Name]"
role: "Principal Investigator / Lab Director"
status: "current"        # current | alumni
category: "pi"           # pi | postdoc | phd | msc | ra | intern | collaborator | alumni
photo: "/images/team/pi.jpg"
email: "deycimilab@gmail.com"
links:
  scholar: ""
  github: ""
  linkedin: ""
  orcid: ""
interests: ["Explainable AI", "Medical Image Segmentation", "Uncertainty Quantification"]
order: 1
---
Two or three sentences of real bio — background, research philosophy, what drew them to this work.
```

**`content/projects/*.md`** — one file per flagship project
```md
---
title: "DSANet-ISLES"
slug: "dsanet-isles"
status: "Active"              # Active | Planned | Completed
pillar: "machine-intelligence" # machine-intelligence | computational-informatics | trustworthy-ai | translational-ai
themes: ["medical-health-ai"]
summary: "Interpretable multi-architecture ensemble for stroke lesion segmentation."
repoUrl: "https://github.com/CIMILab/StrokeDSANet_ISLES22"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/dsanet-isles-cover.png"
contributors: ["pi-slug", "student-slug"]
featured: true
order: 1
---
Full description: problem statement, approach, results, what makes it interpretable.
```

**`content/publications/publications.json`** — array, one object per paper
```json
[
  {
    "id": "dey2026dsanet",
    "title": "Paper title here",
    "authors": ["A. Author", "B. Author"],
    "venue": "MICCAI 2026",
    "year": 2026,
    "type": "conference",
    "links": { "pdf": "", "doi": "", "code": "", "bibtex": "" },
    "tags": ["medical-imaging", "segmentation"],
    "relatedProject": "dsanet-isles"
  }
]
```

**`content/news/*.md`** — one file per post, filename = date-prefixed slug
```md
---
title: "DSANet-ISLES paper accepted"
date: "2026-07-01"
tags: ["publication"]
---
Short announcement body in Markdown.
```

**`content/positions/positions.json`** — open roles
```json
[
  { "role": "MSc Thesis Student", "level": "graduate", "description": "...", "deadline": "", "applyLink": "mailto:deycimilab@gmail.com" }
]
```

**`content/_templates/`** — blank copies of each schema above, so a student can duplicate a file instead of writing frontmatter from memory (see §8).

---

## 5. Design System Direction

- **Visual motif:** subtle node-and-edge (graph/network) linework in hero and section backgrounds — reads as "computation + intelligence" without being a cliché circuit-board texture.
- **Palette:** deep ink navy (`#0B1220`) as the anchor, one electric accent (teal or cyan, e.g. `#22D3B8`) for CTAs/links/status highlights, warm neutral grays for body text and cards. Full dark-mode variant (a research audience skews toward dark-mode readers).
- **Typography:** a clean technical sans (Inter or IBM Plex Sans) for UI and body; a slightly more distinctive sans or serif for headings to avoid looking like a generic dashboard template.
- **Homepage modules, in order:** Hero (motto + one-line CTA) → animated stat counters → 4 research-pillar cards (concept-first, icon + one line each) → featured/active project spotlight → latest news strip → partner/collaborator logos → footer CTA ("Interested in joining us?").
- **Reused convention:** the Active / Planned / Completed status badge already used in your GitHub README should appear consistently on every project card and project page — it's a small thing that signals the lab actually tracks its own work.
- **Targets:** WCAG AA contrast, Lighthouse performance/accessibility ≥ 90, all imagery with real alt text (a lot of lab sites fail this).

---

## 6. Complete Project Tree

```
cimilab-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── content/
│   ├── site-config.json
│   ├── team/
│   │   ├── pi-name.md
│   │   └── ...
│   ├── projects/
│   │   ├── dsanet-isles.md
│   │   ├── cimilab-bench.md
│   │   ├── cimilab-dataops.md
│   │   ├── cimilab-deploy.md
│   │   ├── dernet-spinal.md
│   │   └── biomed-llm.md
│   ├── publications/
│   │   └── publications.json
│   ├── news/
│   │   └── 2026-07-01-example-post.md
│   ├── positions/
│   │   └── positions.json
│   └── _templates/
│       ├── team-member.md
│       ├── project.md
│       └── news-post.md
├── public/
│   ├── CNAME                       # only if/when a custom domain is added
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       ├── logo/
│       ├── team/
│       ├── projects/
│       ├── partners/
│       └── og/
├── docs/
│   └── CONTENT_GUIDE.md            # "how to add content" guide for non-devs
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── people/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── research/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── publications/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── join-us/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── collaboration/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── policies/page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── PillarsGrid.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── NewsTicker.tsx
│   │   │   └── PartnerLogos.tsx
│   │   ├── people/
│   │   │   ├── MemberCard.tsx
│   │   │   └── PIProfile.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── publications/
│   │   │   ├── PublicationList.tsx
│   │   │   ├── PublicationFilters.tsx
│   │   │   └── CiteButton.tsx
│   │   ├── news/
│   │   │   └── NewsCard.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Container.tsx
│   │       └── SectionHeading.tsx
│   ├── lib/
│   │   ├── content.ts              # reads/parses /content at build time
│   │   ├── types.ts                # Project, Member, Publication, NewsPost interfaces
│   │   ├── constants.ts
│   │   └── utils.ts
│   └── styles/
│       └── theme.ts                # design tokens: colors, spacing, fonts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── next-sitemap.config.js
├── package.json
├── .eslintrc.json
├── .gitignore
└── README.md
```

---

## 7. Deployment Pipeline

**Step 0 — repo naming (do this first):** create the new repository *inside the CIMILab org* named **exactly** `CIMILab.github.io`. This is the one special name GitHub Pages recognizes as an org's root site — it publishes to `https://cimilab.github.io/` with no subpath, instead of `https://cimilab.github.io/repo-name/`.

**`next.config.js`**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
module.exports = nextConfig;
```

**`.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in the repo's **Settings → Pages**, set Source to "GitHub Actions." Every push to `main` — including a content-only edit made in the browser — rebuilds and redeploys automatically. If the lab later buys a domain (e.g. `cimilab.org`), just drop a `CNAME` file with that domain into `/public` and update DNS — no other change needed. *(GitHub Actions marketplace action versions move over time — worth a quick check against current Next.js static-export deployment docs before first use.)*

---

## 8. Content Workflow for Non-Developer Lab Members

Since the team is comfortable editing structured files but not writing React, `docs/CONTENT_GUIDE.md` should spell out, in plain steps:

1. Go to the `content/` folder on GitHub.com.
2. Open the matching subfolder (e.g. `team/` to add a person, `news/` to post an update).
3. Click a template file in `content/_templates/`, copy it, click "Add file → Create new file" in the real folder, paste, fill in the blanks between the `---` lines and the text below.
4. Commit directly to `main` (or open a pull request first, if the lab wants a review step — recommend enabling branch protection + required review once there are 3+ contributors).
5. The site rebuilds automatically within ~1–2 minutes; no local setup, no `npm install`, ever required for a content-only change.

This keeps the barrier to "add a publication" or "add a new RA" at roughly the same effort as editing the GitHub org README you already have.

---

## 9. Build Roadmap

| Phase | Scope |
|---|---|
| **Phase 0 — Setup** | Repo creation, Next.js + Tailwind scaffold, design tokens, GitHub Actions pipeline live and deploying a placeholder page |
| **Phase 1 — MVP** | Home, About, People, Research (4 pillars + 5 themes), Projects (seeded from the 6 existing repos), Contact — i.e., everything already written in the GitHub org README, just given a real interface |
| **Phase 2 — Depth** | Publications system (filter/search/BibTeX), News/blog, Join Us page with live positions, Resources/Reproducibility page |
| **Phase 3 — Polish** | Dark mode, animations/stat counters, SEO (sitemap, OG images, metadata), accessibility pass, analytics |
| **Phase 4 — Launch** | Custom domain (optional), submit to Google Search Console, link from the GitHub org README and each repo's README |

---

## 10. What to Gather From the Lab Before/During Build

- High-resolution lab logo and any already-decided brand colors
- Real photos + short bios for the PI and every current member
- Actual publication list (a BibTeX export is ideal — drops straight into `publications.json`)
- Real funders/grants and any partner/collaborator logos to display
- Preferred public contact email and physical address (if any) for the Contact page
- Confirmation on custom domain plans, if any, beyond the free `cimilab.github.io`

---

*This blueprint is the foundation — next step is scaffolding Phase 0 (the actual Next.js project) whenever you're ready.*
