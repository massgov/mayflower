import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import compHeadingOptions from './CompHeading.knob.options';

import CompHeading from './index';
import CompHeadingDocs from './CompHeading.md';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Comp Heading', (() => {
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(CompHeading.defaultProps[k]) })));
      return(<CompHeading {...compOptionsWithKnobs} />);
    }),
    { info: CompHeadingDocs }
  );
