import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import compHeadingOptions from './CompHeading.knob.options';

import CompHeading from './index';
import CompReadme from './CompHeading.md';

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('Comp Heading', withInfo({ CompReadme })(() => {
    const compOptionsWithKnobs = Object.assign(...Object.entries(compHeadingOptions).map(([k, v]) => (
      { [k]: v(CompHeading.defaultProps[k]) })));
    return(<CompHeading {...compOptionsWithKnobs} />);
  }));
