# AlyArtBar Portfolio — Style Guide & Site Plan
# Alyssa Barrientos | Technical Artist | v1.0 MVP

---

## STACK DECISION
Plain HTML + CSS + Vanilla JS.
No framework. Reasons:
  - Zero build step → instant GitHub Pages deploy
  - You control every byte → fast load, easy to read
  - Easy to migrate to React/Astro later when you're ready to scale
  - Content in a JS data array → works like a lightweight CMS

File structure:
  index.html          ← single page, all sections
  style.css           ← all styles, CSS custom properties
  main.js             ← interactions, data, terminal intro
  data/projects.js    ← your project array (easy to update)
  assets/
    fonts/
    images/
    resume.pdf

---

## COLOR SYSTEM

```css
:root {
  /* Foundation */
  --c-void:      #020810;   /* page background — near-black with blue cast */
  --c-abyss:     #060f1e;   /* card / section backgrounds */
  --c-trench:    #0b1f36;   /* input fields, secondary containers */
  --c-depth:     #0f3050;   /* borders, dividers, card edges */

  /* Ocean-to-Space mid tones */
  --c-current:   #1a5c72;   /* hover borders, active states */
  --c-thermal:   #1f8a7a;   /* secondary accent */

  /* Bioluminescent accents — USE SPARINGLY */
  --c-biolume:   #3dffd0;   /* primary glow: cursor, CTAs, key labels */
  --c-seafoam:   #7eeedd;   /* softer teal: secondary links, tags */
  --c-nebula:    #a78bfa;   /* purple: R&D section ONLY, cosmic signal */

  /* Text */
  --c-star:      #e8f4f8;   /* primary text — not pure white */
  --c-mist:      #8ab0c4;   /* body copy, secondary text */
  --c-ghost:     #4a6a7a;   /* placeholders, disabled, timestamps */

  /* Utility */
  --c-amber:     #f0a050;   /* WIP status badge */
  --c-success:   #3dffd0;   /* same as biolume — LIVE badge */

  /* Grain overlay — applied as SVG filter pseudo-element */
  --grain-opacity: 0.032;
}
```

Usage rules:
- --c-biolume appears on: cursor ring, primary CTA background, active nav dot,
  card top-border on hover, R&D LIVE badge, skill tag borders
- --c-nebula appears on: R&D section header only, EXPLORING status dots
- Never put --c-biolume text on --c-star background (contrast fails)
- Never use more than 3 accent colors visible at once in any viewport

---

## TYPOGRAPHY

Google Fonts imports (add to <head>):
  Cormorant Garamond — 300, 600, 700 (display, titles)
  Fira Code          — 400, 500       (labels, tags, terminal, mono)
  DM Sans            — 300, 400       (body, nav, descriptions)

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-mono:    'Fira Code', 'Courier New', monospace;
  --font-body:    'DM Sans', system-ui, sans-serif;

  /* Fluid type scale */
  --text-hero:    clamp(3rem, 8vw, 7rem);
  --text-display: clamp(1.8rem, 4vw, 3rem);
  --text-title:   clamp(1.1rem, 2vw, 1.5rem);
  --text-body:    clamp(0.9rem, 1vw, 1rem);
  --text-label:   0.72rem;   /* always fixed — caps, tracked */
  --text-micro:   0.65rem;

  /* Letter spacing */
  --track-wide:   0.2em;
  --track-wider:  0.35em;
}
```

Pairing logic:
- Hero name "AlyArtBar" / "Alyssa Barrientos" → Cormorant 700, --text-hero
- Section titles → Cormorant 600, --text-display
- Project names → Cormorant 600, --text-title
- All labels, tags, status badges, nav links → Fira Code, --text-label, uppercase
- All paragraph copy, descriptions, bullets → DM Sans 300-400, --text-body
- Terminal intro text → Fira Code

---

## SPACING SYSTEM

```css
:root {
  --space-xs:   0.5rem;
  --space-sm:   1rem;
  --space-md:   2rem;
  --space-lg:   4rem;
  --space-xl:   7rem;
  --space-2xl:  11rem;

  --radius-sm:  3px;
  --radius-md:  6px;
  --radius-lg:  12px;

  --border-1:   1px solid var(--c-depth);
  --border-glow: 1px solid var(--c-biolume);
}
```

Section vertical rhythm: --space-xl top + bottom (7rem each)
Card internal padding: --space-md (2rem)
Card grid gap: 1.5rem
Between label and title: --space-xs
Between title and body: --space-sm

---

## MOTION RULES

Principles:
- "Ambient not reactive" — background moves on its own, slowly
- "Responsive not flashy" — UI responds to user, never surprises
- All transitions: ease-out or cubic-bezier(0.16, 1, 0.3, 1)
- Duration budget: 200ms micro | 400ms UI | 800ms reveals | 3-8s ambient

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --dur-micro:   180ms;
  --dur-ui:      350ms;
  --dur-reveal:  700ms;
  --dur-ambient: 8s;
}
```

Motion inventory:
  Ambient:
    - Starfield particles: CSS animation, random drift, 6-12s loop
    - Hero gradient: radial pulse, 10s ease-in-out infinite alternate
    - Orb blobs: translate X/Y, 14-20s, very subtle

  On load:
    - Terminal intro (optional, skippable, <3s)
    - Hero content: clip-path wipe, staggered, 700ms total

  On scroll:
    - Section reveals: IntersectionObserver → clip-path inset(0 0 100% 0)
      to inset(0 0 0% 0), 600ms, no slide (no translateY bounce)
    - Cards stagger: 80ms delay per card child

  On hover:
    - Buttons: background shift + subtle box-shadow glow, 180ms
    - Cards: border-color → --c-biolume, translateY(-3px), 350ms
    - Card internal: radial gradient from cursor position (JS, per-card)
    - Nav links: underline scale scaleX(0→1), 200ms
    - Cursor: scale and fill on hover elements

  Disable all motion if: prefers-reduced-motion: reduce

