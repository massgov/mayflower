import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import IllustratedHeader from './index';
import IllustratedHeaderDocs from './IllustratedHeader.md';
import IllustratedHeaderData from './IllustratedHeader.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('IllustratedHeader', withInfo(`<div>${IllustratedHeaderDocs}</div>`)(() => {
    const defaultProps = IllustratedHeaderData.illustratedHeader;
    const props = {
      bgInfo: text('illustratedHeader.bgInfo', defaultProps.bgInfo),
      bgImage: text('illustratedHeader.bgImage', defaultProps.bgImage),
      category: text('illustratedHeader.category', defaultProps.category),
      inverted: boolean('illustratedHeader.inverted', defaultProps.inverted),
      pageHeader: {
        title: text('illustratedHeader.title', defaultProps.pageHeader.title),
        subTitle: text('illustratedHeader.subtitle', defaultProps.pageHeader.subTitle),
        optionalContents: [{
          paragraph: {
            text: text('illustratedHeader.optionalContents.paragraph', defaultProps.pageHeader.optionalContents[0].paragraph.text)
          }
        }],
        headerTags: null
      }
    };
    return(<IllustratedHeader {...props} />);
  }));
