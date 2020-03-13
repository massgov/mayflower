import React from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Section from "../components/section"
import { IllustratedHeader, ButtonWithIcon, GenTeaser, Tabs, Icon } from "@massds/mayflower-react";
import BannerImage from '../images/massgov.png';

import './index.scss';

const IndexPage = ({ data: { content } }) => {
  const { header, projects, channels, tabs } = content
  const { paragraph, buttons, ...headerProps } = header;
  headerProps.bgImage = '';
  const channelImageStyles = {
    borderRadius: 50,
    height: 50,
    minWidth: 50,
    borderWidth: '1px',
    borderStyle: 'solid'
  };
  return(
    <Layout>
      <SEO title="Home" />
      <IllustratedHeader {...headerProps}>
        <span className="ma__page-banner__callout ma__page-banner__callout--primary">
          {paragraph}
        </span>
        <div className="ma__button-group">
          {
            buttons.map((button) => {
              button.icon = <Icon name={button.iconName} title={button.iconTitle} svgHeight={20} svgWidth={20} />
              return(
                <ButtonWithIcon {...button}/>
              )
            })
          }
        </div>
      </IllustratedHeader>
      <Tabs tabs={tabs} />
      <Section>
        <h2>Get Started</h2>
        <div class="row">
          {
            projects.map(({ title, description, img }) => (
              <div class="col-md">
                <GenTeaser stacked>
                  <GenTeaser.Image>
                    <Img fluid={img.src.childImageSharp.fluid} alt={img.alt}  />
                  </GenTeaser.Image>
                  <GenTeaser.Details>
                    <GenTeaser.Title title={title} />
                    <GenTeaser.Description description={description} />
                  </GenTeaser.Details>
                </GenTeaser>
              </div>
            )
          )}
        </div>
      </Section>
      <Section bgColor="primary">
        <h2>See Mayflower in Use</h2>
        <div class="row">
          {
            projects.map(({ title, description, img }) => (
              <div class="col-md">
                <GenTeaser stacked>
                  <GenTeaser.Image style={{ height: 200, borderWidth: '1px', borderStyle: 'solid' }}>
                    <Img fluid={img.src.childImageSharp.fluid} alt={img.alt}  />
                  </GenTeaser.Image>
                  <GenTeaser.Details>
                    <GenTeaser.Title title={title} />
                    <GenTeaser.Description description={description} />
                  </GenTeaser.Details>
                </GenTeaser>
              </div>
            )
          )}
        </div>
      </Section>
      <Section bgColor="primary-alt">
      <h2>Join Mayflower Community</h2>
      <div class="row">
        {
          channels.map(({ title, description, img }) => (
            <div class="col-md">
              <GenTeaser align="top">
                <GenTeaser.Image style={channelImageStyles}>
                  <Img fluid={img.src.childImageSharp.fluid} alt={img.alt}  />
                </GenTeaser.Image>
                <GenTeaser.Details>
                  <GenTeaser.Title title={title} level={3}/>
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
          iconName
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
              fluid(quality: 100, maxWidth: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
