// @ts-nocheck
/**
 * AccordionItem module.
 * @module @massds/mayflower-react/AccordionItem
 * @requires module:@massds/mayflower-assets/scss/02-molecules/accordion-item
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
// eslint-disable-next-line import/no-unresolved
import IconCirclechevron from 'MayflowerReactBase/Icon/IconCirclechevron';
import Heading from 'MayflowerReactHeadings/Heading';
import Collapse from 'MayflowerReactAnimations/Collapse';

export interface AccordionItemProps {
  /** The title of the accordion header */
  title: string
  /** Accessible aria label */
  info: string
  /** The icon to display in the collapsible header */
  icon?: React.ReactElement
  /** Whether the accordion should have a border or not, default is true (border) */
  border?: boolean
  /** Where the accordion header's background should remain colored when expanded */
  emphasize?: boolean
  /** Content rendered in the collapsed section. Only Paragraph, Table, Heading, OrderedList
      and UnorderList are valid children components to pass to AccordionItem */
  children: React.ReactElement
  /** Whether to style the accordion as secondary or not. */
  secondary?: boolean
  /** Heading level for accordion title */
  headerLevel?: number
  /** Expand button id and section id, used for a11y */
  id?: string
}

class AccordionItem extends React.Component<AccordionItemProps> {
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
            type="button"
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
                <IconChevron height={20} width={20} />
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

AccordionItem.defaultProps = {
  icon: <IconCirclechevron width={35} height={35} />,
  border: true,
  emphasize: true,
  secondary: false,
  headerLevel: 2
};

export default AccordionItem;
