
const exec = require("child_process").execSync;

module.exports = {
    currentTag: function() {
        try {
            return exec("git describe --exact-match --tags 2> /dev/null").toString().trim();
        }
        catch(err) {
            return;
        }
    },
    currentBranch: function() {
        try {
            return exec("git symbolic-ref --short HEAD 2> /dev/null").toString().trim();
        }
        catch(err) {
            return;
        }
    },
    currentMessage: function() {
        try {
            return exec("git log -1 --pretty=%B 2> /dev/null").toString().trim();
        }
        catch(err) {
            return;
        }
    }
};
