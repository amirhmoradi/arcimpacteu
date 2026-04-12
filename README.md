# Arc IMPACT — site web

Site statique multilingue (**FR** / **EN** / **IT**) pour [arcimpact.eu](https://arcimpact.eu), généré avec **[Eleventy](https://www.11ty.dev/)**. Le contenu éditorial vit dans `content/pages/` et peut être modifié via **[Sveltia CMS](https://sveltia.com/)** (`/admin/`).

## Développement

```bash
npm install
npm run dev
```

Build local (préfixe comme GitHub Pages `https://<user>.github.io/<repo>/`) :

```bash
PATH_PREFIX=/<repo>/ SITE_URL=https://<user>.github.io/<repo> npm run build
```

Sans variable : préfixe `/` (domaine personnalisé ou racine).

## Déploiement

Le workflow **GitHub Actions** `.github/workflows/pages.yml` construit le site et le publie sur **GitHub Pages**. Dans les paramètres du dépôt : **Pages → Build and deployment → Source : GitHub Actions**.

- Formulaire de contact : Worker Cloudflare (`worker/`) + **Turnstile** — voir `worker/README.md`.
- CMS : `docs/sveltia-cms-setup.md`.
