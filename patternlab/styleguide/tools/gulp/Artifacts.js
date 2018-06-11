
const exec = require("child-process-promise").exec;
const MayflowerRegistry = require("./Base");
const path = require("path");
const e = require("./helpers/escape");


/**
 * This is a Gulp Task Registry.
 *
 * It contains the tasks and logic for building the mayflower-artifacts
 * repository and pushing branches and tags to the remote.
 */
class ArtifactRegistry extends MayflowerRegistry {
    init(taker) {
        const config = this.config;
        const self = this;

        const doCss = this.buildCssTask(self.resolveDest("assets/css"), "artifacts:css");
        const doJs = taker.parallel(
            this.buildJSVendorTask(self.resolveDest("assets/js"), "artifacts:js-vendor"),
            this.buildJSCustomTask(self.resolveDest("assets/js"), "artifacts:js-custom")
        );
        const doCopy = taker.parallel(
            this.buildCopyAssetsTask(self.resolveDest("assets"), "artifacts:copy-assets"),
            this.buildCopyPatternsTask(self.resolveDest("twig"), "artifacts:copy-patterns")
        );
        const clone = function() {
            // Branch will be empty for tag pushes.  Cut from master.
            const branch = self.getBranch(true) || "master";
            return exec(`git clone -b ${e(branch)} ${e(config.artifactUrl)} ${e(self.resolveDest())}`)
                .catch(function(err) {
                    if(err.message.match(/not found in upstream origin/)) {
                        // If we failed to clone because the branch doesn't exist yet,
                        // just clone master and check out a new branch from there.
                        return exec(`git clone --single-branch ${e(config.artifactUrl)} ${e(self.resolveDest())}`)
                            .then(() => exec(`git checkout -b ${e(self.getBranch())}`, {cwd: self.resolveDest()}));
                    }
                    return Promise.reject(err);
                });
        };
        const clean = this.buildCleanTask(self.resolveDest(), "artifacts:clean");
        const cloneClean = this.buildCleanTask(self.resolveDest("*/**"), "artifacts:clean-repo");

        const commit = function() {
            // We only need to run a commit if the working copy is dirty.
            return exec("git status --porcelain", {cwd: self.resolveDest()})
                .then((res) => {
                    if(res.stdout.trim().length > 0) {
                        return exec(`git add . && git commit -m ${e(self.getCommitMessage())}`, {cwd: self.resolveDest()});
                    }
                });
        };
        const pushBranch = function() {
            return exec(`git push origin ${e(self.getBranch())}`, {cwd: self.resolveDest()});
        };
        const pushTag = function() {
            const tag = self.getTag();
            return exec(`git tag ${e(tag)} && git push origin ${e(tag)}`, {cwd: self.resolveDest()});
        };

        taker.task("artifacts:build", taker.series(clean, clone, cloneClean, taker.parallel(doCopy, doCss, doJs)));
        taker.task("artifacts:publish", taker.series("artifacts:build", commit, pushBranch));
        taker.task("artifacts:release", taker.series("artifacts:build", commit, pushTag));
    }
    resolveDest(subPath) {
        if(!this.config.dest.artifact) {
            throw new Error("Please set config.dest.artifact");
        }
        return subPath ? path.resolve(this.config.dest.artifact, subPath) : this.config.dest.artifact;
    }
}

module.exports = ArtifactRegistry;
