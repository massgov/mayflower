import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ArrowNav from './index';
import ArrowNavReadme from './ArrowNav.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('ArrowNav', withInfo({ ArrowNavReadme })(() => {
    const props = {
      href: text('Link href', ''),
      info: text('Info', 'link info'),
      text: text('Link Text', 'Text'),
      title: text('Title Text', 'Title'),
      onClick: action('Clicked'),
      direction: select('Arrow Direction', ['left', 'right']),
      label: text('Label', 'Label')
    };
    return(<ArrowNav {...props} />);
  }));
