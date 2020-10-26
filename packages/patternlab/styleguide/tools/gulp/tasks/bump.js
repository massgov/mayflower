var gulp   = require("gulp"),
    bump   = require("gulp-bump"),
    argv   = require("yargs").argv;

module.exports = function bumpTask(config){

    // figure out the env variable
    // argv has precedence. (if it was passed in the command line. eg. gulp bump --version 1.2.3)
    var version = argv.v || config.version;

    // copy files settings
    var cfg = {
        src: [
          config.patternLabRoot + "/package.json"
        ]
    };

    /* bump semver version in files */
    // Set a specific version
    gulp.task("bump", function(){
        return gulp.src(cfg.src, {base: "./"})
            .pipe(bump({version: version}))
            .pipe(gulp.dest("."));
    });
};
