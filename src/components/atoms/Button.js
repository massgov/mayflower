import React from 'react';
import PropTypes from "prop-types";

const Button = (props) => {
	const buttonSize = props.size ? " ma__button--" + props.size : "";
	const buttonStyle = props.outline ? " ma__button--minor" : "";
	const buttonTheme = props.theme ? " ma__button--" + props.theme : "";
	const classNames = "ma__button" + buttonSize + buttonStyle + buttonTheme;
	const Element = props.href ? "a" : "button";

	return (
		<Element 
			className={classNames}
			type={props.type}
			href={props.href}
			title={props.info}
			aria-label={props.info}
			onClick={props.onClick}
		>
		{props.text}
		</Element>
	);
}

Button.propTypes = {
	onClick: PropTypes.func,
	href: PropTypes.string,
	info: PropTypes.string,
	text: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["submit","reset","button",""]),
	size: PropTypes.oneOf(["","small"]),
	theme: PropTypes.oneOf(["","secondary","quaternary"]),
	outline: PropTypes.bool
}

Button.defaultProps = {
	text: "Button",
	size: "",
	theme: "",
	outline: false
}

export default Button;