import React from 'react';

import Footer from '@massds/mayflower-react/dist/FooterSlim';
import '@massds/mayflower-assets/scss/03-organisms/_footer-slim.scss';

import generateTitle from '../../util/generateTitle';

export default {
  title: generateTitle('Footer'),
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Slim = Template.bind({});
Slim.args = {
  user: {},
};
