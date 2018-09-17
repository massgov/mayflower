const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Replace storybook's default rule for media that contained svg.
  defaultConfig.module.rules.forEach((rule, index) => {
    if (rule.test.toString().indexOf('svg') > -1) {
      defaultConfig.module.rules[index].test = /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
      defaultConfig.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            exclude: path.resolve(__dirname, "../src"),
            loader: require.resolve('file-loader'),
            query: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          },
          {
            include: path.resolve(__dirname, "../src"),
            use: [
              {
                loader: 'svg-sprite-loader',
                options: {
                  extract: false,
                  spriteFilename: 'static/media/sprite.svg',
                }
              }
            ]
          }
        ]
      });
    }

  });
  return defaultConfig;
};
