# Medin Turkes — Portfolio

A cinematic, motion-driven developer portfolio built with **React + TypeScript + Vite**, **Framer Motion** and **Lenis** smooth scrolling.

Highlights: a WebGL flow-field hero (cursor-reactive, with topographic contour lines) behind a sticky hero the page slides over, a preloader curtain, scroll-lit manifesto text, sticky stacking service cards, a pinned horizontal work gallery, velocity-reactive marquees, a custom cursor and magnetic buttons. Fully responsive, EN/DE (auto-detected, remembered), keyboard-accessible and reduced-motion aware (smooth scroll, shader animation and transforms are disabled).

## Palette (ink + bone base, one ember signal)

| Role | Hex |
|------|-----|
| Ink (background) | `#070809` |
| Surface | `#121418` |
| Bone (text / light panel) | `#ECE8E1` |
| Ember (single signal color) | `#FF5A1F` |

Type: Geist (display/body), Instrument Serif italic (accents), Geist Mono (labels).

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:5173

## Build for production

```
npm run build
npm run preview
```

The static site is output to `/dist` — deploy that folder anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## GitHub Pages

If GitHub Pages shows a 404 for `/src/main.tsx`, it is serving the repository root `index.html` instead of the built app.

Use this flow:

```bash
npm run build
```

Then publish the contents of `dist/`, not the project root.

Notes:

- This project uses Vite, so the root `index.html` references `/src/main.tsx` only for local development.
- The production-ready files are generated into `dist/`.
- `vite.config.ts` uses `base: "./"` so the built site works on both a user page like `https://metur100.github.io/` and a repository page in a subfolder.

## Add your own images

Put your real project screenshots in `public/images/` using the exact filenames listed in `public/images/README.txt`. If a file is missing, the site shows a clean placeholder with the project initials — nothing breaks.

Recommended: 800 x 500 px (16:10), `.jpg` or `.png`.

## Where to edit content

| What | File |
|------|------|
| All text (EN + DE) | `src/i18n/index.tsx` |
| Projects list | `src/data/projects.ts` |
| Colors, spacing, layout | `src/styles.css` |
| Sections order | `src/App.tsx` |
| Motion primitives (reveals, cursor, shader, marquee) | `src/components/fx/` |
