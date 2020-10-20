import React from 'react';

import Header from '@massds/mayflower-react/dist/HeaderSlim';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import '@massds/mayflower-assets/scss/03-organisms/_header-slim.scss';
import '@massds/mayflower-assets/scss/01-atoms/_site-logo.scss';

export default {
  title: 'Brand Components/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Slim = Template.bind({});
Slim.args = {
  siteLogo: (
    <SiteLogo
      url={{
        domain: 'https://www.mass.gov/'
      }}
      image={{
        src: logo,
        alt: 'Massachusetts state seal',
        width: 45,
        height: 45
      }}
      siteName="Mass.gov"
      title="Mass.gov homepage"
    />
  )
};
