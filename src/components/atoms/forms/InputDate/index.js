import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';


class InputDate extends React.Component {
  constructor(props) {
    super(props);
    this.startPikaday = this.startPikaday.bind(this);
    this.state = {
    	type: 'date'
    };
  }

  componentDidMount() {
  	this.startPikaday();
  	this.setState({ type: 'text' });
  }

  startPikaday() {
  	const restrict = this.props.restrict;
  	const picker = new Pikaday({
  		field: this.dateInput,
  		format: 'MM/DD/YY'
  	});

  	switch (restrict) {
      case 'max':
        picker.setMaxDate(new Date());
        break;
      case 'min':
        picker.setMinDate(new Date());
        break;
    }
  }

  render() {
  	const classNames = this.props.required ? 'ma__input-date js-input-date js-is-required' : 'ma__input-date js-input-date ';
  	const dataRequired = this.props.required ? 'required' : '';
	  return(
  <span>
    <label htmlFor={this.props.id}>{this.props.labelText}</label>
    <input
      className={classNames}
      name={this.props.name}
      id={this.props.id}
      type={this.state.type}
      placeholder={this.props.placeholder}
      data-type="date"
      data-restrict={this.props.restrict}
      ref={(input) => { this.dateInput = input; }}
    />
  </span>
	  );
  }
}

InputDate.propTypes = {
  labelText: PropTypes.string.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  restrict: PropTypes.oneOf(['', 'max', 'min'])
};

InputDate.defaultProps = {
  labelText: 'Select a date',
  required: false,
  id: 'date-input',
  name: 'date-input',
  placeholder: 'mm/dd/yy',
  restrict: ''
};

export default InputDate;
