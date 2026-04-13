module.exports = {
  hubSegment: 'collectivites',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/collectivites/${data.page.fileSlug}/index.html`;
    },
  },
};
