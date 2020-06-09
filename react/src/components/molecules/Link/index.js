/**
 * Link module.
 * @module @massds/mayflower-react/Link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'MayflowerReactBase/Icon';

const Link = (props) => {
  const icon = props.icon ? (<Icon name={props.icon} svgWidth={13.2} svgHeight={13.2} />) : '';
  const classes = classNames({
    [props.classes]: props.classes
  });
  return(
    <a
      href={props.href}
      className={classes || null}
      title={props.info}
    >
      { (props.children) ? props.children : props.text }
&nbsp;
      { icon }
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.node
};

Link.defaultProps = {
  href: '#',
  info: '',
  text: '',
  icon: 'arrow'
};

export default Link;