---

## COMPONENT STRUCTURE

### Nav
- Fixed top, transparent → blurs to rgba(2,8,16,0.85) + backdrop-filter on scroll
- Left: "AB" monogram in Cormorant | brand name in Fira Code small
- Right: links in Fira Code label size, uppercase, tracked
- Mobile: hamburger → slide-in drawer from right

### Hero
- 96vh, flex center-left (not dead center — gives visual weight)
- Layers (back to front):
    1. Starfield canvas (fixed, very slow, low opacity)
    2. 2-3 radial gradient orbs (CSS, animated, blurred)
    3. Grain texture pseudo-element (fixed)
    4. Content: eyebrow → name → rule → title → tagline → CTAs

- Eyebrow: "// cs student · technical artist" — Fira Code, --c-biolume
- Name: "Alyssa Barrientos" — Cormorant 700, --text-hero
- Subname: "AlyArtBar" — Cormorant 300 italic, smaller, --c-mist
- Divider: 60px line, gradient left-to-right --c-biolume → transparent
- Title: discipline tags as pill spans
- Tagline: 1-2 lines, DM Sans 300
- CTAs: 2 buttons (Projects primary, Resume ghost) + Contact text link

### Discipline Strip
- Full-width, marquee scroll, CSS animation
- Content: tags separated by ✦ glyph
- Slows on hover (animation-play-state: paused + transition)

### About
- 2-col: photo/sigil left (40%), text right (60%)
- Photo: grayscale + teal color overlay via CSS filter
- If no photo: procedural SVG sigil (circular, rune-like, subtle animation)
- Opening line in Cormorant display size, rest DM Sans
- No skill bars. No skill percentages. Not worth it.

### Projects
- 2 featured rows (alternating image/text), then 3-col card grid
- Featured: full-width, image 55%, text 45%, image has overlay gradient
- Cards: 3-col desktop, 2-col tablet, 1-col mobile
- Card anatomy:
    - Top border: 1px, color on hover only
    - Category tag: Fira Code, pill
    - Title: Cormorant title
    - One-liner: DM Sans, --c-mist
    - "What I did" bullets: 3 max, DM Sans 300, small
    - Tool tags: Fira Code micro, border pills
    - Links: text links with ↗ prefix

### R&D Lab
- Horizontal list layout (not grid) — feels more like a log
- Section bg: slight --c-nebula micro-glow on scroll-in
- Each entry: status dot | title | hypothesis | finding | artifact links
- Status dots: colored, pulsing on LIVE
- "Lab Notebook" framing — authentic WIP entries welcome

### Contact
- Centered, minimal
- Large Cormorant headline
- Email as copyable link
- Social icons row (GitHub, LinkedIn)
- Optional: small 3-field form (name, email, message)
- Note: GitHub Pages can't process forms natively — use Formspree (free tier)

### Footer
- Single line, Fira Code micro
- "designed & built by alyssa barrientos · alyartbar · 2025"

---

## STARTER COPY

### Hero
Eyebrow:  // cs student · technical artist · pipeline explorer
Name:     Alyssa Barrientos
Brand:    AlyArtBar
Title tags: [procedural systems] [tools & pipelines] [technical art]
Tagline:
  "I build the systems artists live in —
   and the art that systems make possible."

### About (full draft)
"""
I'm a computer science student specializing at the intersection of
engineering and visual craft. My work lives in the space where a
Python script meets a particle simulation, where a USD pipeline
makes a 40-step process into one.

I build tools that give artists more time to be artists. I write
systems that make procedural worlds feel handmade. I'm drawn to
the parts of production that nobody else wants to touch — and I
find them fascinating.

Currently exploring: procedural geometry in Houdini, USD composition
and non-destructive pipeline design, real-time rendering workflows,
and anything that makes a computer say something beautiful.

Early career, always building. Open to internships and collaborative
projects in VFX, games, and real-time environments.
"""

### Project Template
Title:      [Project Name]
Oneliner:   [What this is in one plain sentence]
What I did:
  - [Technical contribution 1 — specific, yours]
  - [Technical contribution 2]
  - [Technical contribution 3 max]
Tools:      [Houdini] [Python] [Maya] [USD] [etc]
Status:     Complete / WIP / Archived
Links:      [GitHub placeholder] [Demo/Video placeholder]
Thumbnail:  [image placeholder — 16:9 recommended]

### R&D Entry Template
Title:      [Short, specific, technical]
Status:     LIVE / WIP / EXPLORING / ARCHIVED
Hypothesis: [One sentence — what were you testing?]
Finding:    [What you actually learned — honest about failure]
Artifacts:  [Links only to things that actually exist]

---

## THE RECRUITER TEST (keep pinned)

A senior TA or hiring manager should:
  < 8 seconds  → know what you do (hero)
  < 20 seconds → find a project type (nav + tags)
  < 60 seconds → get a technical depth signal (R&D)
  < 3 clicks   → reach your contact or resume from anywhere

Everything else is for you. That's fine. Both things can be true.
