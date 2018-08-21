import React from 'react';
import PropTypes from 'prop-types';
import SvgCircleChevron from '../../atoms/icons/SvgCircleChevron';
import SvgChevron from '../../atoms/icons/SvgChevron';
import Heading from '../../atoms/headings/Heading';
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
    const secondaryClass = this.props.secondary ? '--secondary' : '';
    const buttonState = this.state.open ? `ma__accordion-header__button${secondaryClass} is-open` : `ma__accordion-header__button${secondaryClass}`;
    const accordionClasses = this.props.border ? '' : 'ma__accordion-item--borderless';
    const empClass = this.props.emphasize ? 'ma__accordion-header__button--solid' : 'ma__accordion-header__button--trans';
    const buttonClasses = this.props.secondary ? `${buttonState}` : `${buttonState} ${empClass}`;
    const headingClasses = `ma__accordion-header__title${secondaryClass}`;

    return(
      <div className={`ma__accordion-item${secondaryClass} ${accordionClasses}`}>
        <header className="ma__accordion-header">
          <button
            className={buttonClasses}
            aria-label={this.props.info}
            onClick={this.handleClick}
            aria-expanded={this.state.open}
          >
            { this.props.icon && !this.props.secondary && (
              <div className="ma__accordion-header__icon">
                {this.props.icon}
              </div>
            )}
            { this.props.secondary && (
              <div className={`ma__accordion-header__icon${secondaryClass}`}>
                <SvgChevron />
              </div>
            )}
            <Heading class={headingClasses} text={this.props.title} level={this.props.headerLevel} />
          </button>
        </header>
        <Collapse in={this.state.open} dimension="height">
          <div className="ma__accordion-content__body">
            {this.props.children}
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
  /** Where the accordion header's background should remain colored when expanded */
  emphasize: PropTypes.bool,
  /** Content rendered in the collapsed section. Only Paragraph, Table, Heading, OrderedList
      and UnorderList are valid children components to pass to AccordionItem */
  children: PropTypes.node.isRequired,
  /** Whether to style the accordion as secondary or not. */
  secondary: PropTypes.bool,
  /** Heading level for accordion title */
  headerLevel: PropTypes.number
};

AccordionItem.defaultProps = {
  icon: <SvgCircleChevron />,
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionItem;
