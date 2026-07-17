# CIMILab Website — Project Blueprint

**Computation Informatics and Machine Intelligence Lab**
Prepared for: CIMILab website build
Scope: Research analysis → Information architecture → Tech stack → Full project tree → Page-by-page spec → Roadmap

---

## 0. Starting Point: What CIMILab Already Has

Before designing anything, it's worth being clear about what already exists, because it's the raw material the whole site should be built from — not generic placeholder text.

From the CIMILab GitHub organization (`github.com/CIMILab`):

- **Tagline:** *Building next-generation machine intelligence and computational systems for data-driven insights, intelligent decision-making, and real-world impact.*
- **Research pillars:** Machine Intelligence · Computational Informatics · Trustworthy AI Systems · Translational AI
- **Current research themes:** Medical/health AI (segmentation, prognosis, decision support) · Multimodal learning · Efficient AI for low-resource/edge settings · Human-centered, interpretable AI · Benchmarking & evaluation frameworks
- **Flagship / active repos:** `DSANet-ISLES` (stroke lesion segmentation), `StrokeDSANet_ISLES22`, `deploy_DSANet_ISLES22`, `Spinal_Lesion-VinDr-SpineXR` / `DERNet` (spinal lesion analysis), `BioMed-LLM`, plus planned internal tools `CIMILab-Bench` and `CIMILab-Deploy`
- **Reproducibility standard:** versioned data/pipelines, fixed seeds, documented training settings, reported ablations, scripted evaluation
- **Contact:** `deycimilab@gmail.com`

This tells us three important things that should shape the whole design:

1. CIMILab is **not** a general biology or wet-lab group — it's a computational/ML lab whose flagship work happens to concentrate in medical imaging AI (stroke, spine) plus a foundation-model project (BioMed-LLM). The visual identity and homepage story should read as "AI/CS research lab," not "hospital lab."
2. The GitHub org is already the lab's de facto reproducibility and open-science record. The website's job is to be the **human-facing front door** to that GitHub work — not a separate silo. Every project, dataset, and paper on the site should link straight back to its repo.
3. A lot of the copy already exists in good form in the org README. Migrating and expanding it is most of the "About" and "Research" page content — this isn't a blank-page problem.

---

## 1. What Top Research Lab Websites Do Well

I looked at patterns across leading CS/AI lab sites (MIT CSAIL, Stanford SAIL/HAI, Berkeley BAIR, DeepMind, Mila, Vector Institute — structurally, not their exact text) plus current write-ups on what separates strong lab sites from generic ones, and the popular `al-folio` academic template ecosystem that many CS labs build on. The recurring, evidence-backed patterns:

