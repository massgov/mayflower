import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import ColoredHeading from './index';
import ColoredHeadingDocs from './ColoredHeading.md';
import coloredHeadingOptions from './ColoredHeading.knobs.options';
import headingsOptions from '../Headings.knobs.options';

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('ColoredHeading', withInfo(`<div>${ColoredHeadingDocs}</div>`)(() => {
    const props = {
      text: text('coloredHeading.text', 'Title text'),
      level: select('coloredHeading.level', headingsOptions.levels, 2),
      color: select('coloredHeading.color', coloredHeadingOptions.color),
      id: ''
    };
    return(<ColoredHeading {...props} />);
  }));
