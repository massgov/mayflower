const uglify         = require("gulp-uglify"),
    rename         = require("gulp-rename"),
    sourcemaps     = require("gulp-sourcemaps"),
    browserify     = require("browserify"),
    gulpIf         = require("gulp-if"),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    minimatch      = require("minimatch"),
    lazypipe       = require("lazypipe"),
    through        = require("through2");


/**
 * Contains pipeline definitions for transforming JS.
 *
 * Both vendor and custom return a lazypipe, which is not initialized
 * until data is sent to it. This allows us to separate the source and
 * destination specification from the specification of the pipeline, and
 * reuse the pipeline as many times as we want.
 */
module.exports = {
    vendor: function(minify) {
        return lazypipe()
            .pipe(filter, "**/*.js")
            .pipe(sourcemaps.init, {loadMaps: true})
            .pipe(concat, "vendor.js", {newLine: ";"})
            .pipe(function() {
                return gulpIf(minify, uglify());
            })
            .pipe(rename, {suffix: "-generated"})
            .pipe(sourcemaps.write, "./")();
    },
    custom: function(minify) {
        const browserifyOptions = {
            debug: true
        };
        return lazypipe()
            .pipe(browserifyNoExternals, browserifyOptions)
            .pipe(sourcemaps.init, { loadMaps: true })
            .pipe(function() {
                return gulpIf(minify, uglify());
            })
            .pipe(rename, {suffix: "-generated"})
            .pipe(sourcemaps.write, "./")();
    }

};

function browserifyNoExternals(options) {
    return through.obj(function (file, enc, callback){

        // https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
        const b = browserify(options || {}) // pass options
            .add(file.path) // this file
            .transform("babelify");

        b.on("file", function(file) {
            // Exclude vendor files from node_modules and bower_components.
            if(minimatch(file, "**/node_modules/**") || minimatch(file, "**/bower_components/**")) {
                b.external(file);
            }
        });

        b.bundle(function(err, res){
            if (err){
                callback(err, null); // emit error so drano can do it's thang
            }
            else {
                file.contents = res; // assumes file.contents is a Buffer
                callback(null, file); // pass file along
            }
        });

    });
}
