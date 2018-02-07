import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import Pagination from './index';
//import orgSelectorOptions from './OrgSelector.knobs.options';
//import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';

const props = {
    "next": {
      "disabled": false,
      "text": "Next"
    },
    "prev": {
      "disabled": false,
      "text": "Previous"
    },
    "pages": [{
      "active": false,
      "text": "1"
    },{
      "active": true,
      "text": "spacer"
    },{
      "active": false,
      "text": "3"
    },{
      "active": true,
      "text": "4"
    },{
      "active": false,
      "text": "5"
    },{
      "active": false,
      "text": "spacer"
    },{
      "active": false,
      "text": "10"
    }]
  };

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('Pagination',
    withInfo(``)(() => {
      return(<Pagination {...props} />);
    })
  );
