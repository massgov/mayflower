import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import MarkdownIt from 'markdown-it';
import { storiesOf } from '@storybook/react';

import './index.css';
import './markdown.css';

import Docs from '../README.md';

const md = new MarkdownIt();
const result = md.render(Docs);

storiesOf('Welcome🎉|mayflower-react', module)
  .add('About', (() => (
    <div className="main-content main-content--two">
      <div className="page-content">
        <div className="markdown-body">
          {ReactHtmlParser(result)}
        </div>
      </div>
    </div>
  )
  ));
