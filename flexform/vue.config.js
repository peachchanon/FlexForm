module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/flexform.scss";
        `,
      },
    },
  },
};