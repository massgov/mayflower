import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs, text } from '@storybook/addon-knobs';
import numbro from 'numbro';

import Form, { FormProvider } from './index';
import FormDocs from './Form.md';
import InputNumber from '../InputNumber';
import InputNumberOptions from './InputNumber.knobs.options';
import InputSliderOptions from './InputSlider.knobs.options';
import InputSlider from '../InputSlider';
import InputCurrency from '../InputCurrency';
import InputCurrencyOptions from './InputCurrency.knobs.options';
import InputSync from '../InputSync';
import Paragraph from '../../../atoms/text/Paragraph';
import { countDecimals } from '../Input/utility';
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
              // For InputSync. Provides the InputProvider ids to watch for updates on.
              const inputProviderIds = [
                inputSliderOptionsWithKnobs.id,
                inputCurrencyOptionsWithKnobs.id
              ];
              ids.forEach((numberProps) => {
                const props = numberProps[1];
                inputs.push(<InputNumber {...props} />);
                inputProviderIds.push(props.id);
              });
              // InputSync will normally update whenever the form ids set to props.inputProviderIds update.
              // InputSync can only watch form ids that actually exist,
              // so it must come after the input it is watching has been rendered.
              const inputSyncProps = {
                inputProviderIds
              };
              return(
                <React.Fragment>
                  <div className="align-left">
                    <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                    {inputs}
                    <InputSlider {...inputSliderOptionsWithKnobs} />
                  </div>
                  <div className="full-right">
                    <InputSync {...inputSyncProps}>
                      {() => (
                        <React.Fragment>
                          <Paragraph text="Updates whenever the InputProvider ids pointed to in InputSync.props.inputProviderIds update." />
                          <Paragraph text="Current Values:" />
                          {
                            inputProviderIds.map((id, providerIndex) => (
                              <Paragraph key={`formStory-inputSync-providerId-${providerIndex}`} text={`${id}: ${formContext.getInputProviderValue(id)}`} />
                            ))
                          }
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
  }), { info: FormDocs })
  .add(
    'With linked inputs', (() => {
      delete InputNumberOptions.defaultValue;
      delete InputSliderOptions.ticks;
      delete InputSliderOptions.labelText;

      const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));
      inputSliderOptionsWithKnobs.labelText = text('InputSlider: labelText', 'Slider (Linked to Input 0 and Input 1)', 'InputSlider');
      const formTicks = object('InputSlider: ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }, 'InputSlider');
      const ticks = [];
      Object.keys(formTicks).forEach((tick) => ticks.push([tick, formTicks[tick]]));
      inputSliderOptionsWithKnobs.ticks = ticks;
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
                      unit: '%',
                      linkedInputProviders: ['test1', 'test2', inputSliderOptionsWithKnobs.id]
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
                // For InputSync. Provides the InputProvider ids to watch for updates on.
                const inputProviderIds = [
                  inputSliderOptionsWithKnobs.id
                ];
                ids.forEach((numberProps) => {
                  const props = numberProps[1];
                  props.overrideLinkedValue = (sourceInputId, val) => {
                    // If the slider triggered an update...
                    if (sourceInputId === inputSliderOptionsWithKnobs.id) {
                      // Convert the fractional number back to a percent.
                      return Number(numbro(val * 100).format({ mantissa: countDecimals(props.step) }));
                    }
                    // Otherwise, the other linked inputs are already percentages, return.
                    return val;
                  };
                  inputs.push(<InputNumber {...props} />);
                  inputProviderIds.push(props.id);
                });
                // InputSync will normally update whenever the form ids set to props.inputProviderIds update.
                // InputSync can only watch form ids that actually exist,
                // so it must come after the input it is watching has been rendered.
                const inputSyncProps = {
                  inputProviderIds
                };
                // We still want the slider to change the other Inputs, so add an override function.
                // Update the inputs back to percentages when slider changes value.
                // sourceInputId in this case is the InputProvider id that triggered an onInput event.
                // val is the value this InputProvider was going to be before this function ran.
                inputSliderOptionsWithKnobs.overrideLinkedValue = (sourceInputId, val) => Number(numbro(val / 100).format({ mantissa: countDecimals(inputSliderOptionsWithKnobs.step) }));
                // Slider doesn't have an input element, so we should use state.value with it. This is set to true by default for sliders.
                inputSliderOptionsWithKnobs.useOwnStateValue = true;
                return(
                  <React.Fragment>
                    <div className="align-left">
                      {inputs}
                      <InputSlider {...inputSliderOptionsWithKnobs} />
                    </div>
                    <div className="full-right">
                      <InputSync {...inputSyncProps}>
                        {() => (
                          <React.Fragment>
                            <Paragraph text="Updates whenever the InputProvider ids pointed to in InputSync.props.inputProviderIds update." />
                            <Paragraph text="Current Values:" />
                            {
                              inputProviderIds.map((id, providerIndex) => (
                                <Paragraph key={`formStory-inputSync-providerId-${providerIndex}`} text={`${id}: ${formContext.getInputProviderValue(id)}`} />
                              ))
                            }
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
  )
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
                    labelText: 'Input 0 (Updates the currency input and slider)',
                    id: 'test0',
                    unit: '%',
                    // This can also be accomplished with InputNumber's onChange function.
                    // onComponentUpdate is ran during the componentDidUpdate lifecycle.
                    onComponentUpdate: (inputProviderValue) => {
                      // When this input's value is greater than 60...
                      if (Number(inputProviderValue) > 60) {
                        // Update the currency input to be $999.00 and the slider to 63 percent.
                        formContext.setInputProviderValue({ id: inputCurrencyOptionsWithKnobs.id, value: '$999.00' });
                        formContext.setInputProviderValue({ id: inputSliderOptionsWithKnobs.id, value: '0.63' });
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
                    labelText: 'Input 1',
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
                    labelText: 'Input 2',
                    id: 'test2',
                    unit: '%'
                  }
                ]
              ];
              const inputs = [];
              // For InputSync. Provides the InputProvider ids to watch for updates on.
              const inputProviderIds = [
                inputSliderOptionsWithKnobs.id,
                inputCurrencyOptionsWithKnobs.id
              ];
              ids.forEach((numberProps) => {
                const props = numberProps[1];
                inputs.push(<InputNumber {...props} />);
                inputProviderIds.push(props.id);
              });
              // InputSync will normally update whenever the form ids set to props.inputProviderIds update.
              // InputSync can only watch form ids that actually exist,
              // so it must come after the input it is watching has been rendered.
              const inputSyncProps = {
                inputProviderIds
              };
              return(
                <React.Fragment>
                  <div className="align-left">
                    <InputCurrency {...inputCurrencyOptionsWithKnobs} />
                    {inputs}
                    <InputSlider {...inputSliderOptionsWithKnobs} />
                  </div>
                  <div className="full-right">
                    <InputSync {...inputSyncProps}>
                      {() => (
                        <React.Fragment>
                          <Paragraph text="Updates whenever the InputProvider ids pointed to in InputSync.props.inputProviderIds update." />
                          <Paragraph text="Current Values:" />
                          {
                            inputProviderIds.map((id, providerIndex) => (
                              <Paragraph key={`formStory-inputSync-providerId-${providerIndex}`} text={`${id}: ${formContext.getInputProviderValue(id)}`} />
                            ))
                          }
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
  }), { info: FormDocs });
