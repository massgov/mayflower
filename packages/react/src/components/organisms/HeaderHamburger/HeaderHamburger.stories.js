import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogoHeader from 'MayflowerReactMedia/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import MainNavData from 'MayflowerReactMolecules/MainNav/MainNav.knob.options';
import HeaderHamburger from '.';

export const HeaderHamburgerExample = (args) => <HeaderHamburger {...args} />;

HeaderHamburgerExample.storyName = 'Default';
HeaderHamburgerExample.args = {
  utilityNav: {
    items: [
      {
        text: 'State Organizations',
        ariaLabelText: '',
        icon: 'building',
        closeText: 'Close',
        panel: {
          description: {
            text: 'The <a href="#">A-Z Organizations page</a> provides an alphabetical listing of government organizations, including commissions, departments, and bureaus.'
          }
        }
      },
      {
        text: 'Log in to...',
        ariaLabelText: 'Log in to the most requested services',
        icon: 'login',
        closeText: 'Close',
        panel: {
          description: {
            text: 'These are the top requested sites you can log in to access state provided services'
          },
          links: [{
            text: 'Unemployment Online',
            href: 'https://uionline.detma.org/Claimant/Core/Login.ASPX',
            type: 'external'
          }, {
            text: 'Virtual Gateway (SNAP)',
            href: 'https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2',
            type: 'external'
          }, {
            text: 'Child Support Enforcement',
            href: 'https://ecse.cse.state.ma.us/ECSE/Login/login.asp',
            type: 'external'
          }]
        }
      }
    ]
  },
  siteLogo: {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov',
    title: 'Mass.gov homepage'
  },
  headerSearch: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      id: 'test',
      'aria-label': 'Search',
      text: 'Search',
      onClick: action('Search button clicked'),
      usage: 'secondary'
    },
    onSubmit: action('Form submitted'),
    onChange: action('Text input modified')
  },
  mainNav: {
    onNavigateCallBack: action('onNavigateCallBack'),
    mainNav: MainNavData.mainNav.map((nav) => {
      let active = false;
      if (typeof nav.active === 'string') {
        active = (nav.active.toLowerCase() === 'true');
      } else if (typeof nav.active === 'boolean') {
        active = nav.active;
      } else {
        active = false;
      }
      const storyProps = {
        href: nav.href,
        text: nav.text,
        active,
        subNav: nav.subNav
      };
      return(storyProps);
    })
  },
};
// HeaderHamburgerExample.args = {
//   siteLogo: (<SiteLogoHeader
//     url={{
//       domain: 'https://www.mass.gov/'
//     }}
//     image={{
//       src: logo,
//       alt: 'Massachusetts state seal',
//       width: 45,
//       height: 45
//     }}
//     siteName="Mass.gov"
//     title="Mass.gov homepage"
//   />),
//   skipNav: <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
// };

export default {
  title: 'organisms/HeaderHamburger',
  component: HeaderHamburger,
  parameters: {
    docs: {
      page: () => <StoryPage  />
    }
  }
};