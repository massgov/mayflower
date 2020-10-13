/**
 * Error403 module.
 * @module @massds/mayflower-react/Error403
 * @requires module:@massds/mayflower-assets/scss/04-templates/narrow-template
 * @requires module:@massds/mayflower-assets/scss/03-organisms/error-page
 */
import React from 'react';
import PropTypes from 'prop-types';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

const Error403 = ({ siteLogo }) => (
  <NarrowTemplate
    side="right"
    color="yellow"
    siteLogo={siteLogo}
  >
    <ErrorPage
      type="403"
      label="Oh no"
      title="This Page is forbidden"
      message="Sorry, you don't have access to this page"
    />
  </NarrowTemplate>
);

Error403.propTypes = {
  /** A function that returns a SiteLogo component for NarrowTemplate to render. */
  siteLogo: PropTypes.func
};

export default Error403;
