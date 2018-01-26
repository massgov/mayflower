import React from 'react';
import PropTypes from "prop-types";

const InputDate = (props) => {

	const classNames = props.required ? "ma__input-date js-input-date  js-is-required" : "ma__input-date js-input-date ";
	const dataRequired = props.required ? "required" : "";

	return (
		<div>
		<label htmlFor={props.id}>{props.labelText}</label>
		<input
          className={classNames}
          name={props.name}
          id={props.id} 
          type="text" 
          placeholder={props.placeholder} 
          data-type="date" 
          data-restrict={props.restrict}
      />
      </div>
	);
}

InputDate.propTypes = {
	labelText: PropTypes.string.isRequired,
	required: PropTypes.bool,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	restrict: PropTypes.oneOf(["","max","min"])
}

InputDate.defaultProps = {
	labelText: "Select a date",
	required: false,
	id: "date-input",
	name: "date-input",
	placeholder: "mm/dd/yy",
	restrict: "max"
}

export default InputDate;