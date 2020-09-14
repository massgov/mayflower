import React from 'react';
import { storiesOf } from '@storybook/react';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error403 from '.';
import Error403Docs from './Error403.md';

storiesOf('pages', module)
  .add(
    'Error403', (() => (
      <Error403
        siteLogo={() => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo }} />}
      />
    )),
    { info: Error403Docs }
  );
