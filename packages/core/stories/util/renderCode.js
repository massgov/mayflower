import ReactDOMServer from 'react-dom/server';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

const { STORYBOOK_CDN_PATH } = process.env;

export const renderReactMarkup = (component, notes) => {
  let markup = ReactDOMServer.renderToStaticMarkup(component);
  // Add notes about CSS and JS
  if (notes) {
    markup = markup.concat(notes);
  }
  const prettyMarkup = prettier.format(markup,
    {
      htmlWhitespaceSensitivity: 'ignore',
      endOfLine: 'auto',
      parser: 'html',
      plugins: [parserHtml]
    });
  // Replaces the path to the state seal with the latest assets CDN.
  return prettyMarkup.replace(/static\/media\/stateseal?([a-z|-]*)\.(.*)\.png/g, `${STORYBOOK_CDN_PATH}/static/images/logo/stateseal$1.png`);
};

export function attachCSS(story, css) {
  story.parameters = {
    docs: {
      source: {
        code: css
      }
    }
  };
}

export function attachHTML(story, Component, notes) {
  story.parameters = {
    docs: {
      source: {
        code: renderReactMarkup(Component, notes)
      }
    }
  };
}
