import React from 'react';

import { storiesOf } from '@storybook/react';

import SiteLogo from './SiteLogo';
import siteLogoData from './SiteLogo.json';

storiesOf('atoms/media', module)
  .add('SiteLogo', () => <SiteLogo data={siteLogoData} />);
