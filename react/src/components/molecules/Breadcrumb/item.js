import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BreadcrumbItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { active, children } = props;
  const classes = classNames({
    'ma__decorative-link': true,
    'ma__decorative-link--active': active
  });
  return(<li className={classes}>{children}</li>);
};

BreadcrumbItem.defaultProps = {
  active: false
};

BreadcrumbItem.propTypes = {
  active: PropTypes.bool
};

export default BreadcrumbItem;
