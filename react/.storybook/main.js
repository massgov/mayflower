const path = require('path');
const assets = require('@massds/mayflower-assets');
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    {
      name: '@storybook/preset-create-react-app',
    },
  ],
  webpackFinal: async (config, { configType }) => {
    
    // Remove the default sass-loader rule from create-react-app.
    config.module.rules = config.module.rules.filter(rule => {
      if (rule.test) {
        if (!'some.scss'.match(rule.test)) {
          return true;
        } else {
          return rule.oneOf;
        }
      } else {
        return true;
      }
    });
    // @storybook/preset-create-react-app changes the entire
    // structure of rules. one of the rules with oneOf
    // contains all the rules now.
    const groupedRules = config.module.rules.find((rule) => {
      if (rule.oneOf) {
        return rule;
      }
    });
    // Add special plugins to the babel loader.
    const babelRule = groupedRules.oneOf.find(rule => rule.loader && rule.loader.match('babel-loader'));
    if (babelRule) {
      babelRule.options.plugins = babelRule.options.plugins.concat([
        "@babel/proposal-export-default-from",
      ]);
      // Remove preset-env and preset-react as preset-react-app already defines it.
      babelRule.options.presets = babelRule.options.presets.filter((plugin) => {
        return !plugin.includes('/preset-env/') && !plugin.includes('/preset-react/');
      });
    }
    const sassRule = groupedRules.oneOf.find((nestedRule) => nestedRule.test && 'some.scss'.match(nestedRule.test))
    if (sassRule) {
      const sassLoader = sassRule.use.find(loader => loader.loader && loader.loader.includes('sass-loader'));      
      if (sassLoader) {
        sassLoader.options = {
          sourceMap: configType !== 'PRODUCTION',
          implementation: require('sass'),
          sassOptions: {
            includePaths: [
              path.resolve(__dirname, '../src/components'),
            ].concat(assets.includePaths)
          }
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
