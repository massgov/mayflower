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
// eslint-disable-next-line import/no-unresolved
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';

const TypeAheadDropdown = (props) => {
  const [buttonExpand, setButtonExpand] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(props.dropdownButton.text);
  const [buttonClicked, setButtonClicked] = React.useState();
  const buttonRef = React.useRef();
  const wrapperRef = React.useRef();

  const handleRefMouseDown = () => {
    setButtonClicked(true);
  };

  const handleClick = () => {
    setButtonExpand(!buttonExpand);
  };

  const handleKeyDown = (event) => {
    // If the user pressed escape, or pressed enter with nothing selected close
    // the panel.
    if ((event.key === 'Escape')
        || (event.key === 'Enter' && event.target.value === '')) {
      closeDropdown();
    }
    if (event.key === 'Escape' && buttonRef) {
      buttonRef.focus();
    }
    if (typeof props.onKeyDown === 'function') {
      props.onKeyDown(event);
    }
  };

  const handleInputBlur = () => {
    if (buttonClicked) {
      closeDropdown();
    }
  };

  const handleSelect = (event, { suggestion }) => {
    // Stop the filters form submission if enter is pressed in the selector.
    event.preventDefault();
    // Update this component state and pass the event out to the calling code.
    const { text } = suggestion.item;
    if (text.length > 0) {
      setButtonText(text);
      setButtonExpand(false);
      if (typeof props.inputText.onSuggestionClick === 'function') {
        props.inputText.onSuggestionClick(event, { suggestion });
      }
    }
  };

  const handleClickOutside = (event) => {
    // Close the panel if the user clicks outside the component.
    const node = wrapperRef.current;
    if ((node && !node.contains(event.target))) {
      if (buttonExpand) {
        setButtonExpand(false);
      }
    }
  };

  const closeDropdown = () => {
    setButtonExpand(false);
  };

  // update state from prop
  React.useEffect(() => {
    const { defaultValue } = props;
    if (defaultValue !== undefined) {
      setButtonText(defaultValue);
      setButtonExpand(false);
    }
  }, [props.defaultValue]);

  React.useEffect(() => {
    setButtonClicked(false);
    document.addEventListener('mousedown', handleClickOutside);
    buttonRef.current.addEventListener('mousedown', handleRefMouseDown);
    return() => {
      document.removeEventListener('mousedown', handleClickOutside);
      buttonRef.current.removeEventListener('mousedown', handleRefMouseDown);
    };
  });

  const dropdownButton = {
    onClick: handleClick,
    setButtonRef: buttonRef,
    expanded: buttonExpand,
    icon: <IconChevron height={20} width={20} />,
    size: '',
    ...props.dropdownButton
  };
  dropdownButton.text = buttonText || dropdownButton.text;

  const inputTextFuzzyProps = {
    ...props.inputText,
    onKeyDown: handleKeyDown,
    onSuggestionClick: handleSelect,
    onBlur: handleInputBlur,
    autoFocusInput: true
  };

  return(
    <div ref={wrapperRef}>
      <ButtonWithIcon {...dropdownButton} />
      {buttonExpand && (
        <InputTextFuzzy {...inputTextFuzzyProps} />
      )}
    </div>
  );
};

TypeAheadDropdown.propTypes = {
  /** The props to set up the dropdown button */
  dropdownButton: PropTypes.shape(ButtonWithIcon.propTypes).isRequired,
  /** The props to set up the inputTextFuzzy */
  inputText: PropTypes.shape(InputTextFuzzy.propTypes).isRequired,
  /** Default text value for the selection */
  defaultValue: PropTypes.string,
  /** Custom keydown callback */
  onKeyDown: PropTypes.func,
  /** Custom suggestion onClick callback */
  onSuggestionClick: PropTypes.func,

};

export default TypeAheadDropdown;
