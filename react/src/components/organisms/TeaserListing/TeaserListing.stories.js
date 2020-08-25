import React, { useState } from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import Paragraph from 'MayflowerReactText/Paragraph';
import GenTeaser from 'MayflowerReactOrganisms/GenTeaser';
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import ButtonWithIcon from 'MayflowerReactAtoms/buttons/ButtonWithIcon';
import Collapse from 'MayflowerReactAnimations/Collapse';
import CompHeading from 'MayflowerReactAtoms/headings/CompHeading';
import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

export const TeaserListingExample = () => (
  <TeaserListing>
    <CompHeading {...TeaserListingData.compHeading} />
    <Paragraph {...TeaserListingData.description} />
    <TeaserListing.Features stacked={false}>
      {
        TeaserListingData.featuredItems.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <GenTeaser key={`teaser_feature_${i}`}>
            <GenTeaser.Image img={item.image} />
            <GenTeaser.Details>
              <GenTeaser.Eyebrow eyebrow={item.eyebrow} />
              <GenTeaser.Title title={item.title} />
              <GenTeaser.Emphasis>
                <GenTeaser.Date date={item.date} />
                <GenTeaser.Orgs orgs={item.org} />
              </GenTeaser.Emphasis>
              <GenTeaser.Description description={item.description} />
            </GenTeaser.Details>
          </GenTeaser>
        ))
      }
    </TeaserListing.Features>

    <TeaserListing.Items columns={2}>
      {
        TeaserListingData.items.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TeaserListing.Item key={`teaser_item_${i}`}>
            <GenTeaser>
              <GenTeaser.Details>
                <GenTeaser.Title title={item.title} />
                <GenTeaser.Description description={item.description} />
              </GenTeaser.Details>
            </GenTeaser>
          </TeaserListing.Item>
        ))
      }
    </TeaserListing.Items>
  </TeaserListing>
);
TeaserListingExample.storyName = 'Default';
TeaserListingExample.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={TeaserListingExample} Description={TeaserListingDocs} />
  }
};
export const TeaserListingWithMore = () => {
  const [open, setOpen] = useState(false);
  const itemsProps = {
    columns: 2
  };
  const moreProps = {
    moreLabel: 'Show More Teasers',
    lessLabel: 'Show Less Teasers'
  };
  const toggleProps = {
    onClick: () => setOpen(!open),
    text: open ? moreProps.lessLabel : moreProps.moreLabel,
    theme: 'c-primary',
    usage: 'quaternary-simple',
    capitalized: true,
    expanded: open,
    icon: <IconChevron width={16} height={16} />
  };
  return(
    <TeaserListing>
      <CompHeading {...TeaserListingData.compHeading} />
      <Paragraph {...TeaserListingData.description} />
      <TeaserListing.Items {...itemsProps}>
        {
          TeaserListingData.items.map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <TeaserListing.Item key={`teaser_item_${i}`}>
              <GenTeaser>
                <GenTeaser.Details>
                  <GenTeaser.Title title={item.title} />
                  <GenTeaser.Description description={item.description} />
                </GenTeaser.Details>
              </GenTeaser>
            </TeaserListing.Item>
          ))
        }
      </TeaserListing.Items>
      <Collapse in={open} dimension="height">
        <div className="ma__teaser-listing__extra">
          <TeaserListing.Items {...itemsProps}>
            {
              TeaserListingData.items.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <TeaserListing.Item key={`teaser_item_${i}`}>
                  <GenTeaser>
                    <GenTeaser.Details>
                      <GenTeaser.Title title={item.title} />
                      <GenTeaser.Description description={item.description} />
                    </GenTeaser.Details>
                  </GenTeaser>
                </TeaserListing.Item>
              ))
            }
          </TeaserListing.Items>
        </div>
      </Collapse>
      <ButtonWithIcon {...toggleProps} />
    </TeaserListing>
  );
};

TeaserListingWithMore.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={TeaserListingWithMore} Description={TeaserListingDocs} />
  }
};
export default {
  title: 'organisms/TeaserListing',
  component: TeaserListing,
  parameters: {
    docs: {
      page: () => <StoryPage Description={TeaserListingDocs} />
    }
  }
};
