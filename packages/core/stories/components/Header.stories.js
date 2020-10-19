import React from 'react';

import Header from '@massds/mayflower-react/dist/HeaderSlim';
import '@massds/mayflower-assets/scss/03-organisms/_header-slim.scss';

export default {
  title: 'Brand Components/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Slim = Template.bind({});
Slim.args = {
  user: {},
};
