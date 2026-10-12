# Chiranjeev Prajapat: Portfolio

Static site (HTML, CSS, vanilla JS). No build step.

## Run
Open `index.html`, or `python -m http.server 8000` and visit http://localhost:8000

## Edit content
Everything lives in `js/projects-data.js` (SITE, SKILLS, PROJECTS). Set `SITE.email` to show an email button.

## Screenshots
Auto-loaded from `assets/projects/<slug>/desktop.jpg`, `mobile.jpg`, `fullpage.jpg`.
Retake with `python tools/capture-screenshots.py [slug]`.

## Dynamic features
Hover a project card: the full-page screenshot scrolls inside the browser frame. Case pages have a scrollable full-page viewer and click-to-zoom. Also: scroll progress bar, skills ticker, filters, prev/next case studies.

## Deploy
Upload the folder to Netlify, Vercel, GitHub Pages or Cloudflare Pages.
