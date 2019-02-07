import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import Link from './index';
import linkOptions from './Link.knob.options';
import LinkDocs from './Link.md';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Link', (() => {
      const optionsWithKnobs = Object.assign(...Object.entries(linkOptions).map(([k, v]) => (
        { [k]: v(Link.defaultProps[k]) })));
      return(<Link {...optionsWithKnobs} />);
    }),
    { info: LinkDocs }
  );

