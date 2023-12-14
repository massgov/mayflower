import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import stateSeal from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import FooterNewLinksData from './FooterNewLinks.json';
import FooterNewLinksLiveData from './FooterNewLinksLive.json';
import stylesFooterNew from '@massds/mayflower-assets/build/scss/footer-new.scss';
import FooterNew from './index';
import FooterNewDocs from './FooterNew.md';

export const FooterNewExample = (args) => <FooterNew {...args} />;

FooterNewExample.storyName = 'Default';
FooterNewExample.args = {
  footerLinks: FooterNewLinksData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export const FooterNewLiveData = (args) => <FooterNew {...args} />;
FooterNewLiveData.storyName = 'FooterNew with live JSON';
FooterNewLiveData.args = {
  footerLinks: FooterNewLinksLiveData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export default {
  title: 'organisms/FooterNew',
  component: FooterNew,
  parameters: {
    docs: {
      page: () => <StoryPage styles={stylesFooterNew} Description={FooterNewDocs} />
    }
  }
};
