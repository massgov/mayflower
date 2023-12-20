import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import stateSeal from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import FooterLinksData from './FooterLinks.json';
import FooterLinksLiveData from './FooterLinksLive.json';
import stylesFooter from '@massds/mayflower-assets/build/scss/footer-new.scss';
import Footer from './index';
import FooterDocs from './Footer.md';

export const FooterExample = (args) => <Footer {...args} />;

FooterExample.storyName = 'Default';
FooterExample.args = {
  footerLinks: FooterLinksData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export const FooterLiveData = (args) => <Footer {...args} />;
FooterLiveData.storyName = 'Footer with live JSON';
FooterLiveData.args = {
  footerLinks: FooterLinksLiveData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export default {
  title: 'organisms/Footer',
  component: Footer,
  parameters: {
    docs: {
      page: () => <StoryPage styles={stylesFooter} Description={FooterDocs} />
    }
  }
};
