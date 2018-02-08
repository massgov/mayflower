import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs/react';

import PressTeaser from './index';
import PressTeaserDocs from './PressTeaser.md';
import headingsOptions from '../../atoms/headings/Headings.knobs.options';
import { Paragraph } from '../../organisms/RichText/RichText.require';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('PressTeaser', withInfo(`<div>${PressTeaserDocs}</div>`)(() => {
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
        text: text('pressTeaser.description.text', 'Optional description')
      }
    };

    return(<PressTeaser {...props} />);
  }));
