import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, object, text, number } from '@storybook/addon-knobs/react';
import {ArrowNav, DecorativeLink, ArrowButton, Link} from '../../../index';

import PageFlipper from './index';
import PageFlipperReadme from './PageFlipper.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('PageFlipper', withInfo({ PageFlipperReadme })(() => {
    const nextProps = {
      label: text('Next Arrow Label', 'Next'),
      title: text('Next Arrow Title', 'See the next Site'),
      ArrowButton: <ArrowButton
        href='#'
        info={text('Next Arrow Info', '')}
        direction="right"
      />,
      Link: <Link
        href='#'
        info={text('Next Arrow Link info', 'welcome')}
        text={text('Next Arrow Link text', 'Next Site')}
        icon=''
      />
    }
    const prevProps = {
      label: text('Previous Arrow Label', 'Previous'),
      title: text('Previous Arrow Title', 'See the previous site'),
      ArrowButton: <ArrowButton
        href='#'
        info={text('Previous Arrow Info', '')}
      />,
      Link: <Link
        href='#'
        info={text('Previous Arrow Link info', "goodbye")}
        text={text('Previous Arrow Link text', 'Previous Site')}
        icon=''
      />
    }
    const props = {
      NextLink: <ArrowNav {...nextProps} />,
      PreviousLink: <ArrowNav {...prevProps} />
    };
    return(<PageFlipper {...props} />);
  }));
