import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import RichText from './index';
import RichTextDocs from './RichText.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'RichText', () => {
      const hasChildren = boolean('hasChildren', true);
      const props = {
        className: text('className', ''),
        id: text('id', ''),
        htmlTag: select('htmlTag', ['div', 'p', 'section'], 'div'),
        transform: action('transform callback')
      };
      // If children exist, disable the rawHtml knob
      props.rawHtml = hasChildren || text('rawHtml', '<h1>This is heading 1</h1>');
      return(
        <RichText {...props}>
          { hasChildren && (
            <Fragment>
              <h1>This is a heading.</h1>
              <p>
                An <b>unordered list</b> is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line. Lists can be nested inside of each other.
              </p>
              <ul>
                <li>This is a list item in an unordered list.</li>
                <ul>
                  <li>This is a nested list item.</li>
                  <li>This is another nested list item in an unordered list.</li>
                </ul>
                <li>This is the last list item.</li>
              </ul>
            </Fragment>
          ) }
        </RichText>
      );
    },
    { info: RichTextDocs }
  );
