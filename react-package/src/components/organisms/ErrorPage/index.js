import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const ErrorPage = (errorPage) => (
  <section className="ma__error-page">
    <div className="ma__error-page__type">{errorPage.type}</div>
    <div className="ma__error-page__label">{errorPage.label}</div>
    <h1 className="ma__error-page__title">{errorPage.title}</h1>
    <h2 className="ma__error-page__message">{errorPage.message}</h2>
  </section>
);

ErrorPage.propTypes = {
  /** The type of error */
  type: PropTypes.string.isRequired,
  /** The bold error label to display */
  label: PropTypes.string.isRequired,
  /** The title text for the error */
  title: PropTypes.string.isRequired,
  /** The descriptive message about the error for users to see */
  message: PropTypes.string.isRequired
};

export default ErrorPage;
