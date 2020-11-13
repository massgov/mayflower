import React from 'react';
import Link from '@massds/mayflower-react/dist/Link';
import ReactDOMServer from 'react-dom/server';
import { attachCSS } from '../../util/renderCode';


const cssLink = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/link.css">'

const cssDecorativeLink = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/decorative-link.css">'

const cssCalloutLink = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/callout-link.css">'


// exported story names must be unique
export const linkCSS = () => null;
attachCSS(linkCSS, cssLink)

export const linkDecorativeCSS = () => null;
attachCSS(linkDecorativeCSS, cssDecorativeLink)

export const linkCalloutCSS = () => null;
attachCSS(linkCalloutCSS, cssCalloutLink)
