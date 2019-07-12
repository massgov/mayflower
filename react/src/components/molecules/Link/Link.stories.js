import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Link from './index';
import linkOptions from './Link.knob.options';
import LinkDocs from './Link.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Link', (() => {
      const optionsWithKnobs = Object.assign(...Object.entries(linkOptions).map(([k, v]) => (
        { [k]: v(Link.defaultProps[k]) })));
      return(<Link {...optionsWithKnobs} />);
    }),
    { info: LinkDocs }
  );

