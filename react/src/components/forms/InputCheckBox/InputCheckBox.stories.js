import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { text, boolean, select, array, color } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputCheckBox from './index';
import inputCheckBoxDocs from './InputCheckBox.md';

import Icon from '../../atoms/icons/Icon';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCheckBox', (() => {
      const props = {
        id: text('id', 'input-checkbox'),
        value: text('value', 'select-all'),
        label: text('label', 'Apply to all'),
        defaultValue: text('defaultValue', 'select-all'),
        onChange: action('onChange'),
        onKeyDown: action('onKeyDown'),
        disabled: boolean('disabled', false),
        required: boolean('required', false),
        errorMsg: text('errorMsg', 'You are required to check this box.'),
        labelText: text('labelText', 'Checkbox Input'),
        classes: array('classes', [])
      };
      const iconProps = {
        name: select('icon.name', svgOptions),
        svgWidth: 20,
        svgHeight: 20,
        fill: color('icon.color', '#388557')
      };
      return(
        <InputCheckBox {...props} icon={<Icon {...iconProps} />} />
      );
    }),
    { info: inputCheckBoxDocs }
  );
