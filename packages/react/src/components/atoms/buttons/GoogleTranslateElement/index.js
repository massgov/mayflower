import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconLatlonglobe from 'MayflowerReactBase/Icon/IconLatlonglobe';

const GoogleTranslateElement = ({ id = 'google_translate_element' }) => {
  const status = useGoogleTranslateElement(id);
  const classes = classNames({
    'has-rendered': status === 'ready'
  });
  return(
    <React.Fragment>
      <div id={id} className={classes} />
      <div className="ma__utility-nav__translate-icon">
        <IconLatlonglobe />
      </div>
    </React.Fragment>
  );
};

GoogleTranslateElement.propTypes = {
  /** The unique id for the div google translate will use to mount its element. */
  id: PropTypes.string
};
const useScript = (src) => {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = React.useState(src ? 'loading' : 'idle');

  React.useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus('idle');
        return;
      }

      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          );
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status'));
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };

      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      // Remove event listeners on cleanup
      return() => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
          script.remove();
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
};
export const useGoogleTranslateElement = (id = 'google_translate_element') => {
  React.useEffect(() => {
    if (window) {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          const { google } = window;
          const { InlineLayout } = google.translate.TranslateElement;
          google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: '',
            layout: InlineLayout.SIMPLE
          }, id);
        };
      }
    }
    return(() => {
      const googGtTT = document.getElementById('goog-gt-tt');
      const googleTranslateIFrame = document.getElementsByClassName('goog-te-menu-frame');
      const googleTranslateSpinner = document.getElementsByClassName('goog-te-spinner-pos');
      googleTranslateSpinner.forEach((element) => element.remove());
      googleTranslateIFrame.forEach((iframe) => iframe.remove());
      if (googGtTT) {
        googGtTT.remove();
      }
      if (window && window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    });
  }, [id]);
  return useScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
};

export default GoogleTranslateElement;
