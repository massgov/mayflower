import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputRadio from '../../atoms/forms/InputRadio';
import Input from '../../atoms/forms/Input';
import { InputContext } from '../../atoms/forms/Input/context';
import Error from '../../atoms/forms/Input/error';
import './style.css';

class RadioGroup extends React.Component {
  handleChange = (event, inputContext) => {
    const selected = event.target.value;
    if (selected !== inputContext.getValue()) {
      inputContext.setValue(selected, () => {
        if (typeof this.props.onChange === 'function') {
          const { name } = this.props;
          this.props.onChange({ selected, name });
        }
      });
    }
  };

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

    return(
      <React.Fragment>
        <fieldset>
          <div className="ma__input-group">
            <legend className={titleClasses}>
              {this.props.title}
            </legend>
            <div className={itemsClasses}>
              <InputContext.Consumer>
                {(inputContext) => (
                  this.props.radioButtons.map((radioButton, index) => {
                    const contextValue = inputContext.getValue();
                    // Context value is empty on first render, so use default, if any.
                    // Next renders will use the value from context.
                    const inputValue = contextValue || this.props.defaultSelected;
                    const isChecked = radioButton.value === inputValue;
                    const buttonId = radioButton.id || radioButton.value;
                    return(
                      <div className={`ma__input-group__item item-${this.props.radioButtons.length}`} key={`InputRadioGroupDiv-${buttonId}-${index}`}>
                        <InputRadio
                          {...radioButton}
                          name={this.props.name}
                          onChange={(e) => this.handleChange(e, inputContext)}
                          checked={isChecked}
                          required={this.props.required}
                          outline={this.props.outline}
                          error={this.props.error}
                          disabled={this.props.disabled}
                          // eslint-disable-next-line react/no-array-index-key
                          key={`InputRadioGroup-${buttonId}-${index}`}
                        />
                      </div>
                    );
                  })
                )}
              </InputContext.Consumer>
            </div>
          </div>
        </fieldset>
      </React.Fragment>
    );
  }
}

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  /** The legend title of the radio button group. */
  title: PropTypes.string.isRequired,
  /** The name of the radio button group */
  name: PropTypes.string.isRequired,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** The default select radio button option on initial render */
  defaultSelected: PropTypes.string,
  /** Whether the radio group is in error state or not. */
  error: PropTypes.bool,
  /** Display Inputs inline */
  inline: PropTypes.bool,
  /** Whether the radio button group is in a disabled state or not */
  disabled: PropTypes.bool,
  /** On change callback function */
  onChange: PropTypes.func,
  /** An array of radio buttons. */
  radioButtons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

RadioGroup.defaultProps = {
  outline: false,
  required: false,
  inline: true,
  error: false,
  disabled: false
};

const InputRadioGroup = (props) => {
  const {
    outline,
    defaultSelected,
    inline,
    onChange,
    radioButtons,
    id,
    ...inputProps
  } = props;
  const trueId = id || props.name;
  const radioGroupProps = {
    id: trueId,
    required: props.required,
    error: props.error,
    disabled: props.disabled,
    title: props.title,
    name: props.name,
    outline,
    defaultSelected,
    inline,
    onChange,
    radioButtons
  };
  inputProps.id = trueId;
  inputProps.defaultValue = defaultSelected;
  return(
    <Input {...inputProps}>
      <RadioGroup {...radioGroupProps} />
      <Error id={trueId} />
    </Input>
  );
};

InputRadioGroup.propTypes = {
  /** The id for the entire radio group. Defaults to name if not passed. */
  id: PropTypes.string,
  /** The legend title of the radio button group. */
  title: PropTypes.string.isRequired,
  /** The name of the radio button group */
  name: PropTypes.string.isRequired,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** The default select radio button option on initial render */
  defaultSelected: PropTypes.string,
  /** Whether the radio group is in error state or not. */
  error: PropTypes.bool,
  /** Display Inputs inline */
  inline: PropTypes.bool,
  /** Whether the radio button group is in a disabled state or not */
  disabled: PropTypes.bool,
  /** On change callback function */
  onChange: PropTypes.func,
  /** An array of radio buttons. */
  radioButtons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

export default InputRadioGroup;
