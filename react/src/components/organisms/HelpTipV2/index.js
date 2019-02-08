import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Collapse from '../../animations/Collapse';
import Icon from '../../atoms/icons/Icon';
import './style.css';


class HelpTipV2 extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  componentWillMount() {
    this.setState({ isOpen: false });
  }

  componentWillReceiveProps(nextProps) {
    const isAnyDifferent = ['textBefore', 'textAfter', 'triggerText', 'helpText'].some((property) => this.props[property] !== nextProps[property]);
    if (isAnyDifferent) {
      this.setState({ isOpen: false });
    }
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleOpenForKeyUp = (e) => {
    if (e.which === 13 || e.which === 32) {
      // 13 is enter, 32 is spacebar
      e.preventDefault();
      e.stopPropagation();
      this.toggleOpen(e);
    }
  };

  // Rendering
  // ---------

  buildDangerouslyIfHasMarkup = (text, hasMarkup) => (hasMarkup ? <span dangerouslySetInnerHTML={{ __html: text }} /> : text)

  render() {
    const {
      hasMarkup, labelId, triggerText, textAfter, helpText, children, id, theme
    } = this.props;

    const baseClass = classNames({
      'ma__help-tip': true,
      'mobile-tray': !this.props.bypassMobileStyle,
      [`ma__help-tip__text--${theme}`]: theme
    });
    const helpTextClasses = classNames({
      'ma__help-tip__text': !children,
      'ma__help-tip__text--children': children,
      [`ma__help-tip__text--${theme}`]: theme
    });
    const helpTextContainer = classNames({
      'ma__help-tip__container': true,
      [`ma__help-tip__container--${theme}`]: theme
    });
    const helpTextDirect = classNames({
      'ma__help-tip__text-direct': true,
      [`ma__help-tip__text-direct--${theme}`]: theme
    });

    console.log(this.props.text)

    return(
      <span className={baseClass} id={id}>
        <span className="ma__help-tip__label" id={labelId}>
          {this.buildDangerouslyIfHasMarkup(this.props.textBefore, hasMarkup)}
          {/* can't use a button b/c disrupts fieldsets when used inside of legend */}
          <div
            className={`ma__help-tip__trigger ${this.state.isOpen ? 'active' : ''}`}
            onClick={this.toggleOpen}
            onKeyUp={this.toggleOpenForKeyUp}
            tabIndex="0"
            role="button"
            aria-describedby={id}
            aria-expanded={this.state.isOpen}
          >
            {this.buildDangerouslyIfHasMarkup(triggerText, hasMarkup)}
            <Icon name="questionmark" svgHeight={15} svgWidth={15} />
          </div>
          {this.buildDangerouslyIfHasMarkup(textAfter, hasMarkup)}
        </span>
        <Collapse in={this.state.isOpen} dimension="height" className={helpTextContainer}>
          <div className="ma__help-tip__content">
            <div
              tabIndex="0"
              role="button"
              className="ma__help-tip__close-mobile"
              onClick={this.toggleOpen}
              onKeyUp={this.toggleOpenForKeyUp}
            >
              <Icon name="close" label="Close help tip" />
            </div>
            <div
              tabIndex="0"
              role="button"
              className="ma__help-tip__close-desktop"
              onClick={this.toggleOpen}
              onKeyUp={this.toggleOpenForKeyUp}
            >
              <Icon name="close" label="Close help tip" />
            </div>
            {(helpText || children) && (
              <div className={helpTextClasses} aria-live="polite">
                {children || (<p className={helpTextDirect}>{helpText}</p>)}
              </div>
            )}
          </div>
        </Collapse>
      </span>
    );
  }
}

intro: PropTypes.shape({
    /** Optional label */
    label: PropTypes.string,
    /** Optional DecorativeLink */
    introDecorativeLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'DecorativeLink')
  })

HelpTipV2.propTypes = {
  /** The text that will have one or more help tips inserted in it. */
  text: PropTypes.string,
  /** The text that will be a clickable inline toolitp */
  triggerText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ),
  /** The help text that is displayed on clicking the trigger text */
  /** You can also render children in the help text */
  helpText: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    })
  ),
  /** The label id */
  labelId: PropTypes.string.isRequired,
  /** The id for the whole component */
  id: PropTypes.string.isRequired,
  /** Whether you want the help text to slide up on mobile screens */
  bypassMobileStyle: PropTypes.bool,
  /** Whether textBefore, textAfter, or triggerText has html markup */
  hasMarkup: PropTypes.bool,
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['c-primary', 'c-primary-alt', 'c-highlight', 'c-gray-dark', 'c-error-red', 'c-white'])
};

HelpTipV2.defaultProps = {
  labelId: '',
  hasMarkup: true,
  theme: 'c-primary',
  bypassMobileStyle: false
};

export default HelpTipV2;
