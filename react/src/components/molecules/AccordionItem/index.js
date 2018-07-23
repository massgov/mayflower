import React from 'react';
import PropTypes from 'prop-types';
import SvgCircleChevron from '../../atoms/icons/SvgCircleChevron';
import Paragraph from '../../atoms/text/Paragraph';
import UnorderedList from '../../atoms/lists/UnorderedList';
import OrderedList from '../../atoms/lists/OrderedList'
import Heading from '../../atoms/headings/Heading'
import Collapse from './Collapse';
import './style.css';

class AccordionItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      		open: false
    	};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
    	this.setState({
    		open: !this.state.open
      });
  	}
	render() {
		const buttonClasses = this.state.open ? 'ma__accordion-header__button is-open' : 'ma__accordion-header__button';
		const accordionClasses = this.props.border? 'ma__accordion-item' : 'ma__accordion-item__borderless';
		return(
			<div className={accordionClasses}>
				<header className="ma__accordion-header">
				  <button
				    className={buttonClasses}
				    aria-label={this.props.info}
				    onClick={this.handleClick}
				    aria-expanded={this.state.open}
				    >
				    { this.props.icon && (
				    	<div className="ma__accordion-header__icon">
				        	{this.props.icon}
				      	</div>
				    )}
				    <h2 className="ma__accordion-header__title">{this.props.title}</h2>
				  </button>
				</header> 
				<Collapse in={this.state.open} dimension="height">
					<div className="ma__accordion-content__body">
					  	{this.props.children}
					</div>
				</Collapse>
			</div>
		)
	}
}

AccordionItem.propTypes = {
  /** The title of the accordion header **/
  title: PropTypes.string.isRequired,
  /** Accessible aria label **/
  info: PropTypes.string.isRequired,
  /** The icon to display in the collapsible header **/
  icon: PropTypes.element,
  /** Whether the accordion should have a border or not, default is true (border) **/
  border: PropTypes.bool,
  /** Content rendered in the collapsed section **/
  children: PropTypes.node.isRequired
};

AccordionItem.defaultProps = {
  icon: <SvgCircleChevron />,
  border: true
};

export default AccordionItem;