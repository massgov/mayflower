/**
 * ButtonToggle module.
 * @module @massds/mayflower-react/ButtonToggle
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-toggle
 */
import React from 'react';
import PropTypes from 'prop-types';

class ButtonToggle extends React.Component {
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
    const {
      id, labelText, option1, option2
    } = this.props;
    const { selected } = this.state;
    return(
      <span>
        <label htmlFor={id} className="ma__label--inline ma__label--small">{ labelText }</label>
        <button onClick={(e) => this.onToggleClick(e)} value={option1.value} type="button" className={`ma__button-toggle ${(option1.value === selected) && 'ma__button-toggle--selected'}`}>{ option1.text }</button>
        {' '}
        |
        <button onClick={(e) => this.onToggleClick(e)} value={option2.value} type="button" className={`ma__button-toggle ${(option2.value === selected) && 'ma__button-toggle--selected'}`}>{ option2.text }</button>
      </span>
    );
  }
}

ButtonToggle.propTypes = {
  /** Option 1 for the buttonToggle */
  option1: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  /** Option 2 for the buttonToggle */
  option2: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
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
