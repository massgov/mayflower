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
        <RichText {...props} />);
    },
    { info: RichTextDocs }
  );
