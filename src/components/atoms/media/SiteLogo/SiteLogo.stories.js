import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SiteLogo from '.';
import SiteLogoReadme from './SiteLogo.md';

storiesOf('atoms/media', module)
  .add('SiteLogo', withInfo(`<div>${SiteLogoReadme}</div>`)(() => <SiteLogo />));
