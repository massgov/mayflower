// @ts-nocheck
/**
 * Error500 module.
 * @module @massds/mayflower-react/Error500
 * @requires module:@massds/mayflower-assets/scss/04-templates/narrow-template
 * @requires module:@massds/mayflower-assets/scss/03-organisms/error-page
 */
import React from 'react';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

export interface Error500Props {
  /** A function that returns a SiteLogo component for NarrowTemplate to render. */
  siteLogo?(...args: unknown[]): unknown
}

const Error500 = ({
  siteLogo
}: Error500Props) => (
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

export default Error500;
