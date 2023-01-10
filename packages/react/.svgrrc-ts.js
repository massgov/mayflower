const baseConfig = require('./.svgrrc.js')

module.exports = {
  ...baseConfig,
  "ext": "tsx",
  "typescript": true,
  "template": require('./icon-template-ts'),
}
