import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Heading,
  ComponentsTable,
  Stories,
  PRIMARY_STORY,
  CURRENT_SELECTION,
  SourceState,
  DocsContext,
  Canvas, Story
} from '@storybook/addon-docs/blocks';
import { ActionBar, Source } from '@storybook/components';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import trapcss from 'trapcss'

// Webpack is set to run .scss files through scss-loader and css-loader only.
// This allows stories to import their scss files and get processed css.
// style-loader is added here to attach the css from the index.scss file to a style tag on page.
import 'style-loader!../src/index.scss';

const storyKindOrder = [
  'about', // storyKindOrder.indexOf -1 follow alphabetical order
  'brand', // storyKindOrder.indexOf -1 follow alphabetical order
  'dataviz', // storyKindOrder.indexOf -1 follow alphabetical order
  'forms',
  'atoms',
  'molecules',
  'organisms',
  'others/templates',
  'others/pages'
];

export const StoryPage = ({ StoryComponent = null, showStories = false, Description, styles = null }) => {
  const docsContext = React.useContext(DocsContext);
  const [showHTML, setShowHTML] = React.useState(true);
  const [showCSS, setShowCSS] = React.useState(true);
  const { id, name, parameters = {}, args } = docsContext;
  const { component } = parameters;
  const HtmlComponent = StoryComponent || component;
  let html = null;
  if (HtmlComponent) {
    html = prettier.format(ReactDOMServer
    .renderToStaticMarkup(
      (
        <HtmlComponent {...args} />
      )),
      {
        htmlWhitespaceSensitivity: 'ignore',
        endOfLine: 'auto',
        parser: 'html',
        plugins: [parserHtml]
      }
    );
  }
  const actionItem = {
    title: showHTML ? 'Hide HTML' : 'Show HTML?', 
    onClick: () => setShowHTML((prev) => !prev)
  };
  const cssActionItem = {
    title: showCSS ? 'Hide Styles' : 'Show Styles?', 
    onClick: () => setShowCSS((prev) => !prev)
  };
  let css = null;
  if (styles) {
    // Strip out all unused styles from story.
    const purgedCss = trapcss({
      html,
      // css-loader returns an object. This converts that object to
      // the css string.
      css: styles.toString()
    });
    // Format purged css.
    css = prettier.format(purgedCss.css, {
      parser: 'css',
      plugins: [parserCss]
    });
    
  }
  return(
    <>
      <Title>{component.displayName}</Title>
      <Subtitle />
      { Description && <Description />}
      <Primary name={name} />
      <ArgsTable story={CURRENT_SELECTION}/>
      {html && (
        <Heading>
          HTML
          <ActionBar actionItems={[actionItem]} />
        </Heading>
      )}
      {!showHTML && <Source storyId={id} error="Click Show HTML above to view markup source." />}
      {html && showHTML && <Source storyId={id} language="html" code={html} dark />}
      {styles && <Heading>Styles<ActionBar actionItems={[cssActionItem]} /></Heading>}
      {!showCSS && <Source storyId={id} error="Click Show Styles above to view styles source." />}
      {styles && showCSS && <Source storyId={id} language="css" code={css} dark />}
      { showStories && <Stories />}
    </>
  );
}

export const parameters = {
  options: {
    storySort: {
      order: storyKindOrder
    },
  },
  controls: {
    expanded: true,
    hideNoControlsWarning: true
  },
  layout: 'padding'
};
