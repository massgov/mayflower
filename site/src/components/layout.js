/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { HeaderSlim, SiteLogo, FooterSlim } from "@massds/mayflower-react"
import "./layout.scss"
import logo from '../images/stateseal.png';

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
  `)
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
    siteName: title,
    title: description
  }
  const siteLogo = <SiteLogo {...siteLogoProps} />

  const footerProps = {
    title: 'Executive Office of Technology Security and Services (EOTSS)',
    contact: {
      address: '1 Ashburton Place, 8th Floor, Boston, MA 02108',
      phone: '(617) 626-4400',
      online: {
        href: 'https://www.mass.gov/orgs/massachusetts-digital-service',
        title: 'Massachusetts Digital Service official website'
      }
    },
    siteLogo
  }

  return (
    <>
      <HeaderSlim siteLogo={siteLogo} />
      <main id="main-content">
        { children }
      </main>
      <FooterSlim {...footerProps} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
