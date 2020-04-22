import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Tabs from './index';
import tabsOptions from './Tabs.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Tabs', (() => {
    const props = {
      tabs: object('tabs', tabsOptions.tabValues),
      handleClick: action('tab clicked'),
      selectedTab: select('selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all')
    };
    return(<Tabs {...props} />);
  }));
