module.exports = {
  hubSegment: 'stages',
  showPosterSheet: true,
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/it/stages/${data.page.fileSlug}/index.html`;
    },
  },
};
