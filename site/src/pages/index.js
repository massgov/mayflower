import React from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Section from "../components/section"
import { IllustratedHeader, Button, GenTeaser, Tabs } from "@massds/mayflower-react";
import BannerImage from '../images/massgov.png';

import './index.scss';

const IndexPage = ({ data }) => {
  const { header, projects, channels, tabs } = data.content
  const { paragraph, buttons, ...headerProps } = header;
  headerProps.bgImage = BannerImage;
  return(
    <Layout>
      <SEO title="Home" />
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
      <Tabs tabs={tabs} />
      <Section>
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
      </Section>
      <Section>
      <h2>Join Mayflower Community</h2>
      <div class="row">
        {
          channels.map(({ title, description, img }) => (
            <div class="col-md">
              <GenTeaser>
                <GenTeaser.Details>
                  <GenTeaser.Image>
                    <Img fluid={img.src.childImageSharp.fixed} alt={img.alt}  />
                  </GenTeaser.Image>
                  <GenTeaser.Title title={title} />
                  <GenTeaser.Description description={description} />
                </GenTeaser.Details>
              </GenTeaser>
            </div>
          )
        )}
      </div>
      </Section>
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
      tabs {
        value
        label
        ariaLabel
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
      channels {
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
              fixed(quality: 100, width: 100, height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;
