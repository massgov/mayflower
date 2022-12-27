/**
 * GenTeaserEmail module.
 * @module @massds/mayflower-react/GenTeaserEmail
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";
import IconMail from 'MayflowerReactBase/Icon/IconMail';
import Email from 'MayflowerReactContact/Email';

/**
 * Email
 */
const GenTeaserEmail = (props) => {
  const { email, details, ...rest } = props;
  const emailProps = {
    email,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <IconMail width={15} height={15} />
      </span>
      <Email {...emailProps} />
    </div>
  );
};

GenTeaserEmail.propTypes = {
  /** The email address. */
  email: PropTypes.string.isRequired,
  /** Details around contacting the provided email. */
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default GenTeaserEmail;
