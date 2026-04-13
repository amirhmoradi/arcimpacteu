module.exports = {
  hubSegment: 'seminaires',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/en/seminaires/${data.page.fileSlug}/index.html`;
    },
  },
};
