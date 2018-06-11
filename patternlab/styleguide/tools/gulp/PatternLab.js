const gulp = require("gulp");
const s3 = require("gulp-s3-upload")();
const browserSync    = require("browser-sync");
const exec = require("child-process-promise").exec;
const path = require("path");
var MayflowerRegistry = require("./Base");
const e = require("./helpers/escape");

/**
 * This is a Gulp Task Registry.
 *
 * It contains the tasks and logic for building and publishing Pattern Lab.
 */
class PatternLabRegistry extends MayflowerRegistry {
    constructor(config, opts) {
        super(config, opts);
        this.sync = browserSync.create();
    }
    init(taker) {
        const self = this;

        function startBrowserSync(done) {
            self.sync.init({
                port: 3000,
                open: false, // or  "external"
                notify: false,
                ghostMode: false,
                reloadDelay: 200,
                server: self.resolveDest()
            });
            done();
        }
        function reloadBrowserSync(done) {
            self.sync.reload();
            done();
        }
        const doCss = this.buildCssTask(self.resolveDest("assets/css"), "patternlab:css");
        const doJs = taker.parallel(
            this.buildJSVendorTask(self.resolveDest("assets/js"), "patternlab:js-vendor"),
            this.buildJSCustomTask(self.resolveDest("assets/js"), "patternlab:js-custom")
        );
        const doCopy = taker.parallel(
            this.buildCopyAssetsTask(self.resolveDest("assets"), "patternlab:assets"),
            this.buildCopyPatternsTask(self.resolveDest("assets/patterns"), "patternlab:patterns")
        );

        const noop = (done) => done();
        const maybe = (condition, task) => condition() ? task : noop;
        const isTagged = () => self.getTag(true);
        const isStableRelease = () => isTagged() && self.getTag().match(/^\d+.\d+.\d+$/);

        const watch = function() {
            taker.watch(self.resolveSource("**"), taker.series("patternlab:build", reloadBrowserSync));
        };

        // Build Pattern Lab.
        taker.task("patternlab:build", taker.series(
            this.buildPatternlabTask(null),
            taker.parallel(doCss, doJs, doCopy)
        ));
        taker.task("patternlab:watch", taker.series(
            taker.parallel(startBrowserSync, "patternlab:build"),
            watch
        ));

        // Publish to S3/b/BRANCHNAME
        taker.task("patternlab:publish", taker.series(
            this.buildPatternlabTask("%domain%/b/%branch%"),
            taker.parallel(doCss, doJs, doCopy),
            this.buildS3Task(self.resolveDest("**"), "b/%branch%", "patternlab:s3-branch")
        ));

        // Perform a release to S3.
        taker.task("patternlab:release", taker.series(
            maybe(isStableRelease,
                taker.series(
                    this.buildPatternlabTask("%domain%/v/%%major%"),
                    taker.parallel(doCss, doJs, doCopy),
                    this.buildS3Task(self.resolveDest("**"), "v/%major%", "patternlab:s3-tag")
                )
            ),
            maybe(isStableRelease,
                taker.series(
                    this.buildPatternlabTask("%domain%"),
                    taker.parallel(doCss, doJs, doCopy),
                    this.buildS3Task(self.resolveDest("**"), null, "patternlab:s3-root")
                )
            )

        ));
    }
    replaceRefs(template) {
        if(!template || !template.length) {
            return template;
        }
        return template
            .replace(/%domain%/, () => this.config.baseDomain)
            .replace(/%branch%/, () => this.getBranch())
            .replace(/%tag%/, () => this.getTag())
            .replace(/%major%/, () => this.getMajorVersion());
    }
    buildS3Task(src, subDirTemplate, name) {
        const config = this.config;
        let task = () => {
            let subDir = this.replaceRefs(subDirTemplate);
            return gulp.src(src)
                .pipe(s3({
                    Bucket: config.s3Bucket,
                    ACL: "public-read",
                    keyTransform: function(filename) {
                        return subDir ? `${subDir}/${filename}` : filename;
                    }
                }));
        };
        task.displayName = name;
        return task;
    }
    buildPatternlabTask(urlPattern) {
        const self = this;
        let task = () => {
            let url = this.replaceRefs(urlPattern);
            let opts = {env: Object.assign({}, process.env), verbose: 3};
            if(url && url.length) {
                opts.env.BASE_URL = url;
            }
            return exec(`php ${e(self.resolve("core/console"))} --generate --patternsonly`, opts);
        };
        task.displayName = "patternlab:patterns";
        return task;
    }
    resolveDest(subPath) {
        if(!this.config.dest.patternlab) {
            throw new Error("Please set config.dest.patternlab");
        }
        return subPath ? path.resolve(this.config.dest.patternlab, subPath) : this.config.dest.patternlab;
    }
}

module.exports = PatternLabRegistry;
