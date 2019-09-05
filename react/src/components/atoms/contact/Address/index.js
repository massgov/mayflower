import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from '../../links/DecorativeLink';
import './style.css';

const Address = (props) => {
  const { address, directionLink, details } = props;
  return(
    <span className="ma__address">
      { address.streetAddress ? (
          <div className="ma__address__address">
            <div className="ma__address__part">{address.streetAddress}</div>
            <div className="ma__address__part">{`${address.muni}, ${address.state} ${address.zip}`}</div>
          </div>
        ) : (
          <div className="ma__address__address" dangerouslySetInnerHTML={{ __html: address }} />
        )
      }
      { directionLink && (
        <div className="ma__address__directions">
          <DecorativeLink text="Directions" href={directionLink} />
        </div>
      )}
      { details && (
        <p className="ma__address__details">{details}</p>
      )}
    </span>
  );
};

Address.propTypes = {
  /** An object or string representing the address.
      If parsed the object contains the following:
        streetAddress: street number, name, if applicable apt/unit number
        muni: municipality/city/town
        state: state
        zip: zipcode
        country: country
      If a simple string just passed as:
        address: full address. */
  address: PropTypes.oneOfType([
    PropTypes.shape({
      streetAddress: PropTypes.string,
      muni: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
      country: PropTypes.string
    }),
    PropTypes.string
  ]).isRequired,
  /** A link to the directions of the address. */
  directionLink: PropTypes.string,
  /** Details around visiting the address. */
  details: PropTypes.string
};

export default Address;
