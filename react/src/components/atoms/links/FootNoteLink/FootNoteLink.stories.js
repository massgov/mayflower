import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import FootNoteLink from './index';
import FootNote from '../FootNote/index';
import FootNoteLinkDocs from './FootNoteLink.md';

storiesOf('atoms/links', module).addDecorator(withKnobs)
  .add('FootNoteLink', withInfo(`<div>${FootNoteLinkDocs}</div>`)(() => {
    const props = {
      index: text('FootNoteLink.index', '1')
    };
    const rawHtml = 'This is the footnote <a href="#">(reference)</a>.';
    return(
      <div>
        <p>This is where the footnote would be referenced. <FootNoteLink index={props.index} /> </p>
        <FootNote index={props.index}>{rawHtml}</FootNote>
      </div>
    );
  }));
