import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import MainNavData from 'MayflowerReactMolecules/MainNav/MainNav.knob.options';
import UtilityNavData from 'MayflowerReactOrganisms/UtilityNav/UtilityNav.knob.options';
import Header from './index';
import HeaderDocs from './Header.md';
import styles from './_index.scss';

const Template = (args) => <Header {...args} />;
export const HeaderExample = Template.bind({});

HeaderExample.storyName = 'Header with MainNav & UtilityNav';
HeaderExample.args = {
  utilityNav: {
    items: UtilityNavData.items.map((item) => ({
      text: item.text,
      ariaLabelText: item.ariaLabelText,
      closeText: item.closeText,
      panel: item.panel,
      icon: item.icon
    }))
  },
  headerSearch: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      'aria-label': 'Search',
      onClick: () => {
        action('Search button clicked');
      },
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
  hideHeaderSearch: false,
  hideBackTo: true,
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
  searchRedirect: {
    baseUrl: 'https://search.mass.gov',
    searchTermParam: 'q',
    queryParams: { page: '1' }
  }
};
export const HeaderWithoutMainNav = Template.bind({});
HeaderWithoutMainNav.storyName = 'Header without MainNav';
HeaderWithoutMainNav.args = {
  utilityNav: {
    items: UtilityNavData.items.map((item) => ({
      text: item.text,
      ariaLabelText: item.ariaLabelText,
      closeText: item.closeText,
      panel: item.panel,
      icon: item.icon
    }))
  },
  headerSearch: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      'aria-label': 'Search',
      onClick: () => {
        action('Search button clicked');
      },
      usage: 'secondary'
    },
    onSubmit: action('Form submitted'),
    onChange: action('Text input modified')
  },
  hideHeaderSearch: false,
  hideBackTo: true,
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
  searchRedirect: {
    baseUrl: 'https://search.mass.gov',
    searchTermParam: 'q',
    queryParams: { page: '1' }
  }
};
export const HeaderWithoutUtilityNav = Template.bind({});
HeaderWithoutUtilityNav.storyName = 'Header without UtilityNav';
HeaderWithoutUtilityNav.args = {
  headerSearch: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      'aria-label': 'Search',
      onClick: () => {
        action('Search button clicked');
      },
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
  hideHeaderSearch: false,
  hideBackTo: true,
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
  searchRedirect: {
    baseUrl: 'https://search.mass.gov',
    searchTermParam: 'q',
    queryParams: { page: '1' }
  }
};
export const HeaderWithoutMainUtilitySearch = Template.bind({});
HeaderWithoutMainUtilitySearch.storyName = 'Header without MainNav, UtilityNav, & Search';
HeaderWithoutMainUtilitySearch.args = {
  headerSearch: {
    placeholder: 'Search Mass.gov',
    buttonSearch: {
      'aria-label': 'Search',
      onClick: () => {
        action('Search button clicked');
      },
      usage: 'secondary'
    },
    onSubmit: action('Form submitted'),
    onChange: action('Text input modified')
  },
  hideHeaderSearch: true,
  hideBackTo: true,
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
  searchRedirect: {
    baseUrl: 'https://search.mass.gov',
    searchTermParam: 'q',
    queryParams: { page: '1' }
  }
};
export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} Description={HeaderDocs} />
    }
  }
};
