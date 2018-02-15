import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import HeaderSearch from '.';
import HeaderSearchDocs from './HeaderSearch.md';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('HeaderSearch', withInfo(`<div>${HeaderSearchDocs}</div>`)(() => {
    const props = {
      placeholder: text('searchBannerForm.placeholder', 'Search Mass.gov'),
      buttonSearch: {
        onClick: action('Button clicked')
      },
      onSubmit: action('Form submitted'),
      onChange: action('Text input modified')
    };
    return(
      <HeaderSearch {...props} />
    );
  }));
