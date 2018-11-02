import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Breadcrumb = (props) => (
  <ul className="ma__breadcrumb" role="navigation">
    {props.children}
  </ul>
);

Breadcrumb.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
};

export default Breadcrumb;
