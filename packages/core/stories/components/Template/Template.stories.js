import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';

import generateTitle from '../../util/generateTitle';
import * as headerStories from '../Header/Header.stories.js';
import * as footerStories from '../Footer/Footer.stories.js';

const { STORYBOOK_CDN_PATH } = process.env;

import { attachHTML } from '../../util/renderCode';

const template = (renderHeader, renderFooter) => (
  <div id="body-wrapper">
    {renderHeader}
    <main id="main-content">
      <div className="pre-content sp--bottom">
        <div className="ma__placeholder">
          Pre Content
        </div>
      </div>
      <div className="main-content main-content--two">
        <div className="page-content">
          <div className="ma__placeholder">
            Main Content
          </div>
        </div>
        <aside className="sidebar">
          <div className="ma__placeholder">
            Side Content
          </div>
        </aside>
      </div>
    </main>
    <div className="ma__placeholder">
      Post Content
    </div>
    {renderFooter}
  </div>
)

const templateSlim = template(headerStories.headerSlimmest(), footerStories.footerSlim())

const templateFullNav = template(headerStories.headerFullNav(), footerStories.footerFullNav())

const notesTemplateSlim = `
  // Link to CSS:
  <head>
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/general.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/layout.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-slim.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer-slim.css">
  </head>
`

const notesTemplate = `
  // Link to CSS:
  <head>
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/general.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/layout.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer.css">
  </head>
`

export const templateBasic = () => templateSlim;
attachHTML(templateBasic, templateSlim, notesTemplateSlim)


export const templateFull = () => templateFullNav;
attachHTML(templateBasic, templateFullNav, notesTemplateSlim)
