import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import styles from '@massds/mayflower-assets/build/scss/header.scss';
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

const Template = (args) => <Header {...args} />;

export const HeaderExample = (args) => {
  const { utilityItems, ...rest } = args;
  const storyUtilityItems = utilityItems.map((item) => getUtilityItem(item));
  return(<Header utilityItems={storyUtilityItems} {...rest} />);
};
HeaderExample.args = {
  utilityItems: [
    'TranslateItem',
    'StateItem',
    'LoginItem'
  ],
  mainItems
};
HeaderExample.argTypes = {
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
    TranslateItem,
    StateItem,
    LoginItem
  ]
};
HeaderWithoutMainNav.storyName = 'Header without MainNav';
HeaderWithoutMainNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutMainNav} styles={styles} />
  }
};
export const HeaderWithoutMainNavUtilityNav = Template.bind({});
HeaderWithoutMainNavUtilityNav.storyName = 'Header with only NavSearch';
HeaderWithoutMainNavUtilityNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutMainNavUtilityNav} styles={styles} />
  }
};
export const HeaderWithoutUtilityNav = Template.bind({});
HeaderWithoutUtilityNav.args = {
  mainItems
};
HeaderWithoutUtilityNav.storyName = 'Header without UtilityNav';
HeaderWithoutUtilityNav.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={HeaderWithoutUtilityNav} styles={styles} />
  }
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
