// @ts-nocheck
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconLatlonglobe from 'MayflowerReactBase/Icon/IconLatlonglobe';
import useScript from 'MayflowerReactComponents/hooks/use-script';

export interface GoogleTranslateElementProps {
  /** The unique id for the div google translate will use to mount its element. */
  id?: string
}

const GoogleTranslateElement = ({
  id = 'google_translate_element'
}: GoogleTranslateElementProps) => {
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
      if (googleTranslateSpinner && Array.isArray(googleTranslateSpinner)) {
        googleTranslateSpinner.forEach((element) => element.remove());
      }
      if (googleTranslateIFrame && Array.isArray(googleTranslateIFrame)) {
        googleTranslateIFrame.forEach((iframe) => iframe.remove());
      }
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
