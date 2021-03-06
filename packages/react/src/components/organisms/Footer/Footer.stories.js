import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import stateSeal from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import FooterLinksData from 'MayflowerReactMolecules/FooterLinks/FooterLinks.json';
import SocialLinksData from 'MayflowerReactMolecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from 'MayflowerReactMolecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from 'MayflowerReactMolecules/SocialLinks/SocialLinksLive.json';
import styles from '@massds/mayflower-assets/build/scss/footer.scss';
import Footer from './index';
import FooterDocs from './Footer.md';

export const FooterExample = (args) => <Footer {...args} />;

FooterExample.storyName = 'Default';
FooterExample.args = {
  footerLinks: FooterLinksData,
  showNavHeading: true,
  socialLinks: SocialLinksData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export const FooterLiveData = (args) => <Footer {...args} />;
FooterLiveData.storyName = 'Footer with live JSON';
FooterLiveData.args = {
  footerLinks: FooterLinksLiveData,
  showNavHeading: false,
  socialLinks: SocialLinksLiveData,
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
      page: () => <StoryPage styles={styles} Description={FooterDocs} />
    }
  }
};
