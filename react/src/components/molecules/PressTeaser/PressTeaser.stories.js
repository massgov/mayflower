import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import PressTeaser from './index';
import PressTeaserDocs from './PressTeaser.md';
import headingsOptions from '../../atoms/headings/Headings.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add(
    'PressTeaser', (() => {
      const props = {
        image: {
          src: text('pressTeaser.image.src', 'https://mayflower.digital.mass.gov/assets/images/placeholder/320x180.png'),
          alt: text('pressTeaser.image.alt', 'placeholder image')
        },
        eyebrow: text('pressTeaser.eyebrow', 'Press Release'),
        title: {
          href: text('pressTeaser.title.href', '#'),
          text: text('pressTeaser.title.text', 'MassParks'),
          info: text('pressTeaser.title.info', '')
        },
        level: select('pressTeaser.level', headingsOptions.levels, 2),
        date: text('pressTeaser.date', '4/3/2017'),
        org: text('pressTeaser.org', 'Org Name'),
        description: {
          rteElements: [{
            path: '@atoms/11-text/paragraph.twig',
            data: {
              paragraph: {
                text: text('pressTeaser.description.text', 'Optional description <strong>search term</strong>')
              }
            }
          }]
        }
      };
      return(<PressTeaser {...props} />);
    }),
    { info: PressTeaserDocs }
  );
