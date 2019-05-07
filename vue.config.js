module.exports = {
  // inject global scss with webpack
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_global.scss";
        `
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
};
