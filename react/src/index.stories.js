import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import MarkdownIt from 'markdown-it';
import { storiesOf } from '@storybook/react';

import './markdown.scss';

import Docs from './README.md';

const md = new MarkdownIt();
const result = md.render(Docs);

storiesOf('about/mayflower-react', module)
  .add('Welcome🎉', (() => (
    <div className="main-content main-content--two">
      <div className="page-content">
        <div className="markdown-body">
          {ReactHtmlParser(result)}
        </div>
      </div>
    </div>
  )
  ));
