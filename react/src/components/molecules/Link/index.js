import React from 'react';
import PropTypes from 'prop-types';

import { SvgArrow } from '../../../index';

const Link = (props) => (
  <a
    href={props.href}
    className="js-clickable-link"
    title={props.info}
  >{props.text}&nbsp;<SvgArrow />
  </a>
);

Link.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string
};

Link.defaultProps = {
  href: '#',
  info: '',
  text: 'Lorem ipsum dolor sit amet'
};

export default Link;
