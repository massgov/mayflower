import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

class InputRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultSelected
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRadioInputs = this.getRadioInputs.bind(this);
  }

  getRadioInputs() {
    const radioChildren = React.Children.map(this.props.children, (child) => {
      if (child.type.name === 'InputRadio') {
        const isChecked = child.props.value === this.state.selected;
        const clone = React.cloneElement(child, {
          name: this.props.name,
          onChange: this.handleChange,
          checked: isChecked,
          required: this.props.required,
          outline: this.props.outline,
          error: this.props.error,
          disabled: this.props.disabled
        });
        return(
          <div className={`ma__input-group__item item-${this.props.children.length}`}>
            {clone}
          </div>
        );
      }
      return(
        /* eslint-disable no-console */
        console.log(`Warning! You cannot pass a ${child.type.name} child to InputRadio`)
        /* eslint-disable no-console */
      );
    });
    return radioChildren;
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
      'ma__input-group__items--outline': this.props.outline,
    })
    const errorClasses = classNames({
      'ma__error-msg': true,
      'has-error': this.props.error
    })

    return(
      <fieldset>
        <div className="ma__input-group">
          <legend className="ma__input-group__title">
            {this.props.title}
          </legend>
          <div className={itemsClasses}>
            {this.props.errorMsg && this.props.error &&
            <div className={errorClasses}>{this.props.errorMsg}</div>}
            {this.getRadioInputs()}
          </div>
        </div>
      </fieldset>
    );
  }
}

InputRadioGroup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** Only InputRadio can be passed as a Child to the InputRadioGroup */
  children: PropTypes.node.isRequired,
  /** The default select radio button option on initial render */
  defaultSelected: PropTypes.string,
  /** Whether the radio group is in error state or not. */
  error: PropTypes.bool,
  /** Error Message content. */
  errorMsg: PropTypes.string,
  /** Display Inputs inline */
  inline: PropTypes.bool,
  /** Whether the radio button group is in a disabled state or not */
  disabled: PropTypes.bool
};

InputRadioGroup.defaultProps = {
  outline: false,
  required: false,
  inline: true,
  error: false,
  disabled: false
};

export default InputRadioGroup;
