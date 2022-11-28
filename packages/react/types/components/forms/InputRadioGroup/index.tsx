// @ts-nocheck
/**
 * InputRadioGroup module.
 * @module @massds/mayflower-react/InputRadioGroup
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-group
 * @requires module:@massds/mayflower-assets/scss/input-radio-group
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-radio
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
import InputRadio from 'MayflowerReactForms/InputRadio';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';

export interface InputRadioGroupProps {
  /** The legend title of the radio button group. */
  title: string
  /** The name of the radio button group */
  name: string
  /** Whether radio input is required or not */
  required?: boolean
  /** Whether you want the radio input outlined */
  outline?: boolean
  /** The default select radio button option on initial render */
  defaultSelected?: string
  /** Whether the radio group is in error state or not. */
  error?: boolean
  /** Error Message content. */
  errorMsg?: string
  /** Display Inputs inline */
  inline?: boolean
  /** Whether the radio button group is in a disabled state or not */
  disabled?: boolean
  /** On change callback function */
  onChange?(...args: unknown[]): unknown
  /** An array of radio buttons. */
  radioButtons?: {
    id?: string
    value: string
    label: string
    /** Allow adding one class to radio button, e.g. "col-medium-1", "col-large-1" */
    class?: string
  }[]
}

class InputRadioGroup extends React.Component<InputRadioGroupProps> {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected
    };
  }

  handleChange = (event) => {
    const selected = event.target.value;
    if (selected !== this.state.selected) {
      this.setState({ selected });
      if (typeof this.props.onChange === 'function') {
        const { name } = this.props;
        this.props.onChange({ selected, name, event });
      }
    }
  }

  render() {
    const itemsClasses = classNames({
      'ma__input-group__items': true,
      'ma__input-group__items--inline': this.props.inline,
      'ma__input-group__items--outline': this.props.outline
    });
    const titleClasses = classNames({
      'ma__input-group__title': true,
      'ma__input-group__title--error': this.props.error,
      'ma__input-group__title--disabled': this.props.disabled
    });

    return (<>
      <fieldset>
        <div className="ma__input-group">
          <legend className={titleClasses}>
            {this.props.title}
          </legend>
          <div className={itemsClasses}>
            {this.props.radioButtons.map((radioButton, index) => {
              const isChecked = radioButton.value === this.state.selected;
              const buttonId = radioButton.id || radioButton.value;
              return (
                /* eslint-disable-next-line react/no-array-index-key */
                (<div className={`ma__input-group__item item-${this.props.radioButtons.length} ${radioButton.class}`} key={`InputRadioGroupDiv-${buttonId}-${index}`}>
                  <InputRadio
                    {...radioButton}
                    name={this.props.name}
                    onChange={this.handleChange}
                    checked={isChecked}
                    required={this.props.required}
                    outline={this.props.outline}
                    error={this.props.error}
                    disabled={this.props.disabled}
                  /* eslint-disable-next-line react/no-array-index-key */
                    key={`InputRadioGroup-${buttonId}-${index}`}
                  />
                </div>)
              );
            })}
          </div>
        </div>
      </fieldset>
      {this.props.errorMsg && this.props.error
      && <ErrorMessage status error={this.props.errorMsg} inputID={this.props.name} />}
    </>);
  }
}

InputRadioGroup.defaultProps = {
  outline: false,
  required: false,
  inline: true,
  error: false,
  disabled: false
};

export default InputRadioGroup;
