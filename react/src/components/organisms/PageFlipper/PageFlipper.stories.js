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
      label: text('nextArrow.label', 'Next'),
      title: text('nextArrow.title', 'See the next Site'),
      ArrowButton: <ArrowButton direction="right" />,
      Link: <Link href='#' info="welclome" text='next site' />
    }
    const prevProps = {
      label: text('prevArrow.label', 'Previous'),
      title: text('prevArrow.title', 'See the previous site'),
      ArrowButton: <ArrowButton />,
      Link: <Link href='#' info="goodbye" text='previous site' />
    }
    const props = {
      NextLink: <ArrowNav {...nextProps} />,
      PreviousLink: <ArrowNav {...prevProps} />
    };
    return(<PageFlipper {...props} />);
  }));
