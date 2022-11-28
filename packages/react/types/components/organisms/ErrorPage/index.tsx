// @ts-nocheck
/**
 * ErrorPage module.
 * @module @massds/mayflower-react/ErrorPage
 * @requires module:@massds/mayflower-assets/scss/03-organisms/error-page
 */
import React from 'react';

export interface ErrorPageProps {
  /** The type of error */
  type: string
  /** The bold error label to display */
  label: string
  /** The title text for the error */
  title: string
  /** The descriptive message about the error for users to see */
  message: string
}

const ErrorPage = (errorPage: ErrorPageProps) => (
  <section className="ma__error-page">
    <div className="ma__error-page__type">{errorPage.type}</div>
    <div className="ma__error-page__label">{errorPage.label}</div>
    <h1 className="ma__error-page__title">{errorPage.title}</h1>
    <h2 className="ma__error-page__message">{errorPage.message}</h2>
  </section>
);

export default ErrorPage;
