const gulpSass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const pixrem = require("gulp-pixrem");
const rename = require("gulp-rename");
const header = require("gulp-header");
const sourcemaps = require("gulp-sourcemaps");
const assetsPaths = require("@massds/mayflower-assets").includePaths;
const path = require("path");
const gulpIf = require("gulp-if");
const lazypipe = require("lazypipe");
const gulpPostcss = require("gulp-postcss");
const postcssSelectorPrepend = require("postcss-selector-prepend");
const postcssRemoveRoot = require("postcss-remove-root"); // Existing plugin for :root

gulpSass.compiler = require("sass");

/**
 * Custom PostCSS plugin to remove `@font-face` and `html` rules.
 */
const postcssRemoveFontFaceAndHtml = () => {
  return {
    postcssPlugin: "remove-font-face-and-html",
    AtRule: {
      "font-face": (atRule) => {
        atRule.remove(); // Remove all @font-face rules
      },
    },
    Rule: {
      html: (rule) => {
        rule.remove(); // Remove all html rules
      },
    },
  };
};
postcssRemoveFontFaceAndHtml.postcss = true;

/**
 * Custom PostCSS plugin to remove specific font declarations.
 */
const postcssRemoveSpecificFont = () => {
  return {
    postcssPlugin: "remove-specific-font",
    Declaration(decl) {
      if (
        decl.prop === "font" || decl.prop === 'font-size'
      ) {
        decl.remove(); // Remove the specific font declaration
      }
    },
  };
};
postcssRemoveSpecificFont.postcss = true;

/**
 * Contains pipeline definitions for transforming CSS.
 */
module.exports = function (minify, root) {
  const sassOptions = {
    outputStyle: minify ? "expanded" : "expanded", // Minify or expanded output
    sourceMap: process.env.NODE_ENV !== "production",
    sourceComments: process.env.NODE_ENV !== "production",
    includePaths: assetsPaths
      .concat([path.join(path.dirname(require.resolve("pikaday")), "scss")])
      .concat([path.dirname(require.resolve("normalize-scss"))])
      .concat([`${root}/node_modules`]),
  };

  const prependSelector = postcssSelectorPrepend({
    selector: ".js-lpb-component-list ", // Prepend this selector
  });

  const removeRoot = postcssRemoveRoot(); // Plugin to remove :root
  const removeFontFaceAndHtml = postcssRemoveFontFaceAndHtml(); // Custom plugin to remove @font-face and html
  const removeSpecificFont = postcssRemoveSpecificFont(); // Custom plugin to remove specific font declaration

  return lazypipe()
    .pipe(sourcemaps.init, { loadMaps: true, largeFile: true })
    .pipe(sourcemaps.identityMap)
    .pipe(gulpSass, sassOptions)
    .pipe(autoprefixer)
    .pipe(pixrem, { rootValue: "16px", atrules: true, html: false })
    .pipe(gulpPostcss, [
      prependSelector,
      removeRoot,
      removeFontFaceAndHtml,
      removeSpecificFont, // Add the font-removal plugin here
    ])
    .pipe(rename, { suffix: "-lp" })
    .pipe(function () {
      return gulpIf(
        !minify,
        header("/* This file is generated. DO NOT EDIT. */ \n")
      );
    })
    .pipe(sourcemaps.write, "./")();
};
