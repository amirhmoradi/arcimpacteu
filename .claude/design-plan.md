# Arc IMPACT - Design & Architecture Plan

## Design Philosophy
Modern, nature-inspired design reflecting the outdoor archery experience. Clean and professional with a sense of adventure. The design should convey expertise and trust (20+ years, national team coaching) while being inviting to newcomers.

## Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | #1B4332 | Primary - headers, CTAs, nav |
| Deep Green | #2D6A4F | Secondary - accents, hover states |
| Gold/Amber | #D4A843 | Accent - highlights, medals, numbers |
| Charcoal | #2D2D2D | Text, dark backgrounds |
| Warm Gray | #6B7280 | Body text, secondary text |
| Off-White | #F5F5F0 | Backgrounds, cards |
| Pure White | #FFFFFF | Card backgrounds, contrast |

## Typography
- **Headings**: Inter (Google Fonts) - clean, modern sans-serif
- **Body**: Inter - readable at all sizes
- **Accent/Numbers**: Playfair Display - elegant for statistics and quotes

## Page Structure (Single Page per Language)

### 1. Navigation (sticky)
- Logo + brand name
- Menu: Accueil | À Propos | Stages | Installations | Galerie | Contact
- Language switcher (FR | EN | IT) with flag icons
- Mobile hamburger menu

### 2. Hero Section
- Full-viewport height
- Background: Atmospheric forest/archery image with dark overlay
- Large headline: "L'Excellence du Tir à l'Arc depuis 20 ans"
- Subtitle: National team credentials
- CTA buttons: "Découvrir nos stages" + "Nous contacter"
- Scroll indicator animation

### 3. About Section
- Split layout: Image left, text right
- 20 years experience narrative
- FFTA National Coach credentials
- Key stat counters (animated on scroll):
  - 20+ years experience
  - 53 medals & titles
  - 12 years with French National Team
  - 3+ World Championships

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

## SEO Strategy
- Separate HTML file per language (/index.html, /en/index.html, /it/index.html)
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

## Cloudflare Worker (Contact Form)
- Endpoint receives POST with form data as JSON
- Validates required fields
- Sends email via mail provider API (configurable)
- Returns JSON success/error response
- CORS headers for the GitHub Pages domain
- Rate limiting considerations

## Accessibility
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text on all images
- Keyboard navigable
- Sufficient color contrast
- Focus indicators
- ARIA labels where needed
