import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import FootNote from './index';
import FootNoteLink from '../FootNoteLink/index';
import FootNoteDocs from './FootNote.md';

storiesOf('atoms/links', module).addDecorator(withKnobs)
  .add('FootNote', withInfo(`<div>${FootNoteDocs}</div>`)(() => {
    const props = {
      index: text('FootNote.index', '1'),
      children: text('FootNote.children', 'This is the footnote.')
    };
    return(
      <div>
        <p>This is where the footnote would be referenced. <FootNoteLink index={props.index} /> </p>
        <FootNote index={props.index}>{props.children}</FootNote>
      </div>
    );
  }));
