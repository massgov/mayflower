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

class MultiSelectDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      dropwDownExpand: false
    };
  }

  componentDidMount() {
    this.buttonClicked = false;
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e));
    this.wrapperRef.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', () => this.handleClickOutside());
    this.wrapperRef.removeEventListener('keydown', () => this.handleKeyDown());
    this.wrapperRef.removeEventListener('onblur', (e) => this.handleKeyDown(e));
  }


  onBlur = () => {
    // Time out to wait for React processing delay on activeElement
    this._timeoutID = setTimeout(() => {
      if (document.activeElement !== null) {
        if (!this.wrapperRef.contains(document.activeElement)) {
          this.setState({
            dropwDownExpand: false
          });
        }
      }
    }, 0);
  }

  _timeoutID;

  handleTagClick = (target, e) => {
    e.stopPropagation();
    const val = target.getAttribute('data-ma-filter-value');
    const { values } = this.state;
    values.splice(values.indexOf(val), 1);
    this.setState({
      values,
      dropwDownExpand: true
    });
  }

  handleClearAll = () => {
    this.setState({
      values: []
    });
    this.focusOnComboBox();
  }


  handleClickOutside = (event) => {
    // Close the panel if the user clicks outside the component.
    const node = this.wrapperRef;
    if ((node && !node.contains(event.target))) {
      if (this.state.dropwDownExpand) {
        this.closeDropDown();
      }
    }
  }

  handleDropDownKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSelect(event);
    }
  }

  handleSelect = (event) => {
    const { value } = event.target;
    const { values } = this.state;
    if (values.indexOf(value) > -1) {
      values.splice(values.indexOf(value), 1);
    } else {
      values.push(value);
    }
    this.setState({
      values
    });
  }

  handleKeyDown = (event) => {
    // Detect onBlur using tab key
    if (event.key === 'Tab') {
      this.onBlur();
    }
    // If the user pressed escape collapse list.
    if (event.key === 'Escape') {
      this.closeDropDown();
      this.focusOnComboBox();
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
        this.focusOnComboBox();
      }
      if (prevIndex >= 0) {
        const prevItem = document.getElementById(`input-checkbox-${prevIndex}`);
        if (prevItem) {
          prevItem.focus();
        }
      }
    }

    if (event.key === 'ArrowDown' && nextIndex < this.props.dropdownItems.length) {
      const nextItem = document.getElementById(`input-checkbox-${nextIndex}`);
      if (nextItem) {
        nextItem.focus();
      }
    }
  }

  focusOnComboBox = () => {
    const comboBox = document.getElementById(`${this.props.fieldName}-multiselect-combobox`);
    comboBox.focus();
  }

  handleClick = () => {
    this.toggleDropDown();
  }

  handleComboBoxKeyDown = (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      this.toggleDropDown();
    }
  }

  toggleDropDown = () => {
    this.setState((prevState) => ({ dropwDownExpand: !prevState.dropwDownExpand }));
  }
  closeDropDown = () => {
    this.setState({ dropwDownExpand: false });
  }

  render() {
    const {
      dropdownItems, fieldName, title, titleClasses, defaultText
    } = this.props;
    const { values, dropwDownExpand } = this.state;
    const tags = values.map((val) => getObjByValue(dropdownItems, val, 'value'));
    const tagsProps = {
      tags: tags.map((tag) => ({
        value: tag.value,
        text: tag.label,
        type: fieldName
      })),
      onClearThisCallback: this.handleTagClick,
      onClearCallback: this.handleClearAll
    };

    const titleCls = classNames({
      [titleClasses.join(' ')]: true
    });

    return(
      <div
        className="ma__multiselect-dropdown"
        ref={(node) => {
          this.wrapperRef = node;
        }}
      >
        <fieldset className="group">
          <legend className={titleClasses.length > 0 ? titleCls : null}>
            {title}
          </legend>
          {
            /* eslint-disable jsx-a11y/click-events-have-key-events */
          }
          <div
            role="combobox"
            tabIndex={0}
            aria-expanded={dropwDownExpand}
            aria-controls={`${fieldName}-multiselect`}
            id={`${fieldName}-multiselect-combobox`}
            aria-haspopup
            className="ma__select-box__field"
            onClick={this.handleClick}
            onKeyDown={this.handleComboBoxKeyDown}
          >
            <div className="ma__select-box__link">
              <span className="js-dropdown-link">
                { values.length > 0 ? <Tags {...tagsProps} /> : defaultText}
              </span>
              <span className="ma__select-box__icon" />
            </div>
          </div>
          {
            dropwDownExpand && (
              <div
                id={`${fieldName}-multiselect`}
                className="ma__multiselect-dropdown-menu ma__multiselect-dropdown-menu--expanded"
              >
                {
                  dropdownItems.map((item, i) => (
                    <InputCheckBox
                      id={`input-checkbox-${i}`}
                      /* eslint-disable-next-line react/no-array-index-key */
                      key={`input-checkbox-${i}`}
                      name={fieldName}
                      value={item.value}
                      label={item.label}
                      onChange={this.handleSelect}
                      onKeyDown={this.handleDropDownKeyDown}
                      classes={['ma__multiselect-dropdown-item']}
                      defaultValue={values.indexOf(item.value) > -1 ? item.value : false}
                      tabIndex={-1}
                    />
                  ))}
              </div>
            )
          }
        </fieldset>
      </div>
    );
  }
}

MultiSelectDropDown.propTypes = {
  /** The legend title of the multiple select dropdown, can be a string, an element or a React component. */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /** Legend classes. */
  titleClasses: PropTypes.arrayOf(PropTypes.string),
  /** Default display in dropdown field. */
  defaultText: PropTypes.string,
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

MultiSelectDropDown.defaultProps = {
  titleClasses: []
};

export default MultiSelectDropDown;
