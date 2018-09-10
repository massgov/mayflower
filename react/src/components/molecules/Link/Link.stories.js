import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import Link from './index';
import linkOptions from './Link.knob.options';


import linkMarkdown from './Link.md';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('Link', withInfo({ linkMarkdown })(() => {
    const optionsWithKnobs = Object.assign(...Object.entries(linkOptions).map(([k, v]) => (
      { [k]: v(Link.defaultProps[k]) })));
    return(<Link {...optionsWithKnobs} />);
  }));

