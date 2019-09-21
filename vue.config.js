module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_colors.scss";
          @import "@/scss/_normalize.scss";
        `
      }
    }
  }
};