import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import levelOptions from 'MayflowerReactHeadings/Headings.knobs.options';

import ContactGroup from './index';
import ContactGroupDocs from './ContactGroup.md';
import contactGroupOptions from './ContactGroup.knobs.options';

export const ContactGroupExample = (args) => <ContactGroup {...args} />;

ContactGroupExample.storyName = 'Default';
ContactGroupExample.args = {
  icon: 'SvgPhone',
  name: 'Phone',
  level: 2,
  items: [{
    type: contactGroupOptions.itemsType,
    label: 'Main:',
    address: '',
    link: {
      href: '+14134994262',
      text: '(413) 499-4262',
      info: ''
    },
    details: 'This line is open from 9:00 a.m. - 5:00 p.m., M-F'
  }, {
    type: contactGroupOptions.itemsType,
    label: 'Toll Free:',
    address: '',
    link: {
      href: '+18004324321',
      text: '(800) 432-4321',
      info: ''
    },
    details: 'This line is open from 9:00 a.m. - 5:00 p.m., M-F'
  }]
};
ContactGroupExample.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: contactGroupOptions.icon
    }
  },
  name: {
    control: {
      type: 'select',
      options: contactGroupOptions.name
    }
  },
  level: {
    control: {
      type: 'select',
      options: levelOptions.levels
    }
  }
};

export default {
  title: 'molecules/ContactGroup',
  component: ContactGroup,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ContactGroupDocs} />
    }
  }
};
