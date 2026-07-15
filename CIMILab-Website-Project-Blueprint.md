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

## 3. Recommended Tech Stack

The lab already lives on GitHub and has no dedicated web developer long-term — so the stack should optimize for **zero hosting cost, content that non-coders can edit through GitHub, and fast/SEO-friendly static output**, while still looking as polished as a funded industry-lab site.

### 3.1 Stack comparison

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Astro + Tailwind + Content Collections** *(recommended)* | Ships near-zero JS by default (fastest possible loads), first-class typed Markdown/MDX "content collections" that map 1:1 to People/Publications/Projects/News, can drop in React only where interactivity is actually needed (filters, search, theme toggle), best-in-class SEO defaults | Slightly newer ecosystem than Next.js | ✅ Best fit for a content-heavy, mostly-static lab site |
| Next.js (React) + Tailwind + MDX | Huge ecosystem, easy if the team already knows React, great for later dashboards/interactive demos | Ships more client JS by default, more moving parts than needed for a mostly-static site | Good alternative if you plan lots of interactive demos (live model playgrounds etc.) |
| Jekyll + `al-folio` | Battle-tested in academia, free on GitHub Pages out of the box, BibTeX publications built in | Ruby toolchain (fiddly on Windows), harder to customize deeply, dated component model | Good zero-build fallback if you want something running *this week* |
| Hugo | Extremely fast builds | Templating language (Go templates) is less approachable for future contributors | Fine, but no strong advantage over Astro here |
| WordPress / Webflow / Wix | No-code editing | Recurring cost, heavier pages, harder to keep a clean Git history of content, feels "corporate template" not "research lab" | Not recommended — fights the lab's GitHub-native workflow |

**Recommendation: Astro**, with an `al-folio`-inspired content model (BibTeX publications, Markdown people/projects/news) but a fully custom, modern visual design built with Tailwind — so the site gets academia's proven information architecture without looking like a template everyone recognizes.

### 3.2 Supporting tools

