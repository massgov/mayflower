/**
 * GenTeaserEmphasis module.
 * @module @massds/mayflower-react/GenTeaserEmphasis
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Emphasis wrapper for Date and Orgs
 */
const GenTeaserEmphasis = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  );
};

GenTeaserEmphasis.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserEmphasis;
