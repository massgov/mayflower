import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import EmergencyAlert from './index';
import Link from '../Link';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'EmergencyAlert', (() => {
      const props = {
        message: text('message', 'MassPort is operating with limited flights due to road closures.'),
        timeStamp: text('timeStamp', '02.15.16, 5:00 p.m'),
        link: () => <Link href="https://www.mass.gov"><span>Read full alert</span></Link>
      };
      return(
        <EmergencyAlert {...props} />
      );
    }),
    { info: '' }
  );

