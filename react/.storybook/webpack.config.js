const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.forEach((rule, ruleIndex) => {
    if (rule && typeof rule !== 'string' && rule.test.toString().indexOf('js') > -1) {
      if (defaultConfig.module.rules[ruleIndex].options) {
        defaultConfig.module.rules[ruleIndex].options.plugins.push('@babel/plugin-proposal-export-default-from');
      }
    }
  });
  defaultConfig.resolve = {
    ...defaultConfig.resolve,
     alias: {
      ...defaultConfig.resolve.alias,
      SharedAssets: path.resolve(__dirname, '../../assets/'),
   }};

  return defaultConfig;
};
