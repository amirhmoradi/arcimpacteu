module.exports = {
  hubSegment: 'stages',
  showPosterSheet: true,
  eleventyComputed: {
    permalink: (data) => {
      const slug = data.page.fileSlug;
      return `/en/stages/${data.page.fileSlug}/index.html`;
    },
  },
};
