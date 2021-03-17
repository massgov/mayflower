import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import styles from '@massds/mayflower-assets/build/scss/footer-slim.scss';
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
  description: "The Department of Early Education and Care\'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families",
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

export const FooterSlimMultiLogos = (args) => <FooterSlim {...args} />;

FooterSlimMultiLogos.storyName = 'FooterSlim with Two Logos';
const siteLogo1Props = {
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
const siteLogo2Props = {
  url: {
    domain: 'http://www.doe.mass.edu/'
  },
  image: {
    src: 'http://www.doe.mass.edu/images/Master-Logo_695x338_color.png',
    alt: 'Department of Eduction logo',
    width: 120,
    height: 45
  },
  title: 'Department of Education homepage'
};

FooterSlimMultiLogos.args = {
  title: 'Massachusetts Executive Office of Eductation (EDU)',
  description: "The Department of Early Education and Care\'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families",
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
  siteLogo: (
    <React.Fragment>
      <SiteLogo {...siteLogo1Props} />
      <SiteLogo {...siteLogo2Props} />
    </React.Fragment>
  ),
  stackedLogo: true
};

export default {
  title: 'organisms/FooterSlim',
  component: FooterSlim,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} Description={FooterSlimDocs} />
    }
  }
};
