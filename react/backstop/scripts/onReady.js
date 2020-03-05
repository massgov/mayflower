module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  // Wait for all visible fonts to complete loading.
  await page.evaluate(async function() {
    await document.fonts.ready;
  })

  // Wait for all images to complete loading.
  await page.waitForFunction(() => {
    return Array.from(document.getElementsByTagName('img'))
      .filter(i => i.hasAttribute('src') && !i.complete)
      .length === 0;
  })

  // Force all animation to complete instantly.
  await page.addStyleTag({
    content: '' +
      '*, *::before, *::after {\n' +
      '  animation-delay: 0ms !important;\n' +
      '  animation-duration: 0ms !important;\n' +
      '  transition-duration: 0ms !important;\n' +
      '  transition-delay: 0ms !important;\n' +
      '}' +
      // The expanding transition on emergency alerts takes a moment to open.
      // Force it to finish by using an auto height.
      '.ma__emergency-alerts.expanding {' +
      '  height: auto !important;' +
      '}' +
      '.info__show-button {' +
      '  display: none !important;' +
      '}'
  });
};
