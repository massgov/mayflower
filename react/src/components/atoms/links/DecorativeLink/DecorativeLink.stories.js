import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import DecorativeLink from './index';
import decorativeLinkOptions from './DecorativeLink.knob.options';

import DecorativeLinkDocs from './DecorativeLink.md';

storiesOf('atoms/links', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DecorativeLink', (() => {
      const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
        { [k]: v(DecorativeLink.defaultProps[k]) })));
      return(<DecorativeLink {...decoreOptionsWithKnobs} />);
    }),
    { info: DecorativeLinkDocs }
  );

