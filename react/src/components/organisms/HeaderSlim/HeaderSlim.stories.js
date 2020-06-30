import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import HeaderSlim from '.';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import Button from 'MayflowerReactButtons/Button';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('HeaderSlim', () => {
    const siteLogoProps = {
      url: {
        domain: text('HeaderSlim siteLogo: url domain', 'https://www.mass.gov/')
      },
      image: {
        src: text('HeaderSlim siteLogo: image src', logo),
        alt: text('HeaderSlim siteLogo: image alt', 'Massachusetts state seal'),
        width: number('HeaderSlim siteLogo: image width', 45),
        height: number('HeaderSlim siteLogo: image height', 45)
      },
      siteName: text('HeaderSlim siteLogo: siteName', 'Mass.gov'),
      title: text('HeaderSlim siteLogo: title', 'Mass.gov homepage')
    };
    const headerProps = {
      siteLogo: <SiteLogo {...siteLogoProps} />
    };
    return(
      <HeaderSlim {...headerProps}>
        <Button text="login"/>
      </HeaderSlim>
    );
  });
