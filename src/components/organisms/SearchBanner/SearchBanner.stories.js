import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, select, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SearchBanner from './index';
import tabsOptions from '../../molecules/Tabs/Tabs.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('SearchBanner', withInfo('<div></div>')(() => {
    const withTabs = boolean('HeaderSearch.withTabs', true);
    const props = {
      searchBox: {
        placeholder: text('HeaderSearch.placeholder', 'Search Mass.gov'),
        buttonSearch: {
          onClick: (e) => {
            action('Button clicked')(e);
            e.preventDefault();
          },
          ariaLabel: text('HeaderSearch.buttonSearch.ariaLabel', 'Search'),
          text: text('HeaderSearch.buttonSearch.text', 'Search')
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified'),
        defaultText: text('HeaderSearch.defaultText', '')
      }
    };
    if (withTabs) {
      props.tabs = {
        tabs: object('tabs', tabsOptions.tabValues),
        handleClick: action('tab clicked'),
        selectedTab: select('tabs.selectedTab', tabsOptions.tabValues.map((tab) => tab.value), 'all')
      };
    }
    return(<SearchBanner {...props} />);
  }));
