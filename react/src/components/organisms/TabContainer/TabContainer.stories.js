import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import TabContainer from '.';
import Tab from './tab';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add(
    'TabContainer',
    withInfo()(() => {
      const props = {
        nested: boolean('TabContainer.nested', true)
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
    })
  );
