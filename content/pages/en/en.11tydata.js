module.exports = {
  lang: 'en',
  localePathPrefix: '/en',
  layout: 'layouts/page.njk',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      if (slug === 'home') return '/en/index.html';
      return `/en/${slug}/index.html`;
    },
  },
};
