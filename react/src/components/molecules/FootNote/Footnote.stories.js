import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean, date } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Footnote from './index';
//import DateRangeDocs from './DateRange.md';
//import inputDateOptions from '../../atoms/forms/InputDate/InputDate.knobs.options';

const FootNoteLink = ({index}) => {
  return(
      <a id={`footnoteref${index}`} href={`#footnotemsg${index}`} className="page-scroll" aria-describedby="footnote-label"><span className="sr-only">see footnote</span><sup>[{index}]</sup></a>
  )
}

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('Footnote', withInfo(`<div></div>`)(() => {
    return(
      <div>
       <a id="footnoteref1" href="#footnotemsg1" className="page-scroll" aria-describedby="footnote-label"><span className="sr-only">see footnote</span><sup>[1]</sup></a>
       <Footnote i={1}>Data provided by Boston Logan International Airport.</Footnote>
      </div>
    );
  }));
