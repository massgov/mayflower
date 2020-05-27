exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  const isSSR = stage.includes(`html`)
  actions.setWebpackConfig({
    resolve: {
      // Fixes a bug related to svg-sprite-loader.
      symlinks: !isSSR
    },
    module: {
      rules: [
        {
          test: /pikaday/,
          use: loaders.null()
        }
      ]
    }
  });
};
