import { attachCSS } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const cssButton = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/button.css">`;

// exported story names must be unique
export const buttonCSS = () => null;
attachCSS(buttonCSS, cssButton);

export const buttonCSS2 = () => null;
attachCSS(buttonCSS2, cssButton);

export const buttonCSS3 = () => null;
attachCSS(buttonCSS3, cssButton);

export const buttonCSS4 = () => null;
attachCSS(buttonCSS4, cssButton);

export const buttonCSSDisabled = () => null;
attachCSS(buttonCSSDisabled, cssButton);
