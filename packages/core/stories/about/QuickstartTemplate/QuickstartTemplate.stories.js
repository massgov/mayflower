import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';
import generateTitle from '../../util/generateTitle';
import * as headerStories from '../../components/Header/Header.stories.js';
import * as footerStories from '../../components/Footer/Footer.stories.js';

const { STORYBOOK_CDN_PATH } = process.env;

import { attachHTML } from '../../util/renderCode';

export const quickstartTemplate = ({renderHeader, renderFooter, reversed}) => {
  return(
    <div id="body-wrapper">
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
            )
          }
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
            )
          }
        </div>
      </main>
      <div className="ma__placeholder">
        Post Content
      </div>
      {renderFooter}
    </div>
  )
}

export const quickstartNotesTemplateCSS = `
<head>
  <!-- Mayflower fonts and other basic styles -->
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/all.min.css">
</head>
`

export const quickstartNotesTemplateJS = `
  <!-- Add Header JS (if any)-->
`
