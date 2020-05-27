import React from 'react';
import NarrowTemplate from '../../templates/NarrowTemplate';
import ErrorPage from '../../organisms/ErrorPage';

const Error404 = () => (
  <NarrowTemplate side="right" color="yellow">
    <ErrorPage type="404" label="Oops" title="We can't find that page" message="The link you clicked may be broken or the page may have been removed" />
  </NarrowTemplate>
);

export default Error404;
