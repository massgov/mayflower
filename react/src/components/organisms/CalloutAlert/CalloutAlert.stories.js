import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import CalloutAlert from './index';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';

import Icon from '../../atoms/icons/Icon';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('CalloutAlert', withInfo(`<div></div>`)(() => {
    const name = select('CalloutAlert.icon', svgOptions, '');


    const themeOptions = {
      '': 'c-highlight (default)',
      'c-primary': 'c-primary',
      'c-primary-alt': 'c-primary-alt',
      'c-gray-dark': 'c-gray-dark',
      'c-error-red': 'c-error-red'
    }
    const theme = select('CalloutAlert.theme', themeOptions, '');
    const calloutAlertProps = {
      icon: { name },
      theme
    };

    return(
      <CalloutAlert {...calloutAlertProps}>
        <Paragraph />
        <OrderedList />
      </CalloutAlert>
    );
  }));
