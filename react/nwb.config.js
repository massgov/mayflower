const path = require('path');

module.exports = {

  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  babel: {
    config(config) {
      config.overrides = [
        {
          ignore: [
            '**/*.stories.js',
            '**/*.knobs.options.js',
            '**/*.knob.options.js'
          ]
        }
      ];
      return config;
    }
  }
};
