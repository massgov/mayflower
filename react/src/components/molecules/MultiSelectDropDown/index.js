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
      values: [],
      dropwDownExpand: false
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

  handleTagClick = (target, e) => {
    e.stopPropagation();
    const val = target.getAttribute('data-ma-filter-value');
    const { values } = this.state;
    values.splice(values.indexOf(val), 1);
    this.setState({
      values
    });
  }

  handleClearAll = () => {
    this.setState({
      values: []
    });
  }

  handleClick = () => {
    this.setState((prevState) => ({ dropwDownExpand: !prevState.dropwDownExpand }));
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
      <div className="ma__multiselect-dropdown ma__multiselect-dropdown-menu ma__multiselect-dropdown-menu--expanded">
        <fieldset className="group">
          <legend className={titleClasses.length > 0 ? titleCls : null}>
            {title}
          </legend>
          <div className="ma__select-box__field" onClick={this.handleClick}>
            <div className="ma__select-box__link">
              <span className="js-dropdown-link">
                { values.length > 0 ? <Tags {...tagsProps} /> : defaultText}
              </span>
              <span className="ma__select-box__icon" />
            </div>
          </div>
          {
            dropwDownExpand && dropdownItems.map((item, i) => (
              <InputCheckBox
                id={`input-checkbox${i}`}
                /* eslint-disable-next-line react/no-array-index-key */
                key={`input-checkbox${i}`}
                name={fieldName}
                value={item.value}
                label={item.label}
                onChange={this.handleSelect}
                classes={['ma__multiselect-dropdown-item']}
                defaultValue={values.indexOf(item.value) > -1 ? item.value : false}
              />
            ))
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
