module.exports = {
  hubSegment: 'seminaires',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/seminaires/${data.page.fileSlug}/index.html`;
    },
  },
};
