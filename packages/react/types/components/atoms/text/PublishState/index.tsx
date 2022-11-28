// @ts-nocheck
/**
 * PublishState module.
 * @module @massds/mayflower-react/PublishState
 * @requires module:@massds/mayflower-assets/scss/01-atoms/publish-state
 */
import React from 'react';

export interface PublishStateProps {
  /** The text displayed. */
  text?: string
}

const PublishState = (publishState: PublishStateProps) => (
  <div className="ma__publish-state">{ publishState.text }</div>
);

PublishState.defaultProps = {
  text: 'Draft'
};

export default PublishState;
