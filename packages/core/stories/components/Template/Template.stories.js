import React from 'react';
import * as headerStories from '../Header/Header.stories';
import * as footerStories from '../Footer/Footer.stories';
import * as brandBannerStories from '../BrandBanner/BrandBanner.stories';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

export const Template = ({ renderBrandBanner=brandBannerStories.brandBannerNoSeal(), renderHeader, renderFooter, reversed }) => (
  <div id="body-wrapper">
    {renderBrandBanner}
    {renderHeader}
    <main id="main-content">
      <div className="pre-content sp--bottom">
        <div className="ma__placeholder">
          Pre Content
        </div>
      </div>
      <div className="main-content ma__container">
        <div className="ma__placeholder">
          Main Content
        </div>
      </div>
      <div className={`main-content main-content--two ${reversed ? 'main-content--reversed' : ''}`}>
        { reversed && (
        <aside className="sidebar">
          <div className="ma__placeholder">
            Left Rail
          </div>
        </aside>
        )}
        <div className="page-content">
          <div className="ma__placeholder">
            Main Content
          </div>
        </div>
        { !reversed && (
        <aside className="sidebar">
          <div className="ma__placeholder">
            Right Rail
          </div>
        </aside>
        )}
      </div>
    </main>
    <div className="ma__placeholder">
      Post Content
    </div>
    {renderFooter}
  </div>
);

const templateSlim = <Template 
  renderBrandBanner={brandBannerStories.brandBannerNoSeal()}
  renderHeader={headerStories.headerSlimmest()}
  renderFooter={footerStories.footerSlim()}
/>;

const templateFullNav = <Template 
  renderBrandBanner={brandBannerStories.brandBannerNoSeal()}
  renderHeader={headerStories.headerFullNav()}
  renderFooter={footerStories.footerFullNav()}
  reversed={true} 
/>;

const globalCSS = `<link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/global.min.css">`;
const layoutCSS = `<link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/layout.min.css">`;
const brandBannerCSS = `<link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/brand-banner.min.css">`;

const notesTemplateSlim = `
  // Link to CSS:
  ${globalCSS}
  ${layoutCSS}
  ${brandBannerCSS}
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-slim.css">
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer-slim.css">
`;

const notesTemplate = `
  // Link to CSS:
  ${globalCSS}
  ${layoutCSS}
  ${brandBannerCSS}
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header.css">
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer.css">

  // Link to JS:
  <script type="text/javascript" src="${STORYBOOK_CDN_PATH}/js/header.js" />
`;

export const notesTemplateCSS = `
<head>
  <!-- Mayflower fonts and other basic styles -->
  ${globalCSS}
  <!-- Mayflower page layout styles -->
  ${layoutCSS}
  <!-- Mayflower Brand Banner styles -->
  ${brandBannerCSS}
  <!-- Add Mayflower Header and Footer specific styles -->
</head>
`;

export const notesTemplateJS = `
  <!-- Add Header JS (if any)-->
`;

export const templateBasic = () => templateSlim;
attachHTML(templateBasic, templateSlim, notesTemplateSlim);

export const templateFull = () => templateFullNav;
attachHTML(templateFull, templateFullNav, notesTemplate);

 
