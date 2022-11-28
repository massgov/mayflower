// @ts-nocheck
/**
 * ButtonToggle module.
 * @module @massds/mayflower-react/ButtonToggle
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-toggle
 */
import React from 'react';

export interface ButtonToggleProps {
  /** Option 1 for the buttonToggle */
  option1?: {
    value: string
    text: string
  }
  /** Option 2 for the buttonToggle */
  option2?: {
    value: string
    text: string
  }
  /** An id that specifies which element the label is bound to */
  id: string
  /** A label text displayed for the buttonToggle */
  labelText: string
  /** Custom onChange function that receives the selected value */
  onChangeCallback?(...args: unknown[]): unknown
  /** Default value selected */
  defaultValue: string
}

class ButtonToggle extends React.Component<ButtonToggleProps> {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultValue
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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

export default ButtonToggle;
