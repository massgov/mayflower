const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.forEach((rule, ruleIndex) => {
    if (rule && typeof rule !== 'string' && rule.test.toString().indexOf('js') > -1) {
      if (defaultConfig.module.rules[ruleIndex].options) {
        defaultConfig.module.rules[ruleIndex].options.presets.push('@babel/env');
        defaultConfig.module.rules[ruleIndex].options.presets.push('@babel/react');
        defaultConfig.module.rules[ruleIndex].options.plugins.push('@babel/proposal-export-default-from');
        defaultConfig.module.rules[ruleIndex].options.plugins.push('@babel/proposal-class-properties');
        defaultConfig.module.rules[ruleIndex].options.plugins.push('@babel/plugin-syntax-dynamic-import');
      }
    }
  });
  defaultConfig.externals = {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  };
  defaultConfig.resolve = {
    ...defaultConfig.resolve,
     alias: {
      ...defaultConfig.resolve.alias,
      SharedAssets: path.resolve(__dirname, '../../assets/'),
   }};

  return defaultConfig;
};
