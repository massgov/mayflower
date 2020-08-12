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
import InputGroup from 'MayflowerReactForms/InputGroup';

const SelectBox = React.forwardRef((props, ref) => {
  const {
    options = [],
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    id,
    name,
    value = options[0].value,
    required = false,
    onChange = null
  } = inputProps;
  const {
    inline = false,
    showError = false
  } = groupProps;
  const selectRef = React.useRef(ref);
  const handleOnChange = (event) => {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selectedText = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    // invokes custom function if passed in the component
    if (is.function(onChange)) {
      onChange({ selectedIndex, selected: selectedText, selectedValue });
    }
  };
  const sectionClass = classNames({
    'ma__select-box': !inline,
    'ma__select-box--optional': !required
  });

  const selectClassNames = classNames(
    'ma__select-box__select',
    'js-dropdown-select',
    {
      'js-required': required
    }
  );
  const selectBoxLinkClassNames = classNames('ma__select-box__link', {
    'ma__select-box__select--error': showError
  });
  const selectBoxInline = classNames({
    'ma__select-box__field': !inline,
    'ma__select-box__field--inline': inline
  });
  const getTextByValue = (array = [], v) => {
    const matchedItem = array.find((item) => item.value === v);
    const matchedValue = matchedItem && matchedItem.text;
    return matchedValue;
  };
  const inputGroupProps = {
    ...props,
    inputProps: {
      ...inputProps,
      value,
      required,
      onChange
    },
    groupProps: {
      ...groupProps,
      wrapperClassName: sectionClass
    }
  };
  return(
    <InputGroup {...inputGroupProps}>
      <div className={selectBoxInline}>
        <div className={selectBoxLinkClassNames}>
          <select
            ref={selectRef}
            name={name || id}
            id={id}
            className={selectClassNames}
            onChange={handleOnChange}
            value={value}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <span className="js-dropdown-link">
            {getTextByValue(options, value)}
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

export default SelectBox;
