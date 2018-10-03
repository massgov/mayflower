import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import countyData from './county.data.json';
//import townData from './town.data.json';

import Table from './index';

storiesOf('dataviz', module).addDecorator(withKnobs)
  .add('Table', withInfo(`<div></div>`)(() => {
    return(
      <Table data={countyData}/>
    );
  }));
