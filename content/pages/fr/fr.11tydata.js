module.exports = {
  lang: 'fr',
  localePathPrefix: '',
  layout: 'layouts/page.njk',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      if (slug === 'home') return '/index.html';
      return `/${slug}/index.html`;
    },
  },
};
