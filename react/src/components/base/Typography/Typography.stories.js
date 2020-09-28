import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import MarkdownIt from 'markdown-it';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Heading from 'MayflowerReactHeadings/Heading';
import SidebarHeading from 'MayflowerReactHeadings/SidebarHeading';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import {
  characters,
  letters,
  numbers,
  styles
} from './typography.json';
import typographyOptions from './Typography.knobs.options';
import TypographyDocs from './typography.md';

import './styles.scss';
import '../../../markdown.scss';

const slugifyStyle = (style) => {
  const [weight, italic] = style.split(' ');
  return italic ? `${weight.toLowerCase()}--${italic.toLowerCase()}` : weight.toLowerCase();
};

const md = new MarkdownIt();
const reg = /\(\.\.\/(\.gitbook\/assets\/.*)\)/g;
const githubImageTypographyDocsFixed = TypographyDocs.replace(reg, (match, contents) => `(https://raw.githubusercontent.com/massgov/mayflower/develop/docs/${contents})`);
const result = md.render(githubImageTypographyDocsFixed);

storiesOf('brand|typography', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('About', (() => (
    <div className="main-content main-content--two">
      <div className="page-content">
        <div className="markdown-body">
          {ReactHtmlParser(result)}
        </div>
      </div>
    </div>
  )
  ))
  .add('Noto Sans', (() => {
    const props = {
      text: text('custom text', 'Type something in the text knob, and use other knobs to change text styles.'),
      style: select('custom style', styles, 'Medium Italic'),
      size: select('custom size', typographyOptions.size, 'p')
    };
    const CustomElement = props.size;
    return(
      <div className="main-content main-content--two">
        <div className="page-content">
          <Heading text="Noto Sans" level={1} />
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
            <CustomElement className={`ma-noto-${slugifyStyle(props.style)}`}>
              {props.text}
            </CustomElement>
          </div>

          <SidebarHeading title="Styles" level={2} />
          <div className="sb-block sb-grid">
            {
              styles.map((style) => {
                const className = `ma-noto-${slugifyStyle(style)}`;
                return(
                  <React.Fragment>
                    <span className={className}>{style}</span>
                    <span className="markdown-body">
                      <code>{`.${className}`}</code>
                    </span>
                  </React.Fragment>
                );
              })
            }
          </div>
          <SidebarHeading title="Sizes" level={2} />
          <div className="sb-block">
            { Object.keys(typographyOptions.size).map((key) => {
                const Element = typographyOptions.size[key];
                return(
                  <Element>{key}</Element>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }))
  .add('Noto Mono', (() => (
    <div className="main-content main-content--two">
      <div className="page-content">
        <Heading text="Noto Mono" level={1} />
        <SidebarHeading title="Characters" level={2} />
        <div className="sb-block sb-block--mono">
          <div className="sb-text">{letters.toUpperCase()}</div>
          <div className="sb-text">{letters}</div>
          <hr />
          <div className="sb-text">{numbers}</div>
          <hr />
          <div className="sb-text">{characters}</div>
          <hr />
        </div>
        <div className="sb-block">
          Noto Mono is an open source font available on Google Fonts.
          <DecorativeLink
            text="Download the fonts or see more information on Google Fonts"
            href="https://fonts.google.com/specimen/Source+Code+Pro"
          />
        </div>
      </div>
    </div>
  )));
