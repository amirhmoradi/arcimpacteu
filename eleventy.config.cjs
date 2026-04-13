/** GitHub Pages project site: /repo-name/ ; custom domain: / */
function pathPrefix() {
  const p = process.env.PATH_PREFIX;
  if (p) return p.endsWith('/') ? p : `${p}/`;
  return '/';
}

/** Strip slashes: `/repo-name/` → `repo-name` (for joining with root-relative paths). */
function pathPrefixDir() {
  const p = pathPrefix();
  if (!p || p === '/') return '';
  return p.replace(/^\/+|\/+$/g, '');
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData('metadata', () => ({
    url: (process.env.SITE_URL || 'https://arcimpact.eu').replace(/\/$/, ''),
  }));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy({ 'public/images': 'images' });
  eleventyConfig.addPassthroughCopy({ 'public/media': 'media' });

  /** Markdown emits src="/images/...". Add PATH_PREFIX only when not already prefixed (Nunjucks | url handles templates). */
  eleventyConfig.addTransform('prefix-root-assets', function (html, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) return html;
    const seg = pathPrefixDir();
    if (!seg) return html;
    const lead = `/${seg}`;
    return html.replace(/(\ssrc=")(\/images\/[^"]+)(")/gi, (_, a, path, z) => {
      if (path.startsWith(lead + '/') || path.startsWith(lead + '"')) return _;
      return `${a}${lead}${path}${z}`;
    });
  });

  eleventyConfig.addFilter('localeUrl', function (href, localePrefix) {
    const h = href.startsWith('/') ? href : `/${href}`;
    const p = localePrefix || '';
    if (!p) return h;
    if (h === '/') return `${p}/`;
    return `${p}${h}`;
  });

  /** Local images under /images (copied from public/images). Pass-through URLs use | url for PATH_PREFIX. */
  eleventyConfig.addFilter('arcImage', function (src) {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    return src.startsWith('/') ? src : `/${src}`;
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
      // Must be relative to `input`: Eleventy joins input + data; an absolute path breaks global JSON loading.
      data: '../../_data',
    },
  };
};
