import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs/react';

import DecorativeLink from '../../links/DecorativeLink';
import decorativeLinkOptions from '../../../atoms/links/DecorativeLink/DecorativeLink.knob.options';

import linkMarkdown from './DecorativeLink.md';

storiesOf('atoms/links', module).addDecorator(withKnobs)
  .add('DecorativeLink', withInfo({ linkMarkdown })(() => {
    const decoreOptionsWithKnobs = Object.assign(...Object.entries(decorativeLinkOptions).map(([k, v]) => (
      { [k]: v(DecorativeLink.defaultProps[k]) })));
    return(<DecorativeLink {...decoreOptionsWithKnobs} />);
  }));

