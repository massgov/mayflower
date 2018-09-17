const path = require('path');

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
            loader: require.resolve('url-loader'),
            options: { limit: 1, name: '[name].[hash:8].[ext]' }
          },
          {
            include: path.resolve(__dirname, './src'),
            use: [
              {
                loader: require.resolve('svg-sprite-loader'),
                options: { extract: false, spriteFilename: 'static/media/sprite.svg' }
              }
            ]
          }
        ]
      });
      return config;
    }
  }
};
