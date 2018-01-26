import React from 'react';

import { storiesOf } from '@storybook/react';

import SiteLogo from '../site-logo/SiteLogo';
import siteLogoData from '../site-logo/SiteLogo.json';

storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', () => <SiteLogo data={siteLogoData} />);
