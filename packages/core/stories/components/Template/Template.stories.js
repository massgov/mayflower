import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';

import generateTitle from '../../util/generateTitle';
import * as headerStories from '../Header/Header.stories.js';
import * as footerStories from '../Footer/Footer.stories.js';

const { STORYBOOK_CDN_PATH } = process.env;

import { attachHTML } from '../../util/renderCode';

const templateSlim = (
  <div id="body-wrapper">
    {headerStories.headerSlimmest()}
      <main id="main-content">
        <div className="main-content main-content--two">
          <div className="page-content">
            {
              // place your content here
            }
          </div>
        </div>
      </main>
    {footerStories.footerSlim()}
  </div>
)

const notesTemplateSlim = `
  // Link to CSS:
  <head>
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/general.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/layout.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/header-slim.css">
    <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/footer-slim.css">
  </head>
`

export const templateBasic = () => templateSlim;
attachHTML(templateBasic, templateSlim, notesTemplateSlim)
