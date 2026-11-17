'use strict';

/**
 * When using the PNPM package manager, you can use .pnpmfile.cjs to work around
 * dependencies that have mistakes in their package.json file. This feature is
 * functionally similar to Yarn's resolutions.
 *
 * For details, see the PNPM documentation:
 * https://pnpm.io/pnpmfile
 *
 * IMPORTANT: Since this file contains executable code, modifying it is likely to invalidate
 * cached dependency analysis. After any modification, run "rush update --full" so PNPM
 * recalculates all version selections.
 */
module.exports = {
  hooks: {
    readPackage
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 */
function readPackage(packageJson) {
  return packageJson;
}
