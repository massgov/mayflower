/**
 * HelpTip module.
 * @module @massds/mayflower-react/HelpTip
 * @requires module:@massds/mayflower-assets/scss/03-organisms/help-tip
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Collapse from 'MayflowerReactAnimations/Collapse';
import IconQuestionmark from 'MayflowerReactBase/Icon/IconQuestionmark';
import IconClose from 'MayflowerReactBase/Icon/IconClose';
import Paragraph from 'MayflowerReactText/Paragraph';

class HelpTip extends React.Component {
  constructor(props) {
    super(props);
    const openArray = this.props.triggerText.map(() => false);
    this.state = {
      isOpen: openArray
    };
  }

  getSplitText = (text, triggers) => {
    let splitText = text;
    triggers.forEach((trigger, index) => {
      if (index === 0) {
        splitText = splitText.split(trigger);
      } else {
        const nextPart = (splitText[index].split(trigger));
        splitText.pop();
        splitText = splitText.concat(nextPart);
      }
    });
    return splitText;
  };

  toggleOpenForKeyUp = (e, index) => {
    if (e.which === 13 || e.which === 32) {
      // 13 is enter, 32 is spacebar
      e.preventDefault();
      e.stopPropagation();
      this.toggleOpen(index);
    }
  };

  toggleOpen = (index) => {
    const { isOpen } = this.state;
    isOpen[index] = !this.state.isOpen[index];
    this.setState({ isOpen });
  };

  buildDangerouslyIfHasMarkup = (text, hasMarkup) => (
    /* eslint-disable react/no-danger */
    hasMarkup ? <span dangerouslySetInnerHTML={{ __html: text }} /> : text
  );

  render() {
    const {
      hasMarkup, triggerText, helpText, children, id, theme, text, disabled
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
    const splitText = this.getSplitText(text, triggerText);
    const childArray = children && (Array.isArray(children) ? children : [children]);

    return(
      <span className={baseClass} id={id}>
        {triggerText.map((trigger, index) => {
          const triggerTextClasses = classNames({
            'ma__help-tip__trigger': true,
            'ma__help-tip__trigger--active': this.state.isOpen[index],
            'ma__help-tip__trigger--disabled': disabled
          });
          return(
            /* eslint-disable-next-line react/no-array-index-key */
            <span key={`help-tip-label-${id}-${index}`} className="ma__help-tip__label" id={`label-${id}-${index}`}>
              {index === 0 && this.buildDangerouslyIfHasMarkup(splitText[index], hasMarkup)}
              <span className="ma_help-tip__label-a11y" id={`context-a11y-${id}-${index}`} aria-hidden="true">
                {this.state.isOpen[index] ? 'Close tooltip info about ' : 'Open tooltip info about '}
                {this.buildDangerouslyIfHasMarkup(trigger, hasMarkup)}
              </span>
              <span
                className={triggerTextClasses}
                id={`trigger-${id}-${index}`}
                onClick={() => this.toggleOpen(index)}
                onKeyUp={(e) => this.toggleOpenForKeyUp(e, index)}
                tabIndex={disabled ? -1 : 0}
                role="button"
                aria-describedby={`context-a11y-${id}-${index}`}
                aria-expanded={this.state.isOpen[index]}
                aria-controls={`help-tip-content-${id}-${index}`}
              >
                {this.buildDangerouslyIfHasMarkup(trigger, hasMarkup)}
                <IconQuestionmark height={15} width={15} />
              </span>
              {this.buildDangerouslyIfHasMarkup(splitText[index + 1], hasMarkup)}
            </span>
          );
        })}
        {triggerText.map((trigger, index) => !disabled && (
          /* eslint-disable-next-line react/no-array-index-key */
          <Collapse key={`help-tip-collapse-${id}-${index}`} in={this.state.isOpen[index]} dimension="height" className={helpTextContainer}>
            <div className="ma__help-tip__content" id={`help-tip-content-${id}-${index}`} aria-hidden={!this.state.isOpen[index]}>
              <div
                tabIndex="0"
                role="button"
                className="ma__help-tip__close-mobile"
                onClick={() => this.toggleOpen(index)}
                onKeyUp={(e) => this.toggleOpenForKeyUp(e, index)}
                aria-label={this.state.isOpen[index] && 'Close help tip.'}
              >
                <IconClose />
              </div>
              <div
                tabIndex="0"
                role="button"
                className="ma__help-tip__close-desktop"
                onClick={() => this.toggleOpen(index)}
                onKeyUp={(e) => this.toggleOpenForKeyUp(e, index)}
                aria-label={this.state.isOpen[index] && 'Close help tip.'}
              >
                <IconClose />
              </div>
              {(helpText || childArray) && (
                <div className={helpTextClasses} aria-live="polite">
                  {helpText && helpText[index] && (<Paragraph className={helpTextDirect} text={helpText[index]} />)}
                  {childArray && childArray[index] && childArray[index]}
                </div>
              )}
            </div>
          </Collapse>
        ))}
      </span>
    );
  }
}

HelpTip.propTypes = {
  /** The text that will have one or more help tips inserted in it. */
  text: PropTypes.string,
  /** The text that will be a clickable inline toolitp */
  triggerText: PropTypes.arrayOf(PropTypes.string),
  /** The help text that is displayed on clicking the trigger text */
  /** You can also render children in the help text */
  helpText: PropTypes.arrayOf(PropTypes.string),
  /** The id for the whole component */
  id: PropTypes.string.isRequired,
  /** Whether you want the help text to slide up on mobile screens */
  bypassMobileStyle: PropTypes.bool,
  /** Whether text contains html markup */
  hasMarkup: PropTypes.bool,
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['c-primary', 'c-primary-alt', 'c-highlight', 'c-gray-dark', 'c-error-red', 'c-white']),
  /** Disable helptip trigger text */
  disabled: PropTypes.bool,
  children: PropTypes.node
};

HelpTip.defaultProps = {
  hasMarkup: true,
  theme: 'c-primary',
  bypassMobileStyle: false
};

export default HelpTip;
