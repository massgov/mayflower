const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.forEach((rule, ruleIndex) => {
    if (rule && typeof rule !== 'string' && rule.test.toString().indexOf('js') > -1) {
      if (config.module.rules[ruleIndex].options) {
        config.module.rules[ruleIndex].options.presets.unshift('@babel/env');
        config.module.rules[ruleIndex].options.presets.unshift('@babel/react');
        config.module.rules[ruleIndex].options.plugins.push('babel-plugin-dynamic-import-node');
        config.module.rules[ruleIndex].options.plugins.push('@babel/proposal-export-default-from');
        config.module.rules[ruleIndex].options.plugins.push('@babel/proposal-class-properties');
        config.module.rules[ruleIndex].options.plugins.push('@babel/plugin-proposal-object-rest-spread');
        config.module.rules[ruleIndex].use = [
          {
            loader: 'babel-loader',
            options: {
              ...config.module.rules[ruleIndex].options
            }
          }
        ];
        delete config.module.rules[ruleIndex].options;
        delete config.module.rules[ruleIndex].loader;
      }
    }
  });
  config.module.rules.push({
    test: /\.stories\.js?$/,
    loader: require.resolve('@storybook/addon-storysource/loader'),
    enforce: 'pre',
  });
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      SharedAssets: path.resolve(__dirname, '../../assets/'),
      GitbookAssets: path.resolve(__dirname, '../../docs/.gitbook/assets'),
    }};

  return config;
};
