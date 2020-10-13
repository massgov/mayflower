/**
 * Error500 module.
 * @module @massds/mayflower-react/Error500
 * @requires module:@massds/mayflower-assets/scss/04-templates/narrow-template
 * @requires module:@massds/mayflower-assets/scss/03-organisms/error-page
 */
import React from 'react';
import PropTypes from 'prop-types';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

const Error500 = ({ siteLogo }) => (
  <NarrowTemplate
    side="right"
    color="yellow"
    siteLogo={siteLogo}
  >
    <ErrorPage
      type="500"
      label="Uh Oh"
      title="Something went wrong"
      message="Sorry, we're having some technical issues. Please try refreshing the page in a few minutes"
    />
  </NarrowTemplate>
);

Error500.propTypes = {
  /** A function that returns a SiteLogo component for NarrowTemplate to render. */
  siteLogo: PropTypes.func
};

export default Error500;
