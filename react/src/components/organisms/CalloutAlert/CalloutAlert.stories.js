import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import CalloutAlert from './index';
import CalloutAlertDocs from './CalloutAlert.md';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import Paragraph from 'MayflowerReactText/Paragraph';
import OrderedList from 'MayflowerReactLists/OrderedList';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

const themeOptions = {
  'c-highlight (default)': '',
  'c-primary': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};

storiesOf('organisms/CalloutAlert', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'CalloutAlert', () => {
      const name = select('CalloutAlert icon: name', svgOptions, '');
      const theme = select('theme', themeOptions, '');
      const calloutAlertProps = {
        icon: { name, ariaHidden: true },
        theme
      };
      return(
        <CalloutAlert {...calloutAlertProps}>
          <Paragraph>A paragraph (from the Greek paragraphos, &quot;to write beside&quot; or &quot;written beside&quot;) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</Paragraph>
          <OrderedList />
          <DecorativeLink />
        </CalloutAlert>
      );
    },
    { info: CalloutAlertDocs }
  )
  .add(
    'CalloutAlert with real data', () => {
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
    },
    { info: CalloutAlertDocs }
  );
