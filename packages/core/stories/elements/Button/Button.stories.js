import React from 'react';
import Button from '@massds/mayflower-react/dist/Button';
import ReactDOMServer from 'react-dom/server';
import { attachCSS } from '../../util/renderCode';


const cssButton = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/button.css">'


// exported story names must be unique
const buttonCSS = () => null;
attachCSS(buttonCSS, cssButton)

const buttonCSS2 = () => null;
attachCSS(buttonCSS2, cssButton)

const buttonCSS3 = () => null;
attachCSS(buttonCSS3, cssButton)

const buttonCSS4 = () => null;
attachCSS(buttonCSS4, cssButton)

const buttonCSSDisabled = () => null;
attachCSS(buttonCSSDisabled, cssButton)

export { buttonCSS, buttonCSS2, buttonCSS3, buttonCSS4, buttonCSSDisabled }
