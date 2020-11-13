var externalUrlCheck = (function(){
    var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
    return function(url) {

        if (!url.length || url[0] === "#") {
          return false;
        }

        function domain(url) {
          return domainRe.exec(url)[1];  
        }

        return domain(location.href) !== domain(url);
    }
})();

module.exports = externalUrlCheck;