# Medin Turkes — Portfolio

A dark, blueprint-themed developer portfolio built with **React + TypeScript + Vite**.

Signature interaction: a boot-up terminal intro that hands off into a **scroll-driven horizontal career timeline**. Fully responsive, EN/DE language toggle, keyboard-accessible, and reduced-motion aware.

## Palette (black + white base, steel structure, one amber signal)

| Role | Hex |
|------|-----|
| Ink (background) | `#0A0C10` |
| Panel (surface) | `#12161C` |
| Paper (white / text) | `#EAEEF2` |
| Steel (structure) | `#5E7C97` |
| Amber (single signal color) | `#E8A64B` |

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
