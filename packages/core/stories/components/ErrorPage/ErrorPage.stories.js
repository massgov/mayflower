import React from 'react';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import Error404 from '@massds/mayflower-react/dist/Error404';
import Error403 from '@massds/mayflower-react/dist/Error403';
import Error500 from '@massds/mayflower-react/dist/Error500';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const siteLogo = () => (
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
);

const err404 = (
  <Error404 siteLogo={siteLogo} />
);

const err403 = (
  <Error403 siteLogo={siteLogo} />
);

const err500 = (
  <Error500 siteLogo={siteLogo} />
);
const notesErrorPage = `
  // Link to CSS: 
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/global.min.css">
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/error-page.min.css">
`;

export const errorPage404 = () => err404;
attachHTML(errorPage404, err404, notesErrorPage);

export const errorPage403 = () => err403;
attachHTML(errorPage403, err403, notesErrorPage);

export const errorPage500 = () => err500;
attachHTML(errorPage500, err500, notesErrorPage);
