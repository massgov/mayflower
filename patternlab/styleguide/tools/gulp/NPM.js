const MayflowerRegistry = require("./Base");
const path = require("path");
const exec = require("child-process-promise").exec;

/**
 * This is a Gulp Task Registry.
 *
 * It contains the tasks and logic for building the @massds/mayflower NPM
 * package and publishing it.
 */
class NPMRegistry extends MayflowerRegistry {
    init(taker) {
        const self = this;

        const clean = this.buildCleanTask(self.resolveDest(), "npm:clean");
        const doCss = this.buildCssTask(self.resolveDest("css"), "npm:css");
        const doJs = taker.parallel(
            this.buildJSVendorTask(self.resolveDest("js"), "npm:js-vendor"),
            this.buildJSCustomTask(self.resolveDest("js"), "npm:js-custom")
        );

        const copyMetaFiles = function() {
            return taker.src([
                self.resolve("package.json"),
                self.resolve("LICENSE"),
                self.resolve("README.md"),
                self.resolve(".npmignore")
            ])
                .pipe(taker.dest(self.resolveDest()))
                .pipe(self.debug("copy:npm"));
        };
        copyMetaFiles.displayName = "npm:copy-meta";

        const doCopy = taker.parallel(
            copyMetaFiles,
            this.buildCopyAssetsTask(this.resolveDest(), "npm:copy-assets")
        );
        const doPublish = function() {
            return exec("npm publish", {cwd: self.resolveDest()});
        };
        doPublish.displayName = "npm:release-tag";

        taker.task("npm:build", taker.series(clean, taker.parallel(doCss, doJs, doCopy)));
        taker.task("npm:release", taker.series("npm:build", doPublish));
    }
    resolveDest(subPath) {
        if(!this.config.dest.npm) {
            throw new Error("Please set config.dest.npm");
        }
        return subPath ? path.resolve(this.config.dest.npm, subPath) : this.config.dest.npm;
    }
}

module.exports = NPMRegistry;
