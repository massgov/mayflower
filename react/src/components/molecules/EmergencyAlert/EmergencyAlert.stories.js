import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import EmergencyAlert from './index';
import Link from 'MayflowerReactMolecules/Link';

/* eslint-disable react/prop-types */
storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'EmergencyAlert', (() => {
      const props = {
        theme: select('theme', {
          'c-warning (default)': 'c-warning',
          'c-primary': 'c-primary',
          'c-primary-alt': 'c-primary-alt',
          'c-error': 'c-error',
          'c-gray': 'c-gray'
        }, 'c-warning'),
        message: text('message', 'MassPort is operating with limited flights due to road closures.'),
        timeStamp: text('timeStamp', '02.15.16, 5:00 p.m'),
        link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
      };
      return(
        <EmergencyAlert {...props} />
      );
    }),
    { info: '' }
  );

