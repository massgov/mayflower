import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import SvgWheelchair from '../../icons/SvgWheelchair';
import InputCheckBox from './index';

storiesOf('atoms/forms', module)
  .add('InputCheckBox', withInfo(`<div></div>`)(() => {
    const props = {
      value: 'test',
      id: 'checkbox1',
      icon: <SvgWheelchair />,
      label: 'Check Me',
      checked: true
    };
    return(<InputCheckBox {...props} />);
  }));
