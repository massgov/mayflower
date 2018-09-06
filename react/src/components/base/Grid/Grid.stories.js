import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Grid from '.';
import GridReadme from './Grid.md';

storiesOf('base', module).addDecorator(withKnobs)
  .add('Grid', withInfo(`<div>${GridReadme}</div>`)(() => {
    return(<Grid />);
  }));
