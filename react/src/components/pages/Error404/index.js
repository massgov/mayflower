import React from 'react';
import NarrowTemplate from 'MayflowerReactTemplates/NarrowTemplate';
import ErrorPage from 'MayflowerReactOrganisms/ErrorPage';

const Error404 = () => (
  <NarrowTemplate side="right" color="yellow">
    <ErrorPage type="404" label="Oops" title="We can't find that page" message="The link you clicked may be broken or the page may have been removed" />
  </NarrowTemplate>
);

export default Error404;
