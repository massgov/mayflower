const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    //'@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config, { configType }) => {
    // Add special plugins to the babel loader.
    const babelRule = config.module.rules.find(rule => rule.loader && rule.loader.match('babel-loader'));
    babelRule.options.plugins = babelRule.options.plugins.concat([
      "@babel/proposal-export-default-from",
      '@babel/proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]);

    // Alter the mini-css-extract-plugin to look for asset files relative to
    // the storybook-static directory. Note that we guard this logic because
    // the storybook development server doesn't actually use the
    // mini-css-extract-plugin.
    if ( configType === 'PRODUCTION') {
      const cssRule = config.module.rules.find(rule => rule.test && 'some.css'.match(rule.test));
      if(cssRule) {
        const cssFileLoader = cssRule.use.find(loader => loader.loader && loader.loader.match('mini-css-extract-plugin'));
        console.log(cssFileLoader);
        if(cssFileLoader) {
          cssFileLoader.options.publicPath = (resourcePath, context) => {
            // publicPath is the relative path of the resource to the context
            // e.g. for ./css/admin/main.css the publicPath will be ../../
            // while for ./css/main.css the publicPath will be ../
            return path.relative(path.dirname(resourcePath), context) + '/';
          };
        }
      }
    }

    // Configure the storysource plugin.
    config.module.rules.push({
      test: /\.stories\.js?$/,
      loader: require.resolve('@storybook/addon-storysource/loader'),
      enforce: 'pre',
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        SharedAssets: '@massds/mayflower-assets/static'
      }};

    // Return the altered config
    return config;
  },
};
