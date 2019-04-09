import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TabContainer from '.';
import Tab from './tab';
import TabContainerData from './TabContainer.knobs.options';

const tabProps = {
  handleClick: action('Tab click')
};

storiesOf('organisms/TabContainer', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('TabContainer', (() => {
    const props = {
      nested: boolean('nested', true)
    };

    return(
      <TabContainer>
        <Tab title="Tab 1" {...tabProps}>
          <TabContainer {...props}>
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
  }))
  .add('TabContainer with real data', (() => {
    const props = {
      nested: boolean('nested', true)
    };
    if (TabContainerData.budgetTabs) {
      return(
        <TabContainer>
          { TabContainerData.budgetTabs.map((tab, index) => (
            <Tab key={`tab${index}`} title={tab.tab} {...tabProps}>
              { tab.subTabs && (
                <TabContainer {...props}>
                  {tab.subTabs.map((tab, index) => (
                    <Tab key={`subTab${index}`} title={tab.tab} {...tabProps}>{tab.content}</Tab>
                  ))}
                </TabContainer>
              )
              }
              {tab.content}
            </Tab>
            ))
            }
        </TabContainer>
      );
    }
    return null;
  }));