| Pattern | Why it matters | Source |
|---|---|---|
| The site has to serve several very different audiences in one place — prospective grad students/postdocs, peer researchers, funders, and the lab's own members needing to post updates. Prospective students are usually the highest-stakes audience, and they're comparing you against other programs in seconds. | Recruiting is a top job of the site, not an afterthought | <cite index="9-1,9-2">A research lab's website has more jobs than a typical marketing site — it needs to recruit graduate students, communicate with peers, and house publications and news, and prospective grad students and postdoc applicants are treated as the highest-stakes audience because the site has to read as serious and current, not generic</cite> |
| Credibility signals (affiliations, named advisors, publications) sit high in the page hierarchy, not buried under a click. Navigation is organized around how each audience actually thinks, not around internal org-chart logic. | First impressions form before anyone reads a proposal | <cite index="8-1">Credibility signals need to be visible early in the page hierarchy rather than hidden behind a navigation click a first-time visitor won't make, and the information architecture should reflect the order in which each audience actually wants to read the site</cite> |
| Research is organized around problems/projects with demos, screenshots, and video — not just a wall of paper titles. Students are shown alongside faculty. | Makes the work legible to non-specialists and signals an active lab | <cite index="5-1,5-2">The strongest lab sites organize research around problems and prototypes rather than papers alone, favor demonstrations — video, interactive demos, screenshots — over pure technical description, and prominently feature students alongside faculty to reinforce that the lab is an active learning environment</cite> |
| A simple "lab at a glance" stats strip (grants, papers, members) builds credibility fast without feeling like a brag wall. | One scrollable moment communicates momentum | <cite index="5-3">A live-style counter of grants or output on the homepage is one of the more memorable, high-credibility design choices seen on strong academic lab sites</cite> |
| Baseline feature set every good lab site needs regardless of visual style: research highlights, team bios, a real publications list, and a maintained news feed — plus a working contact path and responsive layout. | These are table stakes, not differentiators | <cite index="3-1">Common features across the best academic lab websites include research highlights, team information, publications, and lab news, presented with a clear structure and strong navigation</cite> |
| In the CS/ML academic world specifically, the dominant self-hosted pattern is: Markdown/YAML content, publications generated from a **BibTeX file** (not hand-typed HTML), a GitHub-repo/stats panel, dark mode, and a CV/people page — all statically generated and deployed on GitHub Pages for free. | This is the "known good" pattern your target audience (other CS labs, PhD applicants) already recognizes and expects | <cite index="12-1">The widely-used al-folio Jekyll theme for academics and research labs ships opinionated layouts for publications, people, projects, blogs, and CVs, with Markdown-first authoring, BibTeX-powered publications, and sensible defaults for navigation and SEO</cite>, and <cite index="14-1">supports GitHub repository and user-stats integration alongside dark mode and social previews out of the box</cite> |

**Translating this into decisions for CIMILab:**

- Homepage must answer "who are you, what do you build, why should I care" in one scroll — pillars + flagship projects + a stats strip, not a wall of text.
- Publications page is BibTeX-driven and filterable (by theme/pillar, year, author), not a hand-maintained list that silently rots.
- Every project (DSANet-ISLES, DERNet, BioMed-LLM…) gets its own page with problem framing, a figure/demo, results, and links to repo + paper + dataset — not just a GitHub link.
- People page separates PI / current members / alumni clearly, with photos and one-line research focus each — this is what applicants actually scan for.
- "Join Us" is a first-class nav item, not buried in "About" — this is your highest-value page for pipeline.
- News feed is low-effort to update (a single Markdown file per post) or it will die within a semester, which is the single most common failure mode of lab sites.

---

## 2. Goals by Audience

| Audience | What they need in under 30 seconds | Primary pages |
|---|---|---|
| Prospective PhD/MSc/undergrad researchers | Is this lab active, well-run, and doing work I care about? Is there a spot for me? | Home → Research → People → Join Us |
| Academic / clinical / industry collaborators | What exactly do they build, what's reusable, who do I email? | Research → Projects → Publications → Contact |
| Funders / reviewers / department | Track record, reproducibility standard, output volume | Publications → Research → About |
| Journalists / general public | One clear plain-language story of the lab's impact | Home → News → About |
| Current lab members (maintenance) | Can I add a paper/news item/person in 5 minutes without touching code? | Content workflow (Section 13) |

---

## 3. Tech Stack — *Current (As Built)*

> **Status: Completed.** The site has been fully migrated from the original Next.js 16 prototype to a zero-dependency static HTML/CSS/JS site. The Next.js source code is preserved in `src/` for reference only.

The guiding principle was **maximum simplicity**: no build step, no bundler, no Node.js required to edit or preview the site. Open any `.html` file in a browser and it works.

### 3.1 Active Stack

