import React from 'react';
import HeaderSlim from '@massds/mayflower-react/dist/HeaderSlim';
import Header from '@massds/mayflower-react/dist/Header';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import ButtonWithIcon from '@massds/mayflower-react/dist/ButtonWithIcon';
import IconSearch from '@massds/mayflower-react/dist/Icon/IconSearch';
import IconLatlonglobe from '@massds/mayflower-react/dist/Icon/IconLatlonglobe';
import IconLogin from '@massds/mayflower-react/dist/Icon/IconLogin';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

import mainNavData from './main-nav.data';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const headerBasic = (
  <HeaderSlim
    siteLogo={(
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

const headerUtil = (
  <HeaderSlim
    siteLogo={(
      <SiteLogo
        image={{
          alt: 'Massachusetts state seal', height: 45, src: logo, width: 45
        }}
        siteName="Mass.gov"
        title="Mass.gov homepage"
        url={{ domain: 'https://www.mass.gov/' }}
      />
)}
    skipNav={<a className="ma__header__skip-nav" href="#main-content">skip to main content</a>}
    utilityNav={(
      <>
        <a className="ma__header_slim__utility-link" href="#main-content">
          <IconLatlonglobe fill="#fff" />
          English
        </a>
        <a className="ma__header_slim__utility-link" href="#main-content">
          <IconLogin fill="#fff" />
          Log in
        </a>
      </>
    )}
  />
);

const headerUtilSearch = (
  <HeaderSlim
    mainNav={<ButtonWithIcon icon={<IconSearch />} />}
    siteLogo={(
      <SiteLogo
        image={{
          alt: 'Massachusetts state seal', height: 45, src: logo, width: 45
        }}
        siteName="Mass.gov"
        title="Mass.gov homepage"
        url={{ domain: 'https://www.mass.gov/' }}
      />
)}
    skipNav={<a className="ma__header__skip-nav" href="#main-content">skip to main content</a>}
    utilityNav={(
      <>
        <a className="ma__header_slim__utility-link" href="#main-content">
          <IconLatlonglobe fill="#fff" />
          English
        </a>
        <a className="ma__header_slim__utility-link" href="#main-content">
          <IconLogin fill="#fff" />
          Log in
        </a>
      </>
    )}
  />
);

const header = (
  <Header
    mainItems={mainNavData}
    utilityItems={[]}
  />
);

const headerHamburger = (
  <HeaderHamburger
    mainItems={mainNavData}
    utilityItems={[]}
  />
);

const notesHeaderSlim = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-slim.css">
`;

const notesHeader = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header.css">
  // Link to JS: <script type="text/javascript" src="${STORYBOOK_CDN_PATH}/js/header.js" />
`;

const notesHeaderHamburger = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-hamburger.css">
  // Link to JS: <script type="text/javascript" src="${STORYBOOK_CDN_PATH}/js/header-hamburger.js" />
`;

export const headerExample = () => headerBasic;

export const headerSlimmest = () => headerBasic;
attachHTML(headerSlimmest, headerBasic, notesHeaderSlim);

export const headerSlimUtil = () => headerUtil;
attachHTML(headerSlimUtil, headerUtil, notesHeaderSlim);

export const headerSlimUtilSearch = () => headerUtilSearch;
attachHTML(headerSlimUtilSearch, headerUtilSearch, notesHeaderSlim);

export const headerFullNav = () => header;
attachHTML(headerFullNav, header, notesHeader);

export const headerFullNavHamburger = () => headerHamburger;
attachHTML(headerFullNavHamburger, headerHamburger, notesHeaderHamburger);
