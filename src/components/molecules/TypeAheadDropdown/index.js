import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import InputTextTypeAhead from '../../atoms/forms/InputTextTypeAhead';
import SvgChevron from '../../atoms/icons/SvgChevron';

class TypeAheadDropdown extends React.Component {
  constructor(props) {
    super(props);
    // buttonExpand is only being used for re-rendering now.
    // Come up with a better way?
    this.state = {
      buttonText: this.props.dropdownButton.text,
      buttonExpand: false
    };
    this.buttonClicked = false;
    this.inputBlurred = false;
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedValue = nextProps.inputText.selected;
    if (selectedValue !== undefined) {
      this.setState({ buttonText: selectedValue });
    }
  }
  handleClick() {
    this.buttonClicked = true;
    // Re-render for clicks.
    this.setState((prevState) => ({
      buttonExpand: !prevState.buttonExpand
    }));
  }

  handleSelect(event, input) {
    // Stop the filters form submission if enter is pressed in the selector.
    event.preventDefault();
    this.setState({
      buttonText: input.suggestion.text,
      buttonExpand: false
    });
  }
  handleBlur() {
    this.inputBlurred = true;
    // Re-render if the button was not clicked and the input is blurring.
    if (!this.buttonClicked && this.inputBlurred) {
      this.setState((prevState) => ({
        buttonExpand: !prevState.buttonExpand
      }));
    }
  }
  handleMouseDown() {
    // MouseDown happens before blur.
    // If button starts to be clicked, set buttonClicked true.
    // This allows handleBlur logic to close the button.
    this.buttonClicked = true;
  }
  render() {
    const typeAheadDropdown = this.props;
    const dropdownProps = {
      canExpand: true,
      onClick: (e) => this.handleClick(e),
      onMouseDown: (e) => this.handleMouseDown(e),
      expanded: this.state.buttonExpand,
      icon: <SvgChevron />,
      size: 'small',
      iconColor: '',
      ...typeAheadDropdown.dropdownButton
    };
    const inputTextTypeAheadProps = {
      onChange: (e, input) => this.handleSelect(e, input),
      onBlur: (e) => this.handleBlur(e),
      autoFocusInput: true,
      ...typeAheadDropdown.inputText
    };
    let showInput = false;
    if (this.buttonClicked && this.inputBlurred) {
      this.buttonClicked = false;
    }
    if (this.buttonClicked) {
      if (!this.inputBlurred) {
        showInput = true;
      }
    }
    this.buttonClicked = false;
    this.inputBlurred = false;
    return(
      <React.Fragment>
        <ButtonWithIcon {...dropdownProps} text={this.state.buttonText === '' ? 'All Organizations' : this.state.buttonText} />
        { showInput && (
          <InputTextTypeAhead {...inputTextTypeAheadProps} />
        )}
      </React.Fragment>
    );
  }
}

TypeAheadDropdown.propTypes = {
  /** The props to set up the dropdown button */
  dropdownButton: PropTypes.shape(ButtonWithIcon.propTypes).isRequired,
  /** The props to set up the inputTextTypeAhead */
  inputText: PropTypes.shape(InputTextTypeAhead.propTypes).isRequired
};

export default TypeAheadDropdown;
