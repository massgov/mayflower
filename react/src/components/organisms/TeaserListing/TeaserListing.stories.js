import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, boolean, number } from '@storybook/addon-knobs';

import DecorativeLink from '../../atoms/links/DecorativeLink';
import Paragraph from '../../atoms/text/Paragraph';
import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'TeaserListing', () => {
      const featuredOptions = TeaserListingData.teaserListing.featuredItems.map((item, index) => {
        const newItem = Object.assign({}, item);
        const title = object(`TeaserListing featuredItem${index}: title`, { ...newItem.title }, `Featured Item ${index}`);
        const description = object(`TeaserListing featuredItem${index}: description`, { ...newItem.description }, `Featured Item ${index}`);
        return{
          image: item.image,
          eyebrow: item.eyebrow,
          org: item.org,
          date: item.date,
          title: <DecorativeLink {...title} />,
          description: <Paragraph {...description} />

        };
      });
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
        compHeading: object('TeaserListing compHeading', TeaserListingData.teaserListing.compHeading, 'CompHeading'),
        sidebarHeading: object('TeaserListing sidebarHeading', TeaserListingData.teaserListing.sidebarHeading, 'SidebarHeading'),
        description: {
          text: text('TeaserListing description: text', TeaserListingData.teaserListing.description.text)
        },
        stacked: boolean('TeaserListing stacked', false),
        contained: boolean('TeaserListing contained', true),
        gridTwoColumns: boolean('TeaserListing gridTwoColumns', true),
        shownItems: number('TeaserListing shownItems', 4),
        moreLabel: text('TeaserListing moreLabel', 'More'),
        lessLabel: text('TeaserListing lessLabel', 'Less'),
        featuredItems: featuredOptions,
        items: itemsOptions,
        more: object('TeaserListing more', TeaserListingData.teaserListing.more)
      };
      return(<TeaserListing {...props} />);
    },
    { info: TeaserListingDocs }
  );
