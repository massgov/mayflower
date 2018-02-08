import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import DecorativeLink from './index';
import decorativeLinkOptions from './DecorativeLink.knob.options';

import linkMarkdown from './DecorativeLink.md';

storiesOf('atoms/links', module).addDecorator(withKnobs)
  .add('DecorativeLink', withInfo({ linkMarkdown })(() => {
    const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
      { [k]: v(DecorativeLink.defaultProps[k]) })));
    return(<DecorativeLink {...decoreOptionsWithKnobs} />);
  }));

