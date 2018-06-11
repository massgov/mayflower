import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ButtonSearch from '.';
import ButtonSearchReadme from './ButtonSearch.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs)
  .add(
    'ButtonSearch',
    withInfo(`<div>${ButtonSearchReadme}</div>`)(() => {
      const props = {
        text: text('ButtonSearch.text', 'Search'),
        ariaLabel: text('ButtonSearch.ariaLabel', 'Search'),
        onClick: action('ButtonSearch.onClick')
      };

      return(<ButtonSearch {...props} />);
    })
  );
