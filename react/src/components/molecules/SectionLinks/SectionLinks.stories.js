import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import SectionLinks from './index';
import CalloutLink from 'MayflowerReactMolecules/CalloutLink';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('SectionLinks', (() => {
    const props = {
      title: {
        href: text('title.href', ''),
        text: text('title.text', 'Title')
      },
      seeAll: {
        href: text('seeAll.href', ''),
        text: text('seeAll.text', 'See all')
      },
      description: text('description', 'This is a group of links'),
      index: number('index', 0)
    };
    return(
      <SectionLinks {...props}>
        <CalloutLink text="This is a CalloutLink" />
        <DecorativeLink text="This is a DecorativeLink" />
      </SectionLinks>
    );
  }));
