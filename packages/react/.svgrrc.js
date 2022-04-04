module.exports = {
  "icon": true,
  "svgo": {
    "removeXMLNS": true,
    "addAttributesToSVGElement": {
      "attributes": [{ "focusable": false}]
    }
  },
  "plugins": [
    "@svgr/plugin-svgo", 
    "@svgr/plugin-jsx"
  ],
  "ext": "mjs",
  "prettier": false,
  "template": require('./icon-template'),
}