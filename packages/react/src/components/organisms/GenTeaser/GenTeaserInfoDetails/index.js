/**
 * GenTeaserInfoDetails module.
 * @module @massds/mayflower-react/GenTeaserInfoDetails
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'MayflowerReactBase/Icon';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

/**
 * Info details
 */
const GenTeaserInfoDetails = (props) => {
  const {
    icon, href, text, ...rest
  } = props;
  const IconComponent = Icon?.[icon] ? Icon[icon] : Icon.IconLaptop;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <IconComponent width={15} height={15} />
      </span>
      {text && !href && <span>{text}</span>}
      {href && text && <DecorativeLink text={text} href={href} />}
    </div>
  );
};

GenTeaserInfoDetails.propTypes = {
  /** The text information related to the details */
  text: PropTypes.string.isRequired,
  /** The icon to render in the text, defaults to laptop icon. */
  icon: PropTypes.string,
  /** A link for the text */
  href: PropTypes.string
};

export default GenTeaserInfoDetails;
