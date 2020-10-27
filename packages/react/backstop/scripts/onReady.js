module.exports = async (page, scenario, vp) => {
  await console.log('SCENARIO > ' + scenario.label);

  // Wait for all visible fonts to complete loading.
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  // // Wait for all <img> elements to complete loading.
  await page.waitForFunction(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter(i => i.hasAttribute('src') && !i.complete)
    return unloaded.length === 0;
  });

  // Wait for background images to finish loading.
  await page.evaluate(() => {
    const bgHavingElements = document.querySelectorAll('[role="img"]');
    const loadPromises = Array.from(bgHavingElements).map((element) => {
      const style = getComputedStyle(element);
      if (style.backgroundImage.match(/^url\(/)) {
        // If a background image is found, create an <img> as a way for us to
        // detect its loading status. The promise resolves when it has loaded.
        return new Promise((resolve, reject) =>{
          const url = style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
          const img = document.createElement('img');
          img.setAttribute('src', url);
          img.onload = () => {
            img.remove();
            resolve();
          };
        });
      }
      return Promise.resolve();
    });
    return Promise.all(loadPromises);
  });

  // Force all animation to complete instantly.
  await page.addStyleTag({
    content: '' +
      '*, *::before, *::after {\n' +
      '  animation-delay: 0ms !important;\n' +
      '  animation-duration: 0ms !important;\n' +
      '  transition-duration: 0ms !important;\n' +
      '  transition-delay: 0ms !important;\n' +
      '}' +
      // Clearfix the div we're gonna be screenshotting.
      '#root > div:after {' +
      '  content: "";\n' +
      '  clear: both;\n' +
      '  display: table;' +
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

  // Additional wait for rendering to complete 100%.
  // await page.waitFor(500);
};
