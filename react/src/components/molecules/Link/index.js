/**
 * Link module.
 * @module @massds/mayflower-react/Link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as Icon from 'MayflowerReactBase/Icon';

const Link = (props) => {
  const IconComponent = props.icon ? Icon[props.icon] : null;
  const icon = IconComponent ? (<IconComponent width={13.2} height={13.2} />) : null;
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
  icon: 'IconArrow'
};

export default Link;
