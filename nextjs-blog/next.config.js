const path = require('path')
const assets = require('@massds/mayflower-assets');

module.exports = (phase, { defaultConfig }) => {
  return {
      sassOptions: {
        includePaths: [
          path.resolve(__dirname, './pages'),
          './node_modules',
          path.resolve(__dirname, './node_modules/@massds/mayflower-react/lib/components')
        ].concat(assets.includePaths)
      },
      webpack(config, options) {
        const { isServer } = options;
  
        config.module.rules.push({
          test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
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
        //config.resolve.symlinks = false;
        //config.resolveLoader.symlinks = false;
        //config.resolveLoader.alias['@massds/mayflower-assets'] = path.resolve(__dirname, './node_modules/@massds/mayflower-assets');
        // if (typeof defaultConfig.webpack === 'function') {
        //   return defaultConfig.webpack(config, options)
        // }
        
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
              sassLoader.options.implementation = require('sass');
              nestedScss.sideEffects = true;
            }
          }
        })
        //console.log(config.module.rules);
        //config.module.rules.forEach(rule => rule.oneOf && console.log(rule.oneOf));
        return config;
      },
    }
};