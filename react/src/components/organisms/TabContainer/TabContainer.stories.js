import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import TabContainer from '.';
import Tab from './tab';
import TabContainerData from './TabContainer.knobs.options';

storiesOf('organisms/TabContainer', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('TabContainer', (() => {
    const props = {
      nested: boolean('nested', true)
    };
    return(
      <TabContainer>
        <Tab title="Tab 1">
          <TabContainer {...props}>
            <Tab title="Nested Tab Here">This should support nesting like this.</Tab>
            <Tab title="Another Nested Tab">Tabs have unique ids that are tracked locally without state.</Tab>
          </TabContainer>
        </Tab>
        <Tab title="Tab 2">And this is my second tab.</Tab>
        <Tab title="Tab 3">Last Tab!</Tab>
        <Tab title="Tab">Tab Content</Tab>
        <Tab title="Tab">Tab Content</Tab>
        <Tab title="Tab">Tab Content</Tab>
        <Tab title="Tab">Tab Content</Tab>
        <Tab title="Tab">Tab Content</Tab>
        <Tab title="Tab">Tab Content</Tab>
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
            <Tab key={`tab${index}`} title={tab.tab}>
              { tab.subTabs && (
                <TabContainer {...props}>
                  {tab.subTabs.map((tab, index) => (
                    <Tab key={`subTab${index}`} title={tab.tab}>{tab.content}</Tab>
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
