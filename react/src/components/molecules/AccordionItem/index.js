import React from 'react';
import PropTypes from 'prop-types';
import SvgCircleChevron from '../../atoms/icons/SvgCircleChevron';
import Collapse from '../../animations/Collapse';
import './style.css';

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const buttonClasses = this.state.open ? 'ma__accordion-header__button is-open' : 'ma__accordion-header__button';
    const accordionClasses = this.props.border ? 'ma__accordion-item' : 'ma__accordion-item__borderless';
    const allowedChildren = ['Paragraph', 'OrderedList', 'UnorderedList', 'Heading', 'Table'];

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
            { React.Children.map(this.props.children, (child) => {
              if (allowedChildren.includes(child.type.name)) {
                return child;
              }
              return(
                /* eslint-disable no-console */
                console.log(`Warning! You cannot pass a ${child.type.name} child to AccordionItem`)
                /* eslint-disable no-console */
              );
            })}
          </div>
        </Collapse>
      </div>
    );
  }
}

AccordionItem.propTypes = {
  /** The title of the accordion header */
  title: PropTypes.string.isRequired,
  /** Accessible aria label */
  info: PropTypes.string.isRequired,
  /** The icon to display in the collapsible header */
  icon: PropTypes.element,
  /** Whether the accordion should have a border or not, default is true (border) */
  border: PropTypes.bool,
  /** Content rendered in the collapsed section */
  children: PropTypes.node.isRequired
};

AccordionItem.defaultProps = {
  icon: <SvgCircleChevron />,
  border: true
};

export default AccordionItem;
