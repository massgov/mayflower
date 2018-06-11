
// Shell escape function found on stack overflow:
// https://stackoverflow.com/a/22827128
module.exports = (s) => "'" + s.replace(/'/g, "'\\''") + "'";
