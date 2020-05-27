import React from "react";
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/section"
import RichText from "../components/richText"
import { IllustratedHeader, ButtonWithIcon, GenTeaser, Tabs, Icon, SectionLinks, DecorativeLink, CalloutLink } from "@massds/mayflower-react";

import './index.scss';
const IndexPage = ({ data: { content } }) => {
  const { header, projects, channels, tabs, links, intro } = content
  const { paragraph, buttons, ...headerProps } = header;
  headerProps.bgImage = '';
  const iconDimension = 50;
  const channelImageStyles = {
    height: iconDimension,
    minWidth: iconDimension
  };
  const transform = (node) => {
    if (node.type === 'tag' && node.name === 'a') {
    return <DecorativeLink key={`decorative-link-${node.children[0].data}`} text={node.children[0].data} href={node.attribs.href}/>;
  }
  }
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
                <ButtonWithIcon key={`button-${button.iconTitle}`} {...button}/>
              )
            })
          }
        </div>
      </IllustratedHeader>
      <Tabs tabs={tabs} />
      <Section>
        <div className="row ma__row--three-up">
          {
            links.map(({ items, ...sectionLinksProps }) => (
              <div className="col-md" key={`link-${sectionLinksProps.title.text}`}>
                <SectionLinks {...sectionLinksProps}>
                  {
                    items.map((item) => <CalloutLink key={`item-${item.text}`} {...item} />)
                  }
                </SectionLinks>
              </div>
            )
          )}
        </div>
      </Section>
      <Section>
        <RichText htmlTag="p" rawHtml={intro} transform={transform} />
      </Section>
      <Section bgColor="primary">
        <h2>See Mayflower in Use</h2>
        <div className="row">
          {
            projects.map(({ title, description, img }) => (
              <div className="col-md" key={`project-item-${title.text}`}>
                <GenTeaser stacked>
                  <GenTeaser.Image style={{ maxHeight: 200, borderWidth: '1px', borderStyle: 'solid' }}>
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
      <div className="row">
        {
          channels.map(({ title, description, icon }) => (
            <div className="col-md" key={`channel-item-${title.text}`}>
              <GenTeaser align="top">
                <GenTeaser.Image style={channelImageStyles}>
                  <Icon {...icon} svgWidth={iconDimension} svgHeight={iconDimension} />
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
          iconTitle
        }
      }
      intro
      tabs {
        value
        label
        href
      }
      links {
        title {
          text
          href
        }
        description
        items {
          text
          href
          description
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
      channels {
        title {
          text
          href
          info
        }
        description
        icon {
          name
          fill
        }
      }
    }
  }
`;
