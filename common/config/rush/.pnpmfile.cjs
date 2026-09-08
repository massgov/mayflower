'use strict';

/**
 * When using the PNPM package manager, you can use .pnpmfile.cjs to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.io/pnpmfile
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY TO INVALIDATE
 * ANY CACHED DEPENDENCY ANALYSIS.  After any modification to .pnpmfile.cjs, it's recommended to run
 * "rush update --full" so that PNPM will recalculate all version selections.
 */
module.exports = {
  hooks: {
    readPackage
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */
function readPackage(packageJson, context) {
  // Force patched versions of packages with known high/critical advisories,
  // staying within major lines that older eslint/storybook tooling can consume.
  const overrides = {
    'brace-expansion': '^1.1.18',
    minimatch: '^3.1.5',
    'js-yaml': '^4.1.1',
    'cross-spawn': '^7.0.6',
    micromatch: '^4.0.8',
    'form-data': '^3.0.4',
    qs: '^6.14.1',
    lodash: '^4.17.21',
    flatted: '^3.3.3'
  };

  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    const deps = packageJson[field];
    if (!deps) {
      continue;
    }
    for (const [name, version] of Object.entries(overrides)) {
      if (deps[name]) {
        deps[name] = version;
      }
    }
  }

  return packageJson;
}
