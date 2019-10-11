import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import InputCheckBox from '../../atoms/forms/InputCheckBox';
import './style.css';

class MultiSelectDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dropdownItems, onItemSelect } = this.props
    return(
      <div className="ma__multiselect-dropdown ma__multiselect-dropdown-menu ma__multiselect-dropdown-menu--expanded">
      <fieldset className="group">
        <legend className={this.props.titleClasses}>
          {this.props.title}
        </legend>
        <div className="ma__select-box__field ma__select-box__field--inline">
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">All Formats</span>
            <span className="ma__select-box__icon"></span>
          </div>
        </div>
        {
          dropdownItems.map((item, i) => (
            <InputCheckBox
              id={`input-checkbox${i}`}
              key={`input-checkbox${i}`}
              name="input-name"
              value={item.value}
              label={item.label}
              onChange={(e) => onItemSelect()}
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
