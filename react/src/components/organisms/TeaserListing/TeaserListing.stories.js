import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, array, object, boolean, number } from '@storybook/addon-knobs/react';

import { DecorativeLink } from '../../../index'

import TeaserListing from './index';
import TeaserListingDocs from './TeaserListing.md';
import TeaserListingData from './TeaserListing.knob.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('TeaserListing', withInfo(`<div>${TeaserListingDocs}</div>`)(() => {
    const constFeaturedOptions = TeaserListingData.teaserListing.featuredItems.map((item) => {

    });
    const props = {
      compHeading: object('TeaserListing.compHeading', TeaserListingData.teaserListing.compHeading),
      sidebarHeading: object('TeaserListing.sidebarHeading', TeaserListingData.teaserListing.sidebarHeading),
      stacked: boolean('TeaserListing.stacked', true),
      contained: boolean('TeaserListing.contained', false),
      gridTwoColumns: boolean('TeaserListing.gridTwoColumns', false),
      shownItems: number('TeaserListing.shownItems'),
      moreLabel: text('TeaserListing.moreLabel', ''),
      lessLabel: text('TeaserListing.lessLabel', ''),
      // featuredItems: TeaserListingData.teaserListing.featuredItems,
      //items: array('TeaserListing.items', TeaserListingData.teaserListing.items),
      more: object('TeaserListing.more', TeaserListingData.teaserListing.more)
    };
    return(<TeaserListing {...props} />);
  }));