import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputSlider from './index';
import InputSliderOptions from './InputSlider.knobs.options';
import inputSliderText from './InputSlider.md';
import { FormContext } from '../Input/context';

class ShowSliderValue extends React.Component {
  render() {
    return(
      <FormProvider>
        {this.props.children}
      </FormProvider>
    );
  }
}
class FormProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      value: {},
      setValue: this.setValue
    };
  }
  setValue = (formValue) => {
    const { value: newValue } = this.state;
    newValue[formValue.id] = formValue.value;
    this.setState({ value: newValue });
  };
  render() {
    return(
      <FormContext.Provider value={this.state}>
        {this.props.children}
        <div>Current Value: {this.state.value['text-input']}</div>
      </FormContext.Provider>
    );
  }
}

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputSlider', withInfo(`<div>${inputSliderText}</div>`)(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
      { [k]: v() })));
    inputTextOptionsWithKnobs.errorMsg = 'testing';
    return(
      <InputSlider {...inputTextOptionsWithKnobs} />
    );
  }));
