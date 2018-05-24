import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import InputTextTypeAhead from '../../atoms/forms/InputTextTypeAhead';
import SvgChevron from '../../atoms/icons/SvgChevron';

class TypeAheadDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: this.props.dropdownButton.text,
      buttonExpand: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedValue = nextProps.inputText.selected;
    if (selectedValue !== undefined) {
      this.setState({ buttonText: selectedValue });
    }
  }

  handleClick(event) {
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

  render() {
    const typeAheadDropdown = this.props;
    const dropdownProps = {
      canExpand: true,
      onClick: this.handleClick,
      expanded: this.state.buttonExpand,
      icon: <SvgChevron />,
      size: 'small',
      iconColor: '',
      ...typeAheadDropdown.dropdownButton
    };
    const inputTextTypeAheadProps = {
      onChange: this.handleSelect,
      autoFocusInput: true,
      ...typeAheadDropdown.inputText
    };
    return(
      <React.Fragment>
        <ButtonWithIcon {...dropdownProps} text={this.state.buttonText === '' ? 'All Organizations' : this.state.buttonText} />
        { this.state.buttonExpand && (
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
