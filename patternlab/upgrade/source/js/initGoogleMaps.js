import jQuery from 'jquery';

// Set a flag that the library has loaded, in case google maps js misses event.
window.googleMapsLoaded = true;
// Emit an event that the library has loaded.
jQuery(document).trigger('ma:LibrariesLoaded:GoogleMaps');
  