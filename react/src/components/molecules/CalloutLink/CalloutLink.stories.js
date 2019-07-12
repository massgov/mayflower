import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import CalloutLink from './index';
import CalloutLinkDocs from './CalloutLink.md';
import calloutLinkOptions from './CalloutLink.knobs.options';

storiesOf('molecules/CalloutLink', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'CalloutLink', (() => {
      const props = {
        text: text('text', 'Link to another page'),
        href: text('href', ''),
        info: text('info', 'this will be the tooltip text on hover'),
        description: text('description', ''),
        eyebrow: text('eyebrow', ''),
        time: text('time', ''),
        emphasized: text('emphasized', ''),
        theme: select('theme', calloutLinkOptions.theme, '')
      };
      return(
        <CalloutLink {...props} />
      );
    }),
    { info: CalloutLinkDocs }
  )
  .add('CalloutLink with Description', (() => {
    const props = {
      text: text('text', 'Link to another page'),
      href: text('href', ''),
      info: text('info', 'this will be the tooltip text on hover'),
      description: text('description', 'This is some more important information about the text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mauris quam, et imperdiet purus pellentesque vel.'),
      theme: select('theme', calloutLinkOptions.theme, '')
    };
    return(
      <CalloutLink {...props} />
    );
  }))
  .add(
    'CalloutLink with Details', (() => {
      const props = {
        text: text('text', 'Attorney General Announces a New Health Care Program'),
        href: text('href', ''),
        info: text('info', 'this will be the tooltip text on hover'),
        eyebrow: text('eyebrow', 'Press Release'),
        time: text('time', '30 mins Ago'),
        emphasized: text('emphasized', 'Office of the Attorney General'),
        theme: select('theme', calloutLinkOptions.theme, 'white')
      };
      return(
        <CalloutLink {...props} />
      );
    }),
    { info: CalloutLinkDocs }
  );
