import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../../index';

const Link = (props) => (
  <a
    href={props.href}
    className="js-clickable-link"
    title={props.info}
  >{props.text}&nbsp;<Icon name="arrow" svgWidth={13.2} svgHeight={13.2} />
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
