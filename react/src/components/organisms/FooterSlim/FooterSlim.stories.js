import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text } from '@storybook/addon-knobs/react';

import FooterSlim from './index';
import FooterSlimReadme from './FooterSlim.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('FooterSlim', withInfo({ FooterSlimReadme })(() => {
    const props = {
      title: text('footerSlim.title','Massachusetts Executive Office of Eductation (EDU)'),
      description: text('footerSlim.description',"The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"),
      links: object('footer.footerLinksData', [
        { href: '#', title: 'Lead Agencies Policies'},
        { href: '#', title: 'Child Care Licensing Procedures'}
      ]),
      contact: {
        address: text('footerSlim.contact.address','51 Sleeper St. 4th Floor, Boston, MA 02210'),
        phone: text('footerSlim.contact.phone','(617) 988-6600'),
        online: {
          href: text('footerSlim.contact.online.href','#'),
          title: text('footerSlim.contact.online.title','EEC Official Website')
        }
      }
    }
    return(<FooterSlim {...props} />);
  }));
