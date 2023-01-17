/**
 * GenTeaserMoreInfo module.
 * @module @massds/mayflower-react/GenTeaserMoreInfo
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * MoreInfo wrapper for formatting primary and secondary info
 */
const GenTeaserMoreInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  );
};

GenTeaserMoreInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserMoreInfo;
