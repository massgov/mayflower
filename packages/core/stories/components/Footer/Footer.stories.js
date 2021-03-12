import React from 'react';
import FooterSlim from '@massds/mayflower-react/dist/FooterSlim';
import Footer from '@massds/mayflower-react/dist/Footer';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import { attachHTML } from '../../util/renderCode';

import footerLinks from './Footer.data';

const { STORYBOOK_CDN_PATH } = process.env;

const footerBasic = (
  <FooterSlim
    contact={{
      address: '51 Sleeper St. 4th Floor, Boston, MA 02210',
      online: {
        href: '#',
        title: 'EEC Official Website'
      },
      phone: '(617) 988-6600'
    }}
    description="The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"
    links={[
      {
        href: '#',
        title: 'Lead Agencies Policies'
      },
      {
        href: '#',
        title: 'Child Care Licensing Procedures'
      }
    ]}
    siteLogo={(
      <SiteLogo
        image={{
          alt: 'Massachusetts state seal', height: 45, src: logo, width: 45
        }}
        title="Mass.gov homepage"
        url={{ domain: 'https://www.mass.gov/' }}
      />
)}
    title="Massachusetts Executive Office of Eductation (EDU)"
  />
);

const footerDuelLogo = (
  <FooterSlim
    contact={{
      address: '51 Sleeper St. 4th Floor, Boston, MA 02210',
      online: {
        href: '#',
        title: 'EEC Official Website'
      },
      phone: '(617) 988-6600'
    }}
    description="The Department of Early Education and Care'&apos;'s mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"
    links={[
      {
        href: '#',
        title: 'Lead Agencies Policies'
      },
      {
        href: '#',
        title: 'Child Care Licensing Procedures'
      }
    ]}
    siteLogo={(
      <>
        <SiteLogo
          image={{
            alt: 'Massachusetts state seal', height: 45, src: logo, width: 45
          }}
          title="Mass.gov homepage"
          url={{ domain: 'https://www.mass.gov/' }}
        />
        <SiteLogo
          image={{
            alt: 'Department of Eduction logo', height: 45, src: 'http://www.doe.mass.edu/images/Master-Logo_695x338_color.png', width: 120
          }}
          title="Department of Education homepage"
          url={{ domain: 'http://www.doe.mass.edu/' }}
        />
      </>
)}
    stackedLogo
    title="Massachusetts Executive Office of Eductation (EDU)"
  />
);

const footer = (
  <Footer
    backToTopButton={false}
    footerLinks={footerLinks}
    footerLogo={{
      src: logo
    }}
    footerText={{
      copyright: '2020 Commonwealth of Massachusetts.',
      description: 'Mass.gov® is a registered service mark of the Commonwealth of Massachusetts.',
      privacyPolicy: {
        text: 'Mass.gov Privacy Policy',
        url: 'https://www.mass.gov/privacypolicy'
      }
    }}
    showNavHeading={false}
    socialLinks={{
      items: [
        {
          altText: 'Follow us on Facebook',
          href: 'https://www.facebook.com/massgov',
          linkType: 'facebook'
        },
        {
          altText: 'Follow us on Twitter',
          href: 'https://twitter.com/massgov',
          linkType: 'twitter'
        },
        {
          altText: 'Follow us on LinkedIn',
          href: 'https://www.linkedin.com/company/commonwealth-of-massachusetts',
          linkType: 'linkedin'
        },
        {
          altText: 'Follow us on Youtube',
          href: 'https://www.youtube.com/user/massgov',
          linkType: 'youtube'
        },
        {
          altText: 'Follow us on Instagram',
          href: 'https://www.instagram.com/massgov',
          linkType: 'instagram'
        }
      ]
    }}
  />
);

const notesFooterSlim = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer-slim.css">`;

const notesFooter = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer.css">`;

export const footerExample = () => footerBasic;

export const footerSlim = () => footerBasic;
attachHTML(footerSlim, footerBasic, notesFooterSlim);

export const footerSlimDuelLogo = () => footerDuelLogo;
attachHTML(footerSlimDuelLogo, footerDuelLogo, notesFooterSlim);

export const footerFullNav = () => footer;
attachHTML(footerFullNav, footer, notesFooter);
