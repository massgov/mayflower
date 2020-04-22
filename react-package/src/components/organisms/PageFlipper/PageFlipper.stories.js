import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { ArrowNav, DecorativeLink } from '../../../index';
import PageFlipper from './index';
import PageFlipperDocs from './PageFlipper.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PageFlipper', () => {
      const decorativeLinkProps = {
        href: text('PageFlipper intro, introDecorativeLink: href', '#', 'DecorativeLink'),
        info: text('PageFlipper intro, introDecorativeLink: info', 'info', 'DecorativeLink'),
        text: text('PageFlipper intro, introDecorativeLink: text', 'Some Section', 'DecorativeLink'),
        showFileIcon: boolean('PageFlipper intro, introDecorativeLink: showFileIcon', false, 'DecorativeLink')
      };
      const nextProps = {
        href: text('PageFlipper nextLink: href', '', 'Next'),
        info: text('PageFlipper nextLink: info', 'This is the next page', 'Next'),
        text: text('PageFlipper nextLink: text', 'Next Site', 'Next'),
        title: text('PageFlipper nextLink: title', 'See the Next Site', 'Next'),
        onClick: action('Next Clicked'),
        direction: 'right',
        label: text('PageFlipper nextLink: label', 'Next Site', 'Next')
      };
      const prevProps = {
        href: text('PageFlipper previousLink: href', '', 'Previous'),
        info: text('PageFlipper previousLink: info', 'This is the previous page', 'Previous'),
        text: text('PageFlipper previousLink: text', 'Previous Site', 'Previous'),
        title: text('PageFlipper previousLink: title', 'See the Previous Site', 'Previous'),
        onClick: action('Previous Clicked'),
        direction: 'left',
        label: text('PageFlipper previousLink: label', 'Previous Site', 'Previous')
      };
      const props = {
        intro: {
          label: text('PageFlipper intro: label', 'This is part of:'),
          introDecorativeLink: <DecorativeLink {...decorativeLinkProps} />
        },
        nextLink: <ArrowNav {...nextProps} />,
        previousLink: <ArrowNav {...prevProps} />
      };
      return(<PageFlipper {...props} />);
    },
    { info: PageFlipperDocs }
  );
