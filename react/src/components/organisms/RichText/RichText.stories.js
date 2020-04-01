import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import RichText from './index';
import RichTextDocs from './RichText.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'RichText', () => {
      const props = {
        rawHtml: text('rawHtml', '<h1>This is heading 1</h1>'),
        className: text('className', ''),
        id: text('id', ''),
        htmlTag: text('htmlTag', 'div'),
        transform: action('transform callback')
      };
      return(
        <RichText {...props}>
          <h1>This is a heading.</h1>
          <p>
          An <b>unordered list</b> is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.
          Lists can be nested inside of each other.
          </p>
          <ul>
            <li>This is a list item in an unordered list.</li>
            <ul>
              <li>This is a nested list item.</li>
              <li>This is another nested list item in an unordered list.</li>
            </ul>
            <li>This is the last list item.</li>
          </ul>
        </RichText>
      );
    },
    { info: RichTextDocs }
  );
