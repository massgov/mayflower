/**
 * GenTeaserDetails module.
 * @module @massds/mayflower-react/GenTeaserDetails
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Wrapper
 */
const GenTeaserDetails = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  );
};

GenTeaserDetails.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserDetails;
