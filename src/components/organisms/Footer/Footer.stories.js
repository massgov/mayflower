import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import Footer from '.';
import FooterReadme from './Footer.md';

import FooterLinksData from '../../molecules/FooterLinks/FooterLinks.json';
import SocialLinksData from '../../molecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from '../../molecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from '../../molecules/SocialLinks/SocialLinksLive.json';

storiesOf('organisms/Footer', module).addDecorator(withKnobs)
  .add('Footer', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: object('footer.footerLinksData', FooterLinksData),
      socialLinks: object('footer.socialLinksData', SocialLinksData),
      privacyPolicy: text('footer.privacyPolicy', '')
    };
    return(<Footer {...props} />);
  }))
  .add('Footer with live JSON', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: object('footer.footerLinksLiveData', FooterLinksLiveData),
      socialLinks: object('footer.socialLinksLiveData', SocialLinksLiveData),
      privacyPolicy: text('footer.privacyPolicy', 'https://www.mass.gov/privacypolicy')
    };
    return(<Footer {...props} />);
  }));
