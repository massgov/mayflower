const path = require('path');
const assets = require('@massds/mayflower-assets');
const iconPath = path.resolve(__dirname, '../src/components/base/Icon/assets');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          enforce: 'pre',
        }
      }
    },
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
  webpackFinal: (config, { configType }) => {
    // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = iconPath;
    

    config.module.rules.unshift({
      test: /\.svg$/,
      include: iconPath,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            outDir: './src/components/base/Icon'
          },
        },
      ],
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
