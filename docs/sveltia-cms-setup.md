# Sveltia CMS — setup for Arc IMPACT (GitHub + free hosting)

This project uses **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** (open source, Git-based, strong multilingual support) so non-developers can edit **Markdown** in the browser. Hosting stays **serverless**: **[GitHub Pages](https://docs.github.com/en/pages)** from the **repository root**, **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** for the contact form.

**Chosen setup:** GitHub Pages **`/` (root)** + **one shared, limited PAT** for Emmanuel and the team in Sveltia (see §4.1). You maintain `repo:` in `admin/config.yml`.

Official references: [Getting started](https://sveltiacms.app/en/docs/start), [GitHub backend](https://sveltiacms.app/en/docs/backends/github), [Internationalization](https://sveltiacms.app/en/docs/i18n).

---

## 1. What is already in this repository

| Path | Role |
|------|------|
| `admin/index.html` | Loads Sveltia from the CDN (`unpkg.com/@sveltia/cms`). |
| `admin/config.yml` | Backend (`github`), `media_folder`, and **collections** (see §5). |
| `content/pages/{fr,en,it}/` | Markdown per locale, including **`stages/`**, **`seminaires/`**, **`collectivites/`** (nested paths are listed in Sveltia). |
| `content/pages/404.md`, `robots.njk`, `sitemap.njk`, `legacy-redirect.njk` | Singleton templates under **Fichiers uniques** in the CMS. |
| `content/meta/*.json` | Calendar, featured events, testimonials, **siteInject** (optional HTML in head / body) — structured forms in the CMS. |
| `_data/*.json` | Global data: `brand.json`, `posters.json`, `i18n.json`, `services.json`, etc. — see §5. |
| `public/images/` | Imagery du site + **médiathèque Sveltia** (`media_folder` → URLs `/images/...`). |
| `public/media/` | Optional legacy path for **`/media/...`** links; not the CMS media library root anymore. |
| `worker/` | Cloudflare Worker for contact + Turnstile (separate README). |

**Build:** This repository includes **[Eleventy](https://www.11ty.dev/)** (`npm run build` → `_site/`). GitHub Actions (`.github/workflows/pages.yml`) runs the build and deploys to **GitHub Pages**. Markdown page bodies are **not** preprocessed as Nunjucks (so characters like `{#` stay literal); layouts still use Nunjucks in `content/pages/_includes/`.

**Important:** After editing in Sveltia, **commit** changes and push — the CI build must succeed for the live site to update.

---

## 2. Configure `admin/config.yml`

1. Open `admin/config.yml`.
2. Set `backend.repo` to `owner/repo` for this GitHub repository (you already maintain this).
3. Commit changes when you update `repo` or collections (the CMS needs a valid `repo` for the GitHub API).

`media_folder` and `public_folder` point at **`public/images`** and **`/images`**, so the **Asset Library** lists the same tree the site already uses for heroes, bannières, etc., and new uploads land next to those files.

Older content may still reference **`/media/...`** (folder `public/media/`); Eleventy keeps serving that path if files exist there.

---

## 3. GitHub Pages (project root) and the `/admin` URL

In the GitHub repo: **Settings → Pages → Build and deployment → Branch**, choose your publishing branch (e.g. `main`) and **`/ (root)`**.

After the site builds (root `index.html` from your SSG or hand-written files):

- Public site: `https://<user>.github.io/<repo>/`
- CMS: `https://<user>.github.io/<repo>/admin/`

The `admin/` folder at the repository root is what GitHub Pages serves at `/admin/`.

---

## 4. Authentication

### 4.1 Personal access token (this project — shared with Emmanuel & team)

Sveltia’s **Sign in with token** flow stores the token only in **each person’s browser** (local storage). You can still issue **one** PAT and distribute it out-of-band (password manager, encrypted channel); treat it like a **shared password** with the risks that implies.

**Recommended: fine-grained PAT** ([creating a fine-grained PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)):

| Setting | Value |
|--------|--------|
| Resource owner | Account that **owns** the repo (or org with token policy that allows it) |
| Repository access | **Only** this repository |
| Permissions → Repository | **Contents: Read and write** (minimum for commits). Avoid Metadata “Actions” or account-wide scopes unless you know you need them. |
| Expiration | Short date, then **rotate** |

**Operational habits**

- **Rotate** the PAT after someone leaves the team or if it may have leaked; everyone re-enters the new token in `/admin/`.
- Prefer a **dedicated GitHub account** (e.g. “arcimpact-editor-bot”) that only has access to this repo, and create the PAT on that account, so a leak does not expose your personal GitHub.
- Do **not** commit the PAT into the repo or put it in `config.yml`.
- Sveltia does not support simultaneous multi-editor locking; coordinate so two people do not publish conflicting edits on the same file.

Workflow:

1. Ensure `/admin/` is live on Pages.
2. Open `/admin/` → **Sign in with token** (wording may vary by Sveltia version).
3. Create the PAT on GitHub with the limits above; paste once per browser.

See: [Managing personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### 4.2 OAuth (optional later)

To avoid circulating a PAT, deploy **[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)** on Cloudflare Workers and set `backend.base_url` in `admin/config.yml`. [Authorization code flow](https://sveltiacms.app/en/docs/backends/github#authorization-code-flow).

---

## 5. Collections (pages, JSON, templates)

There is **no** single global `i18n` block on collections anymore: each language has its **own folder collection** so nested routes (`stages/stage-3d`, etc.) stay editable.

| Collection | What it edits |
|------------|----------------|
| **Pages (français / English / italiano)** | All `*.md` under `content/pages/fr`, `…/en`, `…/it` (including subfolders). Shared fields cover `title`, `description`, `translationSlug`, `layout`, `hero_image` / `heroImage`, CTA fields, and Markdown `body` (Nunjucks shortcodes in the body are allowed where the site already uses them). |
| **Fichiers uniques** | `404.md`, `robots.njk`, `sitemap.njk`, `legacy-redirect.njk`. |
| **Calendrier, événements…** | `content/meta/calendar.json`, `featuredEvenements.json`, `testimonials.json`, `siteInject.json`, `_data/posters.json`. |
| **Données globales (_data)** | `brand.json` (formulaire), listes structurées pour `services.json` (`items`), `palmares.json` (`rows`), `legacyRedirects.json` (`redirects`), texte brut pour `i18n.json` et `naturfoamGallery.json` (JSON à valider après édition). |

**Translations:** keep the **same `translationSlug`** (and matching filenames where the site expects them) across `fr`, `en`, and `it` files so language switching and hreflang stay consistent.

**Home page copy** lives mainly in **`_data/i18n.json`** (hero, nav labels, form strings, etc.), not in `home.md` (those files are minimal placeholders for Eleventy).

**Layout templates** (`content/pages/_includes/`) are normal repo files; they are not exposed in the CMS by default. Change them in Git or extend `admin/config.yml` if you need them in the UI.

**Tracking / third-party scripts:** edit **Scripts & pixels (toutes les pages)** (`content/meta/siteInject.json`). Content is inserted **unescaped** into every HTML page that uses `layouts/base.njk` (and the legacy redirect shell). Only trusted editors should change it; invalid markup can break the whole site.

---

## 6. First login workflow

1. Keep `repo:` correct in `admin/config.yml` (committed to Git).
2. GitHub Pages from **root** serves `admin/` at `/admin/`.
3. Open `…/admin/`, **Sign in with token**, paste the shared limited PAT (per browser).
4. Open the right **collection** (e.g. **Pages (français)** vs **Pages (English)**), edit the entry, then **Publish** (commit on your default branch).

Coordinate edits: Sveltia warns that **concurrent multi-user** editing can cause merge conflicts — avoid two people editing the same file at once.

---

## 7. Content Security Policy (CSP)

If you add a strict CSP to the main site, allow scripts and connections required by Sveltia and GitHub. See [Sveltia — CSP](https://sveltiacms.app/en/docs/security#setting-up-content-security-policy).

---

## 8. Free stack recap

| Need | Free option |
|------|-------------|
| Source + CMS commits | GitHub (public repo) |
| Static hosting | [GitHub Pages](https://pages.github.com/) or [Cloudflare Pages](https://pages.cloudflare.com/) |
| Contact form + Turnstile | [Cloudflare Workers](https://workers.cloudflare.com/) (this repo’s `worker/`) |
| CMS auth (this project) | Shared **fine-grained PAT** (§4.1); optional later: [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) on Workers |
| Transactional email | [Resend](https://resend.com/) / [Brevo](https://www.brevo.com/) / [Postmark](https://postmarkapp.com/) free tiers (HTTPS API from Worker) |

No VPS required.

---

## 9. Beta notice

Sveltia CMS is still labelled **beta** upstream; watch [release notes](https://sveltiacms.app/en/docs/releases#release-information) before major upgrades.

---

## 10. Checklist

- [ ] `repo:` set in `admin/config.yml` (you maintain this)
- [ ] GitHub Pages: branch + **`/ (root)`**; site and `/admin/` load
- [ ] Fine-grained PAT: **this repo only**, **Contents R/W**, expiry set; shared securely with Emmanuel and the team
- [ ] `ALLOWED_ORIGINS` on the contact Worker includes your real Pages URL(s), e.g. `https://<user>.github.io/<repo>`
- [ ] After editing **`i18n.json`** or **`naturfoamGallery.json`** (éditeur texte), vérifier le JSON (parse valide), puis **`npm run build`** ou la CI
