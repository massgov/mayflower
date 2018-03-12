import React from 'react';
import NarrowTemplate from '../../templates/NarrowTemplate';
import ErrorPage from '../../organisms/ErrorPage';

const Error403 = () => (
  <NarrowTemplate side="right" color="yellow">
    <ErrorPage type="403" label="Oh no" title="This Page is forbidden" message="Sorry, you don't have access to this page" />
  </NarrowTemplate>
);

export default Error403;
