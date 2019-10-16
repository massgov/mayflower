import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { text, boolean, select, array } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputCheckBox from './index';
import inputCheckBoxDocs from './InputCheckBox.md';

import Icon from '../../icons/Icon';
import { svgOptions } from '../../icons/Icon/Icon.knob.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCheckBox', (() => {
      const props = {
        id: text('id', 'input-checkbox'),
        label: text('label', 'Apply to all'),
        defaultValue: boolean('checked', false),
        onChange: action('onChange'),
        disabled: boolean('disabled', false),
        required: boolean('required', false),
        errorMsg: text('errorMsg', 'You are required to check this box.'),
        labelText: text('labelText', 'Checkbox Input'),
        classes: array('classes', [])
      };
      const iconProps = {
        name: select('icon.name', svgOptions, 'chevron'),
        svgWidth: 20,
        svgHeight: 20
      };
      return(
        <InputCheckBox {...props} icon={<Icon {...iconProps} />} />
      );
    }),
    { info: inputCheckBoxDocs }
  );
