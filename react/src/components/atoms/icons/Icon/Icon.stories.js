import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';

import Icon from './index';

storiesOf('atoms/icons', module).addDecorator(withKnobs)
  .add('Icon', () => {
    const options = {
      '': 'Choose',
      arrow: 'arrow.svg',
      latlonglobe: 'latlonglobe.svg',
      arrowbent: 'arrowbent.svg'
    };
    const input = select('Icon.filename', options, '');
    return(<Icon name={input} />);
  });
