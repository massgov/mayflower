import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, boolean } from '@storybook/addon-knobs/react';

import stateSeal from 'SharedAssets/images/stateseal.png';

import Footer from './index';
import FooterReadme from './Footer.md';

import FooterLinksData from '../../molecules/FooterLinks/FooterLinks.json';
import SocialLinksData from '../../molecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from '../../molecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from '../../molecules/SocialLinks/SocialLinksLive.json';

storiesOf('organisms/Footer', module).addDecorator(withKnobs)
  .add('Footer', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: object('footer.footerLinksData', FooterLinksData),
      showNavHeading: boolean('footer.showNavHeading', true),
      socialLinks: object('footer.socialLinksData', SocialLinksData),
      footerLogo: object('footer.footerLogo', {
        src: stateSeal,
        altText: 'Massachusetts State Seal'
      }),
      footerText: object('footer.footerText', {
        copyright: '2018 Commonwealth of Massachusetts.',
        description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
        privacyPolicy: {
          text: 'Mass.gov Privacy Policy',
          url: 'https://www.mass.gov/privacypolicy'
        }
      })
    };
    return(<Footer {...props} />);
  }))
  .add('Footer with live JSON', withInfo({ FooterReadme })(() => {
    const props = {
      footerLinks: object('footer.footerLinksLiveData', FooterLinksLiveData),
      showNavHeading: boolean('footer.showNavHeading', false),
      socialLinks: object('footer.socialLinksLiveData', SocialLinksLiveData),
      footerText: object('footer.footerText', {
        copyright: '2018 Commonwealth of Massachusetts.',
        description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
        privacyPolicy: {
          text: 'Mass.gov Privacy Policy',
          url: 'https://www.mass.gov/privacypolicy'
        }
      })
    };
    return(<Footer {...props} />);
  }));
