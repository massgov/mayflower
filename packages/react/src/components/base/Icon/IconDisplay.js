/**
 * IconDisplay module.
 * @module @massds/mayflower-react/IconDisplay
 * @requires module:@massds/mayflower-assets/scss/00-base/mixins/ma-button-reset
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonCopy from 'MayflowerReactButtons/ButtonCopy';
// eslint-disable-next-line
import * as Icon from './index';

const IconDisplay = (props) => {
  const { name, ...rest } = props;
  const IconComponent = Icon?.[name] && Icon[name];
  return(
    <li style={{ width: 180, margin: 10, padding: 10 }}>
      <div className="sg-icons-info">
        { IconComponent && <IconComponent {...rest} />}
        <div>
          <span>{name}</span>
          <ButtonCopy content={name} />
        </div>
      </div>
    </li>
  );
};

IconDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.arrayOf(PropTypes.string),
  ['aria-hidden']: PropTypes.bool,
  ['aria-label']: PropTypes.string,
  fill: PropTypes.string
};

export default IconDisplay;
