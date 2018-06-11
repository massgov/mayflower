module.exports = function(window, document, undefined){
  "use strict";

  function setCookie(name, value, expires) {
    if(typeof(expires) === 'number') {
      var d = new Date();
      d.setTime(d.getTime() + (expires*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + "; path=/";
    } else {
      document.cookie = name + "=" + value + "; path=/";
    }

  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  return {
    setCookie,
    getCookie
  };

}(window, document);

