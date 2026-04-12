module.exports = {
  lang: 'it',
  localePathPrefix: '/it',
  layout: 'layouts/page.njk',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      if (slug === 'home') return '/it/index.html';
      return `/it/${slug}/index.html`;
    },
  },
};
