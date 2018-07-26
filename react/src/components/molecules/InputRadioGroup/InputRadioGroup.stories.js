import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import InputRadioGroup from './index';
//import AccordionWrapperDocs from './AccordionWrapper.md';

import InputRadio from '../../atoms/forms/InputRadio';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('InputRadioGroup', withInfo(/*`<div>${AccordionWrapperDocs}</div>`*/)(() => {
    const InputRadioGroupProps = {
      title: text('inputRadioGroup.title', 'Pick your favorite plant'),
      name: text('inputRadioGroup.group', 'favorite-plant'),
      outline: boolean('inputRadioGroup.outline', 'true'),
      defaultSelected: text('inputRadioGroup.defaultSelected', 'fern')
    }
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
      <InputRadioGroup {...InputRadioGroupProps} >
        <InputRadio {...InputRadioOneProps} />
        <InputRadio {...InputRadioTwoProps} />
        <InputRadio {...InputRadioThreeProps} />
        <InputRadio {...InputRadioFourProps} />
      </InputRadioGroup>
    );
  }));
