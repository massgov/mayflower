import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../atoms/icons/Icon';
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
    const accordionClasses = classNames({
      'ma__accordion-item': !this.props.secondary,
      'ma__accordion-item--secondary': this.props.secondary,
      'ma__accordion-item--borderless': !this.props.border && !this.props.secondary
    });
    const buttonClasses = classNames({
      'ma__accordion-header__button': !this.props.secondary,
      'ma__accordion-header__button--secondary': this.props.secondary,
      'is-open': this.state.open,
      'ma__accordion-header__button--solid': this.props.emphasize && !this.props.secondary,
      'ma__accordion-header__button--trans': !this.props.emphasize && !this.props.secondary
    });
    const headingClasses = classNames({
      'ma__accordion-header__title': !this.props.secondary,
      'ma__accordion-header__title--secondary': this.props.secondary
    });

    return(
      <div className={accordionClasses}>
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
              <div className="ma__accordion-header__icon--secondary">
                <Icon name="chevron" svgHeight={20} svgWidth={20} />
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
  children: PropTypes.element.isRequired,
  /** Whether to style the accordion as secondary or not. */
  secondary: PropTypes.bool,
  /** Heading level for accordion title */
  headerLevel: PropTypes.number
};

AccordionItem.defaultProps = {
  icon: <Icon name="circlechevron" svgWidth={35} svgHeight={35} />,
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionItem;
