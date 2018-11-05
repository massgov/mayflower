import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Breadcrumb = (props) => (
  <nav aria-label="breadcrumb">
    <ol className="ma__breadcrumb">
      {props.children}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array
};

export default Breadcrumb;
