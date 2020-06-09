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
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          sourceMap: true,
          implementation: require('sass'),
          sassOptions: {
            includePaths: [
              path.resolve(__dirname, '../src'),
              path.resolve(__dirname, '../src/components'),
              path.resolve(__dirname, '../src/components/styles'),
            ].concat(assets.includePaths)
          }
        }
      }
    },
  ],
  webpackFinal: async (config, { configType }) => {

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
        MayflowerReactComponents: path.resolve(__dirname, '../src/components'),
        MayflowerReactAtoms: path.resolve(__dirname, '../src/components/atoms'),
        MayflowerReactAnimations: path.resolve(__dirname, '../src/components/animations'),
        MayflowerReactButtons: path.resolve(__dirname, '../src/components/atoms/buttons'),
        MayflowerReactContact: path.resolve(__dirname, '../src/components/atoms/contact'),
        MayflowerReactDivider: path.resolve(__dirname, '../src/components/atoms/Divider'),
        MayflowerReactHeadings: path.resolve(__dirname, '../src/components/atoms/headings'),
        MayflowerReactLinks: path.resolve(__dirname, '../src/components/atoms/links'),
        MayflowerReactLists: path.resolve(__dirname, '../src/components/atoms/lists'),
        MayflowerReactMedia: path.resolve(__dirname, '../src/components/atoms/media'),
        MayflowerReactPlaceholder: path.resolve(__dirname, '../src/components/atoms/Placeholder'),
        MayflowerReactTable: path.resolve(__dirname, '../src/components/atoms/table'),
        MayflowerReactText: path.resolve(__dirname, '../src/components/atoms/text'),
        MayflowerReactBase: path.resolve(__dirname, '../src/components/base'),
        MayflowerReactDataviz: path.resolve(__dirname, '../src/components/dataviz'),
        MayflowerReactForms: path.resolve(__dirname, '../src/components/forms'),
        MayflowerReactMolecules: path.resolve(__dirname, '../src/components/molecules'),
        MayflowerReactOrganisms: path.resolve(__dirname, '../src/components/organisms'),
        MayflowerReactPages: path.resolve(__dirname, '../src/components/pages'),
        MayflowerReactTemplates: path.resolve(__dirname, '../src/components/templates'),
        MayflowerReactUtilities: path.resolve(__dirname, '../src/components/utilities'),
        MayflowerReactGenTeaser: path.resolve(__dirname, '../src/components/organisms/GenTeaser'),
        SharedAssets: '@massds/mayflower-assets/static'
      }};

    // Return the altered config
    return config;
  },
};
