import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Story, DocsContext } from '@storybook/addon-docs/blocks';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

const { STORYBOOK_CDN_PATH } = process.env;

export const renderReactMarkup = (component, notes) => {
  let markup = ReactDOMServer.renderToStaticMarkup(component)
  // Add notes about CSS and JS
  if(notes) {
    markup = markup.concat(notes)
  }
  const prettyMarkup = prettier.format(markup,
  {
    htmlWhitespaceSensitivity: 'ignore',
    endOfLine: 'auto',
    parser: 'html',
    plugins: [parserHtml]
  });
  // Replaces the path to the state seal with the latest assets CDN.
  return prettyMarkup.replace(/static\/media\/stateseal?([a-z|\-]*)\.(.*)\.png/g, `${STORYBOOK_CDN_PATH}/static/images/logo/stateseal$1.png`);
}

// can't pass DocsContext from .mdx
// export const StoryCode = ({ children }) => (
//   <Story
//     name="test"
//     parameters={{ docs: { transformSource: (src) => renderReactMarkup(children) } }}
//   >
//     {children}
//   </Story>
// )


export const attachCSS = (story, css) => {
  return story.parameters = {
    docs: {
      source: {
        code: css
      }
    }
  }
}


export const attachHTML = (story, Component, notes) => {
  return story.parameters = {
    docs: {
      source: {
        code: renderReactMarkup(Component, notes)
      }
    }
  };
}
