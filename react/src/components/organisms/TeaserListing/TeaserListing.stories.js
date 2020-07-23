import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, text, boolean, number
} from '@storybook/addon-knobs';

import Paragraph from 'MayflowerReactText/Paragraph';
import GenTeaser from 'MayflowerReactOrganisms/GenTeaser';
import Chevron from 'MayflowerReactBase/Icon/Chevron';
import ButtonWithIcon from 'MayflowerReactAtoms/buttons/ButtonWithIcon';
import Collapse from 'MayflowerReactAnimations/Collapse';
import CompHeading from 'MayflowerReactAtoms/headings/CompHeading';
import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms/TeaserListing', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'TeaserListing with Features', () => {
      const featuresProps = {
        stacked: boolean('stacked', false, 'Features')
      };
      const itemsProps = {
        columns: number('columns', 2, 'Items')
      };
      return(
        <TeaserListing>
          <CompHeading {...TeaserListingData.compHeading} />
          <Paragraph {...TeaserListingData.description} />
          <TeaserListing.Features {...featuresProps}>
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
        </TeaserListing>
      );
    },
    { info: TeaserListingDocs }
  )
  .add(
    'TeaserListing with More', () => {
      const [open, setOpen] = useState(false);
      const itemsProps = {
        columns: number('columns', 2, 'Items')
      };
      const moreProps = {
        moreLabel: text('TeaserListing moreLabel', 'Show More Teasers', 'More'),
        lessLabel: text('TeaserListing lessLabel', 'Show Less Teasers', 'More')
      };
      const toggleProps = {
        onClick: () => setOpen(!open),
        text: open ? moreProps.lessLabel : moreProps.moreLabel,
        theme: 'c-primary',
        usage: 'quaternary-simple',
        capitalized: true,
        expanded: open,
        icon: <Chevron width={16} height={16} />
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
    },
    { info: TeaserListingDocs }
  );
