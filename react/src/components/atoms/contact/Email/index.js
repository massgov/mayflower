import React from 'react';
import PropTypes from 'prop-types';
import parse from 'react-html-parser';
import './style.scss';

const Email = (props) => {
  const { email, details } = props;
  return(
    <span className="ma__email">
      <a href={`mailto:${email}`} className="ma__email__email">{email}</a>
      { details && (
        <p className="ma__contact__details">{parse(details)}</p>
      )}
    </span>
  );
};

Email.propTypes = {
  /** The email address. */
  email: PropTypes.string.isRequired,
  /** Details around contacting the provided email. */
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Email;
