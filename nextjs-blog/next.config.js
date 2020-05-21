const path = require('path')
const assets = require('@massds/mayflower-assets');
const withTM = require('next-transpile-modules')(['@massds/mayflower-react']);
module.exports = (phase, { defaultConfig }) => {
  return withTM({
      sassOptions: {
        includePaths: [
          path.resolve(__dirname, './pages'),
          './node_modules',
          path.resolve(__dirname, './node_modules/@massds/mayflower-react/lib/components')
        ].concat(assets.includePaths)
      },
      webpack(config, options) {
        const { isServer } = options;
        // File asset support.
        config.module.rules.push({
          test: /\.(jpe?g|png|gif|ico|webp|jp2)$/,
          issuer: {
            // Next.js already handles url() in css/sass/scss files
            test: /\.\w+(?<!(s?c|sa)ss)$/i,
          },
          exclude: defaultConfig.exclude,
          use: [
            {
              loader: require.resolve("url-loader"),
              options: {
                limit: 8192,
                fallback: require.resolve("file-loader"),
                publicPath: `${defaultConfig.assetPrefix}/_next/static/images/`,
                outputPath: `${isServer ? "../" : ""}static/images/`,
                name: "[name]-[hash].[ext]",
                esModule: true
              }
            }
          ]
        });
        // Modify sass settings to use sass and not node-sass.
        config.module.rules.forEach(rule => {
          if (rule.oneOf) {
            const nestedScss = rule.oneOf.find((one) => {
              return one.test
                && 'some.scss'.match(one.test) 
                && one.issuer 
                && one.issuer.include 
                && one.issuer.include.includes('_app');
            });
            if (nestedScss) {
              const sassLoader = nestedScss.use.find(u => u.loader.includes('sass-loader'));
              // Fixes bug where next doesn't choose between node-sass and sass
              // if both are installed.
              sassLoader.options.implementation = require('sass');
              // Prevents styles from being deleted on build.
              nestedScss.sideEffects = true;
            }
          }
        })
        return config;
      },
    })
};