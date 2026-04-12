# Arc IMPACT - Website Refactor Project

## Project overview
Refactoring **Arc IMPACT** (Emmanuel Lécuyer, Savoie — Chambéry, Lac du Bourget, La Féclaz) into a multilingual, SEO-oriented static site on **GitHub Pages**, with **Cloudflare Workers** for forms and optional CMS OAuth. **No paid servers** required beyond free-tier limits.

## Tech stack
- **Eleventy (11ty)** — builds Markdown in `content/pages/` → `_site/`
- **Nunjucks** — layouts under `content/pages/_includes/`
- **Tailwind CSS** (CDN) + `assets/css/style.css`
- **Vanilla JavaScript** — `assets/js/main.js`
- **GitHub Pages** — deploy via **GitHub Actions** (`.github/workflows/pages.yml`)
- **Cloudflare Workers** — contact form + Turnstile (`worker/`)

## Project structure
```
/                         → French site root (when built)
/en/                      → English
/it/                      → Italian
/admin/                   → Sveltia CMS (index.html + config.yml)
/content/pages/{fr,en,it}/→ Markdown managed by Sveltia
/public/media/            → Uploaded media (CMS)
/assets/css/style.css     → Custom styles
/assets/js/main.js        → Core JavaScript
/assets/js/i18n.js        → i18n helper (optional)
/assets/images/           → Static image assets
/worker/                  → Cloudflare Worker (contact + Turnstile)
/eleventy.config.cjs      → Eleventy configuration
/package.json             → `npm run build` / `npm run dev`
/docs/sveltia-cms-setup.md→ CMS + hosting tutorial
```

## Languages
- **French (fr)** - Primary language
- **English (en)** - Secondary
- **Italian (it)** - Secondary

## Design System
- **Colors**: Forest green (#1B4332), Gold (#D4A843), Charcoal (#2D2D2D), Off-white (#F5F5F0)
- **Typography**: Inter (headings), Source Serif Pro (body)
- **Style**: Modern, clean, nature-inspired with archery imagery

## SEO Requirements
- Semantic HTML5 elements
- Proper hreflang tags for multilingual
- Schema.org structured data (SportsOrganization)
- Open Graph + Twitter Card meta tags
- XML sitemap + robots.txt
- Alt text on all images
- Performance: lazy loading images, minimal JS

## Contact Form
Submissions go to a Cloudflare Worker endpoint that forwards to email via mail provider API.

## Content sources
- Legacy: `docs/legacysite/` and arcimpact.eu assets where applicable.
- **Coach page:** `content/pages/*/emmanuel-lecuyer.md`; interview `docs/emmanuel-interview-2021.md`; Maizières reference extract `docs/maizieres-sejour-archery-extract.md`.
- Decorative: **Unsplash** (Alpine / lake mood — [license](https://unsplash.com/license)).
