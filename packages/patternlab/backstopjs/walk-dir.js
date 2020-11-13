
const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    var files = fs.readdirSync(dir, { withFileTypes: true });
    var filelist = [];
    files.forEach(function(file) {
        if(file.isDirectory()) {
            filelist = filelist.concat(walkDir(path.join(dir, file.name)));
        }
        else {
            filelist.push(path.join(dir, file.name));
        }
    });

    return filelist;
}

module.exports = walkDir;