// @TODO come up with a welcome story
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import './index.css';

import Docs from '../README.md';

storiesOf('Welcome🎉|mayflower-react', module)
  .add(
    'About', (() => {
      return(Docs);
    })
  );
