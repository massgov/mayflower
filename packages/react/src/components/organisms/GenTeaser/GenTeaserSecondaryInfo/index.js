/**
 * GenTeaserSecondaryInfo module.
 * @module @massds/mayflower-react/GenTeaserSecondaryInfo
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Secondary info
 */
const GenTeaserSecondaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  );
};

GenTeaserSecondaryInfo.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserSecondaryInfo;
