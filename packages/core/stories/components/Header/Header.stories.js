import React from 'react';
import HeaderSlim from '@massds/mayflower-react/dist/HeaderSlim';
import Header from '@massds/mayflower-react/dist/Header';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import ButtonWithIcon from '@massds/mayflower-react/dist/ButtonWithIcon';
import IconSearch from '@massds/mayflower-react/dist/Icon/IconSearch';
import IconLatlonglobe from '@massds/mayflower-react/dist/Icon/IconLatlonglobe';
import IconLogin from '@massds/mayflower-react/dist/Icon/IconLogin';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

const { STORYBOOK_CDN_PATH } = process.env;

import { attachHTML } from '../../util/renderCode';

const headerBasic = (
  <HeaderSlim
   siteLogo={<SiteLogo
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
   />}
  />
)

const headerUtil = (
  <HeaderSlim
    siteLogo={<SiteLogo image={{alt: 'Massachusetts state seal', height: 45, src: logo, width: 45}} siteName="Mass.gov" title="Mass.gov homepage" url={{domain: 'https://www.mass.gov/'}}/>}
    skipNav={<a className="ma__header__skip-nav" href="#main-content">skip to main content</a>}
    utilityNav={
      <>
        <a className="ma__header_slim__utility-link" href="#main-content"><IconLatlonglobe fill="#fff" />English</a>
        <a className="ma__header_slim__utility-link" href="#main-content"><IconLogin fill="#fff" />Log in</a>
      </>
    }
  />
)

const headerUtilSearch = (
  <HeaderSlim
    mainNav={<ButtonWithIcon icon={<IconSearch />} />}
    siteLogo={<SiteLogo image={{alt: 'Massachusetts state seal', height: 45, src: logo, width: 45}} siteName="Mass.gov" title="Mass.gov homepage" url={{domain: 'https://www.mass.gov/'}}/>}
    skipNav={<a className="ma__header__skip-nav" href="#main-content">skip to main content</a>}
    utilityNav={
      <>
        <a className="ma__header_slim__utility-link" href="#main-content"><IconLatlonglobe fill="#fff" />English</a>
        <a className="ma__header_slim__utility-link" href="#main-content"><IconLogin fill="#fff" />Log in</a>
      </>
    }
  />
)

const header = (
  <Header
    headerSearch={{
      buttonSearch: {
        'aria-label': 'Search',
        onClick: () => {},
        usage: 'secondary'
      },
      onChange: function noRefCheck() {},
      onSubmit: function noRefCheck() {},
      placeholder: 'Search Mass.gov'
    }}
    hideBackTo
    hideHeaderSearch={false}
    mainNav={{
      mainNav: [
        {
          active: false,
          href: undefined,
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
          active: false,
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
          active: false,
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
          active: true,
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
          active: false,
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
      ],
      onNavigateCallBack: function noRefCheck() {}
    }}
    searchRedirect={{
      baseUrl: 'https://search.mass.gov',
      queryParams: {
        page: '1'
      },
      searchTermParam: 'q'
    }}
    siteLogo={{
      image: {
        alt: 'Massachusetts state seal',
        height: 45,
        src: logo,
        width: 45
      },
      siteName: 'Mass.gov',
      title: 'Mass.gov homepage',
      url: {
        domain: 'https://www.mass.gov/'
      }
    }}
    utilityNav={{
      items: [
        {
          ariaLabelText: '',
          closeText: undefined,
          icon: 'building',
          panel: undefined,
          text: 'All Budgets'
        },
        {
          ariaLabelText: '',
          closeText: 'Close',
          icon: 'building',
          panel: {
            description: {
              text: 'The <a href="#">A-Z Organizations page</a> provides an alphabetical listing of government organizations, including commissions, departments, and bureaus.'
            }
          },
          text: 'State Organizations'
        },
        {
          ariaLabelText: 'Log in to the most requested services',
          closeText: 'Close',
          icon: 'login',
          panel: {
            description: {
              text: 'These are the top requested sites you can log in to access state provided services'
            },
            links: [
              {
                href: 'https://uionline.detma.org/Claimant/Core/Login.ASPX',
                text: 'Unemployment Online',
                type: 'external'
              },
              {
                href: 'https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2',
                text: 'Virtual Gateway (SNAP)',
                type: 'external'
              },
              {
                href: 'https://ecse.cse.state.ma.us/ECSE/Login/login.asp',
                text: 'Child Support Enforcement',
                type: 'external'
              }
            ]
          },
          text: 'Log in to...'
        }
      ]
    }}
  />
)

const notesHeaderSlim = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-slim.css">
`

const notesHeader = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header.css">
  // Link to JS: <script type="text/javascript" src="${STORYBOOK_CDN_PATH}/js/header.js" />
`

export const headerExample = () => headerBasic;

export const headerSlimmest = () => headerBasic;
attachHTML(headerSlimmest, headerBasic, notesHeaderSlim)

export const headerSlimUtil = () => headerUtil;
attachHTML(headerSlimUtil, headerUtil, notesHeaderSlim)

export const headerSlimUtilSearch = () => headerUtilSearch;
attachHTML(headerSlimUtilSearch, headerUtilSearch, notesHeaderSlim)

export const headerFullNav = () => header;
attachHTML(headerFullNav, header, notesHeader)

export const headerHamburger = () => 'Header Hamburger Component (WIP)';
