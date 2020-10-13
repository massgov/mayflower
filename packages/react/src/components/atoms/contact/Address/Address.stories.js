import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Address from './index';

export default {
  title: 'atoms/contact/Address',
  component: Address,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

export const AddressExample = (args) => <Address {...args} />;
AddressExample.storyName = 'Address (simple)';
AddressExample.args = {
  address: '324-R Clark Street, Worcester, MA 01606',
  directionLink: 'https://maps.google.com/?q=324-R+Clark+Street%2C+Worcester%2C+MA+01606',
  details: 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.'
};

export const AddressSplit = (args) => <Address {...args} />;
AddressSplit.storyName = 'Address (split)';

AddressSplit.args = {
  address: {
    streetAddress: '324-R Clark Street',
    muni: 'Worcester',
    state: 'MA',
    zip: '01606'
  },
  directionLink: 'https://maps.google.com/?q=324-R+Clark+Street%2C+Worcester%2C+MA+01606',
  details: 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.'
};
