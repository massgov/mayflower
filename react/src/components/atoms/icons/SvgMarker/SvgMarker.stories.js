import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgMarker from './index';
import SvgMarkerMarkdown from './SvgMarker.md';

storiesOf('atoms/icons', module)
  .add('SvgMarker', withInfo(`<div>${SvgMarkerMarkdown}</div>`)(() => <SvgMarker />));

