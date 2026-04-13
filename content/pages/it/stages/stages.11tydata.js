module.exports = {
  hubSegment: 'stages',
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/it/stages/${data.page.fileSlug}/index.html`;
    },
  },
};
