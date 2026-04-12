# Arc IMPACT - Website Refactor Project

## Project Overview
Refactoring the Arc IMPACT archery coaching website (arcimpact.eu) into a modern, multilingual, SEO-optimized static site hosted on GitHub Pages.

## Tech Stack
- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **Vanilla JavaScript** - No build step required
- **GitHub Pages** - Static hosting
- **Cloudflare Workers** - Contact form backend

## Project Structure
```
/                       → French (primary language)
/en/                    → English version
/it/                    → Italian version
/assets/css/style.css   → Custom styles
/assets/js/main.js      → Core JavaScript
/assets/js/i18n.js      → Internationalization helper
/assets/images/         → Image assets
/worker/                → Cloudflare Worker for contact form
/sitemap.xml            → SEO sitemap
/robots.txt             → SEO robots
/404.html               → Custom error page
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

## Content Source
All content sourced from arcimpact.eu / arcimpact.fr. Images from client site. Decorative images from Unsplash.
