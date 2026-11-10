const path = require('path');
const assets = require('@massds/mayflower-assets');
const nodeModules = path.resolve(path.join(process.cwd(), 'node_modules'));
const pnpmNodeModules = path.join(nodeModules, '.pnpm', 'node_modules');
const mdsPrimitivesCss = require.resolve('@massds/mds-tokens/dist/primitives.css');

module.exports = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true
      }
    },
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          sourceMap: true
        },
        sassLoaderOptions: {
          sourceMap: true,
          implementation: require('sass'),
          sassOptions: {
            includePaths: [
              nodeModules,
              pnpmNodeModules,
              path.resolve(__dirname, '../stories'),
              path.resolve(nodeModules, '@massds/mayflower-react/dist'),
              path.resolve(nodeModules, '@massds/mayflower-assets/scss')
            ].concat(assets.includePaths)
          }
        }
      }
    }
  ],
  // Add webpack configuration
  webpackFinal: async (config) => {
    // Add alias for @core imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@core': path.resolve(__dirname, '..'), // Points to packages/core/
      // Workaround: when css-loader sees "primitives.css" (or "./primitives.css"), force it to the package file instead of story-local resolution.
      'primitives.css$': mdsPrimitivesCss,
      './primitives.css$': mdsPrimitivesCss,
    };
    return config;
  }
}
