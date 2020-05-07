import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, boolean, number } from '@storybook/addon-knobs';

import { DecorativeLink, Paragraph, GenTeaser } from '../../../index';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import CompHeading from '../../atoms/headings/CompHeading';
import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'TeaserListing', () => {
      const itemsOptions = TeaserListingData.teaserListing.items.map((item, index) => {
        const newItem = Object.assign({}, item);
        const title = object(`TeaserListing item${index}: title`, { ...newItem.title }, `Item ${index}`);
        const description = object(`TeaserListing item${index}: description`, { ...newItem.description }, `Item ${index}`);
        return{
          title: <DecorativeLink {...title} />,
          description: <Paragraph {...description} />
        };
      });
      const props = {
        stacked: boolean('TeaserListing stacked', false, 'Features'),
        contained: boolean('TeaserListing contained', true),
        gridTwoColumns: boolean('TeaserListing gridTwoColumns', true),
        shownItems: number('TeaserListing shownItems', 4),
        moreLabel: text('TeaserListing moreLabel', 'More'),
        lessLabel: text('TeaserListing lessLabel', 'Less'),
        items: itemsOptions,
        more: object('TeaserListing more', TeaserListingData.teaserListing.more)
      };
      return(
        <TeaserListing {...props}>
          <CompHeading {...TeaserListingData.teaserListing.compHeading} />
          <SidebarHeading {...TeaserListingData.teaserListing.sidebarHeading} />
          <Paragraph {...TeaserListingData.teaserListing.description} />
          <TeaserListing.Features stacked={props.stacked}>
            {
              TeaserListingData.teaserListing.featuredItems.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <GenTeaser key={`teaser_feature_${i}`}>
                  <GenTeaser.Details>
                    <GenTeaser.Image img={item.image} />
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
        </TeaserListing>
      );
    },
    { info: TeaserListingDocs }
  );
