import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Heading from '../../atoms/headings/Heading';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import {
  characters,
  letters,
  numbers,
  styles
} from './typography.json';
import typographyOptions from './Typography.knobs.options';

import './styles.css';

const slugifyStyle = (style) => {
  const [weight, italic] = style.split(' ');
  return italic ? `${weight.toLowerCase()}--${italic.toLowerCase()}` : weight.toLowerCase();
};

storiesOf('brand|typography', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Texta', (() => {
    const props = {
      text: text('custom text', 'Type something in the text knob, and use other knobs to change text styles.'),
      style: select('custom style', styles, 'Medium Italic'),
      size: select('custom size', typographyOptions.size, 'p')
    };
    const CustomElement = props.size;
    return(
      <div className="main-content main-content--two">
        <div className="page-content">
          <Heading text="Texta" level={1} />
          <SidebarHeading title="Characters" level={2} />
          <div className="sb-block">
            <div className="sb-text">{letters.toUpperCase()}</div>
            <div className="sb-text">{letters}</div>
            <hr />
            <div className="sb-text">{numbers}</div>
            <hr />
            <div className="sb-text">{characters}</div>
            <hr />
          </div>

          <SidebarHeading title="Custom Sentence" level={2} />
          <div className="sb-block">
            <CustomElement className={`ma-texta-${slugifyStyle(props.style)}`}>
              {props.text}
            </CustomElement>
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
            { Object.keys(typographyOptions.size).map((key) => {
                const Element = typographyOptions.size[key];
                return (
                  <Element>{key}</Element>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }));
