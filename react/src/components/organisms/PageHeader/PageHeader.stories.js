import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import PageHeader from './index';
import PageHeaderDocs from './PageHeader.md';
import PageHeaderData from './PageHeader.knobs.options';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'PageHeader', (() => {
      const defaultProps = PageHeaderData.pageHeader;
      const props = {
        category: text('pageHeader.category', defaultProps.category),
        title: text('pageHeader.title', defaultProps.title),
        subTitle: text('pageHeader.subTitle', defaultProps.subTitle),
        optionalContents: [{
          paragraph: {
            text: text('illustratedHeader.optionalContents.paragraph', defaultProps.optionalContents[0].paragraph.text)
          }
        }],
        publishState: {
          text: text('pageHeader.publishState', defaultProps.publishState.text)
        },
        headerTags: null
      };
      return(<PageHeader {...props} />);
    }),
    { info: PageHeaderDocs }
  );
