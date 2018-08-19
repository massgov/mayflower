const path = require("path");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = (baseConfig, env, defaultConfig) => {
  // Replace storybook's default rule for media that contained svg.
  defaultConfig.module.rules.forEach((rule, index) => {
    if (rule.test.toString().indexOf('svg') > -1) {
      defaultConfig.module.rules[index].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
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
                options: { extract: true, spriteFilename: 'static/media/sprite.svg' }
              }
            ]
          }
        ]
      });
    }
  });
  if (!defaultConfig.plugins) {
    defaultConfig.plugins = [];
  }
  // This is required for svg-sprite-loader ONLY when you extract the sprite.
  defaultConfig.plugins.push(new SpriteLoaderPlugin({plainSprite: true,}));
  return defaultConfig;
};
