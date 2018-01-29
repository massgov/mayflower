import React from 'react';

import { storiesOf } from '@storybook/react';

import SiteLogo from './SiteLogo';
import siteLogoData from './SiteLogo.json';

storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', () => <SiteLogo data={siteLogoData} />);
