/**
 * GenTeaserAddress module.
 * @module @massds/mayflower-react/GenTeaserAddress
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 */
import React from 'react';
import PropTypes from 'prop-types';
import IconMarker from 'MayflowerReactBase/Icon/IconMarker';
import Address from 'MayflowerReactContact/Address';

/**
 * Address
 */
const GenTeaserAddress = (props) => {
  const {
    address, directionLink, details, ...rest
  } = props;
  const addrProps = {
    address,
    directionLink,
    details
  };
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <IconMarker width={15} height={15} />
      </span>
      <Address {...addrProps} />
    </div>
  );
};

GenTeaserAddress.propTypes = {
  /** A string or html formatted string of the address */
  address: PropTypes.string,
  /** A link to directions to the address */
  directionLink: PropTypes.string,
  /** Any details related to the phone number */
  details: PropTypes.string
};

export default GenTeaserAddress;