| Layer | Technology | Notes |
|---|---|---|
| **Markup** | HTML5 (semantic) | One `.html` file per page — no server-side rendering, no templates |
| **CSS** | Vanilla CSS design system (`site/assets/style.css`) + **Tailwind CSS v3 (CDN)** | All design tokens, component classes, and utilities are in `style.css`. Tailwind CDN is used as a utility fallback. `preflight` is disabled to avoid conflicts. |
| **JavaScript** | Vanilla JS modules — no framework | `nav.js`, `hero-canvas.js`, `stats-counter.js`, `filters.js`, `bibtex.js` |
| **Fonts** | Google Fonts (Inter, IBM Plex Serif, JetBrains Mono) | Loaded via `@import` in `style.css` |
| **Icons** | Inline SVG | No icon library dependency — all icons are hand-authored SVG paths |
| **Forms** | Formspree | Contact form posts to `formspree.io/f/YOUR_FORM_ID` — replace with actual endpoint |
| **Hosting** | Any static host — GitHub Pages, Netlify, or Vercel | Drag-and-drop the `site/` folder |
| **Analytics** | Not yet configured | Recommended: Plausible or Umami (privacy-friendly) |

### 3.2 How to Run Locally

```bash
# Option 1 — Python (zero-install)
python -m http.server 3000 --directory site

# Option 2 — npx serve
npx serve site

# Option 3 — VS Code Live Server
# Right-click site/index.html → Open with Live Server
```

Then open `http://localhost:3000`.

### 3.3 Deprecated / Reference Only

The original Next.js 16 / React 19 / TypeScript source is in `src/`. It is no longer the active codebase. Content Markdown and JSON files in `content/` were the data source for that build; the static site now has content embedded directly in the HTML pages.

| Deprecated Tool | Replacement in static site |
|---|---|
| Next.js (SSR/SSG) | Plain HTML files in `site/` |
| Astro Content Collections | Content embedded in HTML; JSON at `content/publications/publications.json` still referenced as source of truth |
| MDX / TypeScript | No framework; no transpilation step |
| Pagefind search | Not yet implemented — can be added via `npx pagefind --source site` |
| Decap CMS | Direct HTML editing; no CMS layer |

---

## 4. Information Architecture — *As Built*

```
site/                           ← Static site root
├── index.html                  ← Home (hero + canvas + stats + pillars + featured projects + news)
├── about.html                  ← About (mission, 4 pillars, reproducibility standard)
├── research.html               ← Research (4 pillar deep-dives with related project links)
├── projects.html               ← Projects listing (filterable by status + pillar)
├── publications.html           ← Publications (filterable by year/type + BibTeX copy)
├── people.html                 ← People (PI feature card + PhD student grid + open position)
├── news.html                   ← News listing (3 articles as clickable cards)
├── contact.html                ← Contact (lab info + Formspree form)
├── join-us.html                ← Join Us (open positions + guidelines + why CIMILab)
├── resources.html              ← Reproducibility standard + GitHub repo cards
├── 404.html                    ← Custom 404 page
├── projects/
│   └── dsanet-isles.html       ← DSANet-ISLES detail (problem/approach/results/sidebar)
│   └── dernet-spinal.html      ← DERNet detail
│   └── biomed-llm.html         ← BioMed-LLM detail
│   └── cimilab-bench.html      ← CIMILab-Bench detail (planned project)
│   └── cimilab-dataops.html    ← CIMILab-DataOps detail
│   └── cimilab-deploy.html     ← CIMILab-Deploy detail
├── news/
│   └── 2026-07-01-biomed-llm-launch.html
│   └── 2025-06-15-acl-bionlp-acceptance.html
│   └── 2025-01-10-new-members.html
└── assets/
    ├── style.css               ← Full design system + Tailwind config
    └── js/
        ├── nav.js              ← Sticky nav + mobile hamburger menu
        ├── hero-canvas.js      ← Hex-grid + particle canvas animation
        ├── stats-counter.js    ← Animated counters (IntersectionObserver)
        ├── filters.js          ← Tab filtering for projects + publications
        └── bibtex.js           ← BibTeX copy-to-clipboard
```

---

## 5. Content Data Model

Defining this up front means anyone can add content later just by filling in a template — no code required.

