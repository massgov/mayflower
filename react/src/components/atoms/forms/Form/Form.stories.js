import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { object, withKnobs, text, number, array } from '@storybook/addon-knobs/react';

import Form, { FormProvider } from './index';
import FormInfo from './Form.md';
import InputNumber from '../InputNumber';
import InputNumberOptions from '../InputNumber/InputNumber.knobs.options';
import InputSliderOptions from '../InputSlider/InputSlider.knobs.options';
import InputSlider from '../InputSlider';
import InputCurrency from '../InputCurrency';
import InputCurrencyOptions from '../InputCurrency/InputCurrency.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('Form', withInfo(`<div>${FormInfo}</div>`)(() => {
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
    inputSliderOptionsWithKnobs.labelText = text('InputSlider.labelText', 'Slider (Linked to Input 3)');
    const formTicks = object('InputSlider.ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' });
    const ticks = [];
    Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
    inputSliderOptionsWithKnobs.ticks = ticks;
    // Make sure the domain is within the same range as the min and max of the input to make this work.
    delete InputCurrencyOptions.labelText;
    const inputCurrencyOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
      { [k]: v() })));
    inputCurrencyOptionsWithKnobs.labelText = text('InputCurrency.labelText', 'Currency Input (Set to 999 when Slider is 60)');
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
                  if (formContext.hasId('test1')) {
                    if (formContext.getValue('test1') === 30) {
                      formContext.setValue({ id: 'test2', value: 25 });
                    }
                  }
                  // Keep test0 and test1 in sync.
                  if (formContext.hasId('test1') && formContext.hasId('test0')) {
                    if (id === 'test0') {
                      formContext.setValue({ id: 'test1', value: formContext.getValue('test0') });
                    }
                    if (id === 'test1') {
                      formContext.setValue({ id: 'test0', value: formContext.getValue('test1') });
                    }
                  }
                  if (formContext.hasId('test3')) {
                    if (id === 'test3') {
                      formContext.setValue({ id: 'slider', value: Number(formContext.getValue('test3') / 100).toFixed(2) }, () => {
                        // Use afterUpdate function so that slider is updated before this check.
                        if (formContext.getValue('slider') === 0.6) {
                          formContext.setValue({ id: 'currency-input', value: '$999.00' });
                        }
                      });
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
                    labelText: 'Input 0 (Linked to Input 1)',
                    id: 'test0'
                  }
                ],
                [
                  'test1',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test1',
                    defaultValue: 1,
                    labelText: 'Input 1 (Linked to Input 0)',
                    id: 'test1'
                  }
                ],
                [
                  'test2',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test2',
                    defaultValue: 2,
                    labelText: 'Input 2 (Set to 25 when Input 1 is 30)',
                    id: 'test2'
                  }
                ],
                [
                  'test3',
                  {
                    ...inputTextOptionsWithKnobs,
                    key: 'Form.InputNumber.test3',
                    defaultValue: 0,
                    labelText: 'Input 3 (Linked to Slider)',
                    id: 'test3'
                  }
                ]
              ];
              const inputs = [];
              ids.forEach((numberProps) => {
                inputs.push(<InputNumber {...numberProps[1]} />);
              });
              inputSliderOptionsWithKnobs.onChange = (newVal, id) => {
                if (formContext.hasId(id)) {
                  formContext.setValue({ id: 'test3', value: Number(formContext.getValue(id) * 100).toFixed(2) });
                  if (formContext.hasId('currency-input')) {
                    if (newVal === 0.6) {
                      // Sets currency to 999 when slider is 60%.
                      formContext.setValue({ id: 'currency-input', value: '$999.00' });
                    }
                  }
                }
              };
              return(
                <React.Fragment>
                  {inputs}
                  <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                  <InputSlider {...inputSliderOptionsWithKnobs} id="slider" />
                </React.Fragment>
              );
            }
          }
        </Form>
      </FormProvider>
    );
  }));
