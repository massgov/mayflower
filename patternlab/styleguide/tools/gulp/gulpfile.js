const argv = require("optimist").argv;
const path = require("path");
const gulp = require("gulp");

const PatternLabRegistry = require("./PatternLab");
const ArtifactsRegistry = require("./Artifacts");
const NPMRegistry = require("./NPM");

const root = path.resolve(__dirname, "../../");
const source = path.resolve(root, "source");

const defaults = {
    root: root,
    source: source,
    production: process.env.NODE_ENV === "production",

    // Determines the base domain used when building Pattern Lab.
    baseDomain: "https://mayflower.digital.mass.gov/",
    // Determines where we git push and pull the artifact from
    artifactUrl: "git@github.com:massgov/mayflower-artifacts.git",
    s3Bucket: process.env.AWS_BUCKET,
    dest: {
        // The path the artifact is built to.
        artifact: path.resolve(root, "artifact"),
        // The path the NPM package is built to.
        npm: path.resolve(root, "npm"),
        // The path of the Pattern Lab public directory.
        patternlab: path.resolve(root, "public")
    },
    sources: {
        // The following files are considered pattern templates and will
        // be copied to the artifact, etc.
        patterns: path.resolve(source, "_patterns/**"),
        // The following assets will be copied to asset directories.
        assets: [
            path.resolve(source, "assets/fonts/**"),
            path.resolve(source, "assets/images/**"),
            path.resolve(source, "assets/js/templates/**"),
            path.resolve(source, "assets/data/**"),
            path.resolve(source, "assets/js/vendor/modernizr.js")
        ],
        // The following directory will be scanned for Bower packages, and
        // compiled into vendor-generated.js.
        bower: path.resolve(source, "assets/js/vendor"),
        // The following paths will be run through browserify/babelify.
        js: path.resolve(source, "assets/js/*.js"),
        // The following paths will be run through SASS.
        scss: path.resolve(source, "assets/scss/**/*.scss")
    },
    // Show verbose output in tasks.
    verbose: false,
    // Toggle minification of CSS and JS.
    minify: true
};

gulp.registry(new PatternLabRegistry(defaults, argv));
gulp.registry(new NPMRegistry(defaults, argv));
gulp.registry(new ArtifactsRegistry(defaults, argv));

// @todo: Do we need svg2twig?
// @todo: Do we need the svg-sprite task?


gulp.task("default", gulp.series("patternlab:watch"));
gulp.task("prod", gulp.series("patternlab:build"));
