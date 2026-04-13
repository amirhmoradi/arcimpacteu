# Guide utilisateur — site Arc IMPACT, contenu et calendrier

Document à destination des **personnes non techniques** qui mettent à jour le site ou le calendrier. Vous pouvez l’exporter en PDF depuis votre éditeur ou un outil Markdown.

---

## 1. À quoi sert ce site ?

Le site présente **Arc IMPACT** : stages de tir à l’arc, séminaires d’entreprise, animations pour collectivités, et un moyen de **contact** pour demander des dates, un devis ou des informations.

- **Accueil** : vue d’ensemble et liens vers les grandes rubriques.
- **Emmanuel Lécuyer** : page biographique / expertise.
- **Stages** : hub avec des **fiches** (3D, indoor, TAE, prestige, etc.).
- **Séminaires** : offres entreprise (plateau, challenge, cohésion, tir en entreprise…).
- **Collectivités** : animations publiques (multi-tirs, stand été, etc.).
- **Événements** : page séparée qui met en avant **quelques offres phares** (sélection éditoriale, pas une copie de tout le catalogue).
- **Calendrier** : affichage public des **dates** lorsque l’équipe a branché un agenda (en général Google Calendar).
- **Contact** : **seul canal** pour écrire à l’équipe (pas d’e-mail affiché sur le site).
- **Mentions légales** : informations obligatoires.

Les textes existent en **trois langues** (français, anglais, italien). Quand vous modifiez une page dans l’outil d’administration, pensez à mettre à jour les **trois** versions si la traduction est utilisée.

---

## 2. Où se fait la mise à jour ? (Sveltia CMS)

L’administration se trouve à l’adresse **`/admin/`** sur le site publié (par exemple `https://…/admin/`).

**Connexion** : selon la configuration de l’équipe, vous utilisez un **jeton d’accès GitHub** (fourni de façon sécurisée par un responsable). Ce jeton n’est **pas** stocké dans le dépôt : chaque personne le saisit dans son navigateur. Ne le partagez pas par e-mail en clair ; préférez un gestionnaire de mots de passe ou un canal chiffré.

**Après chaque modification** : enregistrez puis **validez / publiez** (commit) les changements. Le site en ligne se met à jour **après** la construction automatique (quelques minutes). Si quelque chose d’important est cassé, prévenez une personne technique.

**Fichiers sensibles** : ne mettez **jamais** de mots de passe, jetons ou clés API dans un fichier du site. Le calendrier public utilise uniquement des **liens** fournis par Google (ou équivalent), pas des secrets.

---

## 3. Pages Markdown (trois collections par langue)

Dans Sveltia, le contenu éditorial est réparti en **trois collections** : **Pages (français)**, **Pages (English)**, **Pagine (italiano)**. Chacune liste **tout** le Markdown du dossier correspondant, y compris les sous-dossiers **`stages/`**, **`seminaires/`** et **`collectivites/`** (fiches détaillées).

- **Titre** : titre affiché et utilisé pour le référencement.
- **Description** : courte phrase pour les moteurs de recherche.
- **translationSlug** : identifiant commun aux trois langues pour relier les versions entre elles (à garder aligné sur `fr`, `en` et `it`).
- **Layout** (si affiché) : modèle Eleventy ; souvent vide sur les hubs, renseigné sur les fiches « produit » ou pages spéciales.
- **Hero** : champs possibles **`hero_image`** (ex. page biographie) ou **`heroImage`** (fiches stages / séminaires / collectivités), **hero kicker**, **posterAlt**, boutons **CTA** — selon la page.
- **Corps** : texte principal (Markdown ; le site autorise aussi des extraits **Nunjucks** là où les pages existantes en contiennent déjà).

**Accueil** : les textes visibles sur la page d’accueil (bandeau, navigation, formulaire, etc.) viennent surtout du fichier **`_data/i18n.json`** (section **Données globales** dans le CMS), pas du fichier `home.md` (presque vide).

**Fichiers à la racine** (`404`, `robots.txt`, plan du site, modèle de redirections anciennes URLs) : collection **Fichiers uniques** — réservés aux personnes à l’aise avec le risque de casser la technique du site.

Les pages **Événements** et **Calendrier** ont une **mise en page** particulière : le texte du corps s’affiche sous le bandeau, puis des blocs automatiques (cartes ou calendrier) selon les réglages JSON décrits plus bas.

---

## 4. Calendrier — côté visiteur

Sur la page **Calendrier**, le visiteur peut :

- Lire une **introduction** (texte d’aide configurable).
- Voir un **agenda intégré** (cadre type Google) si une URL d’intégration a été renseignée.
- Cliquer sur des boutons pour **ouvrir l’agenda dans Google** ou **s’abonner** via un fichier `.ics`, **si** ces liens ont été remplis.

Le calendrier sert à la **visibilité** (savoir quand ont lieu stages ou gros rendez-vous). Les **inscriptions, réservations et devis** passent toujours par la page **Contact**.

---

## 5. Calendrier — côté gestion (Sveltia, fichier JSON)

Dans Sveltia, ouvrez la section **« Calendrier, événements & témoignages (JSON) »** puis **« Calendrier (iframe + liens) »**. Ce fichier pilote la page Calendrier.

### 5.1 Créer ou choisir un agenda Google

