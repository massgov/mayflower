import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import publishStateReadme from './PublishState.md';
import PublishState from './index';

storiesOf('atoms/text', module).addDecorator(withKnobs)
  .add('PublishState', withInfo({ publishStateReadme })(() => {
    const props = {
      text: text('publishState.text', 'Draft')
    };
    return(
      <PublishState {...props} />
    );
  }));
