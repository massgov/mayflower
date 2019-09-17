import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import DecorativeLink from './index';
import decorativeLinkOptions from './DecorativeLink.knob.options';

import DecorativeLinkDocs from './DecorativeLink.md';

import {  } from '@storybook/addon-knobs';

export default {
  info: (value) => text('DecorativeLink: info', value, 'DecorativeLink'),
  text: (value) => text('DecorativeLink: linkText', value, 'DecorativeLink'),
  href: (value) => text('DecorativeLink: href', value, 'DecorativeLink'),
  showFileIcon: (value) => boolean('DecorativeLink: showFileIcon', value, 'DecorativeLink')
};

storiesOf('atoms/links', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DecorativeLink', (() => {
      const props = {
        info: text('DecorativeLink: info', 'This is a clickable styled link', 'DecorativeLink'),
        text: text('DecorativeLink: text', 'Decorative Link', 'DecorativeLink'),
        href: text('DecorativeLink: href', '#', 'DecorativeLink'),
        showFileIcon: boolean('DecorativeLink: showFileIcon', false, 'DecorativeLink')
      }
      const fileProps = {
        info: text('DecorativeLink as File: info', 'This is a clickable styled link', 'DecorativeLink as File'),
        text: text('DecorativeLink as File: text', 'Decorative Link File Download', 'DecorativeLink as File'),
        href: text('DecorativeLink as File: href', 'https://www.mass.gov/test.pdf', 'DecorativeLink as File'),
        showFileIcon: boolean('DecorativeLink as File: showFileIcon', true, 'DecorativeLink as File')
      }
      return(
        <React.Fragment>
          <DecorativeLink {...props} />
          <DecorativeLink {...fileProps} />
        </React.Fragment>
      )
    }),
    { info: DecorativeLinkDocs }
  );

