import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Footer from '.';
import FooterReadme from './Footer.md';

import FooterLinksData from '../../molecules/FooterLinks/FooterLinks.json';
import SocialLinksData from '../../molecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from '../../molecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from '../../molecules/SocialLinks/SocialLinksLive.json';

storiesOf('organisms/Footer', module)
  .add('Footer', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: FooterLinksData.footerLinks,
      socialLinks: SocialLinksData.socialLinks
    };
    return(<Footer {...props} />);
  }))
  .add('Footer with live JSON', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: FooterLinksLiveData.footerLinks,
      socialLinks: SocialLinksLiveData.socialLinks
    };
    return(<Footer {...props} />);
  }));
