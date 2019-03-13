import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { object, withKnobs, text, number, array } from '@storybook/addon-knobs';
import is from 'is';
import deepEqual from 'fast-deep-equal';

import Form, { FormProvider } from './index';
import FormDocs from './Form.md';
import InputNumber from '../InputNumber';
import InputNumberOptions from '../InputNumber/InputNumber.knobs.options';
import InputSliderOptions from '../InputSlider/InputSlider.knobs.options';
import InputSlider from '../InputSlider';
import InputCurrency from '../InputCurrency';
import InputCurrencyOptions from '../InputCurrency/InputCurrency.knobs.options';
import InputSync from '../InputSync';
import Paragraph from '../../../atoms/text/Paragraph';
import './story.css';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Form', (() => {
      delete InputNumberOptions.defaultValue;

      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
        { [k]: v() })));

      delete InputSliderOptions.ticks;
      delete InputSliderOptions.labelText;
      delete InputSliderOptions.step;
      delete InputSliderOptions.max;
      delete InputSliderOptions.domain;

      const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));
      inputSliderOptionsWithKnobs.domain = array('InputSlider.domain', [0, 1]).map((num) => Number(num));
      inputSliderOptionsWithKnobs.max = number('InputSlider.max', 1);
      inputSliderOptionsWithKnobs.step = number('InputSlider.step', 0.01, { min: 0, max: 1, step: 0.01 });
      inputSliderOptionsWithKnobs.labelText = text('InputSlider.labelText', 'Slider (Linked to Input 0 and Input 1)');
      const formTicks = object('InputSlider.ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' });
      const ticks = [];
      Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
      inputSliderOptionsWithKnobs.ticks = ticks;
      // Make sure the domain is within the same range as the min and max of the input to make this work.
      delete InputCurrencyOptions.labelText;
      const inputCurrencyOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
        { [k]: v() })));
      inputCurrencyOptionsWithKnobs.labelText = text('InputCurrency.labelText', 'Currency Input (Set to 999 when Slider is greater than 60)');
      const languages = new Map();
      languages.set('Chinese', 'zh-CN');
      languages.set('English', 'en-US');
      languages.set('French', 'fr-FR');
      languages.set('Russian', 'ru-RU');
      inputCurrencyOptionsWithKnobs.language = languages.get(inputCurrencyOptionsWithKnobs.language);
      return(
        <FormProvider>
          <Form>
            {
            (formContext) => {
              const ids = [
                [
                  'test0',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test0',
                    defaultValue: 0,
                    labelText: 'Input 0 (Linked to Input 1 and Slider)',
                    id: 'test0',
                    unit: '%',
                    linkedContent: ['test1', 'test2', 'slider']
                  }
                ],
                [
                  'test1',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test1',
                    defaultValue: 100,
                    labelText: 'Input 1 (Linked to Input 0 and Slider)',
                    id: 'test1',
                    unit: '%'
                  }
                ],
                [
                  'test2',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test2',
                    defaultValue: 100,
                    labelText: 'Input 1 (Linked to Input 0 and Slider)',
                    id: 'test2',
                    unit: '%'
                  }
                ]
              ];
              const inputs = [];
              ids.forEach((numberProps) => {
                inputs.push(<InputNumber {...numberProps[1]} />);
              });
              // Custom conditions for InputSync updates.
              const inputSyncProps = {
                syncCondition: (currentId, currentValue) => {
                  if (currentId === 'currency-input') {
                    return(!deepEqual(currentValue, formContext.getValue('currency-input')));
                  }
                    return true;
                }
              };
              inputSliderOptionsWithKnobs.updateFunc = (id, val) => {
                if (val > 0.6) {
                  formContext.setValue({ id: 'currency-input', value: '$999.00' });
                } else {
                  formContext.setValue({ id: 'currency-input', value: '$0.00' });
                }
              };
              return(
                <React.Fragment>
                  <div className="align-left">
                    <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                    {inputs}
                    <InputSlider {...inputSliderOptionsWithKnobs} id="slider" />
                  </div>
                  <div className="full-right">
                    <InputSync formIds={['test0', 'currency-input']}>
                      {() => (
                        <React.Fragment>
                          <Paragraph text={`test0: ${formContext.getValue('test0')}`} />
                          <Paragraph text={`test1: ${formContext.getValue('test1')}`} />
                          <Paragraph text={`test2: ${formContext.getValue('test2')}`} />
                          <Paragraph text={`currency-input: ${formContext.getValue('currency-input')}`} />
                          <Paragraph text={`slider: ${formContext.getValue('slider')}`} />
                        </React.Fragment>
                      ) }
                    </InputSync>
                  </div>
                </React.Fragment>
              );
            }
          }
          </Form>
        </FormProvider>
      );
    }),
    { info: FormDocs }
  );
