import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text, number } from '@storybook/addon-knobs';

import FooterSlim from './index';
import FooterSlimDocs from './FooterSlim.md';
import logo from '../../../assets/images/stateseal.png';
import { SiteLogo } from '../../../index';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'FooterSlim', (() => {
      const siteLogoProps = {
        url: {
          domain: text('siteLogo.url.domain', 'https://www.mass.gov/')
        },
        image: {
          src: text('siteLogo.image.src', logo),
          alt: text('siteLogo.image.alt', 'Massachusetts state seal'),
          width: number('siteLogo.image.width', 45),
          height: number('siteLogo.image.height', 45)
        },
        siteName: text('siteLogo.siteName', 'Mass.gov'),
        title: text('siteLogo.title', 'Mass.gov homepage')
      };
      const props = {
        title: text('footerSlim.title', 'Massachusetts Executive Office of Eductation (EDU)'),
        description: text('footerSlim.description', "The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"),
        links: object('footer.footerLinksData', [
          { href: '#', title: 'Lead Agencies Policies' },
          { href: '#', title: 'Child Care Licensing Procedures' }
        ]),
        contact: {
          address: text('footerSlim.contact.address', '51 Sleeper St. 4th Floor, Boston, MA 02210'),
          phone: text('footerSlim.contact.phone', '(617) 988-6600'),
          online: {
            href: text('footerSlim.contact.online.href', '#'),
            title: text('footerSlim.contact.online.title', 'EEC Official Website')
          }
        },
        siteLogo: <SiteLogo {...siteLogoProps} />
      };
      return(<FooterSlim {...props} />);
    }),
    { info: FooterSlimDocs }
  );
