import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs } from '@storybook/addon-knobs';

import Form, { FormProvider } from './index';
import FormDocs from './Form.md';
import InputNumber from '../InputNumber';
import InputNumberOptions from './InputNumber.knobs.options';
import InputSliderOptions from './InputSlider.knobs.options';
import InputSlider from '../InputSlider';
import InputCurrency from '../InputCurrency';
import InputCurrencyOptions from './InputCurrency.knobs.options';
import Paragraph from '../../../atoms/text/Paragraph';
import './story.css';

storiesOf('atoms/forms/Form', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Default', (() => {
    delete InputNumberOptions.defaultValue;
    delete InputSliderOptions.ticks;

    const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
      { [k]: v() })));
    const formTicks = object('InputSlider: ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }, 'InputSlider');
    const ticks = [];
    Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
    inputSliderOptionsWithKnobs.ticks = ticks;
    // Make sure the domain is within the same range as the min and max of the input to make this work.
    const inputCurrencyOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
      { [k]: v() })));
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
              const getInputNumberKnobs = (idx) => (
                Object.assign(...Object
                  .entries(InputNumberOptions)
                  .map(([k, v]) => ({ [k]: v(idx) })))
              );
              const ids = [
                [
                  'test0',
                  {
                    ...getInputNumberKnobs('test0'),
                    key: 'Form.InputNumber.test0',
                    defaultValue: 0,
                    labelText: 'Input 0 (Linked to Input 1, Input 2, and Slider)',
                    id: 'test0',
                    unit: '%'
                  }
                ],
                [
                  'test1',
                  {
                    ...getInputNumberKnobs('test1'),
                    key: 'Form.InputNumber.test1',
                    defaultValue: 0,
                    labelText: 'Input 1 (Linked to Input 0, Input 2, and Slider)',
                    id: 'test1',
                    unit: '%'
                  }
                ],
                [
                  'test2',
                  {
                    ...getInputNumberKnobs('test2'),
                    key: 'Form.InputNumber.test2',
                    defaultValue: 0,
                    labelText: 'Input 2 (Linked to Input 0, Input 1, and Slider)',
                    id: 'test2',
                    unit: '%'
                  }
                ]
              ];
              const inputs = [];
              const inputProviderIds = [
                inputSliderOptionsWithKnobs.id,
                inputCurrencyOptionsWithKnobs.id
              ];
              ids.forEach((numberProps) => {
                const props = numberProps[1];
                inputs.push(<InputNumber {...props} />);
                inputProviderIds.push(props.id);
              });
              return(
                <React.Fragment>
                  <div className="align-left">
                    <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                    {inputs}
                    <InputSlider {...inputSliderOptionsWithKnobs} />
                  </div>
                  <div className="full-right">
                    <React.Fragment>
                      <Paragraph text="Current Values:" />
                      {
                        inputProviderIds.map((id, providerIndex) => (
                          <Paragraph key={`formStory-providerId-${providerIndex}`} text={`${id}: ${formContext.getInputProviderValue(id)}`} />
                        ))
                      }
                    </React.Fragment>
                  </div>
                </React.Fragment>
              );
            }
          }
        </Form>
      </FormProvider>
    );
  }), { info: FormDocs })
  .add('Conditional Updates', (() => {
    delete InputNumberOptions.defaultValue;
    delete InputSliderOptions.ticks;

    const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
      { [k]: v() })));
    const formTicks = object('InputSlider: ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }, 'InputSlider');
    const ticks = [];
    Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
    inputSliderOptionsWithKnobs.ticks = ticks;
    // Make sure the domain is within the same range as the min and max of the input to make this work.
    const inputCurrencyOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
      { [k]: v() })));
    inputCurrencyOptionsWithKnobs.labelText = 'Currency Input (set to $999.00 when Input 0 is greater than 60)';
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
              const getInputNumberKnobs = (idx) => (
                Object.assign(...Object
                  .entries(InputNumberOptions)
                  .map(([k, v]) => ({ [k]: v(idx) })))
              );
              const ids = [
                [
                  'test0',
                  {
                    ...getInputNumberKnobs('test0'),
                    key: 'Form.InputNumber.test0',
                    defaultValue: 0,
                    labelText: 'Input 0 (Updates Currency Input, Input 1, Input2 and Slider when over 60)',
                    id: 'test0',
                    unit: '%',
                    onChange: (e, inputProviderValue, sourceInputId) => {
                      // When this input's value is greater than 60...
                      if (Number(inputProviderValue) > 60) {
                        // Update the currency input to be $999.00 and the slider to 63 percent.
                        formContext.setInputProviderValue({ id: inputCurrencyOptionsWithKnobs.id, value: '$999.00' });
                        formContext.setInputProviderValue({ id: inputSliderOptionsWithKnobs.id, value: '0.63' });
                        formContext.setInputProviderValue({ id: 'test1', value: 44 });
                      } else {
                        // Set the currency input to $0.00 otherwise.
                        formContext.setInputProviderValue({ id: inputCurrencyOptionsWithKnobs.id, value: '$0.00' });
                      }
                    }
                  }
                ],
                [
                  'test1',
                  {
                    ...getInputNumberKnobs('test1'),
                    key: 'Form.InputNumber.test1',
                    defaultValue: 0,
                    labelText: 'Input 1 (Updates Input 2 to Same Value)',
                    id: 'test1',
                    unit: '%',
                    onChange: (e, inputProviderValue, sourceInputId) => {
                      formContext.setInputProviderValue({ id: 'test2', value: inputProviderValue });
                    },
                    // This runs for Test1's componentDidUpdate lifecycle method.
                    // Adding this allows test 1 and test 2 to keep in sync if another component updates its value.
                    // onChange only runs when the user directly changes the InputProvider's value through interactions.
                    onComponentUpdate: (inputProviderValue) => {
                      if (formContext.getInputProviderValue('test2') !== inputProviderValue) {
                        formContext.setInputProviderValue({ id: 'test2', value: inputProviderValue });
                      }
                    }
                  }
                ],
                [
                  'test2',
                  {
                    ...getInputNumberKnobs('test2'),
                    key: 'Form.InputNumber.test2',
                    defaultValue: 0,
                    labelText: 'Input 2 (Updates Input 1 to Same Value)',
                    id: 'test2',
                    unit: '%',
                    onChange: (e, inputProviderValue, sourceInputId) => {
                      formContext.setInputProviderValue({ id: 'test1', value: inputProviderValue });
                    },
                    // This runs for Test1's componentDidUpdate lifecycle method.
                    // Adding this allows test 1 and test 2 to keep in sync if another component updates its value.
                    // onChange only runs when the user directly changes the InputProvider's value through interactions.
                    onComponentUpdate: (inputProviderValue) => {
                      if (formContext.getInputProviderValue('test1') !== inputProviderValue) {
                        formContext.setInputProviderValue({ id: 'test1', value: inputProviderValue });
                      }
                    }
                  }
                ]
              ];
              const inputs = [];
              const inputProviderIds = [
                inputSliderOptionsWithKnobs.id,
                inputCurrencyOptionsWithKnobs.id
              ];
              ids.forEach((numberProps) => {
                const props = numberProps[1];
                inputs.push(<InputNumber {...props} />);
                inputProviderIds.push(props.id);
              });
              return(
                <React.Fragment>
                  <div className="align-left">
                    <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                    {inputs}
                    <InputSlider {...inputSliderOptionsWithKnobs} />
                  </div>
                  <div className="full-right">
                    <Paragraph text="Current Values:" />
                    {
                      inputProviderIds.map((id, providerIndex) => (
                        <Paragraph key={`formStory-providerId-${providerIndex}`} text={`${id}: ${formContext.getInputProviderValue(id)}`} />
                      ))
                    }
                  </div>
                </React.Fragment>
              );
            }
          }
        </Form>
      </FormProvider>
    );
  }), { info: FormDocs });
