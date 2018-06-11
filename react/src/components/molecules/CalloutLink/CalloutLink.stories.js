import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import CalloutLink from './index';
import CalloutLinkDocs from './CalloutLink.md';
import calloutLinkOptions from './CalloutLink.knobs.options';

storiesOf('molecules/CalloutLink', module).addDecorator(withKnobs)
  .add('CalloutLink', withInfo(`<div>${CalloutLinkDocs}</div>`)(() => {
    const props = {
      text: text('calloutLink.text', 'Link to another page'),
      href: text('calloutLink.href', ''),
      info: text('calloutLink.info', 'this will be the tooltip text on hover'),
      description: text('calloutLink.description', ''),
      eyebrow: text('calloutLink.eyebrow', ''),
      time: text('calloutLink.time', ''),
      emphasized: text('calloutLink.emphasized', ''),
      theme: select('calloutLink.theme', calloutLinkOptions.theme, '')
    };
    return(
      <CalloutLink {...props} />
    );
  }))
  .add('CalloutLink with Description', withInfo(`<div>${CalloutLinkDocs}</div>`)(() => {
    const props = {
      text: text('calloutLink.text', 'Link to another page'),
      href: text('calloutLink.href', ''),
      info: text('calloutLink.info', 'this will be the tooltip text on hover'),
      description: text('calloutLink.description', 'This is some more important information about the text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum mauris quam, et imperdiet purus pellentesque vel.'),
      theme: select('calloutLink.theme', calloutLinkOptions.theme, '')
    };
    return(
      <CalloutLink {...props} />
    );
  }))
  .add('CalloutLink with Details', withInfo(`<div>${CalloutLinkDocs}</div>`)(() => {
    const props = {
      text: text('calloutLink.text', 'Attorney General Announces a New Health Care Program'),
      href: text('calloutLink.href', ''),
      info: text('calloutLink.info', 'this will be the tooltip text on hover'),
      eyebrow: text('calloutLink.eyebrow', 'Press Release'),
      time: text('calloutLink.time', '30 mins Ago'),
      emphasized: text('calloutLink.emphasized', 'Office of the Attorney General'),
      theme: select('calloutLink.theme', calloutLinkOptions.theme, 'white')
    };
    return(
      <CalloutLink {...props} />
    );
  }));
