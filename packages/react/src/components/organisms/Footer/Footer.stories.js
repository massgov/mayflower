import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, boolean, text } from '@storybook/addon-knobs';
import stateSeal from '@massds/mayflower-assets/static/images/stateseal.png';
import Footer from './index';
import FooterDocs from './Footer.md';
import FooterLinksData from 'MayflowerReactMolecules/FooterLinks/FooterLinks.json';
import SocialLinksData from 'MayflowerReactMolecules/SocialLinks/SocialLinks.json';
import FooterLinksLiveData from 'MayflowerReactMolecules/FooterLinks/FooterLinksLive.json';
import SocialLinksLiveData from 'MayflowerReactMolecules/SocialLinks/SocialLinksLive.json';


storiesOf('organisms/Footer', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Footer', () => {
      const props = {
        footerLinks: object('footerLinks', FooterLinksData),
        showNavHeading: boolean('showNavHeading', true),
        socialLinks: object('socialLinksData', SocialLinksData),
        footerLogo: object('footer.footerLogo', {
          domain: text('footer.footerLogo.domain', 'https://www.mass.gov/'),
          src: text('footer.footerLogo.src', stateSeal),
          title: text('footer.footerLogo.title', 'Mass.gov homepage')
        }),
        footerText: object('footerText', {
          copyright: '2018 Commonwealth of Massachusetts.',
          description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
          privacyPolicy: {
            text: 'Mass.gov Privacy Policy',
            url: 'https://www.mass.gov/privacypolicy'
          }
        })
      };
      return(<Footer {...props} />);
    },
    { info: FooterDocs }
  )
  .add(
    'Footer with live JSON', () => {
      const props = {
        footerLinks: object('footerLinks', FooterLinksLiveData),
        showNavHeading: boolean('showNavHeading', false),
        socialLinks: object('socialLinks', SocialLinksLiveData),
        footerLogo: {
          src: text('footer.footerLogo.src', stateSeal)
        },
        footerText: object('footerText', {
          copyright: '2018 Commonwealth of Massachusetts.',
          description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
          privacyPolicy: {
            text: 'Mass.gov Privacy Policy',
            url: 'https://www.mass.gov/privacypolicy'
          }
        })
      };
      return(<Footer {...props} />);
    },
    { info: FooterDocs }
  );
