/**
 * GenTeaserPhone module.
 * @module @massds/mayflower-react/GenTeaserPhone
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from "react";
import PropTypes from "prop-types";
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';
import PhoneNumber from 'MayflowerReactContact/PhoneNumber';

/**
 * Phone
 */
const GenTeaserPhone = (props) => {
  const { number, details, ...rest } = props;
  const phoneProps = {
    number,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <IconPhone width={15} height={15} />
      </span>
      <PhoneNumber {...phoneProps} />
    </div>
  );
};

GenTeaserPhone.propTypes = {
  /** The phone number */
  number: PropTypes.string,
  /** Any details related to the phone number */
  details: PropTypes.string
};

export default GenTeaserPhone;
