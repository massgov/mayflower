import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import DecorativeLink from './index';
import decorativeLinkOptions from './DecorativeLink.knob.options';

import DecorativeLinkDocs from './DecorativeLink.md';

storiesOf('atoms/links', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DecorativeLink', (() => {
      const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
        { [k]: v(DecorativeLink.defaultProps[k]) })));
      return(<DecorativeLink {...decoreOptionsWithKnobs} />);
    }),
    { info: DecorativeLinkDocs }
  );

