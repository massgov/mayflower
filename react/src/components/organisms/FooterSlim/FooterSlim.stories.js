import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, text, number } from '@storybook/addon-knobs';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import FooterSlim from './index';
import FooterSlimDocs from './FooterSlim.md';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'FooterSlim', () => {
      const siteLogoProps = {
        url: {
          domain: text('FooterSlim siteLogo: url domain', 'https://www.mass.gov/', 'SiteLogo')
        },
        image: {
          src: text('FooterSlim siteLogo: image src', logo, 'SiteLogo'),
          alt: text('FooterSlim siteLogo: image alt', 'Massachusetts state seal', 'SiteLogo'),
          width: number('FooterSlim siteLogo: image width', 45, 'SiteLogo'),
          height: number('FooterSlim siteLogo: image height', 45, 'SiteLogo')
        },
        siteName: text('FooterSlim siteLogo: siteName', 'Mass.gov', 'SiteLogo'),
        title: text('FooterSlim siteLogo: title', 'Mass.gov homepage', 'SiteLogo')
      };
      const props = {
        title: text('title', 'Massachusetts Executive Office of Eductation (EDU)'),
        description: text('description', "The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"),
        links: object('links', [
          { href: '#', title: 'Lead Agencies Policies' },
          { href: '#', title: 'Child Care Licensing Procedures' }
        ]),
        contact: {
          address: text('FooterSlim contact: address', '51 Sleeper St. 4th Floor, Boston, MA 02210', 'Contact'),
          phone: text('FooterSlim contact: phone', '(617) 988-6600', 'Contact'),
          online: {
            href: text('FooterSlim contact: online href', '#', 'Contact'),
            title: text('FooterSlim contact: online title', 'EEC Official Website', 'Contact')
          }
        },
        siteLogo: <SiteLogo {...siteLogoProps} />
      };
      return(<FooterSlim {...props} />);
    },
    { info: FooterSlimDocs }
  );
