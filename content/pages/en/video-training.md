---
title: Remote video coaching
description: One focused technical hour on video — expert feedback, one clear priority, and training guidance for what to do next. Solo €17, small group of 2–3 archers €30.
translationSlug: video-training
heroKicker: Remote · 1 h · video call
---

{% set p = localePathPrefix | default('') %}

<figure class="not-prose my-8 overflow-hidden rounded-2xl shadow-lg">
  <img src="/images/arcimpact/tec3d05-600x400.jpg" alt="3D course shooting — technical coaching" width="600" height="400" class="h-auto w-full object-cover" loading="eager" />
</figure>

Want to **fix a habit**, **unlock a movement**, or **work one lever** without waiting for the next on-site camp? **Arc IMPACT video coaching** is a **short, high-density session**: we **assess your technique**, focus on **one relevant improvement**, then leave you with **clear homework** (a short plan or how to continue what we started).

## What you get in one hour

- **One goal per session** — maximum focus, no dilution.
- **Expert eyes** — built from years of high-level practice and group coaching.
- **A practical plan** for the week ahead: what to train, in what order, and why.

## Flow & pricing

The **coaching hour starts at the agreed time**, **after your personal warm-up**: you arrive ready to shoot, and we use every minute on technique and analysis.

<div class="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
  <table class="w-full min-w-[300px] border-collapse text-left text-sm text-gray-800">
    <thead>
      <tr class="border-b border-gray-200 bg-primary/10">
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Option</th>
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Price</th>
        <th scope="col" class="px-4 py-3.5 font-serif text-base font-semibold text-primary">Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-100">
        <td class="px-4 py-3.5 align-middle font-medium">Solo</td>
        <td class="px-4 py-3.5 align-middle"><strong class="text-primary">€17</strong></td>
        <td class="px-4 py-3.5 align-middle"><strong>1 h</strong></td>
      </tr>
      <tr class="bg-[#F5F5F0]">
        <td class="px-4 py-3.5 align-middle font-medium">2 or 3 archers</td>
        <td class="px-4 py-3.5 align-middle"><strong class="text-primary">€30</strong> total</td>
        <td class="px-4 py-3.5 align-middle"><strong>1 h</strong> shared</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="not-prose my-10 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-8 md:px-10">
  <p class="m-0 font-serif text-xl font-semibold text-primary">Book your slot</p>
  <p class="mt-3 text-sm text-gray-700 md:text-base">Tell us your bow style, level, and the priority you want to work on — we suggest a time slot and how we connect (video call).</p>
  <p class="cta-row mt-6 not-prose">
    <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujet | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white no-underline shadow transition hover:bg-primary-light">Solo session — contact us</a>
    <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujetGroup | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-sm font-semibold text-primary no-underline transition hover:bg-gray-50">Small group 2–3 — contact us</a>
  </p>
</div>

## Club chairs & committees

We can set up **club-funded video coaching** so archers **without regular local coaching** still progress. We then issue a **single invoice** to the association. Outline numbers and needs in the contact form.

<p class="not-prose my-8">
  <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujetClub | encodeURIComponent)) | localeUrl(p) | url }}" class="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white no-underline shadow transition hover:bg-primary-light">Club project — ask for group billing</a>
</p>

{% include "partials/stage-posters-grid.njk" %}

<p class="not-prose mt-12 rounded-2xl bg-primary px-6 py-8 text-center text-white">
  <strong class="font-serif text-xl text-accent">On-site camps at La Féclaz and on tour</strong><br />
  <span class="mt-2 block text-sm text-white/90">Combine remote coaching with a residential camp — the posters above link to each camp page.</span><br />
  <a href="{{ '/stages/' | localeUrl(p) | url }}" class="mt-6 mr-2 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary no-underline shadow transition hover:bg-gray-100">Browse all camps</a>
  <a href="{{ ('/contact/?sujet=' ~ (i18n[lang].videoTrainingContactSujet | encodeURIComponent)) | localeUrl(p) | url }}" class="mt-6 inline-flex rounded-lg border-2 border-white/85 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/15">Ask about video coaching</a>
</p>
