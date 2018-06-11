import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

// import paragraphOptions from './Paragraph.knob.options';

import UnorderedList from './index';
import unorderedListReadme from './UnorderedList.md';
import unorderedOptions from './UnorderedList.knob.options';

storiesOf('atoms/lists', module).addDecorator(withKnobs)
  .add('UnorderedList', withInfo({ unorderedListReadme })(() => {
    const orderedOptionsWithKnobs = Object.assign(...Object.entries(unorderedOptions).map(([k, v]) => (
      { [k]: v(UnorderedList.defaultProps[k]) })));
    return(<UnorderedList {...orderedOptionsWithKnobs} />);
  }));
