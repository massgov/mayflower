// Runs inside Chrome, after PHP renders the real Twig templates into `fixtures`.
const results = fixtures.map((fixture) => {
  const container = document.createElement('div');
  document.body.append(container);
  try {
    container.innerHTML = fixture.html;
    const backgrounds = [];
    const inspectURL = (value) => {
      const url = new URL(value, document.baseURI);
      return {
        href: url.href,
        itok: url.searchParams.get('itok'),
        ampItok: url.searchParams.get('amp;itok')
      };
    };
    const inspectBackground = (value) => {
      // Let the browser resolve and serialize the CSS URL, including CSS escapes.
      const probe = document.createElement('div');
      probe.style.backgroundImage = value;
      container.append(probe);
      const computed = getComputedStyle(probe).backgroundImage;
      probe.remove();
      if (!computed.startsWith('url("') || !computed.endsWith('")')) {
        throw new Error('Expected a parsed background URL, got: ' + computed);
      }
      backgrounds.push(inspectURL(JSON.parse(computed.slice(4, -1))));
    };
    const inspectRules = (rules) => {
      for (const rule of rules) {
        if (rule.style && rule.style.backgroundImage) {
          inspectBackground(rule.style.backgroundImage);
        }
        // Inspect every media-query branch regardless of the browser's viewport or pixel ratio.
        if (rule.cssRules) inspectRules(rule.cssRules);
      }
    };
    for (const style of container.querySelectorAll('style')) inspectRules(style.sheet.cssRules);
    for (const element of container.querySelectorAll('[style]')) {
      if (element.style.backgroundImage) inspectBackground(element.style.backgroundImage);
    }
    const images = Array.from(container.querySelectorAll('img[src]'), (image) => inspectURL(image.src));
    return { backgrounds, images };
  } catch (error) {
    return { error: error.message };
  } finally {
    container.remove();
  }
});
const bytes = new TextEncoder().encode(JSON.stringify(results));
document.documentElement.setAttribute(
  'data-image-url-results',
  btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
);
