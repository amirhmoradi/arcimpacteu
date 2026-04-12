module.exports = {
  layout: 'layouts/home.njk',
  translationSlug: 'home',
  title: 'Accueil',
  description:
    'Stages de tir à l’arc 3D et technique à La Féclaz (Savoie) — Emmanuel Lécuyer, Arc IMPACT. Chambéry, Lac du Bourget.',
  translationSlug: 'home',
  schemaJsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Arc IMPACT',
    description:
      'Stages techniques de tir à l’arc, séminaires et animations en Savoie (La Féclaz, Chambéry, Lac du Bourget).',
    url: 'https://arcimpact.eu',
    image: 'https://arcimpact.eu/images/arcimpact/headers/DSC_0083_v.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '400 Rue Centrale de la Féclaz',
      addressLocality: 'Les Déserts',
      postalCode: '73230',
      addressRegion: 'Savoie',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.65,
      longitude: 6.12,
    },
    telephone: '__REDACTED__',
    sameAs: [
      'https://fr-fr.facebook.com/arcimpact',
      'https://www.youtube.com/@arcimpact5219',
    ],
  }),
};
