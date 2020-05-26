import React from 'react';
import NarrowTemplate from '../../templates/NarrowTemplate';
import ErrorPage from '../../organisms/ErrorPage';
import '../styles.scss';

const Error500 = () => (
  <NarrowTemplate side="right" color="yellow">
    <ErrorPage type="500" label="Uh Oh" title="Something went wrong" message="Sorry, we're having some technical issues. Please try refreshing the page in a few minutes" />
  </NarrowTemplate>
);

export default Error500;
