/**
 * MultiSelectDropDown module.
 * @module @massds/mayflower-react/MultiSelectDropDown
 * @requires module:@massds/mayflower-assets/scss/02-molecules/multiselect-dropdown
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-checkbox
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tags
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-tag
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputCheckBox from 'MayflowerReactForms/InputCheckBox';
import Tags from 'MayflowerReactMolecules/Tags';
import InputGroup from 'MayflowerReactForms/InputGroup';

export const getObjByValue = (arr, value, key) => {
  let i = 0;
  const arrayMax = arr.length;
  for (; i < arrayMax; i += 1) {
    const item = arr[i];
    if (item[key] === value) {
      return item;
    }
  }
  return undefined;
};

const MultiSelectDropDown = (props) => {
  const {
    dropdownItems,
    fieldName,
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    placeholder
  } = inputProps;
  const {
    inline = false,
    showError = false,
  } = groupProps;
  const divRef = React.useRef();
  const [items, setItems] = React.useState(new Map());
  const [expand, setExpand] = React.useState(false);

  const handleSelect = (event) => {
    const val = event.target.value;
    const { label: key } = dropdownItems.find((item) => item.value === val);
    setItems((prevItems) => {
      let newValues = new Map(prevItems.entries());
      if (newValues.has(key)) {
        newValues.delete(key);
      } else {
        newValues = newValues.set(key, val);
      }
      return newValues;
    });
  };

  const handleKeyDown = (event) => {
    // If the user pressed escape collapse list.
    if (event.key === 'Escape') {
      closeDropDown();
    }

    let index = -1;
    const { tagName } = event.target;
    if (tagName === 'INPUT') {
      const targetId = event.target.id;
      index = Number(targetId.split('-').pop());
    }
    const nextIndex = index + 1;
    const prevIndex = index - 1;

    if (event.key === 'ArrowUp') {
      if (prevIndex === -1) {
        focusOnComboBox();
      }
      if (prevIndex >= 0) {
        const prevItem = document.getElementById(`input-checkbox-${fieldName}-${prevIndex}`);
        if (prevItem) {
          prevItem.focus();
        }
      }
    }

    if (event.key === 'ArrowDown' && nextIndex < dropdownItems.length) {
      const nextItem = document.getElementById(`input-checkbox-${fieldName}-${nextIndex}`);
      if (nextItem) {
        nextItem.focus();
      }
    }
  };

  const focusOnComboBox = () => {
    const comboBox = document.getElementById(`${fieldName}-multiselect-combobox`);
    comboBox.focus();
  };

  const handleComboBoxKeyDown = (event) => {
    event.stopPropagation();
    if (event.target.getAttribute('role') && event.key === 'Enter') {
      toggleDropDown();
    }
  };
  const handleDropDownKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSelect(event);
    }
  };

  const toggleDropDown = () => {
    setExpand((prevExpand) => (!prevExpand));
  };

  const closeDropDown = () => {
    setExpand(false);
  };

  const handleTagClick = (target, e) => {
    e.stopPropagation();
    const val = target.getAttribute('data-ma-filter-value');
    setItems((prevItems) => {
      const newValues = new Map(prevItems.entries());
      const { label: key } = dropdownItems.find((item) => item.value === val);
      newValues.delete(key);
      return newValues;
    });
    focusOnComboBox();
  };

  const handleClearAll = () => {
    setItems(new Map());
  };


  const handleClickOutside = (event) => {
    // Close the panel if the user clicks outside the component.
    if ((divRef.current && !divRef.current.contains(event.target))) {
      setExpand((prevExpand) => {
        if (prevExpand) {
          return false;
        }
        return prevExpand;
      });
    }
  };

  const onBlur = () => {
    // Timeout is used so that document.activeElement
    // has enough time to update itself.
    setTimeout(() => {
      if (document.activeElement !== null && !divRef.current.contains(document.activeElement)) {
        closeDropDown();
      }
    }, 1);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (divRef.current) {
      divRef.current.addEventListener('focusout', onBlur);
      divRef.current.addEventListener('keyup', handleKeyDown);
    }
    return() => {
      divRef.current.removeEventListener('focusout', onBlur);
      document.removeEventListener('mousedown', handleClickOutside);
      divRef.current.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  const tagsProps = {
    tags: Array.from(items.entries()).map(([text, value]) => ({
      value,
      text,
      type: fieldName
    })),
    onClearThisCallback: handleTagClick,
    onClearCallback: handleClearAll
  };
  const inputGroupProps = {
    ...props,
    groupProps: {
      ...groupProps,
      fieldsetClassName: 'group',
      fieldset: true,
      outline: inline
    }
  };

  const selectboxClasses = classNames('ma__select-box__link', {
    'ma__input--error': showError
  });

  return(
    <div
      className="ma__multiselect-dropdown"
      ref={divRef}
    >
      <InputGroup {...inputGroupProps}>
        {
          /* eslint-disable jsx-a11y/click-events-have-key-events */
        }
        <div
          role="combobox"
          tabIndex={0}
          aria-expanded={expand}
          aria-controls={`${fieldName}-multiselect`}
          id={`${fieldName}-multiselect-combobox`}
          aria-haspopup
          className="ma__select-box__field"
          onClick={toggleDropDown}
          onKeyDown={handleComboBoxKeyDown}
        >
          <div className={selectboxClasses}>
            <span className="js-dropdown-link">
              { items.size > 0 ? <Tags {...tagsProps} /> : placeholder}
            </span>
            <span className="ma__select-box__icon" />
          </div>
        </div>
        {
          expand && (
            <div
              id={`${fieldName}-multiselect`}
              className="ma__multiselect-dropdown-menu ma__multiselect-dropdown-menu--expanded"
            >
              {
                dropdownItems.map((item, i) => {
                  const checkProps = {
                    key: `input-checkbox-${fieldName}-${i}`,
                    inputProps: {
                      id: `input-checkbox-${fieldName}-${i}`,
                      /* eslint-disable-next-line react/no-array-index-key */
                      name: fieldName,
                      onChange: handleSelect,
                      onKeyDown: handleDropDownKeyDown,
                      value: item.value,
                      checked: items.has(item.label),
                      tabIndex: -1
                    },
                    groupProps: {
                      wrapperClassName: 'ma__multiselect-dropdown-item',
                    },
                    label: item.label
                  };
                  return(
                    <InputCheckBox
                      {...checkProps}
                    />
                  );
                })
              }
            </div>
          )
        }
      </InputGroup>
    </div>
  );
};

MultiSelectDropDown.propTypes = {
  /** The legend title of the multiple select dropdown, can be a string, an element or a React component. */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /** Legend classes. */
  titleClasses: PropTypes.arrayOf(PropTypes.string),
  /** Default display in dropdown field. */
  placeholder: PropTypes.string,
  /** Custom callback on dropdown item selection. */
  onItemSelect: PropTypes.func,
  /** Custom callback on dropdown click. */
  onDropDownClick: PropTypes.func,
  /** An array of dropdown multiselect items */
  dropdownItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  })),
  /** Field name attribute that is used for grouping DOM submission and identify tags type */
  fieldName: PropTypes.string
};

export default MultiSelectDropDown;
