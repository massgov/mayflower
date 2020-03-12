import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { IllustratedHeader, Button, GenTeaser } from "@massds/mayflower-react";

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

const teaserProps = {
  title: {
    info: 'GenTeaser.Title',
    text: 'Job Fair 2019',
    href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
    showFileIcon: false
  },
  description: 'test',
  img: {
    src: 'https://via.placeholder.com/150',
    alt: '',
    shape: 'circular'
  }
};

const IndexPage = () => (

  <Layout {...layoutProps}>
    <SEO title="Home" />
    <p>Welcome to Mayflower Homepage.</p>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <GenTeaser>
            <GenTeaser.Details>
              <GenTeaser.Image img={teaserProps.img} />
              <GenTeaser.Title title={teaserProps.title} />
              <GenTeaser.Description description={teaserProps.description} />
            </GenTeaser.Details>
          </GenTeaser>
        </div>
        <div class="col-md">
          <GenTeaser>
            <GenTeaser.Details>
              <GenTeaser.Image img={teaserProps.img} />
              <GenTeaser.Title title={teaserProps.title} />
              <GenTeaser.Description description={teaserProps.description} />
            </GenTeaser.Details>
          </GenTeaser>
        </div>
        <div class="col-md">
          <GenTeaser>
            <GenTeaser.Details>
              <GenTeaser.Image img={teaserProps.img} />
              <GenTeaser.Title title={teaserProps.title} />
              <GenTeaser.Description description={teaserProps.description} />
            </GenTeaser.Details>
          </GenTeaser>
        </div>
      </div>
    </div>
    <div>
    </div>
  </Layout>
)

export default IndexPage
