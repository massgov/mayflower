// @ts-nocheck
/**
 * Address module.
 * @module @massds/mayflower-react/Address
 * @requires module:@massds/mayflower-assets/scss/01-atoms/address
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';
import parse from 'html-react-parser';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

export interface AddressProps {
  /** An object or string representing the address.
      If parsed the object contains the following:
        streetAddress: street number, name, if applicable apt/unit number
        muni: municipality/city/town
        state: state
        zip: zipcode
        country: country
      If a simple string just passed as:
        address: full address. */
  address: {
    streetAddress?: string
    muni?: string
    state?: string
    zip?: string
    country?: string
  } | string | object
  /** A link to the directions of the address. */
  directionLink?: string
  /** Details around visiting the address. */
  details?: string | object
}

const Address = (props: AddressProps) => {
  const { address, directionLink, details } = props;
  return(
    <span className="ma__address">
      { address.streetAddress ? (
        <div className="ma__address__address">
          <div className="ma__address__part">{address.streetAddress}</div>
          <div className="ma__address__part">{`${address.muni}, ${address.state} ${address.zip}`}</div>
        </div>
      ) : (
        <div className="ma__address__address">{parse(address)}</div>
      )}
      { details && (
        <p className="ma__contact__details">{parse(details)}</p>
      )}
      { directionLink && (
        <div className="ma__address__directions">
          <DecorativeLink text="Directions" href={directionLink} />
        </div>
      )}
    </span>
  );
};

export default Address;
