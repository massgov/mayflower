
(function() {
  var script = document.createElement('script');
  script.src = "https://code.jquery.com/jquery-3.5.1.js";
  script.crossOrigin = "anonymous";
  script.integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=";
  script.onload = function() {
    jQuery.noConflict();
  };
  var element = document.getElementsByTagName('head')[0];
  element.appendChild(script);
})();