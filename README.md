# Chiranjeev Prajapat: Portfolio

A static site (HTML, CSS, vanilla JS). No build step, no dependencies.

## Run locally
Open `index.html` in a browser. For a local server instead:

    python3 -m http.server 8000     # then visit http://localhost:8000

## Edit your content
Everything is in **`js/projects-data.js`**:
- `SITE`: resume path, email, GitHub, LinkedIn, and `showPlaceholders`
- `PROJECTS`: for each of the 12 projects fill in `role`, `contribution`, `scope`, `process`, `challenges`, `learnings`, `images.cover`, `images.gallery`
- `SKILLS`: the skills grid

Empty fields show a dashed "To be added" note. Before publishing, set `showPlaceholders: false` to hide unfilled sections.

## Add your resume and screenshots
- Resume: `assets/resume/Chiranjeev-Prajapat-Resume.pdf`
- Screenshots: `assets/projects/<project>/...` (only images you are permitted to show)

## Files
- `index.html`: home (hero, work grid + filters, about, skills, contact)
- `case-study.html`: one reusable case-study template (`?project=<slug>`)
- `css/styles.css`, `js/main.js`, `js/case-study.js`, `js/projects-data.js`

## Deploy
Upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
