import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import FooterSlim from './index';
import FooterSlimDocs from './FooterSlim.md';

export const FooterSlimExample = (args) => <FooterSlim {...args} />;

FooterSlimExample.storyName = 'Default';
const siteLogoProps = {
  url: {
    domain: 'https://www.mass.gov/'
  },
  image: {
    src: logo,
    alt: 'Massachusetts state seal',
    width: 45,
    height: 45
  },
  title: 'Mass.gov homepage'
};
FooterSlimExample.args = {
  title: 'Massachusetts Executive Office of Eductation (EDU)',
  description: "The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families",
  links: [
    { href: '#', title: 'Lead Agencies Policies' },
    { href: '#', title: 'Child Care Licensing Procedures' }
  ],
  contact: {
    address: '51 Sleeper St. 4th Floor, Boston, MA 02210',
    phone: '(617) 988-6600',
    online: {
      href: '#',
      title: 'EEC Official Website'
    }
  },
  siteLogo: <SiteLogo {...siteLogoProps} />
};

export default {
  title: 'organisms/FooterSlim',
  component: FooterSlim,
  parameters: {
    docs: {
      page: () => <StoryPage Description={FooterSlimDocs} />
    }
  }
};