### Person
```yaml
name: string
role: PI | Postdoc | PhD Student | MSc Student | Undergrad RA | Visiting Researcher | Alumnus
photo: image
bio: markdown (short)
research_interests: string[]
email: string (optional)
links: { github, google_scholar, orcid, linkedin, personal_site }
pillar_tags: string[]        # links person to research pillars
status: current | alumni
alumni_now_at: string        # shown only if status = alumni
joined_date: date
```

### Publication (BibTeX + light front-matter overlay)
```
Standard BibTeX fields (title, author, year, venue, doi, url) plus:
tags: string[]                # e.g. [medical-ai, segmentation, benchmarking]
project_slug: string          # links to a Project page
pdf: file (optional, self-hosted preprint if allowed)
code_url / dataset_url: string
featured: boolean             # surfaces on homepage
```

### Project (flagship repos)
```yaml
title: string
slug: string
summary: string (1–2 lines)
status: active | planned | archived
pillar_tags: string[]
repo_url: string
paper_urls: string[]
demo_url: string (optional)
hero_image: image
body: markdown (problem, approach, results, figures)
```

### News item
```yaml
title: string
date: date
category: Publication | Award | Talk | Grant | Media | Team | General
summary: string
body: markdown
related_people: string[]
related_project: string (optional)
```

### Position (Join Us)
```yaml
title: string                 # e.g. "PhD Position — Multimodal Medical AI"
level: Undergrad | MSc | PhD | Visiting | Postdoc
status: open | closed
deadline: date (optional)
description: markdown
how_to_apply: markdown
```

---

## 6. Full Project Tree — *As Built*

```text
d:\Languages\CIMILab-Website\
├── site/                               ← ACTIVE STATIC SITE (HTML / CSS / JS)
│   ├── index.html                      ← Home page (Hero, Canvas, Stats, Pillars, Projects, News)
│   ├── about.html                      ← About CIMILab (Mission, 4 Pillars, Reproducibility Standard)
│   ├── research.html                   ← Research overview (Deep dives into the 4 pillars)
│   ├── projects.html                   ← Projects listing (Filterable by status and research pillar)
│   ├── publications.html               ← Publications (Filterable + one-click BibTeX copy)
│   ├── people.html                     ← People roster (PI, PhD students, RAs, and open positions)
│   ├── news.html                       ← News & announcements listing
│   ├── contact.html                    ← Contact page (Lab info + Formspree collaboration form)
│   ├── join-us.html                    ← Careers / open positions & prospective student guide
│   ├── resources.html                  ← Open science resources & reproducibility checklist
│   ├── 404.html                        ← Custom 404 error page
│   ├── projects/
│   │   ├── dsanet-isles.html           ← DSANet-ISLES detail page
│   │   ├── dernet-spinal.html          ← DERNet detail page
│   │   ├── biomed-llm.html             ← BioMed-LLM detail page
│   │   ├── cimilab-bench.html          ← CIMILab-Bench detail page (Planned)
│   │   ├── cimilab-dataops.html        ← CIMILab-DataOps detail page (Planned)
│   │   └── cimilab-deploy.html         ← CIMILab-Deploy detail page (Planned)
│   ├── news/
│   │   ├── 2026-07-01-biomed-llm-launch.html
│   │   ├── 2025-06-15-acl-bionlp-acceptance.html
│   │   └── 2025-01-10-new-members.html
│   └── assets/
│       ├── style.css                   ← Complete design system, tokens & Tailwind v3 config
│       └── js/
│           ├── nav.js                  ← Sticky navigation & responsive mobile hamburger menu
│           ├── hero-canvas.js          ← Animated hexagonal grid & particle canvas background
│           ├── stats-counter.js        ← IntersectionObserver animated stat counters
│           ├── filters.js              ← Tab filtering logic for projects & publications
│           └── bibtex.js               ← Copy-to-clipboard BibTeX citation helper
│
├── content/                            ← Original Markdown & JSON data source files (Reference)
│   ├── publications/publications.json
│   ├── team/*.md
│   ├── projects/*.md
│   └── news/*.md
│
├── src/                                ← Deprecated Next.js 16 / React 19 source code (Reference)
├── CIMILab-Website-Project-Blueprint.md ← This blueprint
└── README.md                           ← Setup & running instructions
```

