/**
 * SelectBox module.
 * @module @massds/mayflower-react/SelectBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/select-box
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import is from 'is';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Label from 'MayflowerReactForms/Label';
import InputGroup from 'MayflowerReactForms/InputGroup';

const SelectBox = React.forwardRef((props, ref) => {
  const selectRef = React.useRef(ref);
  const [value, setValue] = React.useState(props.selected);
  const handleOnChange = (event) => {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selected = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    setValue(selectedValue);
    // invokes custom function if passed in the component
    if (is.function(props.onChangeCallback)) {
      props.onChangeCallback({ selectedIndex, selected, selectedValue });
    }
  };
  const sectionClass = classNames('ma__select-box js-dropdown', {
    'ma__select-box--optional': !props.required
  });

  const selectClassNames = classNames('ma__select-box__select js-dropdown-select', {
    'js-required': props.required
  });
  const {
    labelText, id, options, inline, showError, errorMsg, required, hiddenLabel
  } = props;
  const labelClassNames = classNames({
    'ma__select-box__label': inline,
    'ma__label--inline ma__label--small': !inline
  });
  const selectBoxInline = classNames('ma__select-box__field', {
    'ma__select-box__field--inline': inline
  });
  const getTextByValue = (array = [], v) => {
    const matchedItem = array.find((item) => item.value === v);
    const matchedValue = matchedItem && matchedItem.text;
    return matchedValue;
  };
  const textFromValue = getTextByValue(options, value);
  return(
    <InputGroup
      id={id}
      labelText={labelText}
      inline={inline}
      required={required}
      className={sectionClass}
      hiddenLabel={hiddenLabel}
      showError={showError}
      errorMsg={errorMsg}
    >
      <div className={selectBoxInline}>
        <select
          ref={selectRef}
          name={id}
          id={id}
          className={selectClassNames}
          onChange={handleOnChange}
          defaultValue={props.selected || options[0].value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <div className="ma__select-box__link">
          <span className="js-dropdown-link">
            {textFromValue || options[0].text}
          </span>
          <span className="ma__select-box__icon" />
        </div>
      </div>
    </InputGroup>
  );
});

SelectBox.propTypes = {
  /** The label text above the select box */
  label: PropTypes.string.isRequired,
  /** Whether to stack label or inline label */
  stackLabel: PropTypes.bool,
  /** Whether the form field is required or not */
  required: PropTypes.bool,
  /** The id of the selectbox element */
  id: PropTypes.string.isRequired,
  /** An array of options for the selectbox */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })).isRequired,
  /** Change handler callback provided by the parent */
  onChangeCallback: PropTypes.func,
  /** Wrapper class for section tag */
  className: PropTypes.string,
  /** The default value for the select box */
  selected: PropTypes.string
};

SelectBox.defaultProps = {
  required: false
};

export default SelectBox;
