import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import FootNote from './index';
import FootNoteLink from '../FootNoteLink/index';
import FootNoteDocs from './FootNote.md';

storiesOf('atoms/links', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'FootNote', (() => {
      const props = {
        index: text('index', '1'),
        children: text('children', 'This is the footnote <a href="https://www.mass.gov/">(reference)</a>.')
      };
      return(
        <div>
          <p>This is where the footnote would be referenced. <FootNoteLink index={props.index} /> </p>
          <FootNote index={props.index}>{props.children}</FootNote>
        </div>
      );
    }),
    { info: FootNoteDocs }
  );
