import React from 'react';
import PropTypes from 'prop-types';
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
          outline: this.props.outline
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
    const errorClasses = ['ma__error-msg'];
    if (this.props.errorDisplay) {
      errorClasses.push('has-error');
    }
    return(
      <fieldset>
        <div className="ma__input-group">
          <legend className="ma__input-group__title">
            {this.props.title}
          </legend>
          <div className="ma__input-group__items ma__input-group__items--inline">
            {this.props.errorMsg &&
            <div className={errorClasses.join(' ')}>{this.props.errorMsg}</div>}
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
  /** Only AccordionItem can be passed as a Child to the AccordionWrapper */
  children: PropTypes.node.isRequired,
  /** The default select radio button option on initial render */
  defaultSelected: PropTypes.string,
  /** Display the Error Mesage or not. */
  errorDisplay: PropTypes.bool,
  /** Error Message content. */
  errorMsg: PropTypes.string,
};

InputRadioGroup.defaultProps = {
  outline: false,
  required: false
};

export default InputRadioGroup;
