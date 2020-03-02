module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  await page.addStyleTag({
    content: '' +
      // Force all animation to complete immediately.
      '*, *::before, *::after {\n' +
      '  animation-delay: 0ms !important;\n' +
      '  animation-duration: 0ms !important;\n' +
      '  transition-duration: 0ms !important;\n' +
      '  transition-delay: 0ms !important;\n' +
      '}'
  });
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
};
