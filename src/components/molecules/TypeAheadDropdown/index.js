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

    this.closeDropDown = this.closeDropDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    // Store outer inputText onChange handler.
    if (typeof props.inputText.onChange === 'function') {
      this.inputTextOnChangeProp = props.inputText.onChange;
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillReceiveProps(nextProps) {
    const selectedValue = nextProps.inputText.selected;
    if (selectedValue !== undefined) {
      this.setState({ buttonText: selectedValue });
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  closeDropDown() {
    this.setState({ buttonExpand: false });
  }
  handleKeyDown(event) {
    // If the user pressed escape, or pressed enter with nothing selected close
    // the panel.
    if ((event.key === 'Escape') ||
        (event.key === 'Enter' && event.target.value === '')) {
      this.closeDropDown();
    }
  }
  handleClick() {
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
    if (this.inputTextOnChangeProp) {
      this.inputTextOnChangeProp(event, input);
    }
  }
  handleClickOutside(event) {
    // Close the panel if the user clicks outside, or on a div around the panel.
    if ((this.wrapperRef && !this.wrapperRef.contains(event.target)) || event.target.nodeName === 'DIV') {
      this.setState({ buttonExpand: false });
    }
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
      ...typeAheadDropdown.inputText,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleSelect,
      autoFocusInput: true
    };

    return(
      <div ref={(node) => { this.wrapperRef = node; }}>
        <ButtonWithIcon {...dropdownProps} text={this.state.buttonText === '' ? 'All Organizations' : this.state.buttonText} />
        { this.state.buttonExpand && (
          <InputTextTypeAhead {...inputTextTypeAheadProps} />
        )}
      </div>
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
