import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import CalloutAlert from 'MayflowerReactOrganisms/CalloutAlert';
import Paragraph from 'MayflowerReactText/Paragraph';
import HelpTip from './index';

const themeOptions = {
  'c-highlight': 'c-highlight',
  'c-primary (default)': 'c-primary',
  'c-primary-alt': 'c-primary-alt',
  'c-gray-dark': 'c-gray-dark',
  'c-error-red': 'c-error-red',
  'c-white': 'c-white'
};

export const HelpTipExample = (args) => <HelpTip {...args} />;

HelpTipExample.storyName = 'Default';
HelpTipExample.args = {
  text: 'I am a complete sentence with a help tip in it and another help tip here.',
  triggerText: ['a help tip', 'another help tip'],
  helpText: ['This is a bunch of help text that should be helpful.', 'Another bunch of help text that should be helpful.'],
  id: 'helptext-id-123',
  bypassMobileStyle: false,
  hasMarkup: true,
  theme: 'c-primary',
  disabled: false
};
HelpTipExample.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: themeOptions
    }
  }
};
export const HelpTipWithChildren = (args) => (
  <HelpTip {...args}>
    <CalloutAlert theme={args.theme} icon={null}>
      <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
      <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
    </CalloutAlert>
    <CalloutAlert theme={args.theme} icon={null}>
      <Paragraph text="<strong>You are required to remit payment to the department starting 7/1.</strong> Because you have more than 25 total employees in Massachusetts." />
      <Paragraph text="<strong>You are required to remit payment on behalf of your contractors.</strong> For employers with over 50% their workforce made up of 1099s need to consider these as full time employees under the new language." />
    </CalloutAlert>
  </HelpTip>
);
HelpTipWithChildren.args = {
  text: 'I am a complete sentence with a help tip in it and another help tip here.',
  triggerText: ['a help tip', 'another help tip'],
  id: 'helptext-id-123',
  bypassMobileStyle: false,
  hasMarkup: true,
  theme: 'c-primary',
  disabled: false
};

export default {
  title: 'organisms/HelpTip',
  component: HelpTip,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