| Concern | Tool | Notes |
|---|---|---|
| Styling | Tailwind CSS | Utility-first, fast to keep consistent |
| Content | Markdown/MDX + YAML front-matter, validated with Zod schemas (Astro Content Collections) | No database needed; content lives in Git |
| Publications | `.bib` file parsed at build time | One BibTeX entry = one publication card; standard academic workflow |
| Full-text search | Pagefind | Static, zero server cost, indexes publications/news/people at build time |
| Interactive bits | React islands (Astro "islands architecture") | Only the filter bar, search box, and theme toggle ship JS — rest of the page stays static HTML |
| Citation/metrics sync | **OpenAlex API** (free, no key required) or Semantic Scholar Graph API | Pulls citation counts / venue metadata by DOI to keep publication cards current. *Do not scrape Google Scholar* — it blocks scraping and it's against their terms; OpenAlex is the standard open alternative |
| GitHub stats sync | GitHub REST API via a small Node script in CI | Auto-lists org repos with stars/language/last-updated on a "Code & Software" page |
| Non-technical editing (Phase 2, optional) | Decap CMS (Git-based, free) | Gives a form UI on top of the same Markdown files for members who don't want to touch code |
| Contact / collaboration form | Formspree (or a small serverless function) | Static site can't handle form POST natively; Formspree is free at low volume |
| Analytics | Plausible or Umami (privacy-friendly, no cookie banner needed) — GA4 as a fallback if the university requires it | Matches an "open, trustworthy" research ethos |
| Hosting | GitHub Pages (free, matches the org's existing GitHub-native workflow) **or** Vercel (free tier, nicer previews/custom domains) | Recommend Vercel for DX + preview deployments per PR; GitHub Pages works equally well if you want everything under `github.com/CIMILab` |
| CI | GitHub Actions | Build check, link checker, Lighthouse CI, and the scheduled citation/repo-sync scripts |

---

## 4. Information Architecture (Sitemap)

```
Home
├── About                       (mission, pillars, PI bio, affiliations)
├── Research
│   ├── Overview                (4 pillars + current themes)
│   └── /research/[pillar]      (one page per pillar, links out to related projects+papers)
├── Projects                    (flagship repos as first-class project pages)
│   └── /projects/[slug]        (DSANet-ISLES, DERNet, BioMed-LLM, CIMILab-Bench, CIMILab-DataOps, CIMILab-Deploy, …)
├── Publications                (filterable/searchable, BibTeX-driven)
│   └── /publications/[slug]    (optional deep page per paper: abstract, BibTeX, links)
├── People
│   ├── Current Members         (PI, postdocs, PhD/MSc students, RAs)
│   └── Alumni
│   └── /people/[slug]          (individual profile)
├── News                        (papers accepted, awards, talks, new members, media)
│   └── /news/[slug]
├── Code & Software              (auto-synced GitHub org repos, datasets, model cards)
├── Join Us                     (open positions: undergrad/MSc/PhD/visiting researcher, how to apply)
├── Contact                     (email, location/map, social, collaboration inquiry form)
└── 404
```

Utility routes: `/rss.xml` (news feed), `/sitemap-index.xml` (SEO), `/robots.txt`.

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

## 6. Full Project Tree

```text
cimilab-website/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml                 # build + deploy on push to main
│   │   ├── ci-checks.yml              # lint, typecheck, build, broken-link check, Lighthouse CI
│   │   └── sync-data.yml              # scheduled: pull GitHub repo stats + OpenAlex citation counts
│   └── ISSUE_TEMPLATE/
│       ├── add-publication.md         # guided template so members can request a paper be added
│       ├── add-news-item.md
│       └── add-team-member.md
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── files/
│       └── cv/                        # optional downloadable CVs/one-pagers
│
├── src/
│   ├── assets/
│   │   └── logo/                      # source vector logo, wordmark, social-card template
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── NavBar.astro
│   │   │   └── SeoHead.astro          # meta tags, OpenGraph, JSON-LD structured data
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── ResearchPillars.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   ├── FeaturedPublications.astro
│   │   │   ├── LatestNews.astro
│   │   │   └── StatsStrip.astro       # "lab at a glance" counters
│   │   ├── publications/
│   │   │   ├── PublicationCard.astro
│   │   │   ├── PublicationFilters.tsx # React island: filter by tag/year/author
│   │   │   └── BibtexModal.tsx        # "cite this" copy-to-clipboard
│   │   ├── people/
│   │   │   ├── PersonCard.astro
│   │   │   └── AlumniList.astro
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro
│   │   │   └── StatusBadge.astro      # Active / Planned / Archived
│   │   ├── news/
│   │   │   └── NewsCard.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Tag.astro
│   │       ├── ThemeToggle.tsx        # light/dark mode island
│   │       └── SearchBox.tsx          # Pagefind-powered search island
│   │
│   ├── content/
│   │   ├── config.ts                  # Zod schemas for every collection below
│   │   ├── people/
│   │   │   ├── pi-*.md
│   │   │   ├── phd-*.md
│   │   │   └── alumni-*.md
│   │   ├── publications/
│   │   │   └── papers.bib
│   │   ├── projects/
│   │   │   ├── dsanet-isles.md
│   │   │   ├── dernet-spinal.md
│   │   │   ├── biomed-llm.md
│   │   │   ├── cimilab-bench.md
│   │   │   ├── cimilab-dataops.md
│   │   │   └── cimilab-deploy.md
│   │   ├── news/
│   │   │   └── *.md
│   │   ├── positions/
│   │   │   └── *.md
│   │   └── pages/                     # freeform long-form pages
│   │       ├── about.md
│   │       └── reproducibility-standard.md
│   │
│   ├── data/
│   │   ├── site.ts                    # site name, tagline, socials, contact email
│   │   ├── nav.ts                     # nav + footer link config
│   │   └── github-repos.generated.json # written by scripts/fetch-github-repos.mjs
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   ├── PersonLayout.astro
│   │   └── ProjectLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── research/
│   │   │   ├── index.astro
│   │   │   └── [pillar].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── publications/
│   │   │   └── index.astro
│   │   ├── people/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── news/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── code-and-software.astro    # auto-synced GitHub org repo listing
│   │   ├── join-us.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts
│   │
│   ├── styles/
│   │   └── global.css                 # Tailwind entry + design tokens
│   │
│   └── utils/
│       ├── bibtex-parser.ts
│       ├── date.ts
│       └── seo.ts
│
├── scripts/
│   ├── fetch-github-repos.mjs         # GitHub REST API → src/data/github-repos.generated.json
│   ├── fetch-citation-counts.mjs      # OpenAlex API, by DOI, → merged into publication cards
│   └── generate-og-images.mjs         # auto social-share images per page
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── .env.example                       # GITHUB_TOKEN, FORMSPREE_ID, ANALYTICS_ID
├── .eslintrc.cjs
├── .prettierrc
├── CONTRIBUTING.md                    # "how to add a paper/person/news item" for lab members
├── LICENSE                            # MIT (code) — content usually CC-BY separately
└── README.md
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

## 11. Development Roadmap

**Phase 0 — Setup (1–2 days)**
Repo scaffold, Astro + Tailwind install, design tokens, deploy pipeline to a staging URL so the supervisor can watch progress live.

**Phase 1 — MVP content skeleton (1 week)**
Home, About, Research, People, Projects, News, Contact, Join Us — all wired to the content collections, populated with the real content already available from the GitHub org README, placeholders clearly marked for what's pending from Section 10.

**Phase 2 — Interactivity (3–5 days)**
Publication filters, Pagefind search, dark mode, BibTeX copy, collaboration form.

**Phase 3 — Automation (2–3 days)**
GitHub repo sync script, OpenAlex citation sync, auto OG-image generation, RSS feed.

**Phase 4 — Polish & launch (2–3 days)**
Accessibility pass, Lighthouse performance pass, custom domain + SSL, final content review with supervisor, launch.

**Phase 5 — Maintenance (ongoing)**
Lab members add news/publications/people via short PRs or issue templates; a standing "content refresh" reminder each semester.

---

## 12. Deployment Plan

- **Recommended:** Vercel free tier connected to the `CIMILab` GitHub org repo — automatic preview deployments on every PR, easy custom domain (e.g. `cimilab.org` or a university subdomain), no server to maintain.
- **Alternative:** GitHub Pages, deployed via the `deploy.yml` Action — keeps everything under `github.com/CIMILab`, zero external accounts needed, slightly less DX polish (no PR previews without extra config).
- Either way: a real custom domain is worth acquiring — it reads as far more credible than a `github.io` URL on a grant application or a conference poster.

---

## 13. Content Workflow (for non-webmaster lab members)

1. **Adding a publication:** append one entry to `src/content/publications/papers.bib` (any reference manager can export this) → open a PR → merges → live.
2. **Adding a news item:** copy an existing file in `src/content/news/`, fill in the front-matter, write 2–3 sentences → PR → live.
3. **Adding/updating a person:** same pattern in `src/content/people/`.
4. **Non-coders:** use the GitHub web editor directly (no local setup needed) to edit any Markdown file, or file one of the pre-built Issue Templates and let the webmaster merge it. Phase-2 option: add Decap CMS for a full form-based editing UI over the same files.

---

## 14. Next Steps

This document is the blueprint — nothing has been built yet. Good next actions, in order:

1. Confirm the tech stack choice (Astro is the recommendation above; say the word if you'd rather use Next.js).
2. Send over what you already have from Section 10 (member list, publication export, PI bio) — even partial is fine, placeholders can fill the rest.
3. I can scaffold the actual Phase 0/1 codebase next — real files, real folder structure, a working homepage you can preview.

