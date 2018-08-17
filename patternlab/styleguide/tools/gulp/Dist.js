/**
 * This is a Gulp Task Registry.
 *
 * It contains the tasks and logic for building compiled assets.
 */

const MayflowerRegistry = require('./Base');
const path = require('path');
const gulp = require('gulp');
const exec = require("child-process-promise").exec;
const e = require("./helpers/escape");
const browserSync    = require("browser-sync");

const task = function(name, cb, watch) {
    cb.displayName = name;
    cb.watchFiles = watch
    return cb;
}

class DistRegistry extends MayflowerRegistry {
    init(taker) {
        const self = this;

        const clean = task('clean', () => del(self.resolveDist()));
        const css = task(
            'css',
            () => gulp.src(config.sources.scss)
                .pipe(css(config.minify, config.root))
                .pipe(gulp.dest(self.resolveDist('assets/css')))
            config.sources.scss
        )

        // const clean = this.buildCleanTask(self.resolveDist(), 'dist:clean');
        // const doCss = this.buildCssTask(self.resolveDist("assets/css"), "dist:css");
        const doVendorJS = this.buildJSVendorTask(self.resolveDist("assets/js"), "dist:js-vendor");
        const doCustomJS = this.buildJSCustomTask(self.resolveDist("assets/js"), "build:js-custom");

        const doJs = taker.parallel(
            doVendorJS,
            doCustomJS
        );
        const doAssets = this.buildCopyAssetsTask(self.resolveDist('assets'), 'dist:assets');

        taker.task('dist:build', taker.parallel(
            clean,
            css,
            doJs,
            doAssets
        ));
        taker.task('dist:watch', taker.series('dist:build', task('watcher', () => {
            taker.watch(css.watchFiles, css);
            taker.watch(doCustomJS.watchFiles, doCustomJS);
            taker.watch(doAssets.watchFiles, doAssets);
        })));

        const doPL = this.buildPatternlabTask();
        const doPLCopy = function() {
            return gulp.src([self.resolveDist('assets'), self.resolveDist('twig')])
                .pipe(gulp.dest(self.config.dest.patternlab));
        }
        doPLCopy.watchFiles = [self.resolveDist('assets'), self.resolveDist('twig')];

        taker.task('patternlab:build', taker.series('dist:build', doPLCopy, doPL));
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
            taker.watch(css.watchFiles, css);
            taker.watch(doVendorJS.watchFiles, doVendorJS);
            taker.watch(doCustomJS.watchFiles, doCustomJS);
            taker.watch(doAssets.watchFiles, doAssets);
            // There are only two things that can cause an update the Patternlab output:
            // The Patternlab Copy job (includes anything in dist).
            taker.watch(doPLCopy.watchFiles, doPLCopy).on('change', sync.reload);
            // Patternlab template changes.
            taker.watch(doPL.watchFiles, doPL).on('change', sync.reload);
        })));
    }
    buildPatternlabTask() {
        const self = this;
        let task = () => {
            let opts = {verbose: 3};
            return exec(`php ${e(self.resolve("core/console"))} --generate --patternsonly`, opts);
        };
        task.watchFiles = [this.config.sources.patterns];
        task.displayName = "patternlab:patterns";
        return task;
    }
    resolveDist(subPath) {
        if(!this.config.dest.dist) {
            throw new Error("Please set config.dest.dist");
        }
        return subPath ? path.resolve(this.config.dest.dist, subPath) : this.config.dest.artifact;
    }
    resolvePatternlab(subPath) {
        if(!this.config.dest.patternlab) {
            throw new Error("Please set config.dest.patternlab");
        }
        return subPath ? path.resolve(this.config.dest.patternlab, subPath) : this.config.dest.patternlab;
    }
}

module.exports = DistRegistry;