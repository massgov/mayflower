import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Story, DocsContext } from '@storybook/addon-docs/blocks';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

export const renderReactMarkup = (component) => {
  const markup = ReactDOMServer.renderToStaticMarkup(component)
  const prettyMarkup = prettier.format(markup,
  {
    htmlWhitespaceSensitivity: 'ignore',
    endOfLine: 'auto',
    parser: 'html',
    plugins: [parserHtml]
  });
  // Replaces the path to the state seal with the latest assets CDN.
  return prettyMarkup.replace(/static\/media\/stateseal\.(.*)\.png/, 'https://unpkg.com/@massds/mayflower-assets/static/images/logo/stateseal.png');
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


export const attachHTML = (story, Component) => {
  return story.parameters = {
    docs: {
      source: {
        code: renderReactMarkup(Component)
      }
    }
  };
}
