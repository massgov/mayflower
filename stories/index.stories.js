import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import siteLogoDocs from '../src/components/atoms/media/site-logo/SiteLogo.md';
import siteLogoData from '../src/components/atoms/media/site-logo/SiteLogo.json';

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';

import SiteLogo from '../src/components/atoms/media/site-logo/SiteLogo';
import Button from '../src/components/atoms/buttons/Button';
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Atoms/Buttons/Button', module)
  .add('Button', () => <Button>Submit</Button>)
  .add('Button with text', () => <Button text="Example text" />)
  .add('Button with size', () => <Button size="small">Submit</Button>)
  .add('Button with theme', () => <Button theme="secondary">Submit</Button>)
  .add('Button with href', () => <Button href="http://www.google.com">Click</Button>);

storiesOf('Atoms/Media/Site Logo', module)
  .add('Site Logo', () => <SiteLogo data={siteLogoData} />);

storiesOf('Organisms', module)
  .add('Footer', () => <Footer />);
