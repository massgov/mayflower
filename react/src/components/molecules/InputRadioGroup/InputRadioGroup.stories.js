import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputRadioGroup from './index';
// import InputRadioGroupDocs from './AccordionWrapper.md';

import InputRadio from '../../atoms/forms/InputRadio';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('InputRadioGroup', withInfo(/* `<div>${InputRadioGroup}Docs}</div>` */)(() => {
    const InputRadioGroupProps = {
      title: text('inputRadioGroup.title', 'Pick your favorite plant'),
      name: text('inputRadioGroup.group', 'favorite-plant'),
      outline: boolean('inputRadioGroup.outline', true),
      defaultSelected: text('inputRadioGroup.defaultSelected', ''),
      error: boolean('inputRadioGroup.error', false),
      errorMsg: text('inputRadioGroup.errorMsg', 'You must selected your favorite plant.'),
      disabled: boolean('inputRadioGroup.disabled', false),
      inline: boolean('inputRadioGroup.inline', true)
    };
    const InputRadioOneProps = {
      id: text('InputRadioOneProps.inputRadio.id', 'fern'),
      value: text('InputRadioOneProps.inputRadio.value', 'fern'),
      label: text('InputRadioOneProps.inputRadio.label', 'Fern')
    };
    const InputRadioTwoProps = {
      id: text('InputRadioTwoProps.inputRadio.id', 'moss'),
      value: text('InputRadioTwoProps.inputRadio.value', 'moss'),
      label: text('InputRadioTwoProps.inputRadio.label', 'Moss')
    };
    const InputRadioThreeProps = {
      id: text('InputRadioThreeProps.inputRadio.id', 'palm'),
      value: text('InputRadioThreeProps.inputRadio.value', 'palm'),
      label: text('InputRadioThreeProps.inputRadio.label', 'Palm')
    };
    const InputRadioFourProps = {
      id: text('InputRadioFourProps.inputRadio.id', 'mayflower'),
      value: text('InputRadioFourProps.inputRadio.value', 'mayflower'),
      label: text('InputRadioFourProps.inputRadio.label', 'Mayflower')
    };
    return(
      <InputRadioGroup {...InputRadioGroupProps} onChange={action('onChange')} >
        <InputRadio {...InputRadioOneProps} />
        <InputRadio {...InputRadioTwoProps} />
        <InputRadio {...InputRadioThreeProps} />
        <InputRadio {...InputRadioFourProps} />
      </InputRadioGroup>
    );
  }));
