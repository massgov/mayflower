const {argv} = require("optimist");
const path = require("path");
const gulp = require("gulp");
const untildify = require("untildify");

const DistRegistry = require("./Dist");

const root = path.resolve(__dirname, "../../");
const source = path.resolve(root, "source");
const shared = path.resolve(__dirname, "../../../../assets");

const defaults = {
    root: root,
    source: source,
    production: process.env.NODE_ENV === "production",
    dest: {
        // The path of the Pattern Lab public directory.
        patternlab: path.resolve(root, "public"),
        // The path to the intermediate directory where artifacts
        // are compiled.  This can be any directory in the system,
        // including the `mayflower-dev` folder of the Drupal site.
        dist: path.resolve(root, "dist")
    },
    sources: {
        // The following files are considered pattern templates and will
        // be copied to the artifact, etc.
        patterns: path.resolve(source, "_patterns/**"),
        // Assets (see Base.js):
        fonts: path.resolve(shared, "fonts/**"),
        images: path.resolve(shared, "images/**"),
        data: path.resolve(source, "assets/data/**"),
        templates: path.resolve(source, "assets/js/templates/**"),
        modernizr: path.resolve(source, "assets/js/vendor/modernizr.js"),
        // The following directory will be scanned for Bower packages, and
        // compiled into vendor-generated.js.
        bower: path.resolve(source, "assets/js/vendor"),
        // The following paths will be run through browserify/babelify.
        js: path.resolve(source, "assets/js/*.js"),
        // The following paths will be run through SASS.
        scss: path.resolve(source, "assets/scss/**/*.scss"),
        // Extra files to add to the artifact.
        distFiles: [
            path.resolve(source, "_dist/*"),
            // Hidden files too.
            path.resolve(source, "_dist/.*"),
            path.resolve(root, "package.json")
        ]
    },
    // Show verbose output in tasks.
    verbose: false,
    // Toggle minification of CSS and JS.
    minify: true
};

if(argv.dist) {
    defaults.dest.dist = untildify(argv.dist);
}

gulp.registry(new DistRegistry(defaults, argv));

gulp.task("default", gulp.series("patternlab:serve"));
gulp.task("prod", gulp.series("patternlab:build"));
