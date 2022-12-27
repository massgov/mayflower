/**
 * GenTeaserTags module.
 * @module @massds/mayflower-react/GenTeaserTags
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Tags
 */
const GenTeaserTags = (props) => {
  const { tags, ...rest } = props;
  return(
    <div className="ma__gen-teaser__tags" {...rest}>
      {
        // eslint-disable-next-line react/no-array-index-key
        tags.map((tag, index) => <span key={`${tag}--${index}`} className="ma__gen-teaser__tag">{tag}</span>)
      }
    </div>
  );
};

GenTeaserTags.propTypes = {
  /** An array of tags */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GenTeaserTags;
