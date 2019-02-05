import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import Form, { FormProvider } from './index';
import InputNumber from '../InputNumber';
import InputNumberOptions from '../InputNumber/InputNumber.knobs.options';
import InputSliderOptions from '../InputSlider/InputSlider.knobs.options';
import InputSlider from '../InputSlider';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('Form', withInfo(`<div></div>`)(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
      { [k]: v() })));
    const inputSliderOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
      { [k]: v() })));
    const ticks = [];
    const domain = [0, 100];
    Object.keys(inputSliderOptionsWithKnobs.ticks).forEach((tick) => ticks.push([tick, inputSliderOptionsWithKnobs.ticks[tick]]));
    inputSliderOptionsWithKnobs.ticks = ticks;
    inputSliderOptionsWithKnobs.domain = domain;
    // Set the slider step to the same as the input step, so changing the slider matches changes to number.
    // Make sure the domain is within the same range as the min and max of the input to make this work.
    inputSliderOptionsWithKnobs.step = inputTextOptionsWithKnobs.step;

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
                      formContext.setValue({ id: 'test1', value: formContext.getValue('test0')});
                    }
                    if (id === 'test1') {
                      formContext.setValue({ id: 'test0', value: formContext.getValue('test1')});
                    }
                  }
              };
              const ids = [
                'test0',
                'test1',
                'test2',
                'test3'
              ];
              inputSliderOptionsWithKnobs.onChange = (newVal, id) => {
                if (formContext.hasId(id)) {
                  formContext.setValue({ id: 'test3', value: formContext.getValue(id) });
                }
              };
              return(
                <React.Fragment>
                  {ids.map((id, index) => <InputNumber key={`Form.InputNumber.${index}`} {...inputTextOptionsWithKnobs} id={id} defaultValue={index} />)}
                  <InputSlider {...inputSliderOptionsWithKnobs} />
                </React.Fragment>
              );
            }
          }
        </Form>
      </FormProvider>
    );
  }));
