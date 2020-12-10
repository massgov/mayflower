import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
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
  }
};
HeaderExample.storyName = 'Default';

export const HeaderWithoutMainNav = Template.bind({});
HeaderWithoutMainNav.args = {
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ]
};
HeaderWithoutMainNav.storyName = 'Header without MainNav';

export const HeaderWithoutMainNavUtilityNav = Template.bind({});
HeaderWithoutMainNavUtilityNav.storyName = 'Header with NavSearch';
export const HeaderWithoutUtilityNav = Template.bind({});
HeaderWithoutUtilityNav.args = {
  mainItems
};
HeaderWithoutUtilityNav.storyName = 'Header without UtilityNav';

export const HeaderWithoutMainUtilityNavAndSearch = Template.bind({});
HeaderWithoutMainUtilityNavAndSearch.args = {
  NavSearch: null
};
HeaderWithoutMainUtilityNavAndSearch.storyName = 'Header without MainNav, UtilityNav and Search';

export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => <StoryPage />
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
