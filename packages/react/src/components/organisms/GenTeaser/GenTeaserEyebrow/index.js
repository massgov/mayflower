/**
 * GenTeaserEyebrow module.
 * @module @massds/mayflower-react/GenTeaserEyebrow
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Eyebrow
 */
const GenTeaserEyebrow = (props) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest}>
      {children || eyebrow}
    </div>
  );
};

GenTeaserEyebrow.propTypes = {
  /** Either a string or react component */
  eyebrow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserEyebrow;
