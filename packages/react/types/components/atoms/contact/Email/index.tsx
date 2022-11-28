// @ts-nocheck
/**
 * Email module.
 * @module @massds/mayflower-react/Email
 * @requires module:@massds/mayflower-assets/scss/01-atoms/email
 */
import React from 'react';
import parse from 'html-react-parser';

export interface EmailProps {
  /** The email address. */
  email: string
  /** Details around contacting the provided email. */
  details?: string | object
}

const Email = (props: EmailProps) => {
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

export default Email;
