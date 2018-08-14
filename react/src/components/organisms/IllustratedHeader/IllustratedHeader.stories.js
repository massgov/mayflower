import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import IllustratedHeader from './index';
import IllustratedHeaderDocs from './IllustratedHeader.md';
import IllustratedHeaderData from './IllustratedHeader.knobs.options';

import Button from '../../atoms/buttons/Button'

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('IllustratedHeader', withInfo(`<div>${IllustratedHeaderDocs}</div>`)(() => {
    const defaultProps = IllustratedHeaderData.illustratedHeader;
    const props = {
      bgInfo: text('illustratedHeader.bgInfo', defaultProps.bgInfo),
      bgImage: text('illustratedHeader.bgImage', defaultProps.bgImage),
      category: text('illustratedHeader.category', defaultProps.category),
      inverted: boolean('illustratedHeader.inverted', defaultProps.inverted),
      publishState: {
        text: text('illustratedHeader.publishState', defaultProps.publishState.text)
      },
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
    return(
      <IllustratedHeader {...props}>
        <hr />
        <p>Additional Information</p>
      </IllustratedHeader>);
  }));
storiesOf('organisms', module).addDecorator(withKnobs)
  .add('IllustratedHeaderWithButton', withInfo(`<div>${IllustratedHeaderDocs}</div>`)(() => {
    const defaultProps = IllustratedHeaderData.illustratedHeader;
    const props = {
      bgInfo: text('illustratedHeader.bgInfo', defaultProps.bgInfo),
      bgImage: text('illustratedHeader.bgImage', 'https://dtaconnect.eohhs.mass.gov/static/media/bg-image-homepage.67ecfdec.jpg'),
      category: text('illustratedHeader.category', '  '),
      inverted: boolean('illustratedHeader.inverted', defaultProps.inverted),
      pageHeader: {
        title: text('illustratedHeader.title', 'Upcoming Events & Announcements'),
      }
    };
    return(
      <IllustratedHeader {...props}>
        <hr />
        <div className="ma__page-header">
          <Button
            theme="secondary"
            outline
            info="Learn more about SNAP path to work."
            text="learn more"
          />
        </div>
      </IllustratedHeader>);
  }));
