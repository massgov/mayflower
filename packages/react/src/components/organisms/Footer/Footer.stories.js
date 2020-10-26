import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import stateSeal from '@massds/mayflower-assets/static/images/stateseal.png';
import FooterLinksData from 'MayflowerReactMolecules/FooterLinks/FooterLinks.json';
import SocialLinksData from 'MayflowerReactMolecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from 'MayflowerReactMolecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from 'MayflowerReactMolecules/SocialLinks/SocialLinksLive.json';
import Footer from './index';
import FooterDocs from './Footer.md';
import styles from './_index.scss';

export const FooterExample = (args) => <Footer {...args} />;

FooterExample.storyName = 'Default';
FooterExample.args = {
  footerLinks: FooterLinksData,
  showNavHeading: true,
  socialLinks: SocialLinksData,
  footerLogo: {
    domain: 'https://www.mass.gov/',
    src: stateSeal,
    title: 'Mass.gov homepage'
  },
  footerText: {
    copyright: '2020 Commonwealth of Massachusetts.',
    description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
    privacyPolicy: {
      text: 'Mass.gov Privacy Policy',
      url: 'https://www.mass.gov/privacypolicy'
    }
  }
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
  footerText: {
    copyright: '2020 Commonwealth of Massachusetts.',
    description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
    privacyPolicy: {
      text: 'Mass.gov Privacy Policy',
      url: 'https://www.mass.gov/privacypolicy'
    }
  }
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
