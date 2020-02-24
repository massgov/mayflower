/**
  This array is looped through in build_tokens/index.js to map the source files and the distributed files in @massds/mayflower-tokens
  @src relative path, from the assets/ root, of a file (.ext) or a folder (no trailing slash)
  @dest relative path, under the dist/ folder, of a file (.ext) or a folder (no trailing slash)
*/
const distPaths = [{
  src: 'scss/00-base/_color-tokens.scss',
  dest: 'scss/_colors.scss'
},{
  src: 'fonts',
  dest: 'fonts'
},{
  src: 'images/stateseal.png',
  dest: 'images/stateseal.png'
},{
  src: 'images/stateseal-color.png',
  dest: 'images/stateseal-color.png'
},{
  src: 'images/svg-icons',
  dest: 'images/icons'
}]

module.exports = distPaths;
