import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { DecorativeLink, Paragraph, GenTeaser, Collapse } from '../../../index';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import CompHeading from '../../atoms/headings/CompHeading';
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
      const itemsProps = {
        columns: number('columns', 2, 'Items')
      };
      const moreProps = {
        shownItems: number('TeaserListing shownItems', 4),
        moreLabel: text('TeaserListing moreLabel', 'More'),
        lessLabel: text('TeaserListing lessLabel', 'Less'),
        more: object('TeaserListing more', TeaserListingData.more)
      };
      const [open, setOpen] = useState(false);
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
          <button
            className="ma__content-link ma__content-link--chevron ma__content-link__acordion-toggle js-accordion-link"
            aria-label={(open) ? moreProps.lessLabel : moreProps.moreLabel}
            onClick={() => setOpen(!open)}
          >
            {(open)
              ? (<span className="less">{moreProps.lessLabel}</span>)
              : (<span className="more">{moreProps.moreLabel}</span>)
            }
          </button>
        </TeaserListing>
      );
    },
    { info: TeaserListingDocs }
  );
