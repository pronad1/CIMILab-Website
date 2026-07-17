# CIMILab Website

A fully static HTML/CSS/JavaScript website for the **Computation Informatics and Machine Intelligence Lab (CIMILab)** at the University of Missouri, MU Institute for Data Science and Informatics (MUIDSI).

## Tech Stack

| Layer | Technology |
|---|---|
| **HTML** | Semantic HTML5 |
| **CSS** | Vanilla CSS (design system) + Tailwind CSS v3 (CDN) |
| **JavaScript** | Vanilla JS (no framework, no bundler) |
| **Fonts** | Google Fonts — Inter, IBM Plex Serif, JetBrains Mono |
| **Icons** | Inline SVG (no icon library dependency) |

## Structure

```
site/
├── index.html            ← Home page
├── about.html            ← About CIMILab
├── research.html         ← Research pillars
├── projects.html         ← Project listing (filterable)
├── publications.html     ← Publications (filterable + BibTeX)
├── people.html           ← Team / People
├── news.html             ← News listing
├── contact.html          ← Contact + Formspree form
├── join-us.html          ← Open positions
├── resources.html        ← Reproducibility standard + repos
├── 404.html              ← Custom 404 page
├── projects/
│   ├── dsanet-isles.html
│   ├── dernet-spinal.html
│   ├── biomed-llm.html
│   └── ...
├── news/
│   └── *.html
└── assets/
    ├── style.css         ← Full design system CSS
    └── js/
        ├── nav.js        ← Sticky navbar + mobile menu
        ├── hero-canvas.js← Hex grid + particle animation
        ├── stats-counter.js← Animated counters (IntersectionObserver)
        ├── filters.js    ← Project/publication filter tabs
        └── bibtex.js     ← Copy BibTeX to clipboard
```

## Running Locally

Open any `.html` file directly in your browser, **or** start a local server:

```bash
# Option 1 — Python (built-in)
python -m http.server 3000 --directory site

# Option 2 — Node.js (npx serve)
npx serve site

# Option 3 — VS Code Live Server extension
# Right-click site/index.html → Open with Live Server
```

Then open `http://localhost:3000` in your browser.

## Deployment

This is a pure static site — deploy anywhere:

- **GitHub Pages**: push `site/` folder, configure source
- **Netlify**: drag-and-drop the `site/` folder
- **Vercel**: configure `site/` as the output directory
- Any static CDN or web server

## Updating Content

Content is embedded directly in the HTML files. To update:

| What | Where |
|---|---|
| Team members | `site/people.html` |
| Projects | `site/projects.html` + `site/projects/*.html` |
| Publications | `site/publications.html` |
| News | `site/news.html` + `site/news/*.html` |
| Lab info / contact | `site/contact.html`, `site/index.html` footer |
| Design tokens | `site/assets/style.css` — `:root {}` section |

## Original Next.js Source

The original Next.js 16 / React 19 source code is in `src/`. It is no longer the active site but is preserved for reference.

## Contact

- **Email**: deycimilab@gmail.com
- **GitHub**: [github.com/CIMILab](https://github.com/CIMILab)
- **Location**: MU Institute for Data Science and Informatics, University of Missouri, Columbia, MO
