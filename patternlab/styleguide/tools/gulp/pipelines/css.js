
var gulpSass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    header        = require("gulp-header"),
    sourcemaps    = require("gulp-sourcemaps"),
    assetsPaths   = require("@massds/mayflower-assets").includePaths,
    path          = require("path"),
    gulpIf        = require("gulp-if"),
    lazypipe      = require("lazypipe");
    
gulpSass.compiler = require("sass");
/**
 * Contains pipeline definitions for transforming CSS.
 *
 * This function returns a lazypipe, which is not initialized
 * until data is sent to it. This allows us to separate the source and
 * destination specification from the specification of the pipeline, and
 * reuse the pipeline as many times as we want.
 */

module.exports = function(minify, root) {
    var sassOptions = {
        outputStyle: minify ? "compressed" : "nested",
        sourceMap: process.env.NODE_ENV !== "production",
        sourceComments: process.env.NODE_ENV !== "production",
        includePaths: assetsPaths
            .concat(
                [path.join(path.dirname(require.resolve("pikaday")), "scss")]
            )
            .concat(
                [path.dirname(require.resolve("normalize-scss"))]
            )
            .concat([`${root}/node_modules`])
    };
    console.log(sassOptions);
    return lazypipe()
        .pipe(sourcemaps.init, { loadMaps: true, largeFile: true})
        .pipe(sourcemaps.identityMap)
        .pipe(gulpSass, sassOptions)
        .pipe(autoprefixer)
        .pipe(pixrem, "16px",{atrules: true, html: true})
        .pipe(rename, {suffix: "-generated"})
        .pipe(function() {
            return gulpIf(!minify, header("/* This file is generated.  DO NOT EDIT. */ \n"));
        })
        .pipe(sourcemaps.write, "./")();
};
