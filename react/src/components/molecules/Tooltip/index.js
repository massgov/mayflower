import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../atoms/icons/Icon';
// eslint-disable-next-line import/no-unresolved
import './style.css';

const Tooltip = (tooltip) => {
  const inlineToolTip = tooltip.htmlTag === 'span';

  const tooltipInnerClasses = classNames({
    ma__tooltip__inner: true,
    'ma__tooltip__inner--inline': inlineToolTip
  });

  const CustomElement = tooltip.htmlTag;
  const HeadingTag = `h${tooltip.level ? tooltip.level : 2}`;
  const location = (tooltip.location === 'above') ? 'ma__tooltip__modal--above' : 'ma__tooltip__modal--below';
  const openIcon = tooltip.openIcon ? <Icon name="questionmark" svgHeight={20} svgWidth={20} /> : '';

  return(
    <CustomElement className="ma__tooltip">
      <div className={tooltipInnerClasses}>
        <input
          id={tooltip.controlId}
          type="checkbox"
          className="ma__tooltip__control"
          aria-label={tooltip.info}
          aria-hidden="true"
        />
        <label
          htmlFor={tooltip.controlId}
          className="ma__tooltip__open"
          aria-labelledby={tooltip.controlId}
          aria-hidden="true"
        >
          { inlineToolTip && ('\u00A0')}
          { tooltip.openText }
          { openIcon }
        </label>
        { inlineToolTip && ('\u00A0\u00A0')}
        <div className={`ma__tooltip__modal ${location}`}>
          <div className="ma__tooltip__container">
            <label
              htmlFor="{{ tooltip.controlId }}"
              className="ma__tooltip__close"
              tabIndex="-1"
              aria-labelledby="{{ tooltip.controlId }}"
              aria-hidden="true"
            >
              {tooltip.closeText}
            </label>
            <HeadingTag className="ma__tooltip__title">{tooltip.title}</HeadingTag>
            <div className="ma__tooltip__message">
              {tooltip.message}
            </div>
          </div>
        </div>
      </div>
    </CustomElement>
  );
};

Tooltip.propTypes = {
  /** Text to display to prompt user */
  openText: PropTypes.string.isRequired,
  /** Text to display as close message. */
  closeText: PropTypes.string.isRequired,
  /** Tooltip Message */
  message: PropTypes.string.isRequired,
  /** Unique ID of tooltip */
  controlId: PropTypes.string.isRequired,
  /** Position of tip ('' or above) */
  location: PropTypes.string,
  /** description on link for screen readers */
  info: PropTypes.string.isRequired,
  /** SVG icon */
  openIcon: PropTypes.bool,
  /** Title of opened window */
  title: PropTypes.string,
  /** Heading level of title. Default h2 */
  level: PropTypes.number,
  /** Wrapper html tag for tooltop openText, options to render tooltip text as a div (block) or a span (inline) */
  htmlTag: PropTypes.oneOf(['div', 'span'])
};

Tooltip.defaultProps = {
  htmlTag: 'div'
};

export default Tooltip;
