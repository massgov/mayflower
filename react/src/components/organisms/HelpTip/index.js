import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Collapse from '../../animations/Collapse';
import Icon from '../../atoms/icons/Icon';
import Paragraph from '../../atoms/text/Paragraph';
import './style.css';


class HelpTipV2 extends Component {
  constructor(props) {
    super(props);
    const openArray = this.props.triggerText.map((trigger,index) => {
      return false
    })
    this.state = {
      isOpen: openArray
    };
  }

  componentWillMount() {
    const openArray = this.props.triggerText.map((trigger,index) => {
      return false
    })
    this.setState({ isOpen: openArray });
  }

  componentWillReceiveProps(nextProps) {
    const isAnyDifferent = ['text', 'triggerText', 'helpText'].some((property) => this.props[property] !== nextProps[property]);
    const openArray = this.props.triggerText.map((trigger,index) => {
      return false
    })
    if (isAnyDifferent) {
      this.setState({ isOpen: openArray });
    }
  }

  toggleOpen = (index) => {
    const { isOpen } = this.state;
    isOpen[index] = !this.state.isOpen[index];
    this.setState({ isOpen });
  };

  toggleOpenForKeyUp = (e, index) => {
    if (e.which === 13 || e.which === 32) {
      // 13 is enter, 32 is spacebar
      e.preventDefault();
      e.stopPropagation();
      this.toggleOpen(index);
    }
  };

  getSplitText = (text, triggers) => {
    let splitText = text;
    triggers.forEach((trigger, index) => {
      if(index === 0) {
        splitText = splitText.split(trigger);
      } else {
        const nextPart = (splitText[index].split(trigger));
        splitText.pop()
        splitText = splitText.concat(nextPart)
      }
    })
    return splitText;
  };

  buildDangerouslyIfHasMarkup = (text, hasMarkup) => (
    hasMarkup ? <span dangerouslySetInnerHTML={{ __html: text }} /> : text
  )

  render() {
    const {
      hasMarkup, labelId, triggerText, textAfter, helpText, children, id, theme, text
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
    const splitText = this.getSplitText(text,triggerText);
    const childArray = children && (Array.isArray(children) ? children : [children]);

    return(
      <span className={baseClass} id={id}>
        {triggerText.map((trigger,index) => (
          <span className="ma__help-tip__label" id={`${labelId}-${index}`}>
            {index === 0 && this.buildDangerouslyIfHasMarkup(splitText[index], hasMarkup)}
            <div
              className={`ma__help-tip__trigger ${this.state.isOpen[index] ? 'active' : ''}`}
              onClick={() => this.toggleOpen(index)}
              onKeyUp={(e) => this.toggleOpenForKeyUp(e,index)}
              tabIndex="0"
              role="button"
              aria-describedby={id}
              aria-expanded={this.state.isOpen[index]}
            >
              {this.buildDangerouslyIfHasMarkup(trigger, hasMarkup)}
              <Icon name="questionmark" svgHeight={15} svgWidth={15} />
            </div>
            {this.buildDangerouslyIfHasMarkup(splitText[index+1], hasMarkup)}
          </span>
        ))}
        {triggerText.map((trigger,index) => (
          <Collapse in={this.state.isOpen[index]} dimension="height" className={helpTextContainer}>
            <div className="ma__help-tip__content">
              <div
                tabIndex="0"
                role="button"
                className="ma__help-tip__close-mobile"
                onClick={() => this.toggleOpen(index)}
                onKeyUp={(e) => this.toggleOpenForKeyUp(e,index)}
              >
                <Icon name="close" label="Close help tip" />
              </div>
              <div
                tabIndex="0"
                role="button"
                className="ma__help-tip__close-desktop"
                onClick={() => this.toggleOpen(index)}
                onKeyUp={(e) => this.toggleOpenForKeyUp(e,index)}
              >
                <Icon name="close" label="Close help tip" />
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

HelpTipV2.propTypes = {
  /** The text that will have one or more help tips inserted in it. */
  text: PropTypes.string,
  /** The text that will be a clickable inline toolitp */
  triggerText: PropTypes.arrayOf(PropTypes.string),
  /** The help text that is displayed on clicking the trigger text */
  /** You can also render children in the help text */
  helpText: PropTypes.arrayOf(PropTypes.string),
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
