# Arc IMPACT — Design & architecture plan (updated)

## Brand & ownership

- **Business:** Arc IMPACT is **Emmanuel Lécuyer’s** professional coaching and events practice (with co-trainer **Alexandre Blandin** where relevant — see `.claude/content.md`).
- **Geographic anchor:** Copy, imagery, and structured data should emphasise **Savoie** — especially **Chambéry**, the **Lac du Bourget** basin, and the **La Féclaz** (Les Déserts) training site. Decorative photography may use **Unsplash** images evocative of **Alpine lakes and forests** (license: [Unsplash License](https://unsplash.com/license)); avoid implying another region unless describing a specific away stage.
- **Dedicated page:** **Emmanuel Lécuyer** — `/emmanuel-lecuyer` (or `/fr/...` per final routing), linked from the main nav as **« Emmanuel »** / **« About the coach »** / **« Il coach »** with full **FR / EN / IT** content maintained in Sveltia.
- **Third-party extract:** Public programme text once published on [Domaine de l’Abbaye de Maizières — séjour tir à l’arc (Bourgogne)](https://domaineabbayedemaizieres.com/bourgogne-sejour-tir-a-l-arc) is summarised in `docs/maizieres-sejour-archery-extract.md` for tone and fact-checking only; it **does not** relocate the business to Bourgogne.
- **Portrait:** Preferred file: client-approved headshot; initial URL `https://domaineabbayedemaizieres.com/images/tmpl/maizieres-emmanuel-lecuyer.jpg` — **mirror into `public/media/`** after rights confirmation (avoid long-term hotlinking).
- **Interview:** `docs/emmanuel-interview-2021.md` (2021 transcription).

## Design philosophy

Modern, nature-inspired design reflecting **mountain outdoor** archery (Savoie / Lac du Bourget). Clean and professional with a sense of adventure. Convey **personal expertise** and trust (20+ years, national team coaching) while staying inviting to newcomers.

## Colour palette

| Colour | Hex | Usage |
|--------|-----|-------|
| Forest green | #1B4332 | Primary — headers, CTAs, nav |
| Deep green | #2D6A4F | Secondary — accents, hover |
| Gold / amber | #D4A843 | Accent — highlights, medals, stats |
| Royal blue (optional pull from portrait) | ~#1e3a5f | Secondary UI accents, links on light sections |
| Charcoal | #2D2D2D | Text, dark backgrounds |
| Warm gray | #6B7280 | Secondary text |
| Off-white | #F5F5F0 | Backgrounds, cards |
| White | #FFFFFF | Cards, contrast |

## Typography
- **Headings**: Inter (Google Fonts) - clean, modern sans-serif
- **Body**: Inter - readable at all sizes
- **Accent/Numbers**: Playfair Display - elegant for statistics and quotes

## Page Structure (Single Page per Language)

### 1. Navigation (sticky)
- Logo + brand name
- Menu: **Accueil** | **Emmanuel Lécuyer** | **Stages** | **Séminaires / Collectivités** (or grouped) | **Installations** | **Galerie** | **Contact**
- Language switcher (FR | EN | IT) — prefer **language names** or short codes over flags (accessibility).
- Mobile hamburger menu

### 2. Hero Section
- Full-viewport height
- Background: Atmospheric forest/archery image with dark overlay
- Large headline: "L'Excellence du Tir à l'Arc depuis 20 ans"
- Subtitle: National team credentials
- CTA buttons: "Découvrir nos stages" + "Nous contacter"
- Scroll indicator animation

### 3. About / home teaser (organisation)
- Short block: **Arc IMPACT** + **Chambéry / Lac du Bourget / La Féclaz** + link to **full coach page**
- Optional: split layout with **regional** Unsplash hero (lake/mountain) + Emmanuel portrait card

### 3b. Dedicated page — Emmanuel Lécuyer
- Hero: approved portrait + headline with **Savoie** geography
- Sections: parcours, philosophie pédagogique, palmarès (FFTA 2003–2014), liens utiles (contact / stages)
- Pull quotes allowed from `docs/emmanuel-interview-2021.md` (edited for web length)
- Stat counters (scroll), e.g.:
  - 20+ years coaching
  - 53 medals & titles (national team period)
  - 12 seasons with French national 3D team (2003–2014)
  - World / European team highlights (from `.claude/content.md`)

### 4. Services/Stages Section
- Section heading with decorative line
- Grid of service cards (3 columns desktop, 1 mobile)
- Each card: icon, title, brief description, "En savoir plus" link
- Cards:
  1. Stage 3D (forest icon)
  2. Stage Salle/Indoor (building icon)
  3. Stage TAE/Outdoor (sun icon)
  4. Préparation Physique (dumbbell icon)
  5. Coaching Compétition (trophy icon)
  6. Stage Clubs (users icon)
  7. Animations & Team Building (party icon)
  8. Vente Cibles 3D (target icon)

### 5. Achievements/Palmarès Section
- Dark background with gold accents
- Timeline or medal showcase layout
- World Championships, European Championships results
- National team achievements 2003-2014

### 6. Facilities Section
- Image gallery/carousel of facilities
- La Féclaz, Savoie location
- Classroom, gymnasium, outdoor range, 3D course
- Map embed or location indicator

### 7. Gallery Section
- Masonry grid of photos
- Lightbox on click
- Categories: Training, Competitions, Facilities, Nature

### 8. Testimonials Section
- Carousel of testimonials
- Quote marks, names, context

### 9. Contact Section
- Split: Form left, info right
- Form fields: Name, Email, Phone, Subject (dropdown), Message
- Form submits to Cloudflare Worker → email
- Contact info: phone, email, location
- Social media links
- Small embedded map or location visual

### 10. Footer
- Logo and tagline
- Quick links
- Social media icons
- Legal: © + Privacy + Mentions légales
- Language switcher (secondary)

## Responsive Breakpoints
- Mobile: < 768px (single column, hamburger nav)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full layout, 3 columns)

## Animations & Interactions
- Scroll-triggered fade-in/slide-up (IntersectionObserver)
- Counter animation for statistics
- Smooth scroll to sections
- Parallax subtle on hero
- Hover effects on cards
- Mobile touch-friendly interactions

## SEO strategy (implementation)
- **Eleventy** emits `/index.html`, `/en/index.html`, `/it/index.html` plus inner routes; `sitemap.xml`, `robots.txt`, `hreflang`, canonical, OG tags, JSON-LD (home) in `layouts/base.njk`.
- hreflang link tags cross-referencing all versions
- Schema.org SportsOrganization + SportsActivityLocation structured data
- Open Graph and Twitter Card meta tags per language
- Descriptive title tags, meta descriptions per language
- Semantic HTML5 (header, nav, main, section, article, footer)
- Image alt text in each language
- XML sitemap with all language versions
- robots.txt allowing all crawlers
- Canonical URLs per language version
- Fast load: lazy images, minimal JS, Tailwind CDN

## Content management (Sveltia CMS)

- **Admin UI:** `admin/index.html` + `admin/config.yml` ([Sveltia](https://sveltiacms.app/en/docs/start)).
- **Locales:** `fr` (default), `en`, `it` — `multiple_folders` under `content/pages/{fr,en,it}/`.
- **Media:** `public/media/` → served as `/media/…` (adjust if the SSG changes base paths).
- **Auth:** PAT for power users; **[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)** on Cloudflare Workers for OAuth (see `docs/sveltia-cms-setup.md`).
- **Hosting cost:** $0 for public GitHub + Pages + Workers free tier (within limits).

## Cloudflare Worker (contact form)

- Endpoint receives POST (JSON), verifies **Turnstile**, sends mail via **HTTPS** provider API
- CORS allowlist must include **GitHub Pages** and **production domain** (`ALLOWED_ORIGINS`)
- See `worker/README.md`

## Accessibility
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text on all images
- Keyboard navigable
- Sufficient color contrast
- Focus indicators
- ARIA labels where needed
