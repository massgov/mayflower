import React from 'react';
import PropTypes from 'prop-types';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.options[0].text
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    const selectedIndex = event.nativeEvent.target.selectedIndex;
    const selected = event.target[selectedIndex].text;
    const selectedValue = event.target[selectedIndex].value;
    this.setState({ selected });

    // invokes custom function if passed in the component
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback(selectedIndex, selected, selectedValue);
    }
  }

  render() {
    const classNames = !this.props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown';
    const selectClassNames = this.props.required ? 'ma__select-box__select js-dropdown-select js-required' : 'ma__select-box__select js-dropdown-select';
    const selected = this.state.selected;
    return(
      <section className={classNames}>
        <label htmlFor={this.props.id} className="ma__select-box__label">{this.props.label}</label>

        <div className="ma__select-box__field">
          <select
            name={this.props.id}
            id={this.props.id}
            className={selectClassNames}
            onChange={this.handleSelect}
          >
            {this.props.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div className="ma__select-box__link">
            <span className="js-dropdown-link">{selected}</span>
            <span className="ma__select-box__icon" />
          </div>
        </div>
      </section>
    );
  }
}

SelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })),
  onChangeCallback: PropTypes.func
};

SelectBox.defaultProps = {
  required: false
};

export default SelectBox;
