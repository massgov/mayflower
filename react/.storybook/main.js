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
    
    // Remove the default sass-loader rule from create-react-app.
    // config.module.rules = config.module.rules.filter(rule => {
    //   if (rule.test) {
    //     if (!'some.scss'.match(rule.test)) {
    //       return true;
    //     } else {
    //       return rule.oneOf;
    //     }
    //   } else {
    //     return true;
    //   }
    // });
    // @storybook/preset-create-react-app changes the entire
    // structure of rules. one of the rules with oneOf
    // contains all the rules now.
    // const groupedRules = config.module.rules.find((rule) => {
    //   if (rule.oneOf) {
    //     return rule;
    //   }
    // });
    // Add special plugins to the babel loader.
    // const babelRule = groupedRules.oneOf.find(rule => rule.loader && rule.loader.match('babel-loader'));
    // if (babelRule) {
    //   babelRule.options.plugins = babelRule.options.plugins.concat([
    //     "@babel/proposal-export-default-from",
    //   ]);
    //   // Remove preset-env and preset-react as preset-react-app already defines it.
    //   // babelRule.options.presets = babelRule.options.presets.filter((plugin) => {
    //   //   return !plugin.includes('/preset-env/') && !plugin.includes('/preset-react/');
    //   // });
    // }
    // const sassRule = groupedRules.oneOf.find((nestedRule) => nestedRule.test && 'some.scss'.match(nestedRule.test))
    // if (sassRule) {
    //   const sassLoader = sassRule.use.find(loader => loader.loader && loader.loader.includes('sass-loader'));      
    //   const cssLoader = sassRule.use.find(loader => loader.loader && loader.loader.includes('css-loader'));
    //   if (cssLoader) {
    //     cssLoader.options.sourceMap = configType !== 'PRODUCTION';
    //   }      

    //   if (sassLoader) {
    //     sassLoader.options = {
    //       sourceMap: configType !== 'PRODUCTION',
    //       implementation: require('sass'),
    //       sassOptions: {
    //         includePaths: [
    //           path.resolve(__dirname, '../src'),
    //           path.resolve(__dirname, '../src/components'),
    //           path.resolve(__dirname, '../src/components/styles'),
    //         ].concat(assets.includePaths)
    //       }
    //     }
    //   }
    // }

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
