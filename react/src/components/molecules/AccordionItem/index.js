import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../atoms/Icon';
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
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  render() {
    const {
      secondary, border, emphasize, icon, title, headerLevel, children, id, info
    } = this.props;
    const { open } = this.state;
    const accordionClasses = classNames({
      'ma__accordion-item': !secondary,
      'ma__accordion-item--secondary': secondary,
      'ma__accordion-item--borderless': !border && !secondary
    });
    const buttonClasses = classNames({
      'ma__accordion-header__button': !secondary,
      'ma__accordion-header__button--secondary': secondary,
      'is-open': open,
      'ma__accordion-header__button--solid': emphasize && !secondary,
      'ma__accordion-header__button--trans': !emphasize && !secondary
    });
    const headingClasses = classNames({
      'ma__accordion-header__title': !secondary,
      'ma__accordion-header__title--secondary': secondary
    });

    return(
      <div className={accordionClasses}>
        <header className="ma__accordion-header">
          <button
            className={buttonClasses}
            aria-label={info}
            onClick={this.handleClick}
            aria-expanded={open}
            aria-controls={`expandable-section-${id}`}
            id={`button-${id}`}
          >
            { icon && !secondary && (
              <div className="ma__accordion-header__icon">
                {icon}
              </div>
            )}
            { secondary && (
              <div className="ma__accordion-header__icon--secondary">
                <Icon name="chevron" svgHeight={20} svgWidth={20} />
              </div>
            )}
            <Heading class={headingClasses} text={title} level={headerLevel} />
          </button>
        </header>
        <Collapse in={open} dimension="height">
          <div className="ma__accordion-content__body" id={`expandable-section-${id}`} aria-labelledby={`button-${id}`}>
            {children}
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
  headerLevel: PropTypes.number,
  /** Expand button id and section id, used for a11y */
  id: PropTypes.string
};

AccordionItem.defaultProps = {
  icon: <Icon name="circlechevron" svgWidth={35} svgHeight={35} />,
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionItem;
