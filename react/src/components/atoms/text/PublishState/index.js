/**
 * PublishState module.
 * @module @massds/mayflower-react/PublishState
 * @requires module:@massds/mayflower-assets/scss/01-atoms/publish-state
 */
import React from 'react';
import PropTypes from 'prop-types';

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
