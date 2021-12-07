import React from 'react';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import Error404 from '@massds/mayflower-react/dist/Error404';


import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const err404 = (
  <Error404 
    siteLogo={() => (
      <SiteLogo
        url={{
          domain: 'https://www.mass.gov/'
        }}
        image={{
          src: logo,
          alt: 'Massachusetts state seal',
          width: 45,
          height: 45
        }}
        siteName="Mass.gov"
        title="Mass.gov homepage"
      />
    )} 
  />
);

const notesErrorPage = `
  // Link to CSS: 
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/general.css">
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/error-page.css">
`;

export const errorPage404 = () => err404;
attachHTML(errorPage404, err404, notesErrorPage);