---

## 7. Page-by-Page Spec

**Home** — Hero (tagline + one strong visual/animation reflecting data → decision-making), Stats strip (papers, active projects, GitHub stars, members), 4 Research Pillars as clickable cards, 3 Featured Projects, 3 Featured Publications, Latest News (3 items), closing "Join Us" call-to-action banner.

**About** — Full mission statement (from the org README, expanded), the 4 pillars explained in a paragraph each, PI bio + photo, lab's reproducibility standard, funding/affiliation logos if applicable.

**Research** — Grid of pillars → each pillar's page lists its current themes, related projects, and related publications pulled automatically by tag (no manual duplication).

**Projects** — Every flagship repo becomes a real page: problem statement, figure/diagram, method summary, results, and outbound links to the GitHub repo, paper, and demo (if any). Planned items (`CIMILab-Bench`, `CIMILab-Deploy`) get a "Planned" badge instead of being hidden — shows momentum honestly.

**Publications** — Filterable by pillar/tag, year, and author; each card shows title, authors, venue, year, tags, and one-click BibTeX copy + links to PDF/code/dataset. Auto-sorted newest first.

**People** — Current members grouped by role (PI → Postdocs → PhD → MSc → RAs), then an Alumni section with "now at" info. Each person links to a profile page with bio, interests, and their publications auto-filtered by author name.

**News** — Reverse-chronological feed with category tags (Publication/Award/Talk/Grant/Media/Team); each post is a single Markdown file, intentionally low-friction to add.

**Code & Software** — Auto-generated from the GitHub org (via the sync script): every public repo listed with description, stars, primary language, last-updated date — always in sync without manual edits.

**Join Us** — Open positions list (filter by level), general "always open to strong applicants" messaging, application instructions, link to the reproducibility standard (shows rigor to applicants), FAQ (funding, timeline, what to include in an application email).

**Contact** — Email, optional physical address/map, links to GitHub org and any social accounts, and a short collaboration-inquiry form (Formspree) so external partners have a frictionless first touchpoint.

**404** — On-brand, links back to Home/Research/People so a broken link doesn't dead-end a visitor.

---

## 8. Key Site-Wide Features

- Fully responsive (mobile-first), dark/light mode
- Static full-text search (Pagefind) across publications, people, and news
- SEO: sitemap, robots.txt, per-page OpenGraph images, JSON-LD (`Organization`, `ScholarlyArticle`, `Person`) so Google/Scholar-adjacent crawlers understand the content
- RSS feed for news
- Automated GitHub repo sync + citation-count sync via scheduled GitHub Action (no manual bookkeeping)
- WCAG 2.1 AA accessibility target (semantic HTML, alt text, keyboard navigation, contrast-checked palette)
- Lighthouse CI in the PR pipeline to catch performance/accessibility regressions before merge
- Issue templates so any lab member can *request* a content addition even without touching Git directly

---

## 9. Design Direction

CIMILab's actual work (deep learning on medical imaging, benchmarking, multimodal fusion) suggests a visual language of **structured data made human** rather than a clinical/hospital look or a generic "AI startup gradient." Suggested direction:

- **Typography:** a clean, modern grotesque/sans for UI (e.g. Inter, Söhne-style) paired with a slightly more editorial serif for pull-quotes/headlines, to avoid the generic "AI SaaS" sameness.
- **Color:** a restrained core palette (one deep ink/navy + one accent, e.g. teal or amber) rather than a loud purple-blue AI gradient — reads as more credible/academic while still feeling current.
- **Imagery:** real figures from your own papers (segmentation overlays, architecture diagrams, benchmark plots) used as hero/section art instead of stock "neural network" graphics — this is free, authentic, and unique to CIMILab.
- **Motion:** minimal, purposeful (fade/slide on scroll, animated stat counters) — never decorative for its own sake.

