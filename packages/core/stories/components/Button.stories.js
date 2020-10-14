import React from 'react';

import Button from '@massds/mayflower-react/dist/Button';
import '@massds/mayflower-react/dist/Button/_index.scss';

export default {
  title: 'Base Elements/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  text: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  text: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  text: 'Button',
};
