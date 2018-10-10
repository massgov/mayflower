import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: !props.selected ? props.options[0].text : props.selected
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected });
  }
  /**
   * Default event handler which renders selected item in the patter div.
   *
   * @param event The DOM onChange event
   *
   * Invokes custom callback passed as prop onChangeCallback, passing back the
   * object with select information.
   */
  handleOnChange(event) {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selected = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    this.setState({ selected });

    // invokes custom function if passed in the component
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback({ selectedIndex, selected, selectedValue });
    }
  }

  render() {
    const { selected } = this.state;
    const { stackLabel } = this.props;
    const sectionClasses = classNames({
      'ma__select-box': true,
      'js-dropdown': true,
      'ma__select-box--optional': !this.props.required,
      [`${this.props.className}`]: this.props.className
    });
    const selectClasses = classNames({
      'ma__select-box__select': true,
      'js-dropdown-select': true,
      'js-required': this.props.required
    });
    const labelClassNames = classNames({
      'ma__select-box__label': stackLabel,
      'ma__label--inline ma__label--small': !stackLabel
    });
    const selectBoxClasses = classNames({
      'ma__select-box__field': true,
      'ma__select-box__field--inline': !stackLabel
    });
    const getValueByText = (array = [], text) => {
      const matchedItem = array.find((item) => item.text === text);
      const matchedValue = matchedItem && matchedItem.value;
      return matchedValue;
    };
    const valueInOptions = getValueByText(this.props.options, selected);
    const selectedValue = valueInOptions || this.props.options[0].value;
    return(
      <section className={sectionClasses}>
        <label htmlFor={this.props.id} className={labelClassNames}>{this.props.label}</label>
        <div className={selectBoxClasses}>
          <select
            name={this.props.id}
            id={this.props.id}
            className={selectClasses}
            onChange={this.handleOnChange}
            value={selectedValue}
          >
            {this.props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">{valueInOptions ? selected : this.props.options[0].text}</span>
            <span className="ma__select-box__icon" />
          </div>
        </div>
      </section>
    );
  }
}

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
  })),
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
