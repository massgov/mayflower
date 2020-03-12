import React from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
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

const IndexPage = ({ data }) => {
  const { projects } = data.content
  return(
    <Layout {...layoutProps}>
      <SEO title="Home" />
      <p>Welcome to Mayflower Homepage.</p>
        <div class="row">
          {
            projects.map(({ title, description, img }) => (
              <div class="col-md">
                <GenTeaser>
                  <GenTeaser.Details>
                    <GenTeaser.Image>
                      <Img fluid={img.src.childImageSharp.fluid} alt={img.alt}  />
                    </GenTeaser.Image>
                    <GenTeaser.Title title={title} />
                    <GenTeaser.Description description={description} />
                  </GenTeaser.Details>
                </GenTeaser>
              </div>
            )
          )}
        </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    content: dataJson {
      projects {
        title {
          text
          href
          info
        }
        description
        img {
          alt
          src {
            childImageSharp {
              fluid(quality: 100, maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
