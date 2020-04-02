const path = require("path");
module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    // '@storybook/preset-create-react-app',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y'
  ],
  webpackFinal: async (config, { configType }) => {
    // Add special plugins to the babel loader.
    const babelRule = config.module.rules.find(rule => rule.loader && rule.loader.match('babel-loader'));
    babelRule.options.plugins = babelRule.options.plugins.concat([
      'babel-plugin-dynamic-import-node',
      "@babel/proposal-export-default-from",
      '@babel/proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]);
    // Alter the mini-css-extract-plugin to look for asset files relative to
    // the storybook-static directory. Note that we guard this logic because
    // the storybook development server doesn't actually use the
    // mini-css-extract-plugin.
    const cssRule = config.module.rules.find(rule => rule.test && 'some.css'.match(rule.test));
    if(cssRule) {
      const cssFileLoader = cssRule.use.find(loader => loader.loader && loader.loader.match('mini-css-extract-plugin'));
      if(cssFileLoader) {
        cssFileLoader.options.publicPath = '../../';
      }
    }
    // Configure the storysource plugin.
    config.module.rules.push({
      test: /\.stories\.js?$/,
      loader: require.resolve('@storybook/addon-storysource/loader'),
      enforce: 'pre',
    });
    // Not sure what this does?
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        SharedAssets: path.resolve(__dirname, '../../assets/')
      }};
    // Return the altered config
    return config;
  },
};