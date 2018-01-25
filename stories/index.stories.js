import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import siteLogoDocs from '../src/components/atoms/media/site-logo/SiteLogo.md'
import siteLogoData from '../src/components/atoms/media/site-logo/SiteLogo.json'

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import SiteLogo from '../src/components/atoms/media/site-logo/SiteLogo';
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', withNotes(siteLogoDocs)(() => <SiteLogo data={siteLogoData} />));

storiesOf('Footer', module)
  .add('Footer', () => <Footer />);