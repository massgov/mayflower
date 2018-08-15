import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import path from 'path';

import Icon from './index';

function getAssets() {
  const req = require.context('./assets', true, /\.*.svg$/);
  const options = {};
  req.keys().forEach((filename) => {
    const key = path.basename(filename, '.svg');
    options[key] = path.basename(filename);
  });
  return options;
}

storiesOf('atoms/icons', module).addDecorator(withKnobs)
  .add('Icon', () => {
    const assets = getAssets();
    const options = {
      '': 'Choose',
      ...assets
    };
    const input = select('Icon.filename', options, '');
    return(<Icon name={input} />);
  });
