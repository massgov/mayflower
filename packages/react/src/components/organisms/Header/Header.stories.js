import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import styles from '@massds/mayflower-assets/build/scss/header.scss';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from 'MayflowerReactAtoms/media/SiteLogo';
import Header from './index';
import mainItems from './main-nav.data';
import { LoginItem, TranslateItem, StateItem } from './utility-items.data';

const getUtilityItem = (item) => {
  const items = {
    TranslateItem,
    StateItem,
    LoginItem
  };
  return items[item];
};

const Template = (args) => {
  const { utilityItems, useMenuOverlay, ...rest } = args;
  const storyUtilityItems = utilityItems.map((item) => getUtilityItem(item));
  return(
    <React.Fragment>
      <Header utilityItems={storyUtilityItems} {...rest} />
      { useMenuOverlay && <div className="menu-overlay" />}
    </React.Fragment>
  );
};

export const HeaderExample = Template.bind({});
HeaderExample.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems
};
HeaderExample.argTypes = {
  useMenuOverlay: {
    name: 'Use Menu Overlay?',
    type: 'boolean'
  },
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
  MobileMainNav: {
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
  MobileUtilityNav: {
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
  }
};
HeaderExample.storyName = 'Default';
HeaderExample.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderExample} styles={styles} />
  }
};
export const HeaderWithoutMainNav = Template.bind({});
HeaderWithoutMainNav.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems,
  MainNav: null,
  MobileMainNav: null
};
HeaderWithoutMainNav.storyName = 'Header without MainNav';
HeaderWithoutMainNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutMainNav} styles={styles} />
  }
};
export const HeaderWithoutMainNavUtilityNav = Template.bind({});
HeaderWithoutMainNavUtilityNav.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems,
  MainNav: null,
  MobileMainNav: null,
  UtilityNav: null,
  MobileUtilityNav: null
};
HeaderWithoutMainNavUtilityNav.storyName = 'Header with only NavSearch';
HeaderWithoutMainNavUtilityNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutMainNavUtilityNav} styles={styles} />
  }
};
export const HeaderWithoutUtilityNav = Template.bind({});
HeaderWithoutUtilityNav.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems,
  UtilityNav: null,
  MobileUtilityNav: null
};
HeaderWithoutUtilityNav.storyName = 'Header without UtilityNav';
HeaderWithoutUtilityNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutUtilityNav} styles={styles} />
  }
};

export const HeaderWithCustomSiteLogo = (args) => {
  const {
    utilityItems,
    useMenuOverlay,
    siteName,
    ...rest
  } = args;
  const storyUtilityItems = utilityItems.map((item) => getUtilityItem(item));

  const siteLogoProps = {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: logo,
      alt: '',
      width: 45,
      height: 45
    },
    siteName,
    title: 'Mass.gov homepage'
  };
  const CustomSiteLogo = React.memo(({ Wrapper }) => <SiteLogo {...siteLogoProps} Wrapper={Wrapper} />);
  return(
    <Header Logo={CustomSiteLogo} utilityItems={storyUtilityItems} {...rest} />
  );
};
HeaderWithCustomSiteLogo.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems,
  siteName: 'Custom Site Name Here'
};
HeaderWithCustomSiteLogo.argTypes = {
  siteName: {
    control: {
      name: 'SiteLogo: Site Name',
      type: 'text'
    },
    table: {
      category: 'Story Only'
    }
  }
};
export const HeaderWithMenuOverlay = (args) => (
  <React.Fragment>
    <div className="menu-overlay" />
    <Header {...args} />
  </React.Fragment>
);
HeaderWithMenuOverlay.args = {
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ],
  mainItems
};

export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} />
    }
  },
  argTypes: {
    useMenuOverlay: {
      name: 'Use Menu Overlay?',
      type: 'boolean',
      table: {
        category: 'Story Only'
      }
    },
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
    MobileMainNav: {
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
    MobileUtilityNav: {
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
    MobileUtilityItem: {
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
    },
    MobileNavItem: {
      control: {
        disable: true
      },
      table: {
        category: 'MainNav'
      }
    }
  }
};
