import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ParagraphDocs from './Paragraph.md';
import Paragraph from './index';

storiesOf('atoms/text', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Paragraph', (() => {
      const props = {
        text: text('text', 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.'),
        className: text('className', 'ma__custom-class')
      };
      return(
        <Paragraph {...props} />
      );
    }),
    { info: ParagraphDocs }
  )
  .add(
    'Paragraph using props.children', (() => {
      const child = text('text', 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.');

      const props = {
        className: text('className', 'ma__custom-class')
      };
      return(
        <Paragraph {...props}>{child}</Paragraph>
      );
    }),
    { info: ParagraphDocs }
  );
