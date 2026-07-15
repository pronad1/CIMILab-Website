# CIMILab Website Content Guide

This guide explains how lab members can add or edit content on the website without writing any code. The entire site is driven by Markdown and JSON files in the `/content` directory.

Any changes pushed to the `main` branch will automatically rebuild and deploy the site via GitHub Actions within a few minutes.

## Directory Structure

All editable content lives here:

```text
/content
├── news/               # Lab updates and announcements (.md)
├── projects/           # Detailed pages for flagship projects (.md)
├── team/               # Profiles for lab members (.md)
├── publications/       # Master list of publications (publications.json)
├── positions/          # Open positions for the Join Us page (positions.json)
└── site-config.json    # Global settings (stats, email, address)
```

## How to Edit or Add Content

You can do this entirely through the GitHub.com web interface:

1. Navigate to the `content/` folder in the repository.
2. Go into the specific subfolder (e.g., `news/`).
3. To **add** a new item, click `Add file` > `Create new file` in the top right.
4. To **edit** an existing item, click on the file and then click the pencil icon (`Edit this file`).
5. Write your content following the templates below.
6. Scroll down, click `Commit changes...`, and commit directly to the `main` branch.

---

## Content Templates

### 1. Adding a Team Member
Create a new file in `/content/team/` named `first-last.md`.

```markdown
---
name: "First Last"
role: "PhD Student"
title: "PhD Student, CS"
status: "current"
category: "phd"
photo: "/images/team/placeholder.png"
email: "your.email@university.edu"
links:
  scholar: "https://scholar.google.com/..."
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  website: "https://yourwebsite.com"
interests: ["Medical Imaging", "Deep Learning"]
order: 10
---
Your short biography goes here.
```
*Note: Valid categories are `pi`, `postdoc`, `phd`, `msc`, `ra`, `intern`, `collaborator`, `alumni`.*

### 2. Adding a News Post
Create a new file in `/content/news/` named `YYYY-MM-DD-short-title.md`.

```markdown
---
title: "New Paper Accepted at MICCAI 2026"
date: "2026-07-01"
category: "Publication"
tags: ["MICCAI", "Segmentation"]
summary: "Our new method for stroke lesion segmentation was accepted."
---
Write the full announcement here. You can use standard Markdown.
```
*Note: Valid categories are `Publication`, `Award`, `Talk`, `Team`, `Research`, `General`.*

### 3. Adding a Publication
Edit `/content/publications/publications.json` and add a new object to the array:

```json
{
  "id": "lastname2026title",
  "title": "Exact Title of the Paper",
  "authors": ["A. Lastname", "B. Lastname", "T. Dey"],
  "venue": "MICCAI 2026",
  "year": 2026,
  "type": "conference",
  "links": {
    "pdf": "https://arxiv.org/...",
    "doi": "10.1234/...",
    "code": "https://github.com/...",
    "bibtex": "@inproceedings{...}"
  },
  "tags": ["medical-health-ai", "multimodal-learning"],
  "featured": true
}
```
*Note: Valid types are `journal`, `conference`, `workshop`, `preprint`, `thesis`.*

### 4. Updating Site Statistics
Edit `/content/site-config.json` to update the numbers displayed on the homepage:

```json
  "stats": {
    "publications": 15,
    "members": 6,
    "activeProjects": 4,
    "yearsActive": 2
  }
```
