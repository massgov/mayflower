import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import EmergencyAlert from './index';
import Button from '../../atoms/buttons/Button';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'EmergencyAlert', (() => {
      const props = {
        theme: select('theme', {
          'c-warning (default)': 'c-warning',
          'no theme': '',
          'c-primary-alt': 'c-primary-alt',
          'c-gray-dark': 'c-gray-dark'
        }),
        message: text('message', 'MassPort is operating with limited flights due to road closures.'),
        timeStamp: text('timeStamp', '02.15.16, 5:00 p.m'),
        link: ({ theme }) => <Button href="https://www.mass.gov">Read full alert</Button>
      };
      return(
        <EmergencyAlert {...props} />
      );
    }),
    { info: '' }
  );

