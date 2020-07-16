/**
 * Error404 module.
 * @module @massds/mayflower-react/Error404
 * @requires module:@massds/mayflower-assets/scss/04-templates/narrow-template
 * @requires module:@massds/mayflower-assets/scss/03-organisms/error-page
 */
import React from 'react';
import PropTypes from 'prop-types';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

const Error404 = ({ siteLogo }) => (
  <NarrowTemplate
    side="right"
    color="yellow"
    siteLogo={siteLogo}
  >
    <ErrorPage
      type="404"
      label="Oops"
      title="We can't find that page"
      message="The link you clicked may be broken or the page may have been removed"
    />
  </NarrowTemplate>
);

Error404.propTypes = {
  /** A function that returns a SiteLogo component for NarrowTemplate to render. */
  siteLogo: PropTypes.func
};

export default Error404;
