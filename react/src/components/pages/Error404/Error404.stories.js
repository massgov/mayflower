import React from 'react';
import { storiesOf } from '@storybook/react';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error404 from '.';
import Error404Docs from './Error404.md';

storiesOf('pages', module)
  .add(
    'Error404', (() => (
      <Error404
        siteLogo={() => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo }} />}
      />
    )),
    { info: Error404Docs }
  );