1. Créez un agenda Google dédié (ex. « Arc IMPACT — public ») ou utilisez un agenda existant **déjà partagé en lecture** pour le public.
2. Ajoutez-y vos **événements** (stages, salons, fermetures, etc.).
3. Dans les paramètres de l’agenda, trouvez la section **« Intégrer le calendrier »** : copiez l’**URL utilisée dans le code d’intégration** (attribut `src` du `iframe`). Collez-la dans le champ **URL d’intégration** du fichier JSON dans Sveltia.
4. Renseignez si possible le **lien vers la page publique** du même agenda (bouton « Ouvrir dans Google Calendar »).
5. Si Google propose un lien **d’abonnement ICS**, vous pouvez le mettre dans le champ prévu (bouton d’abonnement).

Laissez un champ vide si vous ne l’utilisez pas : le bouton correspondant restera masqué.

### 5.2 Texte d’aide multilingue

Les champs **intro** (FR / EN / IT) acceptent du **HTML simple** (paragraphes, gras). Ils s’affichent au-dessus du cadre du calendrier pour expliquer aux visiteurs comment lire l’agenda ou ce qu’ils doivent faire ensuite (par ex. « pour réserver, utilisez le formulaire Contact »).

---

## 6. Page « Événements » (hub sélection)

La page **Événements** affiche une **grille de cartes** : image, petit badge, titre, extrait, lien vers une fiche détaillée.

Le contenu de ces cartes ne se modifie **pas** dans le corps de la page Markdown : il vient du fichier **« Événements mis en avant »** (JSON) dans Sveltia, sous la même section que le calendrier.

Pour chaque carte :

- **Ordre** : nombre pour trier les cartes (1 en premier, puis 2, 3…).
- **Image** : chemin du type `/images/...` (images déjà sur le site) ou URL complète si besoin.
- **Badge, titre, extrait** : textes **par langue** (FR, EN, IT).
- **Lien (href)** : pour chaque langue, indiquez le **chemin** vers la bonne fiche, par exemple :
  - français : `/stages/stage-3d/`
  - anglais : `/en/stages/stage-3d/`
  - italien : `/it/stages/stage-3d/`

Vérifiez les liens après publication : une faute dans le chemin mène à une erreur 404.

**Rôle de la page** : mettre en avant les **temps forts** (stages, séminaires, animations) sans dupliquer tout le catalogue. Le détail reste sur les pages Stages, Séminaires, Collectivités.

### 6.1 Témoignages sur l’accueil

Les avis du carrousel **Ils en parlent** viennent du fichier **« Témoignages (page d’accueil) »** dans la même section JSON que le calendrier. **Processus typique** : un visiteur envoie son ressenti via la page **Contact** ; après accord (et éventuellement une reprise de texte), vous ajoutez une ligne dans la liste avec **ordre**, **nom affiché**, **citations FR / EN / IT**, **discipline par langue**, et éventuellement une **photo** (`/images/...` ou `/media/...`).

---

## 7. Images et médias

Les **photos d’illustration** des pages sont en général déjà dans le dossier `public/images` du site. Pour de **nouvelles** images accessibles partout, utilisez l’upload média de Sveltia : les fichiers partent vers **`public/media`** et apparaissent sur le site sous **`/media/...`**.

Compressez les images lourdes avant envoi (temps de chargement et quota du dépôt).

---

## 8. Formulaire de contact et spams

Le formulaire **Contact** peut être protégé par un dispositif anti-robot (selon la configuration technique). Si un visiteur dit ne pas pouvoir envoyer de message, vérifiez avec une personne technique (réseau, bloqueur de pub, erreur côté serveur).

Les messages ne doivent **pas** contenir de données bancaires ; pour un devis précis, demandez plutôt un rappel par téléphone en laissant un numéro dans le message (selon votre politique interne).

---

## 9. En cas de problème

| Symptôme | Piste |
|----------|--------|
| Le calendrier ne s’affiche pas | Vérifier que l’URL d’intégration est bien celle du `iframe`, que l’agenda est public, attendre la fin du déploiement. |
| Les cartes Événements sont vides | Vérifier que la liste `items` du JSON n’est pas vide et que chaque entrée a un `order`. |
| Lien cassé depuis une carte | Corriger les champs `href` FR / EN / IT. |
| Texte FR à jour mais pas EN | Éditer aussi les fichiers **en** et **it** correspondants dans Sveltia. |
| Erreur après publication | Contacter le support technique avec l’heure du commit et le message d’erreur de la page de build (GitHub Actions). |

---

## 10. Résumé des fichiers utiles (pour orientation)

| Fichier / zone | Rôle |
|----------------|------|
| `content/pages/fr|en|it/**/*.md` | Pages et fiches (hubs + sous-dossiers stages, seminaires, collectivites). |
| `content/pages/404.md`, `robots.njk`, `sitemap.njk`, `legacy-redirect.njk` | Pages / templates globaux (collection **Fichiers uniques**). |
| `content/meta/calendar.json` | URL iframe, liens Google / ICS, intros HTML. |
| `content/meta/featuredEvenements.json` | Cartes de la page Événements. |
| `content/meta/testimonials.json` | Avis du carrousel sur la page d’accueil. |
| `_data/posters.json` | Affiches du carrousel d’accueil. |
| `_data/i18n.json` | Textes d’interface multilingues et blocs d’accueil (éditeur JSON brut dans le CMS). |
| `_data/services.json` | Cartes du hub Stages (éditeur JSON brut). |
| `_data/brand.json` | Nom du site, domaine, logo, clé Turnstile **publique**, URL du Worker contact. |
| `_data/palmares.json`, `naturfoamGallery.json`, `legacyRedirects.json` | Palmarès, liste des images galerie Natur’Foam, table de redirections (JSON brut). |
| `admin/config.yml` | Configuration de Sveltia (réservé aux personnes à l’aise avec le dépôt). |

Ce guide reflète l’état du projet au moment de sa rédaction ; toute évolution technique pourra compléter ces consignes.
