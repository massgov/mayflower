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
      outline: boolean('inputRadioGroup.outline', 'true'),
      defaultSelected: text('inputRadioGroup.defaultSelected', 'moss'),
    };
    const InputRadioOneProps = {
      id: text('inputRadio.id', 'fern'),
      value: text('inputRadio.value', 'fern'),
      label: text('inputRadio.label', 'Fern')
    };
    const InputRadioTwoProps = {
      id: text('inputRadio.id', 'moss'),
      value: text('inputRadio.value', 'moss'),
      label: text('inputRadio.label', 'Moss')
    };
    const InputRadioThreeProps = {
      id: text('inputRadio.id', 'palm'),
      value: text('inputRadio.value', 'palm'),
      label: text('inputRadio.label', 'Palm')
    };
    const InputRadioFourProps = {
      id: text('inputRadio.id', 'mayflower'),
      value: text('inputRadio.value', 'mayflower'),
      label: text('inputRadio.label', 'Mayflower')
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
