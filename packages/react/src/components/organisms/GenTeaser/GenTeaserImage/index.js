/**
 * GenTeaserImage module.
 * @module @massds/mayflower-react/GenTeaserImage
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'MayflowerReactMedia/Image';

/**
 * Image
 */
const GenTeaserImage = (props) => {
  const { img, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__image" {...rest}>
      {children || (img && (
        <Image {...img} />
      ))}
    </div>
  );
};

GenTeaserImage.propTypes = {
  /** Either a string or react component */
  img: PropTypes.shape(Image.propTypes),
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserImage;
