import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import IconLatlonglobe from 'MayflowerReactBase/Icon/IconLatlonglobe';

const GoogleTranslateElement = ({ id = 'google_translate_element' }) => {
  const translateRef = useGoogleTranslateElement(id);
  return(
    <React.Fragment>
      <div ref={translateRef} id={id} />
      <div className="ma__utility-nav__translate-icon">
        <IconLatlonglobe />
      </div>
    </React.Fragment>
  );
};

GoogleTranslateElement.propTypes = {
  /** The unique id for the div google translate will use to mount its element. */
  id: PropTypes.string
}

export const useGoogleTranslateElement = (id = 'google_translate_element') => {
  const ref = React.useRef();
  const [loaded, setLoaded] = React.useState(false);
  const windowRef = React.useRef(window);
  
  // Handle initial adding of google script tag if it doesn't exist.
  React.useEffect(() => {
    if (window && !loaded) {
      if (!window.hasOwnProperty('googleTranslateElementInit')) {
        window.googleTranslateElementInit = () => {
          setLoaded(true);
        };
        const script = document.createElement('script');
        script.async = true;
        script.crossOriginLoaded = true;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }
  }, [loaded]);

  // Handle adding of element if script tag already exists.
  React.useEffect(() => {
    let timer;
    // Only check this on the client side.
    if (window) {
      // Create a timer to check for window.google, which exists
      // when google translate has been loaded.
      if (!window.hasOwnProperty('google')) {
        timer = setTimeout(() => {
          if (windowRef.current.hasOwnProperty('google')) {
            setLoaded(true);
          }
        }, 100);
      } else {
        // Now that google translate has been loaded, remove the timer.
        clearTimeout(timer);
        const { google } = window;
        const { InlineLayout } = google.translate.TranslateElement;
        google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: '',
          layout: InlineLayout.SIMPLE
        }, id);
        ref.current.classList.add('has-rendered');
      }
    }
    // Remove the timer on unmount.
    return () => clearTimeout(timer);
  }, [ref, loaded]);
  return ref;
};

export default GoogleTranslateElement;
