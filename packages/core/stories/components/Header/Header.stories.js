import React from 'react';
import HeaderSlim from '@massds/mayflower-react/dist/HeaderSlim';
import Header from '@massds/mayflower-react/dist/Header';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import ButtonWithIcon from '@massds/mayflower-react/dist/ButtonWithIcon';
import IconSearch from '@massds/mayflower-react/dist/Icon/IconSearch';
import IconLatlonglobe from '@massds/mayflower-react/dist/Icon/IconLatlonglobe';
import IconLogin from '@massds/mayflower-react/dist/Icon/IconLogin';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

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
    mainItems={[
      {
        active: '',
        subNav: [
          {
            href: 'https://mass.gov',
            text: 'Health & Social Services'
          },
          {
            href: '/patterns/05-pages-topic/05-pages-topic.html',
            text: 'Family & Children'
          },
          {
            href: '#',
            text: 'Housing'
          },
          {
            href: '#',
            text: 'Transportation'
          },
          {
            href: '#',
            text: 'Legal & Justice'
          },
          {
            href: '#',
            text: 'Public Safety'
          },
          {
            href: '#',
            text: 'Voting'
          },
          {
            href: '#',
            text: 'Taxes'
          }
        ],
        text: 'Living'
      },
      {
        active: '',
        href: '#',
        subNav: [
          {
            href: '#',
            text: 'Unemployment'
          },
          {
            href: '#',
            text: 'Finding a Job'
          },
          {
            href: '#',
            text: 'Worker’s Rights & Safety'
          },
          {
            href: '#',
            text: 'Business Services & Resources'
          },
          {
            href: '#',
            text: 'Professional Licensing & Certification'
          },
          {
            href: '#',
            text: 'Professional Training'
          }
        ],
        text: 'Working'
      },
      {
        active: '',
        href: '#',
        subNav: [
          {
            href: '#',
            text: 'Early Childhood Education'
          },
          {
            href: '#',
            text: 'K-12 Schools'
          },
          {
            href: '#',
            text: 'Higher Education'
          },
          {
            href: '#',
            text: 'Continuing Education'
          }
        ],
        text: 'Learning'
      },
      {
        active: 'true',
        href: '/patterns/05-pages-section-landing/05-pages-section-landing.html',
        subNav: [
          {
            href: '#',
            text: 'Recreational Licenses & Permits'
          },
          {
            href: '#',
            text: 'State Parks & Recreation'
          },
          {
            href: '#',
            text: 'Travel & Tourism'
          },
          {
            href: '#',
            text: 'Arts & Culture'
          }
        ],
        text: 'Visiting & Exploring'
      },
      {
        active: '',
        href: '#',
        subNav: [
          {
            href: '#',
            text: 'Office of the Governor'
          },
          {
            href: '#',
            text: 'State Agencies'
          },
          {
            href: '/patterns/05-pages-topic-your-government/05-pages-topic-your-government.html',
            text: 'Executive Branch'
          },
          {
            href: '#',
            text: 'Judicial Branch'
          },
          {
            href: '#',
            text: 'Legislative Branch'
          },
          {
            href: '#',
            text: 'Local Government'
          }
        ],
        text: 'Your Government'
      }
    ]}
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

export const headerExample = () => headerBasic;

export const headerSlimmest = () => headerBasic;
attachHTML(headerSlimmest, headerBasic, notesHeaderSlim);

export const headerSlimUtil = () => headerUtil;
attachHTML(headerSlimUtil, headerUtil, notesHeaderSlim);

export const headerSlimUtilSearch = () => headerUtilSearch;
attachHTML(headerSlimUtilSearch, headerUtilSearch, notesHeaderSlim);

export const headerFullNav = () => header;
attachHTML(headerFullNav, header, notesHeader);

export const headerHamburger = () => 'Header Hamburger Component (WIP)';
