import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, array } from '@storybook/addon-knobs/react';

import HelpTip from './index';
import CalloutAlert from '../CalloutAlert';
import Paragraph from '../../atoms/text/Paragraph';

const themeOptions = {
  'c-highlight': 'c-highlight',
  'c-primary (default)': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};

storiesOf('organisms/HelpTip', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('HelpTip with HelpText', (() => {
    const props = {
      text: text('helpTip.text', 'I am a complete sentence with a help tip in it and another help tip here.'),
      triggerText: array('helpTip.triggerText', ['a help tip', 'another help tip']),
      helpText: array('helpTip.helpText', ['This is a bunch of help text that should be helpful.', 'Another bunch of help text that should be helpful.']),
      id: text('helpText.id', 'helptext-id-123'),
      bypassMobileStyle: boolean('helpTip.bypassMobileStyle', false),
      hasMarkup: boolean('helpTip.hasMarkup', true),
      theme: select('helpTip.theme', themeOptions, 'c-primary'),
      disabled: boolean('helpTip.disabled', false)
    };

    return(<HelpTip {...props} />);
  }))
  .add('HelpTip with Children', (() => {
    const props = {
      text: text('helpTip.text', 'I am a complete sentence with a help tip in it and another help tip here.'),
      triggerText: array('helpTip.triggerText', ['a help tip', 'another help tip']),
      id: text('helpText.id', 'helptext-id-123'),
      bypassMobileStyle: boolean('helpTip.bypassMobileStyle', false),
      hasMarkup: boolean('helpTip.hasMarkup', true),
      theme: select('helpTip.theme', themeOptions, 'c-primary'),
      disabled: boolean('helpTip.disabled', false)
    };

    return(
      <HelpTip {...props}>
        <CalloutAlert theme={props.theme} icon={null}>
          <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
          <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
        </CalloutAlert>
        <CalloutAlert theme={props.theme} icon={null}>
          <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
          <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
        </CalloutAlert>
      </HelpTip>
    );
  }));
