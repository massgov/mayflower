module.exports = {
  "icon": true,
  "svgoConfig": {
    "removeXMLNS": true
  },
  "plugins": ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  "ext": "mjs",
  "prettier": false,
  "template": require('./icon-template'),
}