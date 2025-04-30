import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import styles from '@massds/mayflower-assets/build/scss/header-hamburger.scss';
import mainItems from './main-nav.data';
import HeaderHamburger from './index';
import { LoginItem, TranslateItem, StateItem } from 'MayflowerReactOrganisms/Header/utility-items';

const getUtilityItem = (item) => {
  const items = {
    TranslateItem,
    StateItem,
    LoginItem
  };
  return items[item];
};

const Template = (args) => {
  const { utilityItems = [], ...rest } = args;
  const storyUtilityItems = utilityItems.map((item) => getUtilityItem(item));
  return(
    <HeaderHamburger utilityItems={storyUtilityItems} {...rest} />
  );
};
export const HeaderHamburgerExample = Template.bind({});
HeaderHamburgerExample.args = {
  mainItems
};
HeaderHamburgerExample.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderHamburgerExample} styles={styles} />
  }
};

HeaderHamburgerExample.storyName = 'Default';

export const HeaderHamburgerWithoutUtilityNav = Template.bind({});
HeaderHamburgerWithoutUtilityNav.args = {
  mainItems,
  UtilityNav: null
};
HeaderHamburgerWithoutUtilityNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderHamburgerWithoutUtilityNav} styles={styles} />
  }
};

HeaderHamburgerWithoutUtilityNav.storyName = 'Header Hamburger without UtilityNav';

export const HeaderHamburgerWithoutNavItems = Template.bind({});
HeaderHamburgerWithoutNavItems.args = {
  mainItems,
  homeLink: {
    text: 'Mass.gov',
    url: 'https://mass.gov'
  }
};
HeaderHamburgerWithoutNavItems.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderHamburgerWithoutNavItems} styles={styles} />
  }
};

HeaderHamburgerWithoutNavItems.storyName = 'Header Hamburger without NavItems';

export default {
  title: 'organisms/HeaderHamburger',
  component: HeaderHamburger,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} />
    }
  },
  argTypes: {
    utilityItems: {
      control: {
        type: 'check',
        options: [
          'TranslateItem',
          'StateItem',
          'LoginItem'
        ]
      },
      table: {
        category: 'UtilityNav'
      }
    },
    Logo: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'Logo'
      }
    },
    MobileLogo: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'Logo'
      }
    },
    NavSearch: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'NavSearch'
      }
    },
    MobileNavSearch: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'NavSearch'
      }
    },
    SkipNav: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'SkipNav'
      }
    },
    MainNav: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'MainNav'
      }
    },
    UtilityNav: {
      control: {
        type: 'inline-radio',
        options: {
          Hide: null,
          Show: undefined
        }
      },
      table: {
        category: 'UtilityNav'
      }
    },
    mainItems: {
      control: {
        disable: true
      },
      table: {
        category: 'MainNav'
      }
    },
    Container: {
      control: {
        disable: true
      },
      table: {
        category: 'Container'
      }
    },
    UtilityItem: {
      control: {
        disable: true
      },
      table: {
        category: 'UtilityNav'
      }
    },
    NavItem: {
      control: {
        disable: true
      },
      table: {
        category: 'MainNav'
      }
    }
  }
};
