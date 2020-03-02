module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  console.log('URL > ' + scenario.url);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
};
