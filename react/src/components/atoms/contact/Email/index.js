import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Email = (props) => {
  const { email, details } = props;
  return(
    <span className="ma__email">
      <a href={`mailto:${email}`} className="ma__email__email">{email}</a>
      { details && (
        <p className="ma__email__details">{details}</p>
      )}
    </span>
  );
};

Email.propTypes = {
  /** The email address. */
  email: PropTypes.string.isRequired,
  /** Details around contacting the provided email. */
  details: PropTypes.string
};

export default Email;
