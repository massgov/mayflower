import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Icon } from '../../../index';

const Link = (props) => {
  const icon = props.icon ? (<Icon name={props.icon} svgWidth={13.2} svgHeight={13.2} />) : '';
  const classes = (props.classes) ? `js-clickable-link ${props.classes}` : 'js-clickable-link';
  return(
    <a
      href={props.href}
      className={classes}
      title={props.info}
    >{ (props.children) ? props.children : props.text }&nbsp;{ icon }
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
};

Link.defaultProps = {
  href: '#',
  info: '',
  text: '',
  icon: 'arrow'
};

export default Link;
