// @ts-nocheck
/**
 * Image module.
 * @module @massds/mayflower-react/Image
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 */
import React from 'react';
import classNames from 'classnames';

export interface ImageProps {
  classes?: string[]
  src: string
  alt?: string
  width?: number
  height?: number
  shape?: string
}

const Image = (props: ImageProps) => {
  const { classes, shape, ...imgProps } = props;
  const imageClasses = classNames({
    ma__image: true,
    [shape]: shape,
    [classes && classes.join(' ')]: classes
  });
  // eslint-disable-next-line jsx-a11y/alt-text
  return(<img className={imageClasses} {...imgProps} />);
};

Image.defaultProps = {
  alt: '',
  shape: ''
};

export default Image;
