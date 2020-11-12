
(function() {
  window.__forceSmoothScrollPolyfill__ = true;
  var script = document.createElement('script');
  script.src = "https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.js";
  script.crossOrigin = true;
  var element = document.getElementsByTagName('head')[0];
  element.appendChild(script);
})();

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: '', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  document.querySelector('#google_translate_element') !== null ? document.querySelector('#google_translate_element').classList.add('has-rendered') : '';
}
(function() {
  var script = document.createElement('script');
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  var element = document.getElementsByTagName('head')[0];
  element.appendChild(script);
})();