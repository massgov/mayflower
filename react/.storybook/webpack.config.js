const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve = {
    ...defaultConfig.resolve,
     alias: {
      ...defaultConfig.resolve.alias,
      SharedAssets: path.resolve(__dirname, '../../assets/'),
   }};

  return defaultConfig;
};
