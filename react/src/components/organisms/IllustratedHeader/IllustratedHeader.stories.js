import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import IllustratedHeader from './index';
import IllustratedHeaderDocs from './IllustratedHeader.md';
import IllustratedHeaderData from './IllustratedHeader.knobs.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'IllustratedHeader', () => {
      const defaultProps = IllustratedHeaderData.illustratedHeader;
      const props = {
        bgInfo: text('bgInfo', defaultProps.bgInfo),
        bgImage: text('bgImage', defaultProps.bgImage),
        category: text('category', defaultProps.category),
        inverted: boolean('inverted', defaultProps.inverted),
        publishState: {
          text: text('publishState', defaultProps.publishState.text)
        },
        pageHeader: {
          title: text('IllustratedHeader pageHeader: title', defaultProps.pageHeader.title, 'PageHeader'),
          subTitle: text('IllustratedHeader pageHeader: subtitle', defaultProps.pageHeader.subTitle, 'PageHeader'),
          optionalContents: [{
            paragraph: {
              text: text('IllustratedHeader pageHeader, optionalContents: paragraph', defaultProps.pageHeader.optionalContents[0].paragraph.text, 'PageHeader')
            }
          }],
          headerTags: null
        }
      };
      return(
        <IllustratedHeader {...props}>
          <hr />
          <p>Additional Information</p>
        </IllustratedHeader>);
    },
    { info: IllustratedHeaderDocs }
  );
