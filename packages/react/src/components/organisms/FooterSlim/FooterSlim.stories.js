import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import styles from '@massds/mayflower-assets/build/scss/footer-slim.scss';
import FooterSlim from './index';
import FooterSlimDocs from './FooterSlim.md';

import Email from 'MayflowerReactContact/Email';
import PhoneNumber from 'MayflowerReactContact/PhoneNumber';
import Address from 'MayflowerReactContact/Address';
// eslint-disable import/no-unresolved
import IconMarker from 'MayflowerReactBase/Icon/IconMarker';
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';
import IconLaptop from 'MayflowerReactBase/Icon/IconLaptop';
import IconMail from 'MayflowerReactBase/Icon/IconMail';

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
  contact: [
    {
      icon: <IconMarker />,
      component: <Address address='51 Sleeper St. 4th Floor, Boston, MA 02210' />
    },
    {
      icon: <IconLaptop />,
      component: (
        <a href='#'>EEC Official Website</a>
      )
    },
    {
      icon: <IconMail />,
      component: (
        <Email 
          email ='edu@state.ma.us'
          details = 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.'
        />
      )
    },
    {
      icon: <IconPhone />,
      component: (
        <PhoneNumber 
          number = '617-988-6600'
          details = 'Our Customer Service Representatives can answer your questions in <b>English</b>, <b>Español</b>, <b>Português</b>. Translation services for up to <b>240+ languages</b> are also available to better serve employees, employers and medical providers.'
        />
      )
    }
  ],
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
  contact: [
    {
      icon: <IconMarker />,
      component: <Address address='51 Sleeper St. 4th Floor, Boston, MA 02210' />
    },
    {
      icon: <IconLaptop />,
      component: (
        <a href='#'>EEC Official Website</a>
      )
    },
    {
      icon: <IconPhone />,
      component: (
        <PhoneNumber 
          number = '617-988-6600'
          details = 'Our Customer Service Representatives can answer your questions in <b>English</b>, <b>Español</b>, <b>Português</b>. Translation services for up to <b>240+ languages</b> are also available to better serve employees, employers and medical providers.'
        />
      )
    }
  ],
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
