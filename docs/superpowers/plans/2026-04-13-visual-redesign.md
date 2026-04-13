# Visual Redesign — Arc IMPACT

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Arc IMPACT from a clean functional site into a visually stunning, inspiring, professional sports brand website — without changing content, functionality, or project structure.

**Architecture:** Pure visual/CSS redesign. All changes in templates (Nunjucks), CSS, and base layout. No new dependencies, no JS changes needed. Same Eleventy build, same content files.

**Tech Stack:** Tailwind CSS (CDN), custom CSS, Nunjucks templates, Google Fonts

---

## File Map

| File | Change | Responsibility |
|------|--------|---------------|
| `content/pages/_includes/layouts/base.njk` | Modify | Update fonts (Cormorant Garamond replaces Playfair Display), Tailwind config colors, add decorative SVG grain texture |
| `assets/css/style.css` | Modify | Full CSS overhaul: refined variables, glassmorphism header, dramatic hero, elegant cards, sophisticated animations, decorative elements |
| `content/pages/_includes/partials/header.njk` | Modify | Glassmorphism header, refined nav with hover effects, improved mobile menu |
| `content/pages/_includes/layouts/home.njk` | Modify | Dramatic hero with particle-style decorations, better section rhythm, refined stats/pillars/services sections |
| `content/pages/_includes/partials/footer.njk` | Modify | Elegant multi-tier footer with decorative top border |
| `content/pages/_includes/partials/page-hero-header.njk` | Modify | More dramatic inner page heroes with gradient mesh |
| `content/pages/_includes/layouts/event-product.njk` | Modify | Refined content layout with better typography |
| `content/pages/_includes/partials/testimonials-section.njk` | Modify | More polished testimonials with better cards |
| `content/pages/_includes/partials/contact-form.njk` | Modify | Refined form with floating labels feel and better layout |
| `content/pages/_includes/partials/cta-block.njk` | Modify | More inspiring CTA with gradient background |

## Design Direction

**From:** Clean, functional green/gold template
**To:** Premium boutique sports brand — think Rapha cycling, Arc'teryx, Salomon

**Key Changes:**
1. **Typography**: Cormorant Garamond (serif headings) + Inter (body) — more elegant contrast
2. **Colors**: Same palette but richer application — deeper gradients, more layered overlays, gold as true luxury accent
3. **Header**: Glassmorphism on scroll (frosted glass effect), refined spacing
4. **Hero**: Full-viewport dramatic with animated gradient overlay, floating decorative elements, staggered entrance
5. **Sections**: More generous whitespace, subtle decorative dividers (gold lines, geometric accents)
6. **Cards**: Subtle gradient borders on hover, refined shadows, better image treatments
7. **Footer**: Dark elegant with gold accents, grid structure
8. **Micro-interactions**: Refined hover states, smooth transitions throughout
9. **Overall**: More depth (layered backgrounds), more breathing room, more visual sophistication

---

### Task 1: Base Layout & Font Update

**Files:**
- Modify: `content/pages/_includes/layouts/base.njk`

- [ ] **Step 1: Update Google Fonts**
Replace Playfair Display with Cormorant Garamond (400,500,600,700 + italic). Keep Inter.

- [ ] **Step 2: Update Tailwind config**
Add refined color shades, update font families in Tailwind config.

- [ ] **Step 3: Commit**

### Task 2: CSS Overhaul

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Update CSS custom properties**
New font references, refined color variables, new spacing/radius tokens.

- [ ] **Step 2: Glassmorphism header styles**
Frosted glass on scroll, refined nav links with elegant underline animation.

- [ ] **Step 3: Dramatic hero styles**
Better gradient overlays, refined animations, decorative elements.

- [ ] **Step 4: Refined section & card styles**
Better shadows, hover states, gradient accents.

- [ ] **Step 5: Polished form, footer, utility styles**

- [ ] **Step 6: Commit**

### Task 3: Header Redesign

**Files:**
- Modify: `content/pages/_includes/partials/header.njk`

- [ ] **Step 1: Refine header markup**
Better spacing, refined logo area, improved nav grouping.

- [ ] **Step 2: Commit**

### Task 4: Homepage Redesign

**Files:**
- Modify: `content/pages/_includes/layouts/home.njk`

- [ ] **Step 1: Redesign hero section**
More dramatic gradients, floating decorative SVG elements, refined CTAs.

- [ ] **Step 2: Refine intro, video, pillars sections**
Better visual hierarchy, decorative accents.

- [ ] **Step 3: Refine stats, services, palmares sections**
More polished layout, hover effects.

- [ ] **Step 4: Refine CTA band**
Gradient background, refined typography.

- [ ] **Step 5: Commit**

### Task 5: Inner Pages & Partials

**Files:**
- Modify: `content/pages/_includes/partials/footer.njk`
- Modify: `content/pages/_includes/partials/page-hero-header.njk`
- Modify: `content/pages/_includes/layouts/event-product.njk`
- Modify: `content/pages/_includes/partials/testimonials-section.njk`
- Modify: `content/pages/_includes/partials/contact-form.njk`
- Modify: `content/pages/_includes/partials/cta-block.njk`

- [ ] **Step 1: Redesign footer**
- [ ] **Step 2: Redesign page hero header**
- [ ] **Step 3: Refine event-product layout**
- [ ] **Step 4: Polish testimonials**
- [ ] **Step 5: Refine contact form**
- [ ] **Step 6: Polish CTA block**
- [ ] **Step 7: Commit**

### Task 6: Visual QA & Build

- [ ] **Step 1: Run `npm run build` and verify no errors**
- [ ] **Step 2: Visual review of key pages**
- [ ] **Step 3: Final commit**
