import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import PageBanner from './index';
//import PageHeaderDocs from './PageHeader.md';
//import PageHeaderData from './PageHeader.knobs.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('PageBanner', withInfo(/*`<div>${PageHeaderDocs}</div>`*/)(() => {
    //const defaultProps = PageHeaderData.pageHeader;
    const props = {
      "bgWide": "https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg",
      "bgNarrow": "https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg",
      "size": "large",
      "icon": "",
      "title": "Office of the Treasurer & Receiver General",
      "titleSubText": " (TRE)",
      "primaryLink": {
        "text": "Charlie Baker",
        "info": "",
        "description": "Governor"
      },
      "secondaryLink": {
        "text": "Deborah B. Goldberg",
        "href": "#",
        "info": "",
        "description": "Treasurer & Receiver General"
      },
      "color": "green"
    }
    // {
    //   category: text('pageHeader.category', defaultProps.category),
    //   title: text('pageHeader.title', defaultProps.title),
    //   subTitle: text('pageHeader.subTitle', defaultProps.subTitle),
    //   optionalContents: [{
    //     paragraph: {
    //       text: text('illustratedHeader.optionalContents.paragraph', defaultProps.optionalContents[0].paragraph.text)
    //     }
    //   }],
    //   publishState: {
    //     text: text('pageHeader.publishState', defaultProps.publishState.text)
    //   },
    //   headerTags: null
    // };
    return(<PageBanner {...props} />);
  }));
