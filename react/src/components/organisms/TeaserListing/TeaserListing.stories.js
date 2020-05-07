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
        heading: () => (
          <>
            <CompHeading {...TeaserListingData.teaserListing.compHeading} />
            <SidebarHeading {...TeaserListingData.teaserListing.sidebarHeading} />
          </>
        ),
        description: {
          text: text('TeaserListing description: text', TeaserListingData.teaserListing.description.text)
        },
        stacked: boolean('TeaserListing stacked', false),
        contained: boolean('TeaserListing contained', true),
        gridTwoColumns: boolean('TeaserListing gridTwoColumns', true),
        shownItems: number('TeaserListing shownItems', 4),
        moreLabel: text('TeaserListing moreLabel', 'More'),
        lessLabel: text('TeaserListing lessLabel', 'Less'),
        featuredItems: () => (
          <>
            {
              TeaserListingData.teaserListing.featuredItems.map((item, index) => {
                const newItem = Object.assign({}, item);
                const title = object(`TeaserListing featuredItem${index}: title`, { ...newItem.title }, `Featured Item ${index}`);
                const description = object(`TeaserListing featuredItem${index}: description`, { ...newItem.description }, `Featured Item ${index}`);
                return(
                  <GenTeaser>
                    <GenTeaser.Details>
                      <GenTeaser.Eyebrow eyebrow={item.eyebrow} />
                      <GenTeaser.Title title={title} />
                      <GenTeaser.Emphasis>
                        <GenTeaser.Date date={item.date} />
                        <GenTeaser.Orgs orgs={item.orgs} />
                      </GenTeaser.Emphasis>
                      <GenTeaser.Description description={description} />
                    </GenTeaser.Details>
                  </GenTeaser>
                );
              })
            }
          </>
        ),
        items: itemsOptions,
        more: object('TeaserListing more', TeaserListingData.teaserListing.more)
      };
      return(<TeaserListing {...props} />);
    },
    { info: TeaserListingDocs }
  );
