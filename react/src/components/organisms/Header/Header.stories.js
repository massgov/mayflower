import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, object, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import Header from './index';
import HeaderDocs from './Header.md';
import MainNavData from '../../molecules/MainNav/MainNav.knob.options';
import UtilityNavData from '../UtilityNav/UtilityNav.knob.options';

storiesOf('organisms/Header', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Header with MainNav & UtilityNav', () => {
      const mainNavProps = {
        onNavigateCallBack: action('onNavigateCallBack'),
        mainNav: []
      };
      mainNavProps.mainNav = MainNavData.mainNav.map((nav, navIndex) => {
        let active = false;
        if (typeof nav.active === 'string') {
          active = (nav.active.toLowerCase() === 'true');
        } else if (typeof nav.active === 'boolean') {
          active = nav.active;
        } else {
          active = false;
        }
        const storyProps = {
          href: text(`Header mainNav, item${navIndex}: href`, nav.href, `Main Nav: Item ${navIndex}`),
          text: text(`Header mainNav, item${navIndex}: text`, nav.text, `Main Nav: Item ${navIndex}`),
          active: boolean(`Header mainNav, item${navIndex}: active`, active, `Main Nav: Item ${navIndex}`),
          subNav: object(`Header mainNav, item${navIndex}: subNav`, nav.subNav, `Main Nav: Item ${navIndex}`)
        };
        return(storyProps);
      });
      const utilityProps = {
        items: []
      };
      utilityProps.items = UtilityNavData.items.map((item, itemIndex) => {
        const icons = {
          building: 'building',
          login: 'login'
        };
        const storyProps = {
          text: text(`Header utilityNav, item${itemIndex}: text`, item.text, `Utility Nav: Item ${itemIndex}`),
          ariaLabelText: text(`Header utilityNav, item${itemIndex}: ariaLabelText`, item.ariaLabelText, `Utility Nav: Item ${itemIndex}`),
          closeText: text(`Header utilityNav, item${itemIndex}: closeText`, item.closeText, `Utility Nav: Item ${itemIndex}`),
          panel: object(`Header utilityNav, item${itemIndex}: panel`, item.panel, `Utility Nav: Item ${itemIndex}`)
        };
        storyProps.icon = select(`Header utilityNav, item${itemIndex}: icons`, icons, item.icon, `Utility Nav: Item ${itemIndex}`);
        return(storyProps);
      });
      const headerSearchProps = {
        placeholder: text('Header headerSearch: placeholder', 'Search Mass.gov', 'Header Search'),
        buttonSearch: {
          'aria-label': 'Search',
          onClick: () => {
            action('Search button clicked');
          },
          usage: 'secondary'
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified')
      };
      const siteLogoProps = {
        url: {
          domain: text('Header siteLogo: url domain', 'https://www.mass.gov/', 'Site Logo')
        },
        image: {
          src: text('Header siteLogo: image src', logo, 'Site Logo'),
          alt: text('Header siteLogo: image alt', 'Massachusetts state seal', 'Site Logo'),
          width: number('Header siteLogo: image width', 45, 'Site Logo'),
          height: number('Header siteLogo: image height', 45, 'Site Logo')
        },
        siteName: text('Header siteLogo: siteName', 'Mass.gov', 'Site Logo'),
        title: text('Header siteLogo: title', 'Mass.gov homepage', 'Site Logo')
      };
      const headerProps = {
        utilityNav: utilityProps,
        headerSearch: { ...headerSearchProps },
        mainNav: mainNavProps,
        hideHeaderSearch: boolean('hideHeaderSearch', false),
        hideBackTo: boolean('hideBackTo', true),
        siteLogo: siteLogoProps,
        searchRedirect: {
          baseUrl: text('Header searchRedirect: baseUrl', 'https://search.mass.gov'),
          searchTermParam: text('Header searchRedirect: searchTermParam', 'q'),
          queryParams: object('Header searchRedirect: queryParams', { page: '1' })
        }
      };
      return(<Header {...headerProps} />);
    },
    { info: HeaderDocs }
  )
  .add(
    'Header without MainNav', () => {
      const utilityProps = {
        items: []
      };
      utilityProps.items = UtilityNavData.items.map((item, itemIndex) => {
        const icons = {
          building: 'building',
          login: 'login'
        };
        const storyProps = {
          text: text(`Header utilityNav, item${itemIndex}: text`, item.text, `Utility Nav: Item ${itemIndex}`),
          ariaLabelText: text(`Header utilityNav, item${itemIndex}: ariaLabelText`, item.ariaLabelText, `Utility Nav: Item ${itemIndex}`),
          closeText: text(`Header utilityNav, item${itemIndex}: closeText`, item.closeText, `Utility Nav: Item ${itemIndex}`),
          panel: object(`Header utilityNav, item${itemIndex}: panel`, item.panel, `Utility Nav: Item ${itemIndex}`)
        };
        storyProps.icon = select(`Header utilityNav, item${itemIndex}: icons`, icons, item.icon, `Utility Nav: Item ${itemIndex}`);
        return(storyProps);
      });
      const headerSearchProps = {
        placeholder: text('Header headerSearch: placeholder', 'Search Mass.gov', 'Header Search'),
        buttonSearch: {
          'aria-label': 'Search',
          onClick: () => {
            action('Search button clicked');
          },
          usage: 'secondary'
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified')
      };
      const siteLogoProps = {
        url: {
          domain: text('Header siteLogo: url domain', 'https://www.mass.gov/', 'Site Logo')
        },
        image: {
          src: text('Header siteLogo: image src', logo, 'Site Logo'),
          alt: text('Header siteLogo: image alt', 'Massachusetts state seal', 'Site Logo'),
          width: number('Header siteLogo: image width', 45, 'Site Logo'),
          height: number('Header siteLogo: image height', 45, 'Site Logo')
        },
        siteName: text('Header siteLogo: siteName', 'Mass.gov', 'Site Logo'),
        title: text('Header siteLogo: title', 'Mass.gov homepage', 'Site Logo')
      };
      const headerProps = {
        utilityNav: utilityProps,
        headerSearch: { ...headerSearchProps },
        hideHeaderSearch: boolean('hideHeaderSearch', false),
        hideBackTo: boolean('hideBackTo', true),
        siteLogo: siteLogoProps,
        searchRedirect: {
          baseUrl: text('Header searchRedirect: baseUrl', 'https://search.mass.gov'),
          searchTermParam: text('Header searchRedirect: searchTermParam', 'q'),
          queryParams: object('Header searchRedirect: queryParams', { page: '1' })
        }
      };
      return(<Header {...headerProps} />);
    },
    { info: HeaderDocs }
  )
  .add(
    'Header without UtilityNav', () => {
      const mainNavProps = {
        onNavigateCallBack: action('onNavigateCallBack'),
        mainNav: []
      };
      mainNavProps.mainNav = MainNavData.mainNav.map((nav, navIndex) => {
        let active = false;
        if (typeof nav.active === 'string') {
          active = (nav.active.toLowerCase() === 'true');
        } else if (typeof nav.active === 'boolean') {
          active = nav.active;
        } else {
          active = false;
        }
        const storyProps = {
          href: text(`Header mainNav, item${navIndex}: href`, nav.href, `Main Nav: Item ${navIndex}`),
          text: text(`Header mainNav, item${navIndex}: text`, nav.text, `Main Nav: Item ${navIndex}`),
          active: boolean(`Header mainNav, item${navIndex}: active`, active, `Main Nav: Item ${navIndex}`),
          subNav: object(`Header mainNav, item${navIndex}: subNav`, nav.subNav, `Main Nav: Item ${navIndex}`)
        };
        return(storyProps);
      });
      const headerSearchProps = {
        placeholder: text('Header headerSearch: placeholder', 'Search Mass.gov', 'Header Search'),
        buttonSearch: {
          'aria-label': 'Search',
          onClick: () => {
            action('Search button clicked');
          },
          usage: 'secondary'
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified')
      };
      const siteLogoProps = {
        url: {
          domain: text('Header siteLogo: url domain', 'https://www.mass.gov/', 'Site Logo')
        },
        image: {
          src: text('Header siteLogo: image src', logo, 'Site Logo'),
          alt: text('Header siteLogo: image alt', 'Massachusetts state seal', 'Site Logo'),
          width: number('Header siteLogo: image width', 45, 'Site Logo'),
          height: number('Header siteLogo: image height', 45, 'Site Logo')
        },
        siteName: text('Header siteLogo: siteName', 'Mass.gov', 'Site Logo'),
        title: text('Header siteLogo: title', 'Mass.gov homepage', 'Site Logo')
      };
      const headerProps = {
        headerSearch: { ...headerSearchProps },
        mainNav: mainNavProps,
        hideHeaderSearch: boolean('hideHeaderSearch', false),
        hideBackTo: boolean('hideBackTo', true),
        siteLogo: siteLogoProps,
        searchRedirect: {
          baseUrl: text('Header searchRedirect: baseUrl', 'https://search.mass.gov'),
          searchTermParam: text('Header searchRedirect: searchTermParam', 'q'),
          queryParams: object('Header searchRedirect: queryParams', { page: '1' })
        }
      };
      return(<Header {...headerProps} />);
    },
    { info: HeaderDocs }
  )
  .add(
    'Header without MainNav, UtilityNav, & Search', () => {
      const headerSearchProps = {
        placeholder: text('Header headerSearch: placeholder', 'Search Mass.gov', 'Header Search'),
        buttonSearch: {
          'aria-label': 'Search',
          onClick: () => {
            action('Search button clicked');
          },
          usage: 'secondary'
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified')
      };
      const siteLogoProps = {
        url: {
          domain: text('Header siteLogo: url domain', 'https://www.mass.gov/', 'Site Logo')
        },
        image: {
          src: text('Header siteLogo: image src', logo, 'Site Logo'),
          alt: text('Header siteLogo: image alt', 'Massachusetts state seal', 'Site Logo'),
          width: number('Header siteLogo: image width', 45, 'Site Logo'),
          height: number('Header siteLogo: image height', 45, 'Site Logo')
        },
        siteName: text('Header siteLogo: siteName', 'Mass.gov', 'Site Logo'),
        title: text('Header siteLogo: title', 'Mass.gov homepage', 'Site Logo')
      };
      const headerProps = {
        headerSearch: { ...headerSearchProps },
        hideHeaderSearch: boolean('hideHeaderSearch', true),
        hideBackTo: boolean('hideBackTo', true),
        siteLogo: siteLogoProps,
        searchRedirect: {
          baseUrl: text('Header searchRedirect: baseUrl', 'https://search.mass.gov'),
          searchTermParam: text('Header searchRedirect: searchTermParam', 'q'),
          queryParams: object('Header searchRedirect: queryParams', { page: '1' })
        }
      };
      return(<Header {...headerProps} />);
    },
    { info: HeaderDocs }
  );
