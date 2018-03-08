import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ButtonToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultValue
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.defaultValue });
  }
  onToggleClick(event) {
    const selected = event.target.value;
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback(selected);
    }
    this.setState({ selected });
  }
  render() {
    const { id, labelText, options } = this.props;
    const { selected } = this.state;
    return(
      <span>
        <label htmlFor={id} className="ma__label--inline ma__label--small">{ labelText }</label>
        <button onClick={(e) => this.onToggleClick(e)} value={options[0].value} type="button" className={`ma__button-toggle ${(options[0].value === selected) && 'ma__button-toggle--selected'}`}>{ options[0].text }</button> |
        <button onClick={(e) => this.onToggleClick(e)} value={options[1].value} type="button" className={`ma__button-toggle ${(options[1].value === selected) && 'ma__button-toggle--selected'}`}>{ options[1].text }</button>
      </span>
    );
  }
}

ButtonToggle.propTypes = {
  /** An array of two options for the buttonToggle */
  options: PropTypes.shape([
    {
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    },
    {
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }
  ]),
  /** An id that specifies which element the label is bound to */
  id: PropTypes.string.isRequired,
  /** A label text displayed for the buttonToggle */
  labelText: PropTypes.string.isRequired,
  /** Custom onChange function that receives the selected value */
  onChangeCallback: PropTypes.func,
  /** Default value selected */
  defaultValue: PropTypes.string.isRequired
};


export default ButtonToggle;
