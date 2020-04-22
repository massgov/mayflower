import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// import paragraphOptions from './Paragraph.knob.options';

import UnorderedList from './index';
import UnorderedListDocs from './UnorderedList.md';
import unorderedOptions from './UnorderedList.knob.options';

storiesOf('atoms/lists', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'UnorderedList', (() => {
      const orderedOptionsWithKnobs = Object.assign(...Object.entries(unorderedOptions).map(([k, v]) => (
        { [k]: v(UnorderedList.defaultProps[k]) })));
      return(<UnorderedList {...orderedOptionsWithKnobs} />);
    }),
    { info: UnorderedListDocs }
  );
