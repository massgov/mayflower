const path = require('path');
const assets = require('@massds/mayflower-assets');
const nodeModules = path.resolve(path.join(process.cwd(), 'node_modules'));
const pnpmNodeModules = path.join(nodeModules, '.pnpm', 'node_modules');
console.log(path.resolve(nodeModules, '@massds/mayflower-react/dist/styles'))

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
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
  ]
}
