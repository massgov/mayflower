import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, object, text, number } from '@storybook/addon-knobs/react';
import {ArrowNav, DecorativeLink} from '../../../index';

import PageFlipper from './index';
import PageFlipperReadme from './PageFlipper.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('PageFlipper', withInfo({ PageFlipperReadme })(() => {
    const decorativeLinkProps = {
      href: text('Decorative href', ''),
      info: text('Decorative Info', ''),
      text: text('Decorative Text', ''),
      showFileIcon: false
    }
    const nextProps = {
      href: text('Next Link href', ''),
      info: text('Next Info', 'This is the next page'),
      text: text('Next Link Text', 'Next Site'),
      title: text('Title Text', 'See the Next Site'),
      onClick: action('Next Clicked'),
      direction: 'right',
      label: text('Next Label', 'Next Site'),
    }
    const prevProps = {
      href: text('Previous Link href', ''),
      info: text('Previous Info', 'This is the previous page'),
      text: text('Previous Link Text', 'Previous Site'),
      title: text('Previous Title Text', 'See the Previous Site'),
      onClick: action('Previous Clicked'),
      direction: 'left',
      label: text('Previous Label', 'Previous Site'),
    }
    const props = {
      context: {
        label: text('Contextual Label', ''),
        contextDecorativeLink: <DecorativeLink {...decorativeLinkProps} />
      },
      nextLink: <ArrowNav {...nextProps} />,
      previousLink: <ArrowNav {...prevProps} />
    };
    return(<PageFlipper {...props} />);
  }));
