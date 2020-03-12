import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, array } from '@storybook/addon-knobs';

import Image from './index';
import ImageDocs from './Image.md';

storiesOf('atoms/media', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Image', (() => {
      const props = {
        alt: text('alt', 'alt text'),
        src: text('src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/800x400.png'),
        width: number('width', 800),
        height: number('height', 400),
        shape: text('shape', ''),
        classes: array('classes', [])
      };
      return(<Image {...props} />);
    }),
    { info: ImageDocs }
  )
  .add(
    'Image (circular)', (() => {
      const props = {
        alt: text('alt', 'alt text'),
        src: text('src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/250x250.png'),
        width: number('width', 250),
        height: number('height', 250),
        shape: text('shape', 'circular'),
        classes: array('classes', [])
      };

      return(<Image {...props} />);
    }),
    { info: ImageDocs }
  );
