exports.onCreateWebpackConfig = ({
  stage, loaders, rules, actions, getConfig
}) => {
  if (stage.startsWith('develop')) {
    // actions.setWebpackConfig({
    //   resolve: {
    //     alias: {
    //       'react-dom': '@hot-loader/react-dom'
    //     }
    //   }
    // });
  }
  const isSSR = stage.includes('html');
  const config = getConfig();
  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      (rule) => String(rule.test) !== String(/\.jsx?$/)
    ),
    // Recreate it with custom exclude filter
    {
      // Called without any arguments, `loaders.js()` will return an
      // object like:
      // {
      //   options: undefined,
      //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
      // }
      // Unless you're replacing Babel with a different transpiler, you probably
      // want this so that Gatsby will apply its required Babel
      // presets/plugins.  This will also merge in your configuration from
      // `babel.config.js`.
      ...rules.js(),
      // test: /\.jsx?$/,
      // Exclude all node_modules from transpilation, except for 'swiper' and 'dom7'
      exclude: (modulePath) => /node_modules/.test(modulePath)
    },
    {
      test: /pikaday/,
      use: loaders.null()
    }
  ];
  // config.resolve = {
  //   ...config.resolve,
  //   //symlinks: !isSSR
  // };
  actions.replaceWebpackConfig(config);
};
