import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import TextArea from './index';
import TextAreaReadme from './TextArea.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('TextArea', withInfo(`<div>${TextAreaReadme}</div>`)(() => {
    const props = {
      labelText: text('textArea.labelText', 'Description'),
      hiddenLabel: boolean('textArea.hiddenLabel', false),
      required: boolean('textArea.required', true),
      id: text('textArea.id', 'text-area-123'),
      maxlength: number('textArea.maxlength', 150),
      minlength: number('textArea.minlength', 50),
      name: text('textArea.name', 'text-area'),
      type: text('textArea.type', 'number'),
      placeholder: text('textArea.placeholder', 'Example: Images are the best.'),
      errorMsg: text('textArea.errorMsg', 'You must enter content'),
      errorDisplay: boolean('textArea.errorDisplay', false),
      disabled: boolean('textArea.disabled', false)
    };
    const onChange = action('Text input modified');

    return(<TextArea {...props} onChange={onChange} />);
  }));
