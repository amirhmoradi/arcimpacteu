const path = require('path');

/** GitHub Pages project site: /repo-name/ ; custom domain: / */
function pathPrefix() {
  const p = process.env.PATH_PREFIX;
  if (p) return p.endsWith('/') ? p : `${p}/`;
  return '/';
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData('metadata', () => ({
    url: (process.env.SITE_URL || 'https://arcimpact.eu').replace(/\/$/, ''),
  }));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('public');

  eleventyConfig.addFilter('localeUrl', function (href, localePrefix) {
    const h = href.startsWith('/') ? href : `/${href}`;
    const p = localePrefix || '';
    if (!p) return h;
    if (h === '/') return `${p}/`;
    return `${p}${h}`;
  });

  eleventyConfig.addFilter('arcImage', function (src) {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    return `https://arcimpact.eu${src.startsWith('/') ? '' : '/'}${src}`;
  });

  return {
    pathPrefix: pathPrefix(),
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'content/pages',
      includes: '_includes',
      output: '_site',
      data: path.join(__dirname, '_data'),
    },
  };
};
