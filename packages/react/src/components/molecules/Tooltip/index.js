/**
 * Tooltip module.
 * @module @massds/mayflower-react/Tooltip
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tooltip
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import IconQuestionmark from 'MayflowerReactBase/Icon/IconQuestionmark';

const Tooltip = (tooltip) => {
  const HeadingTag = `h${tooltip.level}`;
  const location = (tooltip.location === 'above') ? 'ma__tooltip__modal--above' : 'ma__tooltip__modal--below';
  const openIcon = tooltip.openIcon ? <IconQuestionmark height={20} width={20} /> : '';

  return(
    <div className="ma__tooltip">
      <div className="ma__tooltip__inner">
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
          {tooltip.openText}
          {openIcon}
        </label>
        <section className={`ma__tooltip__modal ${location}`}>
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
        </section>
      </div>
    </div>
  );
};

Tooltip.defaultValue = {
  level: 2
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
  level: PropTypes.number
};

export default Tooltip;
