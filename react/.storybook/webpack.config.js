const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.forEach((rule, ruleIndex) => {
    if (rule && typeof rule !== 'string' && rule.test.toString().indexOf('js') > -1) {
      if (config.module.rules[ruleIndex].options) {
        config.module.rules[ruleIndex].options.presets.push('@babel/env');
        config.module.rules[ruleIndex].options.presets.push('@babel/react');
        config.module.rules[ruleIndex].options.plugins.push('@babel/proposal-export-default-from');
        config.module.rules[ruleIndex].options.plugins.push('@babel/proposal-class-properties');
        config.module.rules[ruleIndex].options.plugins.push('@babel/plugin-syntax-dynamic-import');
        config.module.rules[ruleIndex].options.plugins.push('@babel/plugin-proposal-object-rest-spread');
      }
    }
  });
  config.module.rules.push({
    test: /\.stories\.js?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });
  config.module.rules.push({
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
      options: {
        attrs: false
      }
    }
  })
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      SharedAssets: path.resolve(__dirname, '../../assets/'),
    }};

  return config;
};
