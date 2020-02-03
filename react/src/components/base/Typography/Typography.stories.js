import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Heading from '../../atoms/headings/Heading';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import {
  characters,
  letters,
  numbers,
  styles
} from './typography.json';

import './styles.css';

const slugifyStyle = (style) => {
  const [weight, italic] = style.split(' ');
  return italic ? `${weight.toLowerCase()}--${italic.toLowerCase()}` : weight.toLowerCase();
};

storiesOf('brand|typography', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Texta', (() => {
    const props = {
      text: text('text', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    };
    return(
      <div className="main-content main-content--two">
        <div className="page-content">
          <Heading text="Texta" level={1} />
          <SidebarHeading title="Characters" level={2} />
          <div className="sb-block">
            <div className="sb-text">{characters}</div>
            <hr />
            <div className="sb-text">{letters}</div>
            <div className="sb-text">{letters.toUpperCase()}</div>
            <hr />
            <div className="sb-text">{numbers}</div>
          </div>
          <SidebarHeading title="Styles" level={2} />
          <div className="sb-block">
            {
              styles.map((style) => {
                return<div className={`ma-texta-${slugifyStyle(style)}`}>{style}</div>;
              })
            }
          </div>
        </div>
      </div>
    );
  })
);
