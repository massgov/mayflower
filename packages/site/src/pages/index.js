import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import IllustratedHeader from '@massds/mayflower-react/dist/IllustratedHeader';
import ButtonWithIcon from '@massds/mayflower-react/dist/ButtonWithIcon';
import GenTeaser from '@massds/mayflower-react/dist/GenTeaser';
import Tabs from '@massds/mayflower-react/dist/Tabs';
import SectionLinks from '@massds/mayflower-react/dist/SectionLinks';
import DecorativeLink from '@massds/mayflower-react/dist/DecorativeLink';
import CalloutLink from '@massds/mayflower-react/dist/CalloutLink';
import * as Icon from '@massds/mayflower-react/dist/Icon';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Section from '../components/section';
import RichText from '../components/richText';

import './index.scss';

const IndexPage = ({ data: { content } }) => {
  const {
    header, projects, channels, resources, links, intro
  } = content;
  const { paragraph, buttons, ...headerProps } = header;
  headerProps.bgImage = '';
  const iconDimension = 50;
  const channelImageStyles = {
    height: iconDimension,
    minWidth: iconDimension
  };
  const transform = (node) => {
    if (node.type === 'tag' && node.name === 'a') {
      return<DecorativeLink key={`decorative-link-${node.children[0].data}`} text={node.children[0].data} href={node.attribs.href} />;
    }
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
              const { iconName, iconTitle, ...buttonRest } = button;
              const ButtonIcon = Icon[iconName];
              buttonRest.icon = <ButtonIcon title={iconTitle} />;
              return(
                <ButtonWithIcon key={`button-${iconTitle}`} {...buttonRest} />
              );
            })
          }
        </div>
      </IllustratedHeader>
      <Section>
        <div className="row ma__row--three-up">
          {
            links.map(({ items, ...sectionLinksProps }) => (
              <div className="col-md" key={`link-${sectionLinksProps.title.text}`}>
                <SectionLinks {...sectionLinksProps}>
                  {
                    items.map((item) => <DecorativeLink key={`item-${item.text}`} {...item} />)
                  }
                </SectionLinks>
              </div>
            ))}
        </div>
      </Section>
      <Section>
        <h2>Experimental packages</h2>
				<RichText htmlTag="p" rawHtml={intro} transform={transform} />
        <div className="ma__button-group">
          {resources.map((resource) => <ButtonWithIcon usage="tertiary" {...resource} icon={<Icon.IconArrow />} />)}
        </div>
      </Section>
			
      <Section bgColor="primary">
        <h2>See Mayflower in Use</h2>
        <div className="row">
          {
            projects.map(({ title, description, img }) => (
              <div className="col-md" key={`project-item-${title.text}`}>
                <GenTeaser stacked>
                  <GenTeaser.Image style={{ maxHeight: 200, borderWidth: '1px', borderStyle: 'solid' }}>
                    <Img fluid={img.src.childImageSharp.fluid} alt={img.alt} />
                  </GenTeaser.Image>
                  <GenTeaser.Details>
                    <GenTeaser.Title title={title} />
                    <GenTeaser.Description description={description} />
                  </GenTeaser.Details>
                </GenTeaser>
              </div>
            ))}
        </div>
      </Section>
      <Section bgColor="primary-alt">
        <h2>Join Mayflower Community</h2>
        <div className="row">
          {
          channels.map(({ title, description, icon }) => {
            const { name, ...iconRest } = icon;
            const TeaserIcon = Icon[name];
            return(
              <div className="col-md" key={`channel-item-${title.text}`}>
                <GenTeaser align="top">
                  <GenTeaser.Image style={channelImageStyles}>
                    <TeaserIcon {...iconRest} width={iconDimension} height={iconDimension} />
                  </GenTeaser.Image>
                  <GenTeaser.Details>
                    <GenTeaser.Title title={title} level={3} />
                    <GenTeaser.Description description={description} />
                  </GenTeaser.Details>
                </GenTeaser>
              </div>
            );
          })}
        </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;

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
      links {
        title {
          text
        }
        description
        items {
          text
          href
          description
          theme
        }
      }
			intro
      resources {
        text
        href
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
