import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';


import Icon from '../../atoms/icons/Icon';

import Tooltip from './index';

storiesOf('molecules', module)
  .add('Tooltip', withInfo('<div></div>')(() => {
    const props = {
      openText: 'Want more information?',
      closeText: 'Close',
      message: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.',
      controlId: 'tooltip1',
      openIcon: <Icon name="questionmark" svgHeight={20} svgWidth={20} />,
      info: 'Description on link for screen',
      title: 'Title',
      level: 2
    };
    return(<Tooltip {...props} />);
  }));
