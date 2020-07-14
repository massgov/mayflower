import React from 'react';
import { storiesOf } from '@storybook/react';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error500 from '.';
import Error500Docs from './Error500.md';

storiesOf('pages', module)
  .add(
    'Error500', (() => (
      <Error500
        siteLogo={() => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo }} />}
      />
    )),
    { info: Error500Docs }
  );
