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
import Icon from './index';

const IconDisplay = (props) => {
  const { name } = props;
  return(
    <li style={{ width: 180, margin: 10, padding: 10 }}>
      <div className="sg-icons-info">
        <Icon {...props} />
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
  title: PropTypes.string,
  svgWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  svgHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.arrayOf(PropTypes.string),
  ariaHidden: PropTypes.bool,
  fill: PropTypes.string
};

export default IconDisplay;
