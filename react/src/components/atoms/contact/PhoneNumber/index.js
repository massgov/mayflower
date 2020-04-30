import React from 'react';
import PropTypes from 'prop-types';
import parse from 'react-html-parser';
import './style.css';

const formatPhoneNumber = (number) => {
  const clean = number.replace(/\D/g, '');
  const match = clean.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return[intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

const PhoneNumber = (props) => {
  const { number, details } = props;
  const display = formatPhoneNumber(number);
  return(
    <span className="ma__phone-number">
      <a href={`tel:${number}`} className="ma__phone-number__number">{display}</a>
      { details && (
        <p className="ma__contact__details">{parse(details)}</p>
      )}
    </span>
  );
};

PhoneNumber.propTypes = {
  /** The phone number. Expect the following +16174659898 or 6174659898 */
  number: PropTypes.string.isRequired,
  /** Details around contacting the provided phone number */
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default PhoneNumber;
