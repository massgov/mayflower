import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import paragraphOptions from './Paragraph.knob.options';

import Paragraph from './index';
import paragraphReadme from './Paragraph.md';

storiesOf('atoms/text', module).addDecorator(withKnobs)
  .add('Paragraph', withInfo({ paragraphReadme })(() => {
    const paraOptionsWithKnobs = Object.assign(...Object.entries(paragraphOptions).map(([k, v]) => (
      { [k]: v(Paragraph.defaultProps[k]) })));
    return(<Paragraph {...paraOptionsWithKnobs} />);
  }));
