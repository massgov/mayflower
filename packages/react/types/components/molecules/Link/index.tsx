// @ts-nocheck
/**
 * Link module.
 * @module @massds/mayflower-react/Link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import * as Icon from 'MayflowerReactBase/Icon';

export interface LinkProps {
  href?: string
  info?: string
  text?: string
  icon?: string
  classes?: string
  children?: React.ReactNode
}

const Link = (props: LinkProps) => {
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
      { (props.children) ? props.children : <span>{props.text}</span> }
      <span>&nbsp;</span>
      { icon }
    </a>
  );
};

Link.defaultProps = {
  href: '#',
  info: '',
  text: '',
  icon: 'IconArrow'
};

export default Link;
