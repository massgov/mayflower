import React from 'react';
import Button from '@massds/mayflower-react/dist/Button';
import ReactDOMServer from 'react-dom/server';
import { attachCSS } from '../../util/renderCode';


const cssButton = '// Link to CSS: <link rel="stylesheet" href="https://unpkg.com/@massds/mayflower-assets@[version]/css/button.css">'


// exported story names must be unique
export const buttonCSS = () => null;
attachCSS(buttonCSS, cssButton)

export const buttonCSS2 = () => null;
attachCSS(buttonCSS2, cssButton)

export const buttonCSS3 = () => null;
attachCSS(buttonCSS3, cssButton)

export const buttonCSS4 = () => null;
attachCSS(buttonCSS4, cssButton)

export const buttonCSSDisabled = () => null;
attachCSS(buttonCSSDisabled, cssButton)
