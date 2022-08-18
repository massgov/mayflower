import React from 'react';
import FooterSlim from '@massds/mayflower-react/dist/FooterSlim';
import Footer from '@massds/mayflower-react/dist/Footer';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import Email from '@massds/mayflower-react/dist/Email';
import PhoneNumber from '@massds/mayflower-react/dist/PhoneNumber';
import Address from '@massds/mayflower-react/dist/Address';
import IconMarker from '@massds/mayflower-react/dist/Icon/IconMarker';
import IconPhone from '@massds/mayflower-react/dist/Icon/IconPhone';
import IconLaptop from '@massds/mayflower-react/dist/Icon/IconLaptop';
import IconMail from '@massds/mayflower-react/dist/Icon/IconMail';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import { attachHTML } from '../../util/renderCode';

import footerLinks from './Footer.data';

const { STORYBOOK_CDN_PATH } = process.env;

const footerBasic = (
  <FooterSlim
    contact={[
      {
        icon: <IconMarker />,
        component: <Address address="51 Sleeper St. 4th Floor, Boston, MA 02210" />
      },
      {
        icon: <IconLaptop />,
        component: (
          <a href="#">EEC Official Website</a>
        )
      },
      {
        icon: <IconMail />,
        component: (
          <Email
            email="edu@state.ma.us"
            details="Open Monday through Friday from 9:00 a.m. to 5:00 p.m."
          />
        )
      },
      {
        icon: <IconPhone />,
        component: (
          <PhoneNumber
            number="617-988-6600"
            details="Our Customer Service Representatives can answer your questions in <b>English</b>, <b>Español</b>, <b>Português</b>. Translation services for up to <b>240+ languages</b> are also available to better serve employees, employers and medical providers."
          />
        )
      }
    ]}
    description="The Department of Early Education and Care's mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"
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
    contact={[
      {
        icon: <IconMarker />,
        component: <Address address="51 Sleeper St. 4th Floor, Boston, MA 02210" />
      },
      {
        icon: <IconLaptop />,
        component: (
          <a href="#">EEC Official Website</a>
        )
      },
      {
        icon: <IconMail />,
        component: (
          <Email
            email="edu@state.ma.us"
            details="Open Monday through Friday from 9:00 a.m. to 5:00 p.m."
          />
        )
      },
      {
        icon: <IconPhone />,
        component: (
          <PhoneNumber
            number="617-988-6600"
            details="Our Customer Service Representatives can answer your questions in <b>English</b>, <b>Español</b>, <b>Português</b>. Translation services for up to <b>240+ languages</b> are also available to better serve employees, employers and medical providers."
          />
        )
      }
    ]}
    description="The Department of Early Education and Care's mission is to support the healthy growth and development of all children by providing high quality programs and resources for families"
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
    footerLinks={footerLinks}
    footerLogo={{
      src: logo
    }}
    footerText={{}}
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
