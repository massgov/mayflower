import React from 'react';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

const Error500 = () => (
  <NarrowTemplate side="right" color="yellow">
    <ErrorPage type="500" label="Uh Oh" title="Something went wrong" message="Sorry, we're having some technical issues. Please try refreshing the page in a few minutes" />
  </NarrowTemplate>
);

export default Error500;
