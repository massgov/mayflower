import React from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { IllustratedHeader, Button, GenTeaser } from "@massds/mayflower-react";

import './index.scss';


const IndexPage = ({ data }) => {
  const { header, projects } = data.content
  const { paragraph, buttons, ...headerProps } = header;
  const layoutProps = {
      pre: () => (
        <IllustratedHeader {...headerProps}>
          <span className="ma__page-banner__callout ma__page-banner__callout--primary">
            {paragraph}
          </span>
          <div className="ma__button-group">
            {
              buttons.map((button) => (
                <Button {...button}/>
              ))
            }
          </div>
        </IllustratedHeader>
      )
  };
  return(
    <Layout {...layoutProps}>
      <SEO title="Home" />
      <h2>Showcase</h2>
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
      header {
        pageHeader {
          title
        }
        category
        inverted
        paragraph
        bgImage
        bgInfo
        buttons {
          href
          text
          usage
          theme
        }
      }
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
