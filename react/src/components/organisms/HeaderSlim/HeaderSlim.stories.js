import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import logo from '../../../assets/images/stateseal.png';
import HeaderSlim from '.';
import { SiteLogo } from '../../../index';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('HeaderSlim', (() => {
    const siteLogoProps = {
      url: {
        domain: text('siteLogo.url.domain', 'https://www.mass.gov/')
      },
      image: {
        src: text('siteLogo.image.src', logo),
        alt: text('siteLogo.image.alt', 'Massachusetts state seal'),
        width: number('siteLogo.image.width', 45),
        height: number('siteLogo.image.height', 45)
      },
      siteName: text('siteLogo.siteName', 'Mass.gov'),
      title: text('siteLogo.title', 'Mass.gov homepage')
    };
    const headerProps = {
      siteLogo: <SiteLogo {...siteLogoProps} />
    };
    return(<HeaderSlim {...headerProps} />);
  }));
