/* eslint-disable react/jsx-fragments */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { StoryPage } from 'StorybookConfig/preview';

import InputNumber from 'MayflowerReactForms/InputNumber';
import InputSlider from 'MayflowerReactForms/InputSlider';
import InputCurrency from 'MayflowerReactForms/InputCurrency';
import Form, { FormProvider } from './index';
import FormDocs from './Form.md';

export const FormExample = () => {
  const InputNumberOptions = {
    hiddenLabel: false,
    labelText: 'Number Input',
    required: false,
    inline: false,
    disabled: false,
    id: 'number-input',
    name: 'number-input',
    width: 0,
    maxlength: 20,
    placeholder: '0',
    errorMsg: 'you did not type something',
    max: 100,
    min: 0,
    step: 1,
    onChange: () => action('onChange'),
    onBlur: () => action('onBlur'),
    showButtons: true
  };
  const InputSliderOptions = {
    labelText: 'Family Leave',
    id: 'text-input',
    disabled: false,
    required: true,
    defaultValue: '0',
    axis: 'x',
    max: 1,
    min: 0,
    step: 0.01,
    ticks: [[0, '0%'], [0.6, 'Minimum requirement'], [1, '100%']],
    domain: [0, 1],
    onChange: action('inputSlider.onChange'),
    onUpdate: action('inputSlider.onUpdate'),
    skipped: false,
    displayValueFormat: 'percentage'
  };
  const InputCurrencyOptions = {
    hiddenLabel: false,
    labelText: 'Currency Input',
    required: false,
    inline: false,
    disabled: false,
    id: 'currency-input',
    name: 'currency-input',
    width: 0,
    maxlength: 20,
    placeholder: '$0.00',
    errorMsg: 'you did not type something',
    defaultValue: null,
    max: 1000,
    min: 0,
    step: 0.01,
    format: {
      mantissa: 2,
      trimMantissa: false,
      thousandSeparated: true,
      negative: 'parenthesis'
    },
    showButtons: true,
    onChange: () => action('onChange'),
    onBlur: () => action('onBlur'),
    language: 'English'
  };

  const inputTextOptionsWithKnobs = { ...InputNumberOptions };

  const SliderOptions = { ...InputSliderOptions };

  delete SliderOptions.ticks;
  delete SliderOptions.labelText;
  delete SliderOptions.step;
  delete SliderOptions.max;
  delete SliderOptions.domain;
  const inputSliderOptionsWithKnobs = SliderOptions;
  inputSliderOptionsWithKnobs.domain = [0, 1];
  inputSliderOptionsWithKnobs.max = 1;
  inputSliderOptionsWithKnobs.step = 0.01;
  inputSliderOptionsWithKnobs.labelText = 'Slider (Linked to Input 0 and Input 1)';
  const formTicks = { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' };
  const ticks = [];
  Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
  inputSliderOptionsWithKnobs.ticks = ticks;
  // Make sure the domain is within the same range as the min and max of the input to make this work.
  delete InputCurrencyOptions.labelText;
  const inputCurrencyOptionsWithKnobs = InputCurrencyOptions;
  inputCurrencyOptionsWithKnobs.labelText = 'Currency Input (Set to 999 when Slider is greater than 60)';
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
          inputTextOptionsWithKnobs.onChange = (e, newVal, id) => {
            // Keep test0 and test1 in sync.
            if (formContext.hasId('test0') && formContext.hasId('test1') && (formContext.hasId('slider'))) {
              if (id === 'test0') {
                const test0 = formContext.getValue('test0');
                formContext.setValue({ id: 'test1', value: 100 - test0 });
                formContext.setValue({ id: 'slider', value: test0 / 100 });
                if (test0 > 60) {
                  formContext.setValue({ id: 'currency-input', value: '$999.00' });
                } else {
                  formContext.setValue({ id: 'currency-input', value: '$0.00' });
                }
              }
              if (id === 'test1') {
                const test1 = formContext.getValue('test1');
                formContext.setValue({ id: 'test0', value: 100 - test1 });
                formContext.setValue({ id: 'slider', value: (100 - test1) / 100 });
                if ((100 - test1) > 60) {
                  formContext.setValue({ id: 'currency-input', value: '$999.00' });
                } else {
                  formContext.setValue({ id: 'currency-input', value: '$0.00' });
                }
              }
            }
          };
          const ids = [
            [
              'test0',
              {
                ...inputTextOptionsWithKnobs,
                key: 'Form.InputNumber.test0',
                defaultValue: 0,
                labelText: 'Input 0 (Linked to Input 1 and Slider)',
                id: 'test0',
                unit: '%'
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
            ]
          ];
          const inputs = [];
          ids.forEach((numberProps) => {
            inputs.push(<InputNumber {...numberProps[1]} />);
          });
          inputSliderOptionsWithKnobs.onUpdate = (newVal, id) => {
            if (formContext.hasId(id)) {
              formContext.setValue({ id: 'test0', value: Number(formContext.getValue(id) * 100).toFixed() });
              formContext.setValue({ id: 'test1', value: Number((1 - formContext.getValue(id)) * 100).toFixed() });
              if (formContext.hasId('currency-input')) {
                if (newVal > 0.6) {
                  // Sets currency to 999 when slider is 60%.
                  formContext.setValue({ id: 'currency-input', value: '$999.00' });
                } else {
                  formContext.setValue({ id: 'currency-input', value: '$0.00' });
                }
              }
            }
          };
          return(
            <React.Fragment>
              <InputCurrency {...inputCurrencyOptionsWithKnobs} />
              {inputs}
              <InputSlider {...inputSliderOptionsWithKnobs} id="slider" />
            </React.Fragment>
          );
        }
      }
      </Form>
    </FormProvider>
  );
};

FormExample.storyName = 'Default';

export default {
  title: 'forms/context/Form',
  component: Form,
  parameters: {
    docs: {
      page: () => <StoryPage Description={FormDocs} />
    }
  }
};
