module.exports = function (chromy, scenario, vp) {
  console.log('SCENARIO > ' + scenario.label);
  //require('./clickAndHoverHelper')(chromy, scenario);
  require('./noAnimationHelper')(chromy, scenario);
  require('./noGoogleHelper')(chromy, scenario);
  // add more ready handlers here...
};
