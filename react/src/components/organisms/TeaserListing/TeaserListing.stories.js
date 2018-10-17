import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, array, object, boolean, number } from '@storybook/addon-knobs/react';

import { DecorativeLink, Paragraph } from '../../../index';

import TeaserListing from '.';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('TeaserListing', withInfo(`<div>${TeaserListingDocs}</div>`)(() => {
    const featuredOptions = TeaserListingData.teaserListing.featuredItems.map((item, index) => {
      const newItem = Object.assign({}, item);
      const title = object(`TeaserListing.featuredItems.${index}.title`, { ...newItem.title });
      const description = object(`TeaserListing.featuredItems.${index}.description`, { ...newItem.description });
      return{
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
      stacked: boolean('TeaserListing.stacked', true),
      contained: boolean('TeaserListing.contained', false),
      gridTwoColumns: boolean('TeaserListing.gridTwoColumns', false),
      shownItems: number('TeaserListing.shownItems', 4),
      moreLabel: text('TeaserListing.moreLabel', ''),
      lessLabel: text('TeaserListing.lessLabel', ''),
      featuredItems: featuredOptions,
      items: itemsOptions,
      more: object('TeaserListing.more', TeaserListingData.teaserListing.more)
    };
    return(<TeaserListing {...props} />);
  }));
