/**
 * GenTeaserSubLinks module.
 * @module @massds/mayflower-react/GenTeaserSubLinks
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * SubLinks wrapper for formatting key actions into 2 columns
 */
const GenTeaserSubLinks = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__key-action" {...rest}>
      {children.length > 2 ? (
        <>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(0, 2)}
          </div>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(2, 4)}
          </div>
        </>
      ) : <div className="ma__gen-teaser__key-action-col">{children}</div>}
    </div>
  );
};

GenTeaserSubLinks.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

export default GenTeaserSubLinks;
