import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const PublishState = (publishState) => (
  <div className="ma__publish-state">{ publishState.text }</div>
);

PublishState.propTypes = {
  /** The text displayed. */
  text: PropTypes.string
};

PublishState.defaultProps = {
  text: 'Draft'
};

export default PublishState;
