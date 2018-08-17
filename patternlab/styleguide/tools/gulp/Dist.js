/**
 * This is a Gulp Task Registry.
 *
 * This file defines a multistage build with the following stages:
 *
 * Stage 1: Compile CSS/JS and copy assets to an intermediate directory (dist).
 * Stage 2: Copy all dist assets into the patternlab directory and build patternlab.
 *
 * The dist directory is what we base our composer package on, and it is in the same
 * general structure as what gets copied into the patternlab public directory.
 */

const DefaultRegistry = require("undertaker-registry");
const path = require('path');
const gulp = require('gulp');
const {exec} = require("child-process-promise");
const merge = require('merge-stream');
const mainBowerFiles = require('main-bower-files');
const browserSync    = require("browser-sync");
const del = require('del');

const e = require("./helpers/escape");
const cssPipe = require('./pipelines/css');
const jsPipe = require('./pipelines/js');


const task = function(name, cb, watch) {
    cb.displayName = name;
    cb.watchFiles = watch
    return cb;
}

class DistRegistry extends DefaultRegistry {
    constructor(config) {
        super();
        this.config = config
    }
    init(taker) {
        const self = this;
        const {config} = this;
        const {sources} = config;

        const clean = task('clean', () => del(self.resolveDist(), {force: true}));
        const css = task('css', () => gulp.src(sources.scss)
                .pipe(cssPipe(config.minify, config.root))
                .pipe(gulp.dest(self.resolveDist('assets/css'))),
        )
        css.watchFiles = config.sources.scss;
        const assets = task('assets', () => {
            var pipes = [
                gulp.src(sources.distFiles).pipe(gulp.dest(this.resolveDist())),
                gulp.src(sources.images).pipe(gulp.dest(this.resolveDist('assets/images'))),
                gulp.src(sources.fonts).pipe(gulp.dest(this.resolveDist('assets/fonts'))),
                gulp.src(sources.data).pipe(gulp.dest(this.resolveDist('assets/data'))),
                gulp.src(sources.templates).pipe(gulp.dest(this.resolveDist('assets/js/templates'))),
                gulp.src(sources.modernizr).pipe(gulp.dest(this.resolveDist('assets/js/vendor'))),
                gulp.src(sources.patterns).pipe(gulp.dest(this.resolveDist('twig')))
            ];
            return merge(pipes);
        });
        assets.watchFiles = [sources.images, sources.fonts, sources.data, sources.templates, sources.modernizr]

        const js = task('js', () => {
            var pipes = [
                gulp.src(mainBowerFiles({paths: sources.bower}))
                    .pipe(jsPipe.vendor(config.minify))
                    .pipe(gulp.dest(self.resolveDist('assets/js'))),
                gulp.src(sources.js)
                    .pipe(jsPipe.custom(config.minify))
                    .pipe(gulp.dest(self.resolveDist('assets/js')))
            ];
            return merge(pipes);
        });
        js.watchFiles = sources.js;

        taker.task('dist:build', taker.series(clean, taker.parallel(
            css,
            js,
            assets
        )))
        taker.task('dist:watch', taker.series('dist:build', task('watcher', () => {
            taker.watch(css.watchFiles, css);
            taker.watch(js.watchFiles, js);
            taker.watch(assets.watchFiles, assets);
        })));

        const doPL = this.buildPatternlabTask();
        const doPLCopy = function() {
            return gulp.src(self.resolveDist('**'))
                .pipe(gulp.dest(self.resolvePatternlab()));
        }
        doPLCopy.watchFiles = self.resolveDist('**');

        taker.task('patternlab:build', taker.series(taker.parallel('dist:build', doPL), doPLCopy));
        taker.task('patternlab:serve', taker.series('patternlab:build', task('server', () => {
            const sync = browserSync.create();
            sync.init({
                port: 3000,
                open: false, // or  "external"
                notify: false,
                ghostMode: false,
                reloadDelay: 200,
                server: self.resolvePatternlab()
            });
            const reload = (done) => {
                console.log(sync.reload());
                done();
            }
            const copyAndReload = () => gulp.series(doPLCopy, reload)
            taker.watch(css.watchFiles, gulp.series(css, copyAndReload));
            taker.watch(js.watchFiles, gulp.series(js, copyAndReload));
            taker.watch(assets.watchFiles, gulp.series(assets, copyAndReload));
            taker.watch(doPL.watchFiles, gulp.series(doPL, reload));
        })));
    }
    buildPatternlabTask() {
        const self = this;
        let task = () => {
            let opts = {verbose: 3};
            return exec(`php ${e(self.resolveRoot("core/console"))} --generate --patternsonly`, opts);
        };
        task.watchFiles = [this.config.sources.patterns];
        task.displayName = "patternlab:patterns";
        return task;
    }
    resolveRoot(subPath) {
        if(!this.config.root) {
            throw new Error("Unable to determine root directory!");
        }
        return subPath ? path.resolve(this.config.root, subPath) : this.config.root;
    }
    resolveDist(subPath) {
        if(!this.config.dest.dist) {
            throw new Error("Please set config.dest.dist");
        }
        return subPath ? path.resolve(this.config.dest.dist, subPath) : this.config.dest.dist;
    }
    resolvePatternlab(subPath) {
        if(!this.config.dest.patternlab) {
            throw new Error("Please set config.dest.patternlab");
        }
        return subPath ? path.resolve(this.config.dest.patternlab, subPath) : this.config.dest.patternlab;
    }
}

module.exports = DistRegistry;