import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { SiteLogo } from '../../../index';
import SimpleHeader from '.';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('SimpleHeader', withInfo('<div></div>')(() => {
    const siteLogoProps = {
      url: {
        domain: text('siteLogo.url.domain', 'https://www.mass.gov/')
      }
    };
    const props = {
      siteLogo: <SiteLogo {...siteLogoProps} />
    };
    return(<SimpleHeader {...props} />);
  }));
