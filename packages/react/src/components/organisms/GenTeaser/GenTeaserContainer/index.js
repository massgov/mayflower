/**
 * GenTeaserContainer module.
 * @module @massds/mayflower-react/GenTeaserContainer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const GenTeaserContainer = (props) => {
  const {
    children, onClick, onKeyDown, stacked, align, className, ...rest
  } = props;
  const teaserClasses = classNames({
    'ma__gen-teaser': true,
    'ma__gen-teaser--clickable': onClick,
    'ma__gen-teaser--stacked': stacked,
    [`ma__gen-teaser--align-${align}`]: align,
    [`${className}`]: !!className
  });
  const role = onClick ? 'button' : null;
  return(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <section className={teaserClasses} onClick={onClick} onKeyDown={onKeyDown} role={role} {...rest}>
      {children}
    </section>
  );
};

GenTeaserContainer.propTypes = {
  /** A custom on click function */
  onClick: PropTypes.func,
  /** A custom on key down function */
  onKeyDown: PropTypes.func,
  /** React children to render */
  children: PropTypes.node,
  /** whether to stack image on top */
  stacked: PropTypes.bool,
  /** alignment for description relative to image */
  align: PropTypes.oneOf(['top', 'center']),
  /** A custom class. */
  className: PropTypes.string
};

export default GenTeaserContainer;
