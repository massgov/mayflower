const path = require("path");
const gulp = require("gulp");
const untildify = require("untildify");
require('dotenv').config();

const DistRegistry = require("./Dist");

const root = path.resolve(__dirname, "../../");
const source = path.resolve(root, "source");
const shared = path.dirname(require.resolve("@massds/mayflower-assets"));
const defaults = {
    dest: {
        // The path of the Pattern Lab public directory.
        patternlab: path.resolve(root, "public"),
        // The path to the intermediate directory where artifacts
        // are compiled.  This can be any directory in the system,
        // including the `mayflower-dev` folder of the Drupal site.
        dist: path.resolve(root, "dist")
    },
    sources: {
        root: root,
        // The following files are considered pattern templates and will
        // be copied to the artifact, etc.
        patterns: path.resolve(source, "_patterns/**"),
        // Assets (see Base.js):
        fonts: path.resolve(shared, "static", "fonts/**"),
        images: path.resolve(shared, "static", "images/**"),
        data: path.resolve(source, "assets/data/**"),
        templates: path.resolve(source, "assets/js/templates/**"),
        modernizr: path.resolve(source, "assets/js/vendor/modernizr.js"),
        // The following directory will be scanned for Bower packages, and
        // compiled into vendor-generated.js.
        bower: path.resolve(source, "assets/js/vendor"),
        // The following paths will be run through browserify/babelify.
        js: path.resolve(source, "assets/js/{index,vendor}.js"),
        // jsVendor: path.resolve(source, "assets/js/vendor.js"),
        // The following paths will be watched to trigger js-based rebuilds.
        jsWatch: [
            path.resolve(source, "assets/js/helpers/*.js"),
            path.resolve(source, "assets/js/modules/*.js"),
            path.resolve(source, "assets/js/templates/*.html"),
            path.resolve(source, "assets/js/*.js")
        ],
        // The following paths will be run through SASS.
        scss: [
            path.resolve(source, "assets/scss/**/*.scss"),
            path.resolve(shared, "scss/**/*.scss")
        ],
        // Extra files to add to the artifact.
        distFiles: [
            path.resolve(source, "_dist/*"),
            // Hidden files too.
            path.resolve(source, "_dist/.*"),
            path.resolve(root, "package.json"),
            path.resolve(root, "LICENSE")
        ]
    },
    // Show verbose output in tasks.
    verbose: false,
    // Toggle minification of CSS and JS.
    minify: true
};

if(process.env.MAYFLOWER_DIST) {
    defaults.dest.dist = untildify(process.env.MAYFLOWER_DIST);
}

gulp.registry(new DistRegistry(defaults));

gulp.task("default", gulp.series("patternlab:serve"));
gulp.task("prod", gulp.series("patternlab:build"));
