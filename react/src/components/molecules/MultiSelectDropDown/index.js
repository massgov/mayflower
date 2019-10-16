import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import InputCheckBox from '../../atoms/forms/InputCheckBox';
import Tags from '../../molecules/Tags';
import './style.css';

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
      values: []
    };
  }

  handleSelect = (e, val, id) => {
    const { values } = this.state;
    if (val) {
      values.push(val);
    } else {
      values.splice(values.indexOf(val), 1);
    }
    this.setState({
      values
    });
    if (is.fn(this.props.onItemSelect)) {
      this.props.onItemSelect(e, val, id);
    }
  }
  render() {
    const { dropdownItems } = this.props;
    const { values } = this.state;
    const tags = values.map((val, i) => getObjByValue(dropdownItems, val, 'value'));
    const tagsProps = tags.map((tag, i) => ({
      value: tag.value,
      text: tag.label,
      type: 'format'
    }))

    return(
      <div className="ma__multiselect-dropdown ma__multiselect-dropdown-menu ma__multiselect-dropdown-menu--expanded">
      <fieldset className="group">
        <legend className={this.props.titleClasses}>
          {this.props.title}
        </legend>
        <div className="ma__select-box__field ma__select-box__field--inline">
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">
              <Tags tags={tagsProps} />
            </span>
            <span className="ma__select-box__icon"></span>
          </div>
        </div>
        {
          dropdownItems.map((item, i) => (
            <InputCheckBox
              id={`input-checkbox${i}`}
              key={`input-checkbox${i}`}
              value={item.value}
              label={item.label}
              onChange={this.handleSelect}
              classes={["ma__multiselect-dropdown-item"]}
            />
          ))
        }
      </fieldset>
      </div>
    );
  }
}

MultiSelectDropDown.propTypes = {
  /** Custom callback on dropdown item selection. */
  onItemSelect: PropTypes.func,
  /** Custom callback on dropdown click. */
  onDropDownClick: PropTypes.func,
  /** An array of dropdown multiselect items */
  dropdownItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  }))
};

export default MultiSelectDropDown;
