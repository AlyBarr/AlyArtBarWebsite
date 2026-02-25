# AlyArtBar Portfolio

**Alyssa Barrientos — Technical Artist**  
GitHub Pages portfolio · Single-page HTML, CSS, Vanilla JS. No build step required.

## Deploy to GitHub Pages

1. Create a repo named `yourusername.github.io`
2. Push this entire folder as the repo root
3. Go to Settings → Pages → Source: `main` branch, `/ (root)`
4. Site live at `https://yourusername.github.io`

## File Structure

```
index.html          ← single page, all sections
style.css           ← all styles + CSS custom properties
main.js             ← interactions, terminal, rendering
data/projects.js    ← YOUR CONTENT — edit this to update projects & R&D
assets/
  images/           ← drop project images here (16:9 recommended)
  resume.pdf        ← drop your resume here
STYLEGUIDE.md       ← full design system reference
```

## Updating Content

Edit `data/projects.js` only. That file contains:
- `PROJECTS` array — add/edit/remove projects
- `RND_ENTRIES` array — your R&D lab entries

Each project has: `featured` (true = large row, false = grid card), `title`,
`oneliner`, `bullets[]`, `tools[]`, `image`, and `links[]`.

## Contact Form

Uses Formspree (free). Create an account at formspree.io, get your form ID,
and replace `YOUR_ID` in the `<form action>` in `index.html`.

## Fonts

Loaded from Google Fonts via CDN. No files needed.
