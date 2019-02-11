import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select } from '@storybook/addon-knobs';

import CalloutAlert from './index';
import CalloutAlertDocs from './CalloutAlert.md';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList';
import DecorativeLink from '../../atoms/links/DecorativeLink';

const themeOptions = {
  'c-highlight (default)': '',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red'
};

storiesOf('organisms/CalloutAlert', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'CalloutAlert', (() => {
      const name = select('CalloutAlert.icon', svgOptions, '');
      const theme = select('CalloutAlert.theme', themeOptions, '');
      const calloutAlertProps = {
        icon: { name, ariaHidden: true },
        theme
      };
      return(
        <CalloutAlert {...calloutAlertProps}>
          <Paragraph />
          <OrderedList />
          <DecorativeLink />
        </CalloutAlert>
      );
    }),
    { info: CalloutAlertDocs }
  )
  .add(
    'CalloutAlert with real data', (() => {
      const calloutAlertProps = {
        icon: { name: 'alert', ariaHidden: true },
        theme: 'c-primary'
      };

      return(
        <CalloutAlert {...calloutAlertProps} >
          <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
          <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
        </CalloutAlert>
      );
    }),
    { info: CalloutAlertDocs }
  );
