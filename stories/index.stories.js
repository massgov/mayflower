import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';
import LatLonGlobe from '../src/components/atoms/icons/LatLonGlobe/LatLonGlobe';
import Footer from '../src/components/organisms/Footer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Atoms/Icons', module)
  .add('LatLonGlobe', () => <LatLonGlobe/>);
storiesOf('Footer', module)
  .add('Footer', () => <Footer />);