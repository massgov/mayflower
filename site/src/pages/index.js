import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { IllustratedHeader, Button } from "@massds/mayflower-react";

import './index.scss';

const headerProps = {
  bgInfo: '',
  bgImage: '',
  category: 'Commonwealth of Massachusetts',
  inverted: true,
  pageHeader: {
    title: 'A design system for the state government'
  }
}

const layoutProps = {
    pre: () => (
      <IllustratedHeader {...headerProps}>
        <span className="ma__page-banner__callout ma__page-banner__callout--primary">
          We make it easier to build a accessible, mobile-friendly government websites with a consistent look and feel for the state of Massachusetts.
        </span>
        <div className="ma__button-group">
          <Button text="Github" usage="secondary"/>
          <Button text="Github" usage="tertiary" theme="c-gray-dark" />
        </div>
      </IllustratedHeader>
    )
};

const IndexPage = () => (

  <Layout {...layoutProps}>
    <SEO title="Home" />
    <h1>Hello</h1>
    <p>Welcome to Mayflower Homepage.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default IndexPage
