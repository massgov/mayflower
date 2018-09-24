import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Icon from '../../icons/Icon';
import InputCheckBox from './index';

storiesOf('atoms/forms', module)
  .add('InputCheckBox', withInfo(`<div></div>`)(() => {
    const props = {
      value: 'test',
      id: 'checkbox1',
      icon: <Icon name="wheelchair" svgHeight={20} svgWidth={20} />,
      label: 'Check Me',
      checked: true
    };
    return(<InputCheckBox {...props} />);
  }));
