import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

import CalloutAlert from './index';

import Icon from '../../atoms/icons/Icon';
import Paragraph from '../../atoms/text/Paragraph';
import OrderedList from '../../atoms/lists/OrderedList';

const getIcon = (iconProps) => <Icon {...iconProps} />;

const icons = {
  circlechevron: getIcon({ name: 'circlechevron' }),
  laptop: getIcon({ name: 'laptop' }),
  phone: getIcon({ name: 'phone' }),
  fax: getIcon({ name: 'fax' }),
  none: null
};

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('CalloutAlert', withInfo(`<div></div>`)(() => {
    return(
      <CalloutAlert>
        <Paragraph />
        <OrderedList />
      </CalloutAlert>
    );
  }));
