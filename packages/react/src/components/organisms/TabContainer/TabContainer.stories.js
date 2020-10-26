import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import TabContainer from '.';
import Tab from './tab';
import TabContainerData from './TabContainer.knobs.options';

const tabProps = {
  handleClick: action('Tab click')
};

export const TabContainerExample = (args) => (
  <TabContainer onTabChange={action('Tab change')}>
    <Tab title="Tab 1" {...tabProps}>
      <TabContainer {...args} onTabChange={action('Tab change')}>
        <Tab title="Nested Tab Here" {...tabProps}>This should support nesting like this.</Tab>
        <Tab title="Another Nested Tab" {...tabProps}>Tabs have unique ids that are tracked locally without state.</Tab>
      </TabContainer>
    </Tab>
    <Tab title="Tab 2" {...tabProps}>And this is my second tab.</Tab>
    <Tab title="Tab 3" {...tabProps}>Last Tab!</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
    <Tab title="Tab" {...tabProps}>Tab Content</Tab>
  </TabContainer>
);

TabContainerExample.storyName = 'Default';
TabContainerExample.args = {
  nested: true
};
TabContainerExample.argTypes = {
  children: {
    controls: {
      disable: true
    }
  }
};
TabContainerExample.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={TabContainerExample} />
  }
};

export const TabContainerRealData = (args) => (
  <TabContainer onTabChange={action('Tab change')}>
    { TabContainerData.budgetTabs.map((tab, index) => (
      /* eslint-disable-next-line react/no-array-index-key */
      <Tab key={`tab${index}`} title={tab.tab} {...tabProps}>
        { tab.subTabs && (
          <TabContainer {...args} onTabChange={action('Tab change')}>
            {tab.subTabs.map((item, i) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <Tab key={`subTab${i}`} title={item.tab} {...tabProps}>{item.content}</Tab>
            ))}
          </TabContainer>
        )}
        {tab.content}
      </Tab>
    ))}
  </TabContainer>
);
TabContainerRealData.storyName = 'TabContainer with real data';
TabContainerRealData.args = {
  nested: true
};
TabContainerRealData.argTypes = {
  children: {
    controls: {
      disable: true
    }
  }
};
TabContainerRealData.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={TabContainerRealData} />
  }
};
export default {
  title: 'organisms/TabContainer',
  component: TabContainer,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
