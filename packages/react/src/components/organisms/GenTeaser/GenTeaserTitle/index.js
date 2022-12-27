/**
 * GenTeaserTitle module.
 * @module @massds/mayflower-react/GenTeaserTitle
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'MayflowerReactBase/Icon';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

/**
 * Title Link
 */
const GenTeaserTitle = (props) => {
  const {
    level, title = {}, children, ...rest
  } = props;
  const decorativeProps = JSON.parse(JSON.stringify(title));
  if (title.icon) {
    const IconComponent = Icon[title.icon];
    decorativeProps.icon = <IconComponent width={15} height={15} aria-hidden="true" />;
  }
  const Element = `h${level || 2}`;
  return(
    <Element className="ma__gen-teaser__title" {...rest}>
      {children || <DecorativeLink {...decorativeProps} />}
    </Element>
  );
};

GenTeaserTitle.propTypes = {
  /** The heading level of the title */
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The title object (text, info, href) */
  title: PropTypes.shape(DecorativeLink.propTypes),
  /** React children to render */
  children: PropTypes.node
};

export default GenTeaserTitle;
