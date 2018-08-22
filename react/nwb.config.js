const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Mayflower',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    stage: 1
  },
  webpack: {
    config(config) {
      config.module.rules.forEach((rule, index) => {
        if (rule.test.toString().indexOf('svg') > -1) {
          config.module.rules.splice(index, 1);
        }
      });
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            exclude: path.resolve(__dirname, './src'),
            loader: require.resolve('file-loader'),
            query: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            include: path.resolve(__dirname, './src'),
            use: [
              {
                loader: 'svg-sprite-loader',
                options: { extract: true, spriteFilename: 'static/media/sprite.svg' }
              }
            ]
          }
        ]
      });
      config.plugins.push(new SpriteLoaderPlugin({ plainSprite: true }));
      return config;
    }
  }
};
