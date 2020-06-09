/**
 * EmergencyHeader module.
 * @module @massds/mayflower-react/EmergencyHeader
 * @requires module:@massds/mayflower-assets/scss/02-molecules/emergency-header
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import componentWithName from 'airbnb-prop-types/src/componentWithName';
import Icon from 'MayflowerReactBase/Icon';

const EmergencyHeader = (props) => {
  const {
    title, icon, prefix, theme
  } = props;
  const linkArgs = {
    theme,
    linkClasses: 'ma__content-link'
  };
  const h2Classes = classNames({
    'ma__emergency-header': true,
    [`ma__emergency-header--${theme}`]: theme
  });
  return(
    <h2 className={h2Classes}>
      {
        (icon || prefix) && (
          <span className="ma__emergency-header__label">
            {icon}
            <span>{prefix}</span>
          </span>
        )
      }
      <span className="ma__emergency-header__title">{ is.fn(title) ? title({ ...linkArgs }) : title}</span>
    </h2>
  );
};

EmergencyHeader.propTypes = {
  /** A function whose return value is displayed in the text to the right of the divider bar. */
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  /** A string that controls different color themes for the component. */
  theme: PropTypes.oneOf(['c-warning', 'c-primary-alt', 'c-primary', 'c-gray', 'c-error']),
  /** A SVG icon to display to the left of the prefix text. */
  icon: componentWithName('Icon'),
  /** An optional string displayed to the left of the divider bar. */
  prefix: PropTypes.string
};
EmergencyHeader.defaultProps = {
  theme: 'c-warning',
  prefix: 'Emergency Alerts',
  icon: <Icon name="alert" />
};

export default EmergencyHeader;
