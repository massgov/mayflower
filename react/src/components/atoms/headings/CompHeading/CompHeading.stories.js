import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import compHeadingOptions from './CompHeading.knob.options';

import CompHeading from './index';
import CompHeadingDocs from './CompHeading.md';

storiesOf('atoms/headings', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Comp Heading', (() => {
      const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
        { [k]: v(CompHeading.defaultProps[k]) })));
      return(<CompHeading {...compOptionsWithKnobs} />);
    }),
    { info: CompHeadingDocs }
  );
