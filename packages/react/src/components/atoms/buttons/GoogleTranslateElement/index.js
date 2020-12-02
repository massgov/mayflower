import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconLatlonglobe from 'MayflowerReactBase/Icon/IconLatlonglobe';
import useScript from 'MayflowerReactHooks/use-script';

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
