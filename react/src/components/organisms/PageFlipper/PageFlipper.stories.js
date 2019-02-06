import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { ArrowNav, DecorativeLink } from '../../../index';

import PageFlipper from './index';
import PageFlipperDocs from './PageFlipper.md';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'PageFlipper', (() => {
      const decorativeLinkProps = {
        href: text('pageFlipper.intro.introDecorativeLink.href', '#'),
        info: text('pageFlipper.intro.introDecorativeLink.info', 'info'),
        text: text('pageFlipper.intro.introDecorativeLink.text', 'Some Section'),
        showFileIcon: boolean('pageFlipper.intro.introDecorativeLink.showFileIcon', false)
      };
      const nextProps = {
        href: text('pageFlipper.nextLink.href', ''),
        info: text('pageFlipper.nextLink.info', 'This is the next page'),
        text: text('pageFlipper.nextLink.text', 'Next Site'),
        title: text('pageFlipper.nextLink.title', 'See the Next Site'),
        onClick: action('Next Clicked'),
        direction: 'right',
        label: text('pageFlipper.nextLink.label', 'Next Site')
      };
      const prevProps = {
        href: text('pageFlipper.previousLink.href', ''),
        info: text('pageFlipper.previousLink.info', 'This is the previous page'),
        text: text('pageFlipper.previousLink.text', 'Previous Site'),
        title: text('pageFlipper.previousLink.title', 'See the Previous Site'),
        onClick: action('Previous Clicked'),
        direction: 'left',
        label: text('pageFlipper.previousLink.label', 'Previous Site')
      };
      const props = {
        intro: {
          label: text('pageFlipper.intro.label', 'This is part of:'),
          introDecorativeLink: <DecorativeLink {...decorativeLinkProps} />
        },
        nextLink: <ArrowNav {...nextProps} />,
        previousLink: <ArrowNav {...prevProps} />
      };
      return(<PageFlipper {...props} />);
    }),
    { info: PageFlipperDocs }
  );
