import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import HelpTip from './index';
import CalloutAlert from '../CalloutAlert';
import Paragraph from '../../atoms/text/Paragraph'

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('HelpTip', withInfo(/*`<div>${IllustratedHeaderDocs}</div>`*/)(() => {
    const props = {
      textBefore: text('helpTip.textBefore', "I am a sentence with an "),
      triggerText: text('helpTip.triggerText', "interesting help tip"),
      textAfter: text('helpTip.textAfter', " isn't that so cool."),
      helpText: text('helpTip.helpText', "This is a bunch of help text that should be helpful."),
      labelID: text('helpTip.labelID', "labelID"),
      bypassMobileStyle: boolean('helpTip.bypassMobileStyle', false),
      hasMarkup: boolean('helpTip.hasMarkup', true)
    };

    return(
      <HelpTip {...props}>
        <CalloutAlert theme="c-primary" icon={{name: ""}}>
          <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
          <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
        </CalloutAlert>
      </HelpTip>
    );
  }));
