module.exports = {
    css: {
        loaderOptions: {
          sass: {
            prependData: `@import "~@/assets/css/base.scss";@import "~@/assets/css/mixin.scss";@import "~@/assets/css/variable.scss"`,
          },
        }
      }
}