module.exports = {
  hubSegment: 'collectivites',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/en/collectivites/${data.page.fileSlug}/index.html`;
    },
  },
};
