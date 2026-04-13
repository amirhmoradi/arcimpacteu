---
title: Coaching vidéo à distance
description: Analyse technique sur un axe clé, conseils personnalisés et plan pour la suite — 1 h en visio avec un coach Arc IMPACT. Solo 17 €, petit groupe 2–3 personnes 30 €.
translationSlug: video-training
heroKicker: À distance · 1 h · visio
---

{% set p = localePathPrefix | default('') %}

<figure class="not-prose my-8 overflow-hidden rounded-2xl shadow-lg">
  <img src="/images/arcimpact/tec3d05-600x400.jpg" alt="Tir sur parcours 3D — coaching technique" width="600" height="400" class="h-auto w-full object-cover" loading="eager" />
</figure>

Vous voulez **corriger une habitude**, **débloquer un geste** ou **prioriser un seul levier** sans attendre le prochain stage ? Le **coaching vidéo** Arc IMPACT, c’est une **séance courte et intense** : nous faisons un **constat technique**, nous travaillons **un élément pertinent** à améliorer, puis nous vous laissons une **orientation claire** pour vos entraînements (fiche ou continuité du travail entrepris).

## Ce que vous gagnez en une heure

- **Un objectif unique** par séance : concentration maximale, pas de dispersion.
- **Un regard expert** — méthode forgée sur des années de haut niveau et d’encadrement de groupes.
- **Un plan d’action** pour la semaine suivante : vous savez quoi travailler, dans quel ordre, et pourquoi.

## Déroulé & tarifs

L’**heure de cours commence à l’heure convenue**, **après votre échauffement personnel** : vous arrivez prêt à tirer, nous optimisons chaque minute sur la technique et l’analyse.

<div class="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
  <table class="w-full min-w-[300px] border-collapse text-left text-sm text-gray-800">
    <thead>
      <tr class="border-b border-gray-200 bg-primary/10">
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Formule</th>
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Tarif</th>
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Durée</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-100">
        <td class="px-4 py-3.5 align-middle font-medium">Individuel</td>
        <td class="px-4 py-3.5 align-middle"><strong class="text-primary">17 €</strong></td>
        <td class="px-4 py-3.5 align-middle"><strong>1 h</strong></td>
      </tr>
      <tr class="bg-[#F5F5F0]">
        <td class="px-4 py-3.5 align-middle font-medium">2 ou 3 archers</td>
        <td class="px-4 py-3.5 align-middle"><strong class="text-primary">30 €</strong> au total</td>
        <td class="px-4 py-3.5 align-middle"><strong>1 h</strong> partagée</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="not-prose my-10 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-8 md:px-10">
  <p class="m-0 font-serif text-xl font-semibold text-primary">Réservez votre créneau</p>
  <p class="mt-3 text-sm text-gray-700 md:text-base">Indiquez votre discipline, votre niveau et ce que vous souhaitez travailler en priorité : nous vous proposons un horaire et le mode de connexion (visio).</p>
  <p class="cta-row mt-6 not-prose">
    <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujet | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white no-underline shadow transition hover:bg-primary-light">Séance individuelle — écrire-nous</a>
    <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujetGroup | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-sm font-semibold text-primary no-underline transition hover:bg-gray-50">Petit groupe 2–3 — écrire-nous</a>
  </p>
</div>

## Présidents de club

Nous pouvons mettre en place un **dispositif où le club prend en charge** le coaching vidéo pour **soutenir les archers** qui n’ont pas accès à un encadrement régulier. Nous établissons alors une **facture globale** pour l’association. Décrivez votre effectif et votre besoin via le formulaire.

<p class="not-prose my-8">
  <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujetClub | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white no-underline shadow transition hover:bg-primary-light">Projet club — demander une facturation groupée</a>
</p>

{% include "partials/stage-posters-grid.njk" %}

<p class="not-prose mt-12 rounded-2xl bg-primary px-6 py-8 text-center text-white">
  <strong class="font-serif text-xl text-accent">Le terrain, c’est aussi La Féclaz et la tournée</strong><br />
  <span class="mt-2 block text-sm text-white/90">Combinez coaching vidéo et stage présentiel : les affiches ci-dessus mènent aux fiches détaillées.</span><br />
  <a href="{{ '/stages/' | localeUrl(p) | url }}" class="mt-6 mr-2 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary no-underline shadow transition hover:bg-gray-100">Voir tous les stages</a>
  <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujet | encodeURIComponent)) | localeUrl(p) | url }}" class="mt-6 inline-flex rounded-lg border-2 border-white/85 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/15">Question sur la visio</a>
</p>