*(This section becomes directly actionable once we're in the build phase — happy to generate an actual visual moodboard or homepage mockup as a next step.)*

---

## 10. Content You'll Need to Supply

The structure above is ready to receive real content. What's still needed from the lab side:

- Confirm the official lab name display, university/department affiliation, and physical address (for Contact + footer + `Organization` structured data)
- PI name, title, photo, and bio
- Current member roster (name, role, one-line focus, photo, links) + alumni list
- A `.bib` export of the lab's actual publication list (Google Scholar → BibTeX export, or Zotero/EndNote export)
- Short write-ups (3–5 sentences each) for each flagship project, plus one hero figure per project
- Any existing logo/wordmark, or confirmation you'd like one designed
- Confirmed contact email (currently `deycimilab@gmail.com` per the GitHub org) and any social/lab accounts to link

---

## 11. Development Roadmap & Completed Status

| Phase | Description | Status |
|---|---|---|
| **Phase 0 — Skeleton & Design System** | Create `site/` folder and `site/assets/style.css` with core academic palette, tokens, and Tailwind CDN configuration. | ✅ **Completed** |
| **Phase 1 — Core JavaScript Modules** | Implement `nav.js` (sticky header, mobile drawer), `hero-canvas.js` (hex-grid particle animation), `stats-counter.js` (IntersectionObserver animated metrics), `filters.js` (tab filtering), and `bibtex.js` (copy-to-clipboard). | ✅ **Completed** |
| **Phase 2 — Core HTML Pages** | Build `index.html`, `about.html`, `research.html`, `projects.html`, `publications.html`, `people.html`, `news.html`, `contact.html`, `join-us.html`, `resources.html`, and `404.html`. | ✅ **Completed** |
| **Phase 3 — Detail HTML Pages** | Build individual project pages under `site/projects/*.html` (`dsanet-isles`, `dernet-spinal`, `biomed-llm`, `cimilab-bench`, `cimilab-dataops`, `cimilab-deploy`) and news articles under `site/news/*.html`. | ✅ **Completed** |
| **Phase 4 — Blueprint & Documentation** | Update Project Blueprint and README to accurately reflect the completed static HTML/CSS/Tailwind architecture. | ✅ **Completed** |

---

## 12. Deployment Plan

Because the active website (`site/`) consists purely of static `.html`, `.css`, and `.js` files, deployment requires zero servers, node packages, or build steps:

1. **GitHub Pages:** Push the repository to GitHub and set the GitHub Pages publishing source to the `/site` directory (or copy `site/*` to root/gh-pages branch).
2. **Netlify or Vercel:** Point the project to the repository and set the **Publish directory / Output directory** to `site`. Leave the build command empty.
3. **Traditional Web Server:** Simply upload the contents of the `site/` folder to any Apache, Nginx, or university web server directory via FTP/SSH.

---

## 13. Content Workflow (For Lab Members)

To update content on the static site:

1. **Adding/Editing People:** Open `site/people.html` and duplicate an existing person card (`<div class="card...">...</div>`), changing the name, role, photo, and bio.
2. **Adding a Publication:** Open `site/publications.html` and duplicate a `<div class="pub-card..." data-year="..." data-pillar="...">...</div>` block. Update the title, authors, venue, and `<pre class="bibtex-data">` block.
3. **Adding a Project:** Open `site/projects.html` to add the listing card, and create a new `site/projects/your-project.html` file by copying one of the existing project detail pages (like `dsanet-isles.html`).
4. **Adding a News Item:** Add a card to `site/news.html` and create a corresponding article page inside `site/news/`.

---

## 14. Summary of Migration

The migration from the Next.js 16 / React prototype to a zero-dependency static HTML/CSS/Tailwind site is fully executed and tested. All UI animations, design tokens, interactive tabs, responsive layouts, and content items have been preserved while eliminating build complexity, server dependencies, and framework overhead. The site is immediately ready for local development (`python -m http.server 3000 --directory site`) and production hosting.

