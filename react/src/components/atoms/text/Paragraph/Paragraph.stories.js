import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import paragraphReadme from './Paragraph.md';
import Paragraph from './index';

storiesOf('atoms/text', module).addDecorator(withKnobs)
  .add('Paragraph', withInfo({ paragraphReadme })(() => {
    const props = {
      text: text('paragraph.text', 'A <strong>paragraph</strong> (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.'),
      className: text('paragraph.className', 'ma__custom-class')
    };
    return(
      <Paragraph {...props} />
    );
  }));
