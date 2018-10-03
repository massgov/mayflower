import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, text } from '@storybook/addon-knobs/react';

import Image from './index';
import imageDocs from './Image.md';

storiesOf('atoms/media', module).addDecorator(withKnobs)
  .add('Image', withInfo(`<div>${imageDocs}</div>`)(() => {
    const props = {
      alt: text('Image.alt', 'alt text'),
      src: text('Image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/800x400.png'),
      width: number('Image.width', 800),
      height: number('Image.height', 400),
      shape: text('Image.shape', ''),
      classes: text('Image.classes', '')
    };
    props.classes = [props.classes];
    return(<Image {...props} />);
  }))
  .add('Image (circular)', withInfo(`<div>${imageDocs}</div>`)(() => {
    const props = {
      alt: text('Image.alt', 'alt text'),
      src: text('Image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/250x250.png'),
      width: number('Image.width', 250),
      height: number('Image.height', 250),
      shape: text('Image.shape', ''),
      classes: text('Image.classes', 'ma__image circular')
    };
    props.classes = [props.classes];

    return(<Image {...props} />);
  }));
