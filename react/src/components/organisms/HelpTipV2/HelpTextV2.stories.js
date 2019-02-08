import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import HelpTipV2 from './index';
import CalloutAlert from '../CalloutAlert';
import Paragraph from '../../atoms/text/Paragraph';

const themeOptions = {
  'c-highlight': 'c-highlight',
  'c-primary': 'c-primary (default)',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};

storiesOf('organisms/HelpTipV2', module).addDecorator(withKnobs)
  .add('HelpTip with HelpTextV2', withInfo('<div></div>')(() => {
    const props = {
      text: text('helpTip.text', 'I am a complete sentence with a help tip in it and another help tip here.'),
      textBefore: text('helpTip.textBefore', 'I am a sentence with an '),
      triggerText: text('helpTip.triggerText', 'interesting help tip'),
      textAfter: text('helpTip.textAfter', " isn't that so cool."),
      helpText: text('helpTip.helpText', 'This is a bunch of help text that should be helpful.'),
      id: text('helpText.id', 'helptext-id-123'),
      labelID: text('helpTip.labelID', 'labelID'),
      bypassMobileStyle: boolean('helpTip.bypassMobileStyle', false),
      hasMarkup: boolean('helpTip.hasMarkup', true),
      theme: select('helpTip.theme', themeOptions, 'c-primary')
    };

    return(
      <React.Fragment>
        <HelpTipV2 {...props} />
        <HelpTipV2 {...props} />
      </React.Fragment>
    );
  }))
  .add('HelpTip with Children V2', withInfo('<div></div>')(() => {
    const props = {
      text: text('helpTip.text', 'I am a complete sentence with a help tip in it and another help tip here.'),
      textBefore: text('helpTip.textBefore', 'I am a sentence with an '),
      triggerText: text('helpTip.triggerText', 'interesting help tip'),
      textAfter: text('helpTip.textAfter', " isn't that so cool."),
      id: text('helpText.id', 'helptext-id-123'),
      labelID: text('helpTip.labelID', 'labelID'),
      bypassMobileStyle: boolean('helpTip.bypassMobileStyle', false),
      hasMarkup: boolean('helpTip.hasMarkup', true),
      theme: select('helpTip.theme', themeOptions, 'c-primary')
    };

    return(
      <HelpTipV2 {...props}>
        <CalloutAlert theme={props.theme} icon={{ name: '' }}>
          <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
          <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
        </CalloutAlert>
      </HelpTipV2>
    );
  }));
