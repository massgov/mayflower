import React from 'react';
import PropTypes from "prop-types";

class Button extends React.Component {
	render(){
		const buttonSize = this.props.size ? " ma__button--" + this.props.size : "";
		const buttonStyle = this.props.outline ? " ma__button--minor" : "";
		const buttonTheme = this.props.theme ? " ma__button--" + this.props.theme : "";
		const classNames = "ma__button" + buttonSize + buttonStyle + buttonTheme;
		const Element = this.props.href ? "a" : "button";
		return (
			<Element className={classNames} type={this.props.type} href={this.props.href} title={this.props.info} aria-label={this.props.info} onClick={this.props.onClick}>{this.props.text}</Element>
		);
	}
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
	size: "",
	theme: "",
	outline: false
}


export default Button;