/**
 * GenTeaserStat module.
 * @module @massds/mayflower-react/GenTeaserStat
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Stat info
 */
const GenTeaserStat = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__stat" {...rest}>
      {children}
    </div>
  );
};

GenTeaserStat.propTypes = {
  /** Expects to receive children directly (e.g. `<span><b>103 item</b></span>`). */
  children: PropTypes.node.isRequired
};

export default GenTeaserStat;
