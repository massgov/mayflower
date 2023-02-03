/**
 * GenTeaserPrimaryInfo module.
 * @module @massds/mayflower-react/GenTeaserPrimaryInfo
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary info
 */
const GenTeaserPrimaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserPrimaryInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserPrimaryInfo;
