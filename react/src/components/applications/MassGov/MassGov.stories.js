import React from 'react';

import { storiesOf } from '@storybook/react';
import pressRelease from './pressRelease.html';

function createMarkup() {
  return {__html: pressRelease};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

storiesOf('applications|MassGov', module)
  .add(
    'PressRelease', (() => (
      <MyComponent />
    ))
  );
