import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { text, boolean, select, array, color } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputCheckBox from './index';
import inputCheckBoxDocs from './InputCheckBox.md';

import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCheckBox', (() => {
      const props = {
        inputProps: {
          id: text('id', 'input-checkbox'),
          value: text('value', 'select-all'),
          onKeyDown: action('onKeyDown'),
          disabled: boolean('disabled', false),
          required: boolean('required', false),
          className: text('className', ''),
          defaultChecked: false
        },
        groupProps: {
          labelProps: {
            labelText: text('labelText', 'Checkbox Input'),
            hidden: boolean('hidden', false)
          },
          errorMsg: text('errorMsg', 'You are required to check this box.'),
          inline: boolean('inline', false),
          showError: boolean('showError', false),
        },
        label: text('label', 'Apply to all')
      };
      // Capitalizes the name of each SVG icon to match
      // what SVGR names components.
      const name = select('icon.name',
        Object.fromEntries(
          Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
        ));
      const iconProps = {
        name,
        width: 20,
        height: 20,
        fill: color('icon.color', '#388557')
      };
      const SelectedComponent = Icon[name] ? Icon[name] : null;
      if (SelectedComponent) {
        props.labelText = (
          <>
            {props.labelText}
            &nbsp;
            <SelectedComponent {...iconProps} />
          </>
        );
      }
      return(
        <InputCheckBox {...props} />
      );
    }),
    { info: inputCheckBoxDocs }
  );
