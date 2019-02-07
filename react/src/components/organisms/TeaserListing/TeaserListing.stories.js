import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, array, object, boolean, number } from '@storybook/addon-knobs/react';

import { DecorativeLink, Paragraph } from '../../../index';

import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'TeaserListing', (() => {
      const featuredOptions = TeaserListingData.teaserListing.featuredItems.map((item, index) => {
        const newItem = Object.assign({}, item);
        const title = object(`TeaserListing.featuredItems.${index}.title`, { ...newItem.title });
        const description = object(`TeaserListing.featuredItems.${index}.description`, { ...newItem.description });
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
        const title = object(`TeaserListing.items.${index}.title`, { ...newItem.title });
        const description = object(`TeaserListing.items.${index}.description`, { ...newItem.description });
        return{
          title: <DecorativeLink {...title} />,
          description: <Paragraph {...description} />
        };
      });
      const props = {
        compHeading: object('TeaserListing.compHeading', TeaserListingData.teaserListing.compHeading),
        sidebarHeading: object('TeaserListing.sidebarHeading', TeaserListingData.teaserListing.sidebarHeading),
        description: {
          text: text('TeaserListing.description.text', TeaserListingData.teaserListing.description.text)
        },
        stacked: boolean('TeaserListing.stacked', false),
        contained: boolean('TeaserListing.contained', true),
        gridTwoColumns: boolean('TeaserListing.gridTwoColumns', true),
        shownItems: number('TeaserListing.shownItems', 4),
        moreLabel: text('TeaserListing.moreLabel', 'More'),
        lessLabel: text('TeaserListing.lessLabel', 'Less'),
        featuredItems: featuredOptions,
        items: itemsOptions,
        more: object('TeaserListing.more', TeaserListingData.teaserListing.more)
      };
      return(<TeaserListing {...props} />);
    }),
    { info: TeaserListingDocs }
  );
