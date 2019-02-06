import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Tabs from './index';
import tabsOptions from './Tabs.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('Tabs', (() => {
    const props = {
      tabs: object('tabs', tabsOptions.tabValues),
      handleClick: action('tab clicked'),
      selectedTab: select('tabs.selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all')
    };
    return(<Tabs {...props} />);
  }));
