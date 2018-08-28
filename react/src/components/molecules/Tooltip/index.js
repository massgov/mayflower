import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import './style.css';

const Tooltip = (tooltip) => {
  const headingTag = `h${tooltip.level ? tooltip.level : 2}`;
  const location = (tooltip.location === 'above') ? 'ma__tooltip__modal--above' : 'ma__tooltip__modal--below';
  const openIcon = tooltip.openIcon ? 'icon' : '';

  return (
    <div class="ma__tooltip">
      <div class="ma__tooltip__inner">
        <input
          id={tooltip.controlId}
          type="checkbox"
          className="ma__tooltip__control"
          aria-label={tooltip.info}
          aria-hidden="true" />
        <label
          htmlFor={tooltip.controlId}
          className="ma__tooltip__open"
          aria-labelledby={tooltip.controlId}
          aria-hidden="true">
          {tooltip.openText}
          { openIcon }
        </label>
        <section className={`ma__tooltip__modal ${location}`}>
          <div className="ma__tooltip__container">
            <label
              htmlFor="{{ tooltip.controlId }}"
              className="ma__tooltip__close"
              tabindex="-1"
              aria-labelledby="{{ tooltip.controlId }}"
              aria-hidden="true">{tooltip.closeText}</label>
              <headingTag className="ma__tooltip__title">{tooltip.title}</headingTag>
            <div className="ma__tooltip__message">
              {tooltip.message}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  /** Text to display when open */
  openText: PropTypes.string.isRequired,
  /** Text to display when closed. */
  closeText: PropTypes.string.isRequired,
  /** Tooltip Message */
  message: PropTypes.string.isRequired,
  /** Unique ID of tooltip */
  controlId: PropTypes.string.isRequired,
  /** Position of tip ('' or above) */
  location: PropTypes.string,
  /** description on link for screen readers */
  info: PropTypes.string.isRequired,
  /** Path to icon */
  openIcon: PropTypes.string,
  /** Title */
  title: PropTypes.string,
  /** Heading level of title. Default h2 */
  level: PropTypes.number,
  /** Message of tooltip. */
  message: PropTypes.string.isRequired
};

export default Tooltip
