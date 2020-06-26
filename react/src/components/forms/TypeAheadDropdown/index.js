/**
 * TypeAheadDropdown module.
 * @module @massds/mayflower-react/TypeAheadDropdown
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import InputTextFuzzy from 'MayflowerReactForms/InputTextFuzzy';
import Icon from 'MayflowerReactBase/Icon';

class TypeAheadDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: this.props.dropdownButton.text,
      buttonExpand: false
    };

    this.wrapperRef = React.createRef();
    this.setDropDownButtonRef = this.setDropDownButtonRef.bind(this);
    this.handleRefMouseDown = this.handleRefMouseDown.bind(this);

    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.buttonClicked = false;

    document.addEventListener('mousedown', this.handleClickOutside);
    this.dropDownButtonRef.addEventListener('mousedown', this.handleRefMouseDown);
  }

  componentWillReceiveProps(nextProps) {
    const selectedValue = nextProps.inputText.selected;
    if (selectedValue !== undefined) {
      this.setState({
        buttonText: selectedValue,
        buttonExpand: false
      });
    }
  }

  componentDidUpdate() {
    this.buttonClicked = false;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.dropDownButtonRef.removeEventListener('mousedown', this.handleRefMouseDown);
  }

  setDropDownButtonRef(node) {
    this.dropDownButtonRef = node;
  }

  closeDropdown() {
    this.setState({ buttonExpand: false });
  }

  handleRefMouseDown() {
    this.buttonClicked = true;
  }

  handleClick() {
    this.setState((prevState) => ({ buttonExpand: !prevState.buttonExpand }));
  }

  handleKeyDown(event) {
    // If the user pressed escape, or pressed enter with nothing selected close
    // the panel.
    if ((event.key === 'Escape')
        || (event.key === 'Enter' && event.target.value === '')) {
      this.closeDropdown();
    }
    if (event.key === 'Escape' && this.dropDownButtonRef) {
      this.dropDownButtonRef.focus();
    }
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  }

  handleInputBlur() {
    if (!this.buttonClicked) {
      this.closeDropdown();
    }
  }

  handleSelect(event, { suggestion }) {
    // Stop the filters form submission if enter is pressed in the selector.
    event.preventDefault();
    // Update this component state and pass the event out to the calling code.
    const { text } = suggestion.item;
    if (text.length > 0) {
      this.setState({
        buttonText: text,
        buttonExpand: false
      });
      if (typeof this.props.inputText.onChange === 'function') {
        this.props.inputText.onSuggestionClick(event, { suggestion });
      }
    }
  }

  handleClickOutside(event) {
    // Close the panel if the user clicks outside the component.
    const node = this.wrapperRef.current;
    if ((node && !node.contains(event.target))) {
      if (this.state.buttonExpand) {
        this.setState({ buttonExpand: false });
      }
    }
  }

  render() {
    const dropdownButton = {
      onClick: this.handleClick,
      setButtonRef: this.setDropDownButtonRef,
      expanded: this.state.buttonExpand,
      icon: <Icon name="chevron" svgHeight={20} svgWidth={20} />,
      size: '',
      ...this.props.dropdownButton
    };
    dropdownButton.text = this.state.buttonText || dropdownButton.text;

    const inputTextFuzzyProps = {
      ...this.props.inputText,
      onKeyDown: this.handleKeyDown,
      onSuggestionClick: this.handleSelect,
      onBlur: this.handleInputBlur,
      autoFocusInput: true
    };

    return(
      <div ref={this.wrapperRef}>
        <ButtonWithIcon {...dropdownButton} />
        {this.state.buttonExpand && (
          <InputTextFuzzy {...inputTextFuzzyProps} />
        )}
      </div>
    );
  }
}

TypeAheadDropdown.propTypes = {
  /** The props to set up the dropdown button */
  dropdownButton: PropTypes.shape(ButtonWithIcon.propTypes).isRequired,
  /** The props to set up the inputTextFuzzy */
  inputText: PropTypes.shape(InputTextFuzzy.propTypes).isRequired,
  /** Custom keydown callback */
  onKeyDown: PropTypes.func
};

export default TypeAheadDropdown;
