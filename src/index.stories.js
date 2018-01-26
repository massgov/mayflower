import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import '@massds/mayflower/css/index-generated.css';
import '@massds/mayflower/css/base-theme-generated.css';

import { Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
