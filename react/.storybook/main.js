const path = require("path");

module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/react'
          ],
          plugins: [
            'babel-plugin-dynamic-import-node',
            '@babel/proposal-export-default-from',
            '@babel/proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
          ],
        },
      },
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.stories\.js?$/,
      loader: require.resolve('@storybook/addon-storysource/loader'),
      enforce: 'pre',
    });

    // Return the altered config
    return config;
  },
};
