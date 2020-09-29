import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import CalloutLink from './index';
import CalloutLinkDocs from './CalloutLink.md';
import calloutLinkOptions from './CalloutLink.knobs.options';

const Template = (args) => <CalloutLink {...args} />;
export const CalloutLinkExample = Template.bind({});

CalloutLinkExample.storyName = 'Default';
CalloutLinkExample.args = {
  text: 'Link to another page',
  href: '',
  info: 'this will be the tooltip text on hover',
  description: '',
  eyebrow: '',
  time: '',
  emphasized: '',
  theme: ''
};
CalloutLinkExample.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: calloutLinkOptions.theme
    }
  }
};

export const CalloutLinkDescription = Template.bind({});
CalloutLinkDescription.storyName = 'CalloutLink with Description';
CalloutLinkDescription.args = {
  text: 'Link to another page',
  href: '',
  info: 'this will be the tooltip text on hover',
  description: 'This is some more important information about the text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mauris quam, et imperdiet purus pellentesque vel.',
  theme: ''
};
CalloutLinkDescription.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: calloutLinkOptions.theme
    }
  }
};

export const CalloutLinkDetails = Template.bind({});
CalloutLinkDetails.storyName = 'CalloutLink with Details';
CalloutLinkDetails.args = {
  text: 'Attorney General Announces a New Health Care Program',
  href: '',
  info: 'this will be the tooltip text on hover',
  eyebrow: 'Press Release',
  time: '30 mins Ago',
  emphasized: 'Office of the Attorney General',
  theme: 'white'
};
CalloutLinkDetails.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: calloutLinkOptions.theme
    }
  }
};
export default {
  title: 'molecules/CalloutLink',
  component: CalloutLink,
  parameters: {
    docs: {
      page: () => <StoryPage Description={CalloutLinkDocs} />
    }
  }
};
