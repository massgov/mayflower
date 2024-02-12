import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import stateSeal from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import FooterLinksData from 'MayflowerReactMolecules/FooterLinks/FooterLinks.json';
import SocialLinksData from 'MayflowerReactMolecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from 'MayflowerReactMolecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from 'MayflowerReactMolecules/SocialLinks/SocialLinksLive.json';
import styles from '@massds/mayflower-assets/build/scss/footer-with-columns.scss';
import FooterWithColumns from './index';
import FooterWithColumnsDocs from './FooterWithColumns.md';

export const FooterWithColumnsExample = (args) => <FooterWithColumns {...args} />;

FooterWithColumnsExample.storyName = 'Default';
FooterWithColumnsExample.args = {
  footerLinks: FooterLinksData,
  showNavHeading: true,
  socialLinks: SocialLinksData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export const FooterWithColumnsLiveData = (args) => <FooterWithColumns {...args} />;
FooterWithColumnsLiveData.storyName = 'Footer With Columns with live JSON';
FooterWithColumnsLiveData.args = {
  footerLinks: FooterLinksLiveData,
  showNavHeading: false,
  socialLinks: SocialLinksLiveData,
  footerLogo: {
    src: stateSeal
  },
  footerText: {}
};

export default {
  title: 'organisms/FooterWithColumns',
  component: FooterWithColumns,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} Description={FooterWithColumnsDocs} />
    }
  }
};
