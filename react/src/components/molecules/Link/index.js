import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { Icon } from '../../../index';

const Link = (props) => {
  const icon = props.icon ? (<Icon name={props.icon} svgWidth={13.2} svgHeight={13.2} />) : '';
  return(
    <a
      href={props.href}
      className="js-clickable-link"
      title={props.info}
    >{ props.text }&nbsp;{ icon }
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string
};

Link.defaultProps = {
  href: '#',
  info: '',
  text: 'Lorem ipsum dolor sit amet',
  icon: 'arrow'
};

export default Link;
