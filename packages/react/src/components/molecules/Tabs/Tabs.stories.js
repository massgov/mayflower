import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import Tabs from './index';
import tabsOptions from './Tabs.knobs.options';

export const TabsExample = (args) => <Tabs {...args} />;

TabsExample.storyName = 'Default';
TabsExample.args = {
  tabs: tabsOptions.tabValues,
  handleClick: action('tab clicked'),
  selectedTab: 'all'
};
TabsExample.argTypes = {
  selectedTab: {
    control: {
      type: 'select',
      options: tabsOptions.tabValues.map((tab) => tab.value)
    }
  }
};


export default {
  title: 'molecules/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
