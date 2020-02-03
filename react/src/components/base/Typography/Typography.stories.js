import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import {
  characters,
  letters,
  numbers,
  styles
} from './typography.json';

import './styles.css';

storiesOf('brand|typography', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Texta', (() => {
    const props = {
      text: text('text', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    };
    return(
      <div className="main-content main-content--two">
        <div className="page-content">
          <SidebarHeading title="Characters" level={2} />
          <div className="sb-block">
            <div className="sb-text">{characters}</div>
          </div>
          <SidebarHeading title="Letters Only" level={2} />
          <div className="sb-block">
            <div className="sb-text">{letters}</div>
            <div className="sb-text">{letters.toUpperCase()}</div>
          </div>
          <SidebarHeading title="Numbers Only" level={2} />
          <div className="sb-block">
            <div className="sb-text">{numbers}</div>
          </div>
          <SidebarHeading title="Styles" level={2} />
        </div>
      </div>
    );
  })
);
