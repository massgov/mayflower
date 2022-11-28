// @ts-nocheck
/**
 * PhoneNumber module.
 * @module @massds/mayflower-react/PhoneNumber
 * @requires module:@massds/mayflower-assets/scss/01-atoms/phone-number
 */
import React from 'react';
import parse from 'html-react-parser';

const formatPhoneNumber = (number) => {
  const clean = number.replace(/\D/g, '');
  const match = clean.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return[intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

export interface PhoneNumberProps {
  /** The phone number. Expect the following +16174659898 or 6174659898 */
  number: string
  /** Details around contacting the provided phone number */
  details?: string | object
}

const PhoneNumber = (props: PhoneNumberProps) => {
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

export default PhoneNumber;
