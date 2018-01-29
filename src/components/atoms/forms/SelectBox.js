import React from 'react';
import PropTypes from 'prop-types';

class SelectBox extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      selected: props.options[0].text
    }
  }

  handleSelect = (event) => {
    var selectedIndex = event.nativeEvent.target.selectedIndex
    var selected = event.target[selectedIndex].text
    var selectedValue = event.target[selectedIndex].value
    this.setState({selected})

    // invoke custom function here - to do
  }

  render () {

    const classNames = !this.props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown';
    const selectClassNames = this.props.required ? 'ma__select-box__select js-dropdown-select js-required' : 'ma__select-box__select js-dropdown-select';
    const selected = this.state.selected
    return (
      <section className={classNames}>
        <label htmlFor={this.props.id} className="ma__select-box__label">{this.props.label}</label>
        
        <div className="ma__select-box__field">
          <select
            name={this.props.id}
            id={this.props.id}
            className={selectClassNames}
            //onChange={this.props.onChange}
            onChange={this.handleSelect}
          >
            { this.props.options.map(option =>
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
              )
            }
          </select>
        <div className="ma__select-box__link">
            <span className="js-dropdown-link">{selected}</span>
            <span className="ma__select-box__icon"></span></div>
        </div>
      </section>
    ) 
  };
};

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
    ]),
  })).isRequired,
  onChange: PropTypes.func
};

SelectBox.defaultProps = {
  onChange: () => {},
  label: 'Color Scheme:',
  required: true,
  id: 'color-select' 
};

export default SelectBox;
