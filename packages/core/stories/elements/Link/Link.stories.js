import { attachCSS } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const cssLink = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/link.css">`;

const cssDecorativeLink = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/decorative-link.css">`;

const cssCalloutLink = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/callout-link.css">`;

const cssButton = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/button.css">`;

// exported story names must be unique
export const linkCSS = () => null;
attachCSS(linkCSS, cssLink);

export const linkDecorativeCSS = () => null;
attachCSS(linkDecorativeCSS, cssDecorativeLink);

export const linkCalloutCSS = () => null;
attachCSS(linkCalloutCSS, cssCalloutLink);

export const linkButtonCSS = () => null;
attachCSS(linkButtonCSS, cssButton);
