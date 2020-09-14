import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import PageHeader from './index';
import PageHeaderDocs from './PageHeader.md';
import PageHeaderData from './PageHeader.knobs.options';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PageHeader', () => {
      const defaultProps = PageHeaderData.pageHeader;
      const props = {
        category: text('category', defaultProps.category),
        title: text('title', defaultProps.title),
        subTitle: text('subTitle', defaultProps.subTitle),
        optionalContents: [{
          paragraph: {
            text: text('PageHeader optionalContents: paragraph', defaultProps.optionalContents[0].paragraph.text)
          }
        }],
        publishState: {
          text: text('publishState', defaultProps.publishState.text)
        },
        headerTags: null
      };
      return(<PageHeader {...props} />);
    },
    { info: PageHeaderDocs }
  );
