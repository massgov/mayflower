import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import PressTeaser from './index';
import PressTeaserDocs from './PressTeaser.md';
import headingsOptions from '../../atoms/headings/Headings.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PressTeaser', (() => {
      const props = {
        image: {
          src: text('PressTeaser image: src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/320x180.png', 'Image'),
          alt: text('PressTeaser image: alt', 'placeholder image', 'Image')
        },
        eyebrow: text('PressTeaser eyebrow', 'Press Release'),
        title: {
          href: text('PressTeaser title: href', '#', 'Title'),
          text: text('PressTeaser title: text', 'MassParks', 'Title'),
          info: text('pressTeaser title: info', '', 'Title')
        },
        level: select('PressTeaser level', headingsOptions.levels, 2),
        date: text('PressTeaser date', '4/3/2017'),
        org: text('PressTeaser org', 'Org Name'),
        description: {
          rteElements: [{
            path: '@atoms/11-text/paragraph.twig',
            data: {
              paragraph: {
                text: text('PressTeaser description: text', 'Optional description <strong>search term</strong>', 'Description')
              }
            }
          }]
        }
      };
      return(<PressTeaser {...props} />);
    }),
    { info: PressTeaserDocs }
  );
