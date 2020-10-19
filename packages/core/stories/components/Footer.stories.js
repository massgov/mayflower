import React from 'react';

import Footer from '@massds/mayflower-react/dist/FooterSlim';
import '@massds/mayflower-assets/scss/03-organisms/_footer-slim.scss';

export default {
  title: 'Brand Components/Footer',
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Slim = Template.bind({});
Slim.args = {
  user: {},
};
