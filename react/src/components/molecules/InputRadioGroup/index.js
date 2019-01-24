import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputRadio from '../../atoms/forms/InputRadio';
import ErrorMessage from '../../atoms/forms/ErrorMessage';
import './style.css';

class InputRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected
    };
  }

  handleChange(selected, value, event) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
      if (typeof this.props.onChange === 'function') {
        const name = this.props.name;
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

    return(
      <React.Fragment>
        <fieldset>
          <div className="ma__input-group">
            <legend className={titleClasses}>
              {this.props.title}
            </legend>
            <div className={itemsClasses}>
              {this.props.radioButtons.map((radioButton, index) => {
              const isChecked = radioButton.value === this.state.selected;
              return(
                <div className={`ma__input-group__item item-${this.props.radioButtons.length}`}>
                  <InputRadio
                    {...radioButton}
                    name={this.props.name}
                    onChange={this.handleChange}
                    checked={isChecked}
                    required={this.props.required}
                    outline={this.props.outline}
                    error={this.props.error}
                    disabled={this.props.disabled}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${radioButton.id}-${index}`}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </fieldset>
        {this.props.errorMsg && this.props.error &&
        <ErrorMessage status={true} error={this.props.errorMsg} inputID={this.props.name} />}
      </React.Fragment>
    );
  }
}

InputRadioGroup.propTypes = {
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
  /** Error Message content. */
  errorMsg: PropTypes.string,
  /** Display Inputs inline */
  inline: PropTypes.bool,
  /** Whether the radio button group is in a disabled state or not */
  disabled: PropTypes.bool,
  /** On change callback function */
  onChange: PropTypes.func,
  /** An array of radio buttons. */
  radioButtons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
};

InputRadioGroup.defaultProps = {
  outline: false,
  required: false,
  inline: true,
  error: false,
  disabled: false
};

export default InputRadioGroup;
