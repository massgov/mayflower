import React, { Fragment } from 'react';
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
            <div className="sb-text">{letters.toUpperCase()}</div>
            <div className="sb-text">{letters}</div>
            <hr />
            <div className="sb-text">{numbers}</div>
          </div>
          <SidebarHeading title="Styles" level={2} />
          <div className="sb-block sb-grid">
            {
              styles.map((style) => {
                const className = `ma-texta-${slugifyStyle(style)}`;
                return(
                  <Fragment>
                    <span className={className}>{style}</span>
                    <span className="markdown-body">
                      <code>{`.${className}`}</code>
                    </span>
                  </Fragment>
                );
              })
            }
          </div>
          <SidebarHeading title="Sizes" level={2} />
          <div className="sb-block">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <p>Body text</p>
          </div>
        </div>
      </div>
    );
  })
);
