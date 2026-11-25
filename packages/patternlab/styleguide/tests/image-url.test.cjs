const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { before, test } = require('node:test');
const { pathToFileURL } = require('node:url');

// Twig reuses compiled template classes within a PHP process. Isolate the modes
// so a class compiled with HTML escaping cannot leak into the disabled-mode run.
const fixtures = ['html', 'disabled'].flatMap((mode) => {
  const rendered = spawnSync(process.env.PHP_BIN || 'php', [join(__dirname, 'render-image-url-fixtures.php'), mode], {
    encoding: 'utf8',
    maxBuffer: 4 * 1024 * 1024
  });
  assert.equal(rendered.status, 0, rendered.stderr || String(rendered.error));
  return JSON.parse(rendered.stdout);
});
// A reserved, synthetic origin; CSP prevents all network requests.
const baseURL = 'https://fixtures.invalid/';
let results;

before(() => {
  const chrome = process.env.CHROME_BIN || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser'
  ].find(existsSync);
  assert.ok(chrome, 'Install Chrome/Chromium or set CHROME_BIN to its executable.');

  const directory = mkdtempSync(join(tmpdir(), 'mayflower-image-urls-'));
  try {
    // Embed fixture data safely, including URLs containing a literal closing style tag.
    const data = JSON.stringify(fixtures).replace(/</g, '\\u003c');
    const html = `<!doctype html><meta charset="utf-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'">
      <base href="${baseURL}"><body><script>
      const fixtures = ${data};
      ${readFileSync(join(__dirname, 'inspect-image-urls.js'), 'utf8')}
      </script>`;
    const page = join(directory, 'fixtures.html');
    writeFileSync(page, html);
    const browser = spawnSync(chrome, [
      '--headless', '--no-sandbox', '--disable-gpu', '--disable-background-networking',
      '--disable-extensions', '--timeout=10000', '--virtual-time-budget=1000',
      '--no-first-run', '--no-default-browser-check',
      '--user-data-dir=' + join(directory, 'profile'),
      '--dump-dom', pathToFileURL(page).href
    ], { encoding: 'utf8', timeout: 60000, maxBuffer: 4 * 1024 * 1024 });
    assert.equal(browser.status, 0, browser.stderr || String(browser.error));
    const output = browser.stdout.match(/data-image-url-results="([A-Za-z0-9+/=]+)"/);
    assert.ok(output, 'Browser did not finish the URL assertions.\n' + browser.stderr);
    results = JSON.parse(Buffer.from(output[1], 'base64').toString('utf8'));
    assert.equal(results.length, fixtures.length);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

for (const [index, fixture] of fixtures.entries()) {
  test(fixture.name, () => {
    const result = results[index];
    assert.equal(result.error, undefined, result.error);
    for (const kind of ['backgrounds', 'images']) {
      assert.equal(result[kind].length, fixture[kind].length, kind + ' count');
      fixture[kind].forEach((original, urlIndex) => {
        const expected = new URL(original, baseURL);
        const actual = result[kind][urlIndex];
        assert.equal(actual.href, expected.href, kind + '[' + urlIndex + ']');
        assert.equal(actual.itok, expected.searchParams.get('itok'));
        assert.equal(actual.ampItok, null, 'Browser must not see an amp;itok parameter');
      });
    }
  });
}
