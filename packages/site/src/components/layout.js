/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import HeaderSlim from '@massds/mayflower-react/dist/HeaderSlim';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import FooterSlim from '@massds/mayflower-react/dist/FooterSlim';
import PhoneNumber from '@massds/mayflower-react/dist/PhoneNumber';
import Address from '@massds/mayflower-react/dist/Address';
import IconMarker from '@massds/mayflower-react/dist/Icon/IconMarker';
import IconPhone from '@massds/mayflower-react/dist/Icon/IconPhone';
import IconLaptop from '@massds/mayflower-react/dist/Icon/IconLaptop';

import '../styles/_layout.scss';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

const Layout = ({ children, pre }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          url
        }
      }
    }
  `);
  const { description, title, url } = data.site.siteMetadata;
  const siteLogoProps = {
    url: {
      domain: url
    },
    image: {
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    title: description
  };
  // Makes sure that header and footer don't use the same
  // SiteLogo component instance.
  const headerProps = {
    siteLogo: <SiteLogo {...siteLogoProps} siteName={title} />
  };

  const footerProps = {
    title: 'Executive Office of Technology Security and Services (EOTSS)',
    contact: [
      {
        icon: <IconMarker />,
        component: <Address address=' Ashburton Place, 8th Floor, Boston, MA 02108' />
      },
      {
        icon: <IconPhone />,
        component: (
          <PhoneNumber 
            number = '(617) 626-4400'
          />
        )
      },
      {
        icon: <IconLaptop />,
        component: (
          <a href='https://www.mass.gov/orgs/massachusetts-digital-service'>Massachusetts Digital Service official website</a>
        )
      }
    ],
    siteLogo: <SiteLogo {...siteLogoProps} />,
    description: ''
  };

  return(
    <>
      <HeaderSlim {...headerProps} />
      <main id="main-content">
        { children }
      </main>
      <FooterSlim {...footerProps} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
