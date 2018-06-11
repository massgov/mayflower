
var sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    header        = require("gulp-header"),
    sourcemaps    = require("gulp-sourcemaps"),
    normalizePaths= require("node-normalize-scss").includePaths,
    neatPaths     = require("node-neat").includePaths,
    gulpIf        = require("gulp-if"),
    lazypipe      = require("lazypipe");

/**
 * Contains pipeline definitions for transforming CSS.
 *
 * This function returns a lazypipe, which is not initialized
 * until data is sent to it. This allows us to separate the source and
 * destination specification from the specification of the pipeline, and
 * reuse the pipeline as many times as we want.
 */
module.exports = function(minify) {
    var sassOptions = {
        outputStyle: minify ? "compressed" : "nested",
        includePaths: [].concat(
            normalizePaths,
            neatPaths
        )
    };
    return lazypipe()
        .pipe(sourcemaps.init)
        .pipe(sass, sassOptions)
        .pipe(autoprefixer)
        .pipe(pixrem, "16px",{atrules: true, html: true})
        .pipe(rename, {suffix: "-generated"})
        .pipe(function() {
            return gulpIf(!minify, header("/* This file is generated.  DO NOT EDIT. */ \n"));
        })
        .pipe(sourcemaps.write, "./")();
};

