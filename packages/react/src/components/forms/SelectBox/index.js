/**
 * SelectBox module.
 * @module @massds/mayflower-react/SelectBox
 * @requires module:@massds/mayflower-assets/scss/01-atoms/select-box
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import PropTypes from 'prop-types';
import Label from 'MayflowerReactForms/Label';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: !props.selected ? props.options[0].text : props.selected
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    let classNames = '';
    if (this.props.className) {
      classNames = this.props.className;
    } else {
      classNames = !this.props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown';
    }
    const selectClassNames = this.props.required ? 'ma__select-box__select js-dropdown-select js-required' : 'ma__select-box__select js-dropdown-select';
    const { selected } = this.state;
    const {
      label, id, options, stackLabel
    } = this.props;
    const labelClassNames = stackLabel ? 'ma__select-box__label' : 'ma__label--inline ma__label--small';
    const selectBoxInline = stackLabel ? '' : 'ma__select-box__field--inline';
    const getValueByText = (array = [], text) => {
      const matchedItem = array.find((item) => item.text === text);
      const matchedValue = matchedItem && matchedItem.value;
      return matchedValue;
    };
    const valueInOptions = getValueByText(options, selected);
    const selectedValue = valueInOptions || options[0].value;
    return(
      <section className={classNames}>
        {label && (
          <Label inputId={id} className={labelClassNames}>
            {label}
          </Label>
        )}
        <div className={`ma__select-box__field ${selectBoxInline}`}>
          <select
            name={id}
            id={id}
            className={selectClassNames}
            onChange={this.handleOnChange}
            value={selectedValue}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">{valueInOptions ? selected : options[0].text}</span>
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
