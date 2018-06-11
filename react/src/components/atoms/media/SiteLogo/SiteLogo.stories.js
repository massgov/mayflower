import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import SiteLogo from '.';
import SiteLogoReadme from './SiteLogo.md';

storiesOf('atoms/media', module).addDecorator(withKnobs)
  .add('SiteLogo', withInfo(`<div>${SiteLogoReadme}</div>`)(() => {
    const siteLogoProps = {
      url: {
        domain: text('siteLogo.url.domain', 'https://www.mass.gov/')
      }
    };
    return(<SiteLogo {...siteLogoProps} />);
  }));
