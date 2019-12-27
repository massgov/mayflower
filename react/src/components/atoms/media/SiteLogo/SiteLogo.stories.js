import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import logo from 'SharedAssets/images/stateseal.png';

import SiteLogo from '.';
import SiteLogoDocs from './SiteLogo.md';

storiesOf('atoms/media', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SiteLogo', (() => {
      const siteLogoProps = {
        url: {
          domain: text('domain', 'https://www.mass.gov/')
        },
        image: {
          src: text('src', logo),
          alt: text('alt', ''),
          width: number('width', 45),
          height: number('height', 45)
        },
        siteName: text('siteName', 'Mass.gov'),
        title: text('title', 'Mass.gov homepage')
      };
      return(<SiteLogo {...siteLogoProps} />);
    }),
    { info: SiteLogoDocs }
  );
