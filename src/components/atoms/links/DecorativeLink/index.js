import React from 'react';
import PropTypes from 'prop-types';

import SvgArrow from '../../icons/SvgArrow/';

const DecorativeLink = props => (
  <span className="ma__decorative-link">
    <a
      href={props.href}
      className="js-clickable-link"
      title={props.info}
    >{props.text}&nbsp;<SvgArrow />
    </a>
  </span>
);

DecorativeLink.propTypes = {
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string
};

DecorativeLink.defaultProps = {
  href: '#',
  info: '',
  text: 'Lorem ipsum dolor sit amet'
};

export default DecorativeLink;
