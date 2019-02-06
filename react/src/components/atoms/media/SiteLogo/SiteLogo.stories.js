import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import logo from 'SharedAssets/images/stateseal.png';

import SiteLogo from '.';
import SiteLogoDocs from './SiteLogo.md';

storiesOf('atoms/media', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('SiteLogo', (() => {
    const siteLogoProps = {
      url: {
        domain: text('siteLogo.url.domain', 'https://www.mass.gov/')
      },
      image: {
        src: text('siteLogo.image.src', logo),
        alt: text('siteLogo.image.alt', ''),
        width: number('siteLogo.image.width', 45),
        height: number('siteLogo.image.height', 45)
      },
      siteName: text('siteLogo.siteName', 'Mass.gov'),
      title: text('siteLogo.title', 'Mass.gov homepage')
    };
    return(<SiteLogo {...siteLogoProps} />);
  }),
   { info: SiteLogoDocs }
  );
