import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ColoredHeading from './index';
import ColoredHeadingDocs from './ColoredHeading.md';
import coloredHeadingOptions from './ColoredHeading.knobs.options';
import headingsOptions from '../Headings.knobs.options';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ColoredHeading', (() => {
      const props = {
        text: text('text', 'Title text'),
        level: select('level', headingsOptions.levels, 2),
        color: select('color', coloredHeadingOptions.color)
      };
      return(<ColoredHeading {...props} />);
    }),
    { info: ColoredHeadingDocs }
  );
